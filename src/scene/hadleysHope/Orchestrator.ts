import {
  Box3,
  Box3Helper,
  Clock,
  Color,
  MOUSE,
  OrthographicCamera,
  Raycaster,
  TOUCH,
  Vector2,
  Vector3,
  WebGLRenderer
} from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import DrawMode from '../DrawMode';
import HadleysHope from './HadleysHope';
import HadleysHopeSceneConstructor from './HadleysHopeSceneConstructor';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { createLimitPan } from '../../scene/utils/cameraUtils';
import EffectComposerHelpers from './helpers/EffectComposerHelpers';
import CameraHelpers from './helpers/CameraHelpers';
import BaseSceneElement from '../base/BaseSceneElement';
import { Easing, Tween } from '@tweenjs/tween.js';
import SceneElementType from '../SceneElementType';
/**
 * Manages the main aspect of the final scene
 */
class Orchestrator {
  private static SCENE_MODEL_NAME = './models/hadleys.glb';
  private loader = new GLTFLoader();
  private clock = new Clock();

  currentDrawMode = DrawMode.BLUEPRINT;

  blueprintScene: HadleysHope = new HadleysHope();
  regularScene: HadleysHope = new HadleysHope();

  renderer: WebGLRenderer;
  bluePrintEffectComposer: EffectComposer;
  regularEffectComposer: EffectComposer;

  private nearPlane = -10;
  private farPlane = 1000;

  camera: THREE.OrthographicCamera;
  cameraControls: OrbitControls | null;
  d = 10;

  private raycaster: Raycaster = new Raycaster();
  private pointer: Vector2 = new Vector2();
  private currentIntersectedElement: BaseSceneElement | null = null; // element current under the raycast eye
  currentSelectedElement: BaseSceneElement | null = null;

  private width: number;
  private height: number;

  onBuildingFocused: (target: BaseSceneElement) => void;

  constructor(width: number, height: number, devicePixelRatio: number) {
    // init renderer
    this.width = width;
    this.height = height;
    this.renderer = new WebGLRenderer({ alpha: true });
    this.renderer.setPixelRatio(devicePixelRatio);
    this.renderer.setClearColor(0x141a35);
    this.renderer.shadowMap.enabled = true;
    this.renderer.setSize(width, height);

    const aspect = width / height;

    // camera
    this.camera = new OrthographicCamera(
      this.d * -aspect,
      this.d * aspect,
      this.d,
      this.d * -1,
      this.nearPlane,
      this.farPlane
    );
    this.camera.position.set(0, this.d, 0);
    this.camera.lookAt(new Vector3());
  }

  createCameraControls = () => {
    this.cameraControls = new OrbitControls(
      this.camera,
      this.renderer.domElement
    );

    this.cameraControls.enableRotate = false;
    this.cameraControls.enableZoom = false;
    this.cameraControls.maxZoom = 4.5;
    this.cameraControls.minZoom = 2;
    this.cameraControls.autoRotate = false;
    this.cameraControls.touches.ONE = TOUCH.PAN;
    this.cameraControls.mouseButtons.LEFT = MOUSE.PAN;

    const limitPan = createLimitPan(this.camera, this.cameraControls);
    this.cameraControls.addEventListener('change', (e) => {
      const limit = 9;
      limitPan({
        minX: -limit,
        maxX: limit,
        minZ: -limit,
        maxZ: limit,
        minY: -limit,
        maxY: limit
      });
    });
  };

  private buildingConstructor: HadleysHopeSceneConstructor =
    new HadleysHopeSceneConstructor();

  async load(): Promise<void> {
    const gltf = await this.loader.loadAsync(Orchestrator.SCENE_MODEL_NAME);

    const bluePrintBuildingElements = this.buildingConstructor.construct(
      gltf,
      DrawMode.BLUEPRINT
    );
    const regularBuildingElements = this.buildingConstructor.construct(
      gltf,
      DrawMode.REGULAR
    );

    this.blueprintScene.assignElementsToScene(bluePrintBuildingElements);
    this.regularScene.assignElementsToScene(regularBuildingElements);

    // configure each scene
    this.blueprintScene.buildLights(this.d, this.nearPlane, this.farPlane);
    this.regularScene.addFog();
    this.regularScene.buildLights(this.d, this.nearPlane, this.farPlane);

    // effects
    this.bluePrintEffectComposer = new EffectComposer(this.renderer);
    EffectComposerHelpers.getInstance().setBluePrintEffectComposerPasses(
      this.bluePrintEffectComposer,
      this.blueprintScene,
      this.camera
    );

    this.regularEffectComposer = new EffectComposer(this.renderer);
    EffectComposerHelpers.getInstance().setRegularEffectComposerPasses(
      this.regularEffectComposer,
      this.regularScene,
      this.camera
    );
  }

  private focusTarget(target: BaseSceneElement) {
    this.cameraControls.enabled = false;
    EffectComposerHelpers.getInstance().outlineRegularElement(target);
    let position = new Vector3().copy(this.camera.position);

    // define the final position
    let boxCenter = new Vector3();
    const targetPosition = target.boundingBox.getCenter(boxCenter);

    // offset
    let offset = new Vector3(1, 0, -1);
    const aspect = this.width / this.height;
    if (aspect < 1) {
      offset = new Vector3(1.5, 0, 1.5);
    }
    targetPosition.add(offset);

    targetPosition.y = 0;
    targetPosition.add(new Vector3(this.d, this.d, this.d));

    const trackingTween = new Tween(position)
      .to(targetPosition, 1100)
      .easing(Easing.Cubic.InOut)
      .onUpdate((updatedPosition) => {
        this.camera.position.copy(updatedPosition);
        this.cameraControls.target.copy(
          this.camera.position.clone().sub(new Vector3(this.d, this.d, this.d))
        );
        this.cameraControls.update();
      });

    const targetZoom = aspect < 1 ? 3 : 4;
    const zoomFrom = { zoom: this.camera.zoom };
    const zoomTo = { zoom: targetZoom };

    if (aspect < 1) {
      zoomTo.zoom = 3;
    }

    const zoomTween = new Tween(zoomFrom)
      .to(zoomTo, 380)
      .easing(Easing.Quadratic.InOut)
      .onUpdate((updateZoom) => {
        this.camera.zoom = updateZoom.zoom;
      })
      .onComplete(() => {
        if (this.onBuildingFocused) {
          this.cameraControls.enabled = true;
          this.currentSelectedElement = target;
          this.onBuildingFocused(target);
        }
      });

    trackingTween.chain(zoomTween);
    trackingTween.start();
  }

  unfocus() {
    const zoomFrom = { zoom: this.camera.zoom };
    const zoomTo = { zoom: 2 };
    this.currentSelectedElement = null;

    new Tween(zoomFrom)
      .to(zoomTo, 380)
      .easing(Easing.Quadratic.InOut)
      .onUpdate((updateZoom) => {
        this.camera.zoom = updateZoom.zoom;
      })
      .start();
  }

  /**
   * check if there is a element of type Building being intersected by the raycaster and updates
   * the reference. Only works on regular draw mode.
   */
  private checkSelectedObject(): void {
    if (
      this.currentDrawMode == DrawMode.BLUEPRINT ||
      !this.cameraControls ||
      !this.cameraControls.enabled
    ) {
      return;
    }

    const intersections: BaseSceneElement[] = [];

    this.regularScene.sceneElements
      .filter((e) => e.sceneElementType == SceneElementType.BUILDING)
      .forEach((element) => {
        element.parts.forEach((part) => {
          const intersectTarget: Vector3 = new Vector3();
          if (
            this.raycaster.ray.intersectBox(part.boundingBox, intersectTarget)
          ) {
            intersections.push(element);
          }
        });
      });

    if (intersections.length) {
      this.currentIntersectedElement = intersections[0];
    } else {
      this.currentIntersectedElement = null;
    }
  }

  /**
   * Checks if the current raycaster is intersecting an object. Useful for devices where hovering is possible.
   * @returns true if there is an element being intersected by the current pointer
   */
  isPointerOverElement(): boolean {
    return this.currentIntersectedElement != null;
  }

  /**
   * Attempts to obtain the element (of type building) of a given tap position
   * @param x current mouse x position to calculate the pointer
   * @param y current y position to calculate the pointer
   * @returns a BaseSceneElement of type Building if detected on the click or null if noting clicked
   */
  attemptTapOrClick(x: number, y: number): BaseSceneElement | null {
    if (
      this.currentDrawMode == DrawMode.BLUEPRINT ||
      !this.cameraControls ||
      !this.cameraControls.enabled
    ) {
      return null;
    }
    this.updatePointerPosition(x, y); // on mobile hover wont be triggering this, must be explicit
    this.checkSelectedObject();
    if (this.currentIntersectedElement != null) {
      this.focusTarget(this.currentIntersectedElement);
      return this.currentIntersectedElement;
    } else {
      return null;
    }
  }

  /**
   * Updates the pointer and raycaster object with new x and y mouse coordinates.
   * Useful on desktop environments or devices where mouse hovering is available.
   * @param x x mouse position
   * @param y y mouse position
   */
  updatePointerPosition(x: number, y: number) {
    this.pointer.x = x;
    this.pointer.y = y;
    this.raycaster.setFromCamera(this.pointer, this.camera);
  }

  update(): void {
    this.checkSelectedObject();
    this.updateCamera();

    const delta = this.clock.getDelta();
    if (this.cameraControls != null) {
      this.cameraControls.update();
    }
    this.blueprintScene.update(delta);
    this.regularScene.update(delta);
  }

  render() {
    const delta = this.clock.getDelta();
    if (this.currentDrawMode == DrawMode.REGULAR) {
      this.regularEffectComposer.render(delta);
    } else {
      this.bluePrintEffectComposer.render(delta);
    }
  }

  getCurrentScene(): HadleysHope {
    return this.currentDrawMode == DrawMode.BLUEPRINT
      ? this.blueprintScene
      : this.regularScene;
  }

  /**
   * Makes the transition from Blueprint to Regular mode
   */
  transition(): void {
    EffectComposerHelpers.getInstance().bluePrintGlitchPass.enabled = true;
    setTimeout(() => {
      this.currentDrawMode = DrawMode.REGULAR;
      EffectComposerHelpers.getInstance().bluePrintGlitchPass.enabled = false;
      EffectComposerHelpers.getInstance().blueprintOutlinePass.enabled = false;
      EffectComposerHelpers.getInstance().bluePrintFilmPass.enabled = false;
      EffectComposerHelpers.getInstance().blueprintRenderPass.enabled = false;
      this.blueprintScene.dispose();
      CameraHelpers.transitionFromTopToMain(this);
    }, 120);
  }

  private updateCamera() {
    const aspect = this.width / this.height;
    this.camera.left = this.d * -aspect;
    this.camera.right = this.d * aspect;
    this.camera.updateProjectionMatrix();
  }

  resize(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.updateCamera();

    this.renderer.setSize(width, height);
    this.bluePrintEffectComposer.setSize(width, height);
    this.regularEffectComposer.setSize(width, height);
  }

  /**
   * disposes the resources being used by the orchestrator
   */
  dispose() {
    if (this.cameraControls != null) {
      this.cameraControls.dispose();
    }
    this.renderer.dispose();
    this.blueprintScene.dispose();
    this.regularScene.dispose();
    EffectComposerHelpers.getInstance().dispose();
  }
}

export default Orchestrator;

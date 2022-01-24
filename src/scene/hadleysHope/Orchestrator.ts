import {
  Clock,
  MOUSE,
  OrthographicCamera,
  TOUCH,
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

class Orchestrator {
  private static SCENE_MODEL_NAME = './models/hadleys.glb';
  private loader = new GLTFLoader();
  private clock = new Clock();

  currentDrawMode = DrawMode.BLUEPRINT;

  blueprintScene: HadleysHope = new HadleysHope();
  regularScene: HadleysHope = new HadleysHope();

  renderer: WebGLRenderer;
  effectCompose: EffectComposer;

  private nearPlane = 0.1;
  private farPlane = 1000;

  camera: THREE.OrthographicCamera;
  cameraControls: OrbitControls | null;
  d = 10;

  constructor(width: number, height: number, devicePixelRatio: number) {
    this.renderer = new WebGLRenderer({ alpha: true });
    this.renderer.setPixelRatio(devicePixelRatio);
    this.renderer.setClearColor(0x141a35);
    this.renderer.shadowMap.enabled = true;
    this.renderer.setSize(width, height);

    this.effectCompose = new EffectComposer(this.renderer);

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
    // controls
    this.cameraControls = new OrbitControls(
      this.camera,
      this.renderer.domElement
    );
    this.cameraControls.enableRotate = false;
    this.cameraControls.enableZoom = true;
    this.cameraControls.maxZoom = 4;
    this.cameraControls.minZoom = 2;
    this.cameraControls.touches.ONE = TOUCH.PAN;
    this.cameraControls.mouseButtons.LEFT = MOUSE.PAN;

    const limitPan = createLimitPan(this.camera, this.cameraControls);
    this.cameraControls.addEventListener('change', (e) => {
      limitPan({ minX: 0, maxX: 9, minZ: 0, maxZ: 6, minY: 0, maxY: 4 });
      // console.log(cameraControls.target);
      // console.log(camera.position);
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
    this.blueprintScene.buildLights();
    this.regularScene.addFog();
    this.regularScene.buildLights();
  }

  update(): void {
    const delta = this.clock.getDelta();
    if (this.cameraControls != null) {
      this.cameraControls.update();
    }
    this.blueprintScene.update(delta);
    this.regularScene.update(delta);
  }

  render() {
    if (this.currentDrawMode == DrawMode.REGULAR) {
      this.renderer.render(this.regularScene.scene, this.camera);
    } else {
      this.renderer.render(this.blueprintScene.scene, this.camera);
    }
  }

  getCurrentScene(): HadleysHope {
    return this.currentDrawMode == DrawMode.BLUEPRINT
      ? this.blueprintScene
      : this.regularScene;
  }

  resize(width: number, height: number) {
    const aspect = width / height;
    this.camera.left = this.d * -aspect;
    this.camera.right = this.d * aspect;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(width, height);
    this.effectCompose.setSize(width, height);
  }
  dispose() {
    if (this.cameraControls != null) {
      this.cameraControls.dispose();
    }
    this.renderer.dispose();
    this.blueprintScene.dispose();
    this.regularScene.dispose();
  }
}

export default Orchestrator;

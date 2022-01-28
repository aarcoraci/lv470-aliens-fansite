import { Camera, Object3D, Vector2 } from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { FilmPass } from 'three/examples/jsm/postprocessing/FilmPass';
import { OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass';
import { GlitchPass } from 'three/examples/jsm/postprocessing/GlitchPass';
import HadleysHope from '../HadleysHope';
import SceneElementType from '../../SceneElementType';
import BaseSceneElement from '../../base/BaseSceneElement';

class EffectComposerHelpers {
  private static instance: EffectComposerHelpers;
  private constructor() {}

  public static getInstance(): EffectComposerHelpers {
    if (!EffectComposerHelpers.instance) {
      EffectComposerHelpers.instance = new EffectComposerHelpers();
    }
    return EffectComposerHelpers.instance;
  }

  // blueprint passes
  blueprintRenderPass: RenderPass;
  blueprintOutlinePass: OutlinePass;
  bluePrintFilmPass: FilmPass;
  bluePrintGlitchPass: GlitchPass;

  // regular
  regularRenderPass: RenderPass;
  regularOutlinePass: OutlinePass;
  regularFilmPass: FilmPass;

  setBluePrintEffectComposerPasses(
    bluePrintEffectComposer: EffectComposer,
    hadleysHope: HadleysHope,
    camera: Camera
  ): void {
    this.blueprintRenderPass = new RenderPass(hadleysHope.scene, camera);
    bluePrintEffectComposer.addPass(this.blueprintRenderPass);

    // get the objects to be outlined
    const buildings = hadleysHope.sceneElements.filter(
      (e) => e.sceneElementType == SceneElementType.BUILDING
    );

    const outlineObjects: Object3D[] = [];

    buildings.forEach((b) => {
      b.parts.forEach((p) => {
        outlineObjects.push(p.mesh);
      });
    });

    this.blueprintOutlinePass = new OutlinePass(
      new Vector2(800, 600),
      hadleysHope.scene,
      camera,
      outlineObjects
    );
    this.blueprintOutlinePass.edgeStrength = 2;
    this.blueprintOutlinePass.edgeGlow = 0.2;
    bluePrintEffectComposer.addPass(this.blueprintOutlinePass);

    this.bluePrintFilmPass = new FilmPass(
      0.25, // noise intensity
      0.9, // scanline intensity
      650, // scanline count
      0 // grayscale
    );
    this.bluePrintFilmPass.renderToScreen = true;
    bluePrintEffectComposer.addPass(this.bluePrintFilmPass);

    this.bluePrintGlitchPass = new GlitchPass();
    this.bluePrintGlitchPass.goWild = true;
    this.bluePrintGlitchPass.enabled = false;
    bluePrintEffectComposer.addPass(this.bluePrintGlitchPass);
  }

  setRegularEffectComposerPasses(
    regularEffectComposer: EffectComposer,
    hadleysHope: HadleysHope,
    camera: Camera
  ): void {
    this.regularRenderPass = new RenderPass(hadleysHope.scene, camera);
    regularEffectComposer.addPass(this.regularRenderPass);

    this.regularOutlinePass = new OutlinePass(
      new Vector2(800, 600),
      hadleysHope.scene,
      camera,
      []
    );
    this.regularOutlinePass.edgeStrength = 2;
    this.regularOutlinePass.edgeGlow = 0.2;
    regularEffectComposer.addPass(this.regularOutlinePass);

    this.regularFilmPass = new FilmPass(
      0.1, // noise intensity
      0.3, // scanline intensity
      750, // scanline count
      0 // grayscale
    );
    this.regularFilmPass.renderToScreen = true;
    regularEffectComposer.addPass(this.regularFilmPass);
  }

  outlineRegularElement(element: BaseSceneElement): void {
    const selection: Object3D[] = [];
    // obtain all the meshes to be outlined
    element.parts.forEach((part) => {
      selection.push(part.mesh);
    });

    this.regularOutlinePass.selectedObjects = selection;
  }

  clearRegularElementOutlined(): void {
    this.regularOutlinePass.selectedObjects = [];
  }

  dispose(): void {
    this.bluePrintFilmPass.material.dispose();
    this.regularFilmPass.material.dispose();
  }
}

export default EffectComposerHelpers;

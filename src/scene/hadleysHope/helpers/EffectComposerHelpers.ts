import { Camera, Object3D, Scene, Vector2 } from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { FilmPass } from 'three/examples/jsm/postprocessing/FilmPass';
import { OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass';
import HadleysHope from '../HadleysHope';
import SceneElementType from '../../SceneElementType';

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

  // regular
  regularRenderPass: RenderPass;
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
  }

  setRegularEffectComposerPasses(
    regularEffectComposer: EffectComposer,
    hadleysHope: HadleysHope,
    camera: Camera
  ): void {
    this.regularRenderPass = new RenderPass(hadleysHope.scene, camera);
    regularEffectComposer.addPass(this.regularRenderPass);

    this.regularFilmPass = new FilmPass(
      0.1, // noise intensity
      0.3, // scanline intensity
      750, // scanline count
      0 // grayscale
    );
    this.regularFilmPass.renderToScreen = true;
    regularEffectComposer.addPass(this.regularFilmPass);
  }

  dispose(): void {
    this.bluePrintFilmPass.material.dispose();
    this.regularFilmPass.material.dispose();
  }
}

export default EffectComposerHelpers;

import { Camera, Object3D, Scene, Vector2 } from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { FilmPass } from 'three/examples/jsm/postprocessing/FilmPass';
import { OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass';
import HadleysHope from '../HadleysHope';
import SceneElementType from '../../SceneElementType';

abstract class EffectComposerHelpers {
  static setBluePrintEffectComposerPasses(
    bluePrintEffectComposer: EffectComposer,
    hadleysHope: HadleysHope,
    camera: Camera
  ): void {
    bluePrintEffectComposer.addPass(new RenderPass(hadleysHope.scene, camera));

    // get the objects to be outlined
    const buildings = hadleysHope.sceneElements.filter(
      (e) => e.sceneElementType == SceneElementType.BUILDING
    );

    const outlineObjects: Object3D[] = [];

    buildings.forEach((b) => {
      b.meshes.forEach((m) => {
        outlineObjects.push(m);
      });
    });

    const outlinePass = new OutlinePass(
      new Vector2(800, 600),
      hadleysHope.scene,
      camera,
      outlineObjects
    );
    outlinePass.edgeStrength = 2;
    outlinePass.edgeGlow = 0.2;
    bluePrintEffectComposer.addPass(outlinePass);

    const filmPass = new FilmPass(
      0.25, // noise intensity
      0.9, // scanline intensity
      650, // scanline count
      0 // grayscale
    );
    filmPass.renderToScreen = true;
    bluePrintEffectComposer.addPass(filmPass);
  }

  static setRegularEffectComposerPasses(
    regularEffectComposer: EffectComposer,
    hadleysHope: HadleysHope,
    camera: Camera
  ): void {
    regularEffectComposer.addPass(new RenderPass(hadleysHope.scene, camera));

    const filmPass = new FilmPass(
      0.1, // noise intensity
      0.3, // scanline intensity
      750, // scanline count
      0 // grayscale
    );
    filmPass.renderToScreen = true;
    regularEffectComposer.addPass(filmPass);
  }
}

export default EffectComposerHelpers;

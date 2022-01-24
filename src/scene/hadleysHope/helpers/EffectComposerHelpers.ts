import { Camera, Scene } from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { FilmPass } from 'three/examples/jsm/postprocessing/FilmPass';

abstract class EffectComposerHelpers {
  static setBluePrintEffectComposerPasses(
    bluePrintEffectComposer: EffectComposer,
    scene: Scene,
    camera: Camera
  ): void {
    bluePrintEffectComposer.addPass(new RenderPass(scene, camera));
  }

  static setRegularEffectComposerPasses(
    regularEffectComposer: EffectComposer,
    scene: Scene,
    camera: Camera
  ): void {
    regularEffectComposer.addPass(new RenderPass(scene, camera));

    const filmPass = new FilmPass(
      0.15, // noise intensity
      0.15, // scanline intensity
      650, // scanline count
      0 // grayscale
    );
    filmPass.renderToScreen = true;
    regularEffectComposer.addPass(filmPass);
  }
}

export default EffectComposerHelpers;

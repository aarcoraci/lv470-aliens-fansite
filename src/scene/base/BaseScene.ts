import { Camera, Scene, WebGLRenderer } from 'three';

import BaseSceneElement from './BaseSceneElement';

abstract class BaseScene {
  readonly scene: Scene = new Scene();
  sceneElements: BaseSceneElement[] = [];

  update(delta: number): void {
    this.sceneElements.forEach((element) => {
      if (element.update) {
        element.update(delta);
      }
    });
  }

  dispose(): void {
    this.sceneElements.forEach((element) => {
      element.dispose();
    });
  }

  render(renderer: WebGLRenderer, camera: Camera) {
    renderer.render(this.scene, camera);
  }
}

export default BaseScene;

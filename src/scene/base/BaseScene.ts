import { Scene } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

import BaseSceneElement from './BaseSceneElement';

abstract class BaseScene {
  readonly scene: Scene = new Scene();
  sceneElements: BaseSceneElement[] = [];

  abstract load(loader: GLTFLoader): void;

  update(delta: number): void {
    this.sceneElements.forEach((element) => {
      element.update(delta);
    });
  }

  dispose(): void {
    this.sceneElements.forEach((element) => {
      element.dispose();
    });
  }
}

export default BaseScene;

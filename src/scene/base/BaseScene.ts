import { Scene } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

import BaseSceneElement from "./BaseSceneElement";

abstract class BaseScene {
  readonly scene: Scene = new Scene();
  sceneElements: BaseSceneElement[] = [];

  load(loader: GLTFLoader): void {}

  update(): void {
    this.sceneElements.forEach((element) => {
      element.update();
    });
  }

  dispose(): void {
    this.sceneElements.forEach((element) => {
      element.dispose();
    });
  }
}

export default BaseScene;

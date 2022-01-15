import { Scene } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

import BaseBuilding from "./BaseBuilding";

abstract class BaseScene {
  readonly scene: Scene = new Scene();
  buildings: BaseBuilding[] = [];

  load(loader: GLTFLoader): void {}

  update(): void {
    this.buildings.forEach((element) => {
      element.update();
    });
  }

  dispose(): void {
    this.buildings.forEach((element) => {
      element.dispose();
    });
  }
}

export default BaseScene;

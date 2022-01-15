import { Scene } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

import BaseDrawableElement from "./BaseDrawableElement";

export default abstract class BaseScene extends BaseDrawableElement {
  readonly elements: BaseDrawableElement[] = [];
  readonly scene: Scene = new Scene();

  override load(loader: GLTFLoader): void {
    this.elements.forEach((element) => {
      element.load(loader);
    });
  }

  override update(): void {
    this.elements.forEach((element) => {
      element.update();
    });
  }

  dispose(): void {
    this.elements.forEach((element) => {
      element.dispose();
    });
  }
}

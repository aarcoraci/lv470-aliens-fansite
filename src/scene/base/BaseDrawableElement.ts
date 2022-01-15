import { Vector3 } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

export default abstract class BaseDrawableElement {
  position: Vector3;

  constructor(position: Vector3 = new Vector3()) {
    this.position = position;
  }

  load(loader: GLTFLoader) {}

  update(): void {}

  dispose(): void {}
}

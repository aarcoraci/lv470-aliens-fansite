import BaseDrawableElement from "./BaseDrawableElement";

export default abstract class BaseScene {
  readonly elements: [BaseDrawableElement];
  constructor(parameters) {}

  initialize() {}

  draw() {
    this.elements.forEach((element) => {
      element.draw();
    });
  }

  dispose() {
    this.elements.forEach((element) => {
      element.dispose();
    });
  }
}

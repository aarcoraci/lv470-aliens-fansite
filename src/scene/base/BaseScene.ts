import BaseDrawableElement from "./BaseDrawableElement";

export default abstract class BaseScene {
  readonly elements: [BaseDrawableElement];
  constructor(parameters) {}

  initialize(): void {}

  draw(): void {
    this.elements.forEach((element) => {
      element.draw();
    });
  }

  dispose(): void {
    this.elements.forEach((element) => {
      element.dispose();
    });
  }
}

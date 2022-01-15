import BaseDrawableElement from "./BaseDrawableElement";

export default abstract class BaseScene extends BaseDrawableElement {
  readonly elements: [BaseDrawableElement];

  constructor() {
    super();
  }

  initialize(): void {}

  override draw(): void {
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

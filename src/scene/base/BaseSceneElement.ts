import { Box3, Vector3 } from 'three';
import SceneElementType from '../SceneElementType';
import SceneElementPart from './SceneElementPart';

abstract class BaseSceneElement {
  name: string;
  position: Vector3;
  sceneElementType: SceneElementType;
  boundingBox: Box3 = new Box3();

  parts: SceneElementPart[] = [];

  constructor(name = '', sceneElementType = SceneElementType.UNKNOWN) {
    this.name = name;
    this.sceneElementType = sceneElementType;
  }

  protected buildBoundingBox(): void {
    this.parts.forEach((part) => {
      this.boundingBox.expandByObject(part.mesh);
    });
  }

  update?(delta: number): void;

  dispose(): void {
    this.parts.forEach((part) => {
      part.mesh.geometry.dispose();
      if (part.material instanceof Array) {
        part.material.forEach((m) => m.dispose());
      } else {
        part.material.dispose();
      }
    });
  }
}

export default BaseSceneElement;

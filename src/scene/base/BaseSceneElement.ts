import { Box3, Mesh, Vector3 } from 'three';
import SceneElementType from '../SceneElementType';
import SceneElementPart from './SceneElementPart';

abstract class BaseSceneElement {
  name: string;
  position: Vector3;
  sceneElementType: SceneElementType;

  parts: SceneElementPart[] = [];

  constructor(name = '', sceneElementType = SceneElementType.UNKNOWN) {
    this.name = name;
    this.sceneElementType = sceneElementType;
  }

  getBoundingBox(): Box3 {
    const result = new Box3();
    this.parts.forEach((part) => {
      result.expandByObject(part.mesh);
    });

    return result;
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

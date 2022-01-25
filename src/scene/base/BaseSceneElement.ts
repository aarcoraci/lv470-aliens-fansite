import { Mesh, Vector3 } from 'three';
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

  update?(delta: number): void;

  dispose(): void {
    this.parts.forEach((part) => {
      part.mesh.geometry.dispose();
      if (part.material instanceof Array) {
        // for better memory management and performance
        part.material.forEach((m) => m.dispose());
      } else {
        // for better memory management and performance
        part.material.dispose();
      }
    });
  }
}

export default BaseSceneElement;

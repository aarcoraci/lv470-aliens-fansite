import { Mesh, Vector3 } from 'three';
import SceneElementType from '../SceneElementType';

abstract class BaseSceneElement {
  name: string;
  meshes: Mesh[] = [];
  position: Vector3;
  sceneElementType: SceneElementType;

  constructor(name = '', sceneElementType = SceneElementType.UNKNOWN) {
    this.name = name;
    this.sceneElementType = sceneElementType;
  }

  update?(delta: number): void;

  dispose(): void {
    this.meshes.forEach((mesh) => {
      mesh.geometry.dispose();
      if (mesh.material instanceof Array) {
        // for better memory management and performance
        mesh.material.forEach((m) => m.dispose());
      } else {
        // for better memory management and performance
        mesh.material.dispose();
      }
    });
  }
}

export default BaseSceneElement;

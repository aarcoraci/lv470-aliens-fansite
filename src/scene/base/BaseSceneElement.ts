import { Mesh, Vector3 } from 'three';

abstract class BaseSceneElement {
  name: string;
  meshes: Mesh[] = [];
  position: Vector3;

  constructor(name = '') {
    this.name = name;
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

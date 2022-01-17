import { Material, Mesh } from "three";

abstract class BaseSceneElement {
  name: string;
  meshes: Mesh[] = [];

  constructor(name: string = "") {
    this.name = name;
  }

  update(delta: number): void {}

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

import { Mesh } from "three";

abstract class BaseSceneElement {
  name: string;
  mesh: Mesh;
  constructor(mesh: Mesh, name: string) {
    this.mesh = mesh;
    this.name = name;
  }

  update(): void {}

  dispose(): void {
    if (this.mesh != null) {
      this.mesh.geometry.dispose();

      if (this.mesh.material instanceof Array) {
        // for better memory management and performance
        this.mesh.material.forEach((m) => m.dispose());
      } else {
        // for better memory management and performance
        this.mesh.material.dispose();
      }
    }
  }
}

export default BaseSceneElement;

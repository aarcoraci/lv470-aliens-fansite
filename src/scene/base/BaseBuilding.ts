import { Mesh } from "three";

abstract class BaseBuilding {
  name: string;
  mesh: Mesh;
  constructor(mesh: Mesh, name: string) {
    this.mesh = mesh;
    this.name = name;
  }

  update(): void {}

  dispose(): void {}
}

export default BaseBuilding;

import { Material, Mesh } from 'three';

class SceneElementPart {
  mesh: Mesh;
  material: Material | Material[];

  constructor(mesh: Mesh) {
    this.mesh = mesh;
    this.material = mesh.material;
  }
}

export default SceneElementPart;

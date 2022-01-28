import { Box3, Material, Mesh } from 'three';

class SceneElementPart {
  mesh: Mesh;
  material: Material | Material[];
  boundingBox: Box3;

  constructor(mesh: Mesh) {
    this.mesh = mesh;
    this.material = mesh.material;
    this.boundingBox = new Box3().setFromObject(mesh);
  }
}

export default SceneElementPart;

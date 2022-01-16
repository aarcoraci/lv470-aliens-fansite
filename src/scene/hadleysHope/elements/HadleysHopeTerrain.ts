import { Mesh, MeshPhongMaterial } from "three";
import BaseSceneElement from "../../base/BaseSceneElement";

class HadleysHopeTerrain extends BaseSceneElement {
  constructor(mesh: Mesh, name: string) {
    super(mesh, name);
    mesh.material = new MeshPhongMaterial({
      color: 0x00468b,
    });
    mesh.receiveShadow = true;
  }
}

export default HadleysHopeTerrain;

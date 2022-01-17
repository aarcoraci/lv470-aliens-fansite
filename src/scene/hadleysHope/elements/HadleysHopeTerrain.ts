import { Mesh, MeshPhongMaterial } from "three";
import BaseSceneElement from "../../base/BaseSceneElement";

class HadleysHopeTerrain extends BaseSceneElement {
  static BUILDING_NAME: string = "terrain";

  constructor(meshes: Mesh[], name: string) {
    super(meshes, name);
    meshes.forEach((mesh) => {
      mesh.material = new MeshPhongMaterial({
        color: 0x00468b,
      });
      mesh.receiveShadow = true;
    });
  }
}

export default HadleysHopeTerrain;

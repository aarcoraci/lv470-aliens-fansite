import { Mesh } from "three";
import BaseSceneElement from "../../base/BaseSceneElement";
import MaterialFactory from "../MaterialFactory";

class HadleysHopeTerrain extends BaseSceneElement {
  static BUILDING_NAME: string = "terrain";

  constructor(meshes: Mesh[], name: string) {
    super(meshes, name);
    meshes.forEach((mesh) => {
      mesh.material = MaterialFactory.getRegularGroundMAterial();
      mesh.receiveShadow = true;
    });
  }
}

export default HadleysHopeTerrain;

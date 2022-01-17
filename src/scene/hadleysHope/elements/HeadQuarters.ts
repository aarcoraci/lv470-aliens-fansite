import { Mesh, MeshPhongMaterial } from "three";
import BaseSceneElement from "../../base/BaseSceneElement";

class HeadQuarters extends BaseSceneElement {
  static BUILDING_NAME: string = "hq";

  constructor(meshes: Mesh[], name: string) {
    super(meshes, name);
    meshes.forEach((mesh) => {
      mesh.material = new MeshPhongMaterial({
        color: 0x00468b,
      });
      mesh.castShadow = true;
      mesh.material.needsUpdate = true;
    });
  }

  override update(): void {}
}

export default HeadQuarters;

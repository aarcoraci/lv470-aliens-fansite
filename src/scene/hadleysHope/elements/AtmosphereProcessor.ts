import { Mesh, MeshPhongMaterial } from "three";
import BaseSceneElement from "../../base/BaseSceneElement";
import MaterialFactory from "../MaterialFactory";

class AtmosphereProcessor extends BaseSceneElement {
  static BUILDING_NAME: string = "atmosphere_processor";

  constructor(meshes: Mesh[] = [], name: string = "") {
    super(meshes, name);

    meshes.forEach((mesh) => {
      mesh.material = MaterialFactory.getRegularBuildingMaterial();
      mesh.castShadow = true;
    });
  }

  override update(): void {}
}

export default AtmosphereProcessor;

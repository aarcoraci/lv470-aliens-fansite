import { Mesh, MeshPhongMaterial } from "three";
import BaseSceneElement from "../../base/BaseSceneElement";
import MaterialFactory from "../MaterialFactory";

class AtmosphereProcessor extends BaseSceneElement {
  static BUILDING_NAME: string = "atmosphere_processor";

  constructor(meshes: Mesh[] = [], name: string = "") {
    super(name);

    meshes.forEach((mesh) => {
      mesh.material = MaterialFactory.getRegularBuildingMaterial();
      mesh.castShadow = true;
      this.meshes.push(mesh);
    });
  }

  override update(): void {}
}

export default AtmosphereProcessor;

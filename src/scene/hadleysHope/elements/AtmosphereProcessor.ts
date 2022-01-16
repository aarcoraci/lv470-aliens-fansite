import { Mesh, MeshPhongMaterial } from "three";
import BaseSceneElement from "../../base/BaseSceneElement";

class AtmosphereProcessor extends BaseSceneElement {
  static BUILDING_NAME: string = "atmosphere_processor";

  constructor(mesh: Mesh, name: string) {
    super(mesh, name);
    mesh.material = new MeshPhongMaterial({
      color: 0x00468b,
    });
    mesh.castShadow = true;
    mesh.material.needsUpdate = true;
  }

  override update(): void {}
}

export default AtmosphereProcessor;

import { Mesh, MeshPhongMaterial, MeshStandardMaterial } from "three";
import BaseBuilding from "../../base/BaseBuilding";

class AtmosphereProcessor extends BaseBuilding {
  static BUILDING_NAME: string = "atmosphere_processor";

  constructor(mesh: Mesh, name: string) {
    super(mesh, name);
    mesh.material = new MeshPhongMaterial({
      color: 0x00468b,
    });
    mesh.castShadow = true;
    // mesh.receiveShadow = true;
    mesh.material.needsUpdate = true;
  }

  override update(): void {
    // this.mesh.rotation.y += 0.001;
  }
}

export default AtmosphereProcessor;

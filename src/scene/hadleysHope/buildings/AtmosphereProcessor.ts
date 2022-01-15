import { Mesh } from "three";
import BaseBuilding from "../../base/BaseBuilding";

class AtmosphereProcessor extends BaseBuilding {
  static BUILDING_NAME: string = "atmosphere_processor";

  static build(mesh: Mesh) {
    const result = new AtmosphereProcessor(mesh, this.BUILDING_NAME);
    return result;
  }
}

export default AtmosphereProcessor;

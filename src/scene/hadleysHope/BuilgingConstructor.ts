import SceneBuildingConstructor from "../base/SceneBuildingConstructor";
import BaseBuilding from "../base/BaseBuilding";
import { Mesh, Object3D } from "three";
import AtmosphereProcessor from "./buildings/AtmosphereProcessor";

class HadleysHopeBuildingConstructor
  implements SceneBuildingConstructor<BaseBuilding>
{
  construct(node: Object3D): BaseBuilding {
    if (node.userData.node_name == AtmosphereProcessor.BUILDING_NAME) {
      return new AtmosphereProcessor(
        node as Mesh,
        AtmosphereProcessor.BUILDING_NAME
      );
    }
    return null;
  }
}

export default HadleysHopeBuildingConstructor;

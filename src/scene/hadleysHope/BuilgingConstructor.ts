import SceneBuildingConstructor from "../base/SceneBuildingConstructor";
import BaseSceneElement from "../base/BaseSceneElement";
import { Mesh, Object3D } from "three";
import AtmosphereProcessor from "./elements/AtmosphereProcessor";
import HeadQuarters from "./elements/HeadQuarters";

class HadleysHopeBuildingConstructor
  implements SceneBuildingConstructor<BaseSceneElement>
{
  construct(node: Object3D): BaseSceneElement {
    if (node.userData.node_name == AtmosphereProcessor.BUILDING_NAME) {
      return new AtmosphereProcessor(
        node as Mesh,
        AtmosphereProcessor.BUILDING_NAME
      );
    }
    if (node.userData.node_name == HeadQuarters.BUILDING_NAME) {
      return new HeadQuarters(node as Mesh, HeadQuarters.BUILDING_NAME);
    }
    return null;
  }
}

export default HadleysHopeBuildingConstructor;

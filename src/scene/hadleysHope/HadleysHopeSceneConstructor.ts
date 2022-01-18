import BaseSceneElement from "../base/BaseSceneElement";
import { Mesh, PlaneGeometry } from "three";
import AtmosphereProcessor from "./elements/AtmosphereProcessor";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";
import HadleysHopeTerrain from "./elements/HadleysHopeTerrain";
import CommsTower from "./elements/CommsTower";
import MaterialFactory from "./MaterialFactory";

class HadleysHopeSceneConstructor {
  construct(gltf: GLTF): BaseSceneElement[] {
    const result: BaseSceneElement[] = [];

    result.push(this.buildAtmosphereProcessor(gltf));
    result.push(this.buildTerrain(gltf));
    result.push(this.buildCommsTower(gltf));

    return result;
  }

  private buildCommsTower(gltf: GLTF): CommsTower {
    const towerBase = gltf.scene.children.find(
      (s) => s.userData.node_name == CommsTower.BASE_BUILDING_NAME
    );
    const antenna = gltf.scene.children.find(
      (s) => s.userData.node_name == CommsTower.ANTENNA_BUILDING_NAME
    );
    const light = gltf.scene.children.find(
      (s) => s.userData.node_name == CommsTower.LIGHT_BUILDING_NAME
    );

    return new CommsTower(
      [towerBase as Mesh, antenna as Mesh, light as Mesh],
      CommsTower.BUILDING_NAME
    );
  }

  private buildTerrain(gltf: GLTF): HadleysHopeTerrain {
    const mainTerrainMesh = gltf.scene.children.find(
      (s) => s.userData.terrain == 1
    );
    var terrainMeshes: Mesh[] = [mainTerrainMesh as Mesh];
    return new HadleysHopeTerrain(
      terrainMeshes,
      HadleysHopeTerrain.BUILDING_NAME
    );
  }

  private buildAtmosphereProcessor(gltf: GLTF): AtmosphereProcessor {
    const mainBuildingMesh = gltf.scene.children.find(
      (s) => s.userData.node_name == AtmosphereProcessor.BUILDING_NAME
    );

    const buildingAccent = gltf.scene.children.filter(
      (s) =>
        s.userData.building_accent == 1 &&
        s.userData.parent_node == AtmosphereProcessor.BUILDING_NAME
    );

    var buildingMeshes: Mesh[] = [];

    buildingMeshes.push(mainBuildingMesh as Mesh);
    buildingAccent.forEach((accent) => {
      buildingMeshes.push(accent as Mesh);
    });

    return new AtmosphereProcessor(
      buildingMeshes,
      AtmosphereProcessor.BUILDING_NAME
    );
  }
}

export default HadleysHopeSceneConstructor;

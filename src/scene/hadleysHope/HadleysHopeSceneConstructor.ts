import BaseSceneElement from '../base/BaseSceneElement';
import { Mesh } from 'three';
import AtmosphereProcessor from './elements/AtmosphereProcessor';
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
import HadleysHopeTerrain from './elements/HadleysHopeTerrain';
import CommsTower from './elements/CommsTower';
import District from './elements/District';
import LivingQuarters from './elements/LivingQuarters';
import Operations from './elements/Operations';
import Connectors from './elements/Connectors';

class HadleysHopeSceneConstructor {
  construct(gltf: GLTF): BaseSceneElement[] {
    const result: BaseSceneElement[] = [];

    result.push(this.buildAtmosphereProcessor(gltf));
    result.push(this.buildTerrain(gltf));
    result.push(this.buildCommsTower(gltf));
    result.push(this.buildDistrict(gltf));
    result.push(this.buildLivingQuarters(gltf));
    result.push(this.buildOperations(gltf));
    result.push(this.buildConnectors(gltf));

    return result;
  }

  private buildOperations(gltf: GLTF): Operations {
    const mainBuildingMesh = gltf.scene.children.find(
      (s) => s.userData.node_name == Operations.BUILDING_NAME
    );

    const buildingAccent = gltf.scene.children.filter(
      (s) =>
        s.userData.building_accent == 1 &&
        s.userData.parent_node == Operations.BUILDING_NAME
    );

    var buildingMeshes: Mesh[] = [];

    buildingMeshes.push(mainBuildingMesh as Mesh);
    buildingAccent.forEach((accent) => {
      buildingMeshes.push(accent as Mesh);
    });

    return new Operations(buildingMeshes, Operations.BUILDING_NAME);
  }

  private buildConnectors(gltf: GLTF): District {
    const mainBuildingMeshes = gltf.scene.children.filter(
      (s) =>
        s.userData.node_name &&
        (s.userData.node_name as string).includes(Connectors.BUILDING_NAME)
    );

    const buildingAccent = gltf.scene.children.filter(
      (s) =>
        s.userData.building_accent == 1 &&
        s.userData.node_name &&
        (s.userData.parent_node as string).includes(Connectors.BUILDING_NAME)
    );

    var buildingMeshes: Mesh[] = [];

    mainBuildingMeshes.forEach((mesh) => {
      buildingMeshes.push(mesh as Mesh);
    });

    buildingAccent.forEach((accent) => {
      buildingMeshes.push(accent as Mesh);
    });

    return new Connectors(buildingMeshes, Connectors.BUILDING_NAME);
  }

  private buildLivingQuarters(gltf: GLTF): District {
    const mainBuildingMesh = gltf.scene.children.find(
      (s) => s.userData.node_name == LivingQuarters.BUILDING_NAME
    );

    const buildingAccent = gltf.scene.children.filter(
      (s) =>
        s.userData.building_accent == 1 &&
        s.userData.parent_node == LivingQuarters.BUILDING_NAME
    );

    var buildingMeshes: Mesh[] = [];

    buildingMeshes.push(mainBuildingMesh as Mesh);
    buildingAccent.forEach((accent) => {
      buildingMeshes.push(accent as Mesh);
    });

    return new LivingQuarters(buildingMeshes, LivingQuarters.BUILDING_NAME);
  }

  private buildDistrict(gltf: GLTF): District {
    const mainBuildingMesh = gltf.scene.children.find(
      (s) => s.userData.node_name == District.BUILDING_NAME
    );

    const buildingAccent = gltf.scene.children.filter(
      (s) =>
        s.userData.building_accent == 1 &&
        s.userData.parent_node == District.BUILDING_NAME
    );

    var buildingMeshes: Mesh[] = [];

    buildingMeshes.push(mainBuildingMesh as Mesh);
    buildingAccent.forEach((accent) => {
      buildingMeshes.push(accent as Mesh);
    });

    return new District(buildingMeshes, District.BUILDING_NAME);
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

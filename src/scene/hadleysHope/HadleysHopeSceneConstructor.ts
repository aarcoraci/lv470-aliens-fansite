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
import OreProcessing from './elements/OreProcessing';
import DrawMode from '../DrawMode';

class HadleysHopeSceneConstructor {
  construct(gltf: GLTF, drawMode: DrawMode): BaseSceneElement[] {
    const result: BaseSceneElement[] = [];

    result.push(this.buildAtmosphereProcessor(gltf, drawMode));
    result.push(this.buildTerrain(gltf, drawMode));
    result.push(this.buildCommsTower(gltf, drawMode));
    result.push(this.buildDistrict(gltf, drawMode));
    result.push(this.buildLivingQuarters(gltf, drawMode));
    result.push(this.buildOperations(gltf, drawMode));
    result.push(this.buildConnectors(gltf, drawMode));
    result.push(this.buildOreProcessing(gltf, drawMode));

    return result;
  }

  private buildOperations(gltf: GLTF, drawMode: DrawMode): Operations {
    const mainBuildingMesh = gltf.scene.children.find(
      (s) => s.userData.node_name == Operations.BUILDING_NAME
    );

    const buildingAccent = gltf.scene.children.filter(
      (s) =>
        s.userData.building_accent == 1 &&
        s.userData.parent_node == Operations.BUILDING_NAME
    );

    const buildingMeshes: Mesh[] = [];

    buildingMeshes.push(mainBuildingMesh as Mesh);
    buildingAccent.forEach((accent) => {
      buildingMeshes.push(accent as Mesh);
    });

    return new Operations(buildingMeshes, Operations.BUILDING_NAME, drawMode);
  }

  private buildConnectors(gltf: GLTF, drawMode: DrawMode): District {
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

    const buildingMeshes: Mesh[] = [];

    mainBuildingMeshes.forEach((mesh) => {
      buildingMeshes.push(mesh as Mesh);
    });

    buildingAccent.forEach((accent) => {
      buildingMeshes.push(accent as Mesh);
    });

    return new Connectors(buildingMeshes, Connectors.BUILDING_NAME, drawMode);
  }

  private buildLivingQuarters(gltf: GLTF, drawMode: DrawMode): District {
    const mainBuildingMesh = gltf.scene.children.find(
      (s) => s.userData.node_name == LivingQuarters.BUILDING_NAME
    );

    const buildingAccent = gltf.scene.children.filter(
      (s) =>
        s.userData.building_accent == 1 &&
        s.userData.parent_node == LivingQuarters.BUILDING_NAME
    );

    const buildingMeshes: Mesh[] = [];

    buildingMeshes.push(mainBuildingMesh as Mesh);
    buildingAccent.forEach((accent) => {
      buildingMeshes.push(accent as Mesh);
    });

    return new LivingQuarters(
      buildingMeshes,
      LivingQuarters.BUILDING_NAME,
      drawMode
    );
  }

  private buildDistrict(gltf: GLTF, drawMode: DrawMode): District {
    const mainBuildingMesh = gltf.scene.children.find(
      (s) => s.userData.node_name == District.BUILDING_NAME
    );

    const buildingAccent = gltf.scene.children.filter(
      (s) =>
        s.userData.building_accent == 1 &&
        s.userData.parent_node == District.BUILDING_NAME
    );

    const buildingMeshes: Mesh[] = [];

    buildingMeshes.push(mainBuildingMesh as Mesh);
    buildingAccent.forEach((accent) => {
      buildingMeshes.push(accent as Mesh);
    });

    return new District(buildingMeshes, District.BUILDING_NAME, drawMode);
  }

  private buildOreProcessing(gltf: GLTF, drawMode: DrawMode): OreProcessing {
    const oreProcessing = gltf.scene.children.find(
      (s) => s.userData.node_name == OreProcessing.ORE_PROCESSING
    );
    const grinder1 = gltf.scene.children.find(
      (s) => s.userData.node_name == OreProcessing.GRINDER_1
    );
    const grinder2 = gltf.scene.children.find(
      (s) => s.userData.node_name == OreProcessing.GRINDER_2
    );
    const crane = gltf.scene.children.find(
      (s) => s.userData.node_name == OreProcessing.CRANE_BUILDING
    );
    const craneGrip = gltf.scene.children.find(
      (s) => s.userData.node_name == OreProcessing.CRANE_GRIP
    );

    const buildingAccent = gltf.scene.children.filter(
      (s) =>
        s.userData.building_accent == 1 &&
        s.userData.parent_node == OreProcessing.BUILDING_NAME
    );

    const buildingMeshes: Mesh[] = [
      oreProcessing as Mesh,
      grinder1 as Mesh,
      grinder2 as Mesh,
      crane as Mesh,
      craneGrip as Mesh
    ];

    buildingAccent.forEach((accent) => {
      buildingMeshes.push(accent as Mesh);
    });

    return new OreProcessing(
      buildingMeshes,
      OreProcessing.BUILDING_NAME,
      drawMode
    );
  }

  private buildCommsTower(gltf: GLTF, drawMode: DrawMode): CommsTower {
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
      CommsTower.BUILDING_NAME,
      drawMode
    );
  }

  private buildTerrain(gltf: GLTF, drawMode: DrawMode): HadleysHopeTerrain {
    const mainTerrainMesh = gltf.scene.children.find(
      (s) => s.userData.terrain == 1
    );
    const terrainMeshes: Mesh[] = [mainTerrainMesh as Mesh];
    return new HadleysHopeTerrain(
      terrainMeshes,
      HadleysHopeTerrain.BUILDING_NAME,
      drawMode
    );
  }

  private buildAtmosphereProcessor(
    gltf: GLTF,
    drawMode: DrawMode
  ): AtmosphereProcessor {
    const mainBuildingMesh = gltf.scene.children.find(
      (s) => s.userData.node_name == AtmosphereProcessor.BUILDING_NAME
    );

    const buildingAccent = gltf.scene.children.filter(
      (s) =>
        s.userData.building_accent == 1 &&
        s.userData.parent_node == AtmosphereProcessor.BUILDING_NAME
    );

    const buildingMeshes: Mesh[] = [];

    buildingMeshes.push(mainBuildingMesh as Mesh);
    buildingAccent.forEach((accent) => {
      buildingMeshes.push(accent as Mesh);
    });

    return new AtmosphereProcessor(
      buildingMeshes,
      AtmosphereProcessor.BUILDING_NAME,
      drawMode
    );
  }
}

export default HadleysHopeSceneConstructor;

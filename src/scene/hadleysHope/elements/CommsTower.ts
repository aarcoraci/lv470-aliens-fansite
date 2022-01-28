import { Mesh } from 'three';
import BaseSceneElement from '../../base/BaseSceneElement';
import SceneElementPart from '../../base/SceneElementPart';
import DrawMode from '../../DrawMode';
import SceneColors from '../../SceneColors';
import SceneElementType from '../../SceneElementType';
import MaterialFactory from '../MaterialFactory';

class CommsTower extends BaseSceneElement {
  static BUILDING_NAME = 'comms_tower';
  static BASE_BUILDING_NAME = 'comms_tower_base';
  static ANTENNA_BUILDING_NAME = 'comms_tower_antenna';
  static LIGHT_BUILDING_NAME = 'comms_tower_light';

  private antenna: Mesh;
  private light: Mesh;

  constructor(meshes: Mesh[] = [], name = '', drawMode: DrawMode) {
    super(name, SceneElementType.BUILDING);

    const isBluePrint = drawMode == DrawMode.BLUEPRINT;

    meshes.forEach((mesh) => {
      const buildingMesh = mesh.clone();

      if (buildingMesh.userData.node_name == CommsTower.LIGHT_BUILDING_NAME) {
        MaterialFactory.assignBuildingMaterial(
          buildingMesh,
          SceneColors.RED_1,
          true,
          false,
          isBluePrint,
          true,
          false
        );

        this.light = buildingMesh;
        this.light.rotation.z = Math.PI / 3;
        this.light.rotation.y = Math.PI / 2;

        this.parts.push(new SceneElementPart(buildingMesh));
      } else {
        if (buildingMesh.userData.node_name == CommsTower.BASE_BUILDING_NAME) {
          this.position = buildingMesh.position.clone();
          MaterialFactory.assignBuildingMaterial(
            buildingMesh,
            SceneColors.BLUE_1,
            true,
            true,
            isBluePrint,
            false,
            false
          );
        }
        if (
          buildingMesh.userData.node_name == CommsTower.ANTENNA_BUILDING_NAME
        ) {
          MaterialFactory.assignBuildingMaterial(
            buildingMesh,
            SceneColors.BLUE_1,
            true,
            false,
            isBluePrint,
            false,
            true
          );

          this.antenna = buildingMesh;
          this.antenna.rotation.z = Math.PI / 3;
          this.antenna.rotation.y = Math.PI / 2;
        }
        this.parts.push(new SceneElementPart(buildingMesh));
      }
    });
    this.buildBoundingBox();
  }

  override update(delta: number): void {
    this.antenna.rotation.y += Math.PI * 0.05 * delta;
    this.light.rotation.y += Math.PI * 0.05 * delta;
  }
}

export default CommsTower;

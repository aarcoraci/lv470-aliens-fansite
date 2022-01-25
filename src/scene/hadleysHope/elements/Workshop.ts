import { Mesh } from 'three';
import BaseSceneElement from '../../base/BaseSceneElement';
import DrawMode from '../../DrawMode';
import SceneColors from '../../SceneColors';
import SceneElementType from '../../SceneElementType';
import MaterialFactory from '../MaterialFactory';

class WorkshopFan {
  rotationSpeed: number;
  mesh: Mesh;
}

class WorkShop extends BaseSceneElement {
  static BUILDING_NAME = 'workshop';
  static FAN_SUFFIX = 'fan';

  private fans: WorkshopFan[] = [];

  constructor(meshes: Mesh[] = [], name = '', drawMode: DrawMode) {
    super(name, SceneElementType.BUILDING);

    const isBluePrint = drawMode == DrawMode.BLUEPRINT;

    meshes.forEach((mesh) => {
      const buildingMesh = mesh.clone();

      if (buildingMesh.userData.node_name == WorkShop.BUILDING_NAME) {
        this.position = mesh.position.clone();
        MaterialFactory.assignBuildingMaterial(
          buildingMesh,
          SceneColors.BLUE_1,
          true,
          true,
          isBluePrint,
          false,
          false
        );

        this.meshes.push(buildingMesh);
      } else if (
        buildingMesh.userData.node_name &&
        buildingMesh.userData.node_name == WorkShop.FAN_SUFFIX
      ) {
        MaterialFactory.assignBuildingMaterial(
          buildingMesh,
          SceneColors.BLUE_1,
          true,
          true,
          isBluePrint,
          false,
          false
        );
        this.meshes.push(buildingMesh);

        const fan = new WorkshopFan();
        fan.mesh = buildingMesh;
        fan.rotationSpeed = Math.PI * 3;
        this.fans.push(fan);
      } else {
        if (buildingMesh.userData.building_accent && !isBluePrint) {
          const color = MaterialFactory.getAccentColor(
            buildingMesh.userData.accent_type
          );

          MaterialFactory.assignBuildingMaterial(
            buildingMesh,
            color,
            false,
            false,
            isBluePrint,
            true,
            true
          );
          this.meshes.push(buildingMesh);
        } else {
          MaterialFactory.assignBuildingMaterial(
            buildingMesh,
            SceneColors.BLUE_1,
            true,
            true,
            isBluePrint,
            false,
            false
          );
          this.meshes.push(buildingMesh);
        }
      }
    });
  }

  override update(delta: number): void {
    this.fans.forEach((fan) => {
      fan.mesh.rotation.y += fan.rotationSpeed * delta;
    });
  }
}

export default WorkShop;

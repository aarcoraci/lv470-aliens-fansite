import { Mesh } from 'three';
import BaseSceneElement from '../../base/BaseSceneElement';
import DrawMode from '../../DrawMode';
import SceneColors from '../../SceneColors';
import SceneElementType from '../../SceneElementType';
import MaterialFactory from '../MaterialFactory';

class Operations extends BaseSceneElement {
  static BUILDING_NAME = 'operations';

  constructor(meshes: Mesh[] = [], name = '', drawMode: DrawMode) {
    super(name, SceneElementType.BUILDING);
    const isBluePrint = drawMode == DrawMode.BLUEPRINT;

    meshes.forEach((mesh) => {
      const buildingMesh = mesh.clone();
      if (buildingMesh.userData.node_name == Operations.BUILDING_NAME) {
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
        this.meshes.push(buildingMesh);
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
}

export default Operations;

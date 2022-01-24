import { Mesh } from 'three';
import BaseSceneElement from '../../base/BaseSceneElement';
import DrawMode from '../../DrawMode';
import SceneColors from '../../SceneColors';
import MaterialFactory from '../MaterialFactory';

class LivingQuarters extends BaseSceneElement {
  static BUILDING_NAME = 'living_quarters';

  constructor(meshes: Mesh[] = [], name = '', drawMode: DrawMode) {
    super(name);
    const isBluePrint = drawMode == DrawMode.BLUEPRINT;

    meshes.forEach((mesh) => {
      const buildingMesh = mesh.clone();

      if (buildingMesh.userData.node_name == LivingQuarters.BUILDING_NAME) {
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
      }
    });
  }
}

export default LivingQuarters;

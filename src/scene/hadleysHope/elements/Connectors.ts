import { Mesh } from 'three';
import BaseSceneElement from '../../base/BaseSceneElement';
import DrawMode from '../../DrawMode';
import SceneColors from '../../SceneColors';
import MaterialFactory from '../MaterialFactory';

class Connectors extends BaseSceneElement {
  static BUILDING_NAME = 'connector';

  constructor(meshes: Mesh[] = [], name = '', drawMode: DrawMode) {
    super(name);

    const isBluePrint = drawMode == DrawMode.BLUEPRINT;

    meshes.forEach((mesh) => {
      const buildingMesh = mesh.clone();
      const nodeName: string = buildingMesh.userData.node_name as string;

      if (nodeName.includes(Connectors.BUILDING_NAME)) {
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

export default Connectors;

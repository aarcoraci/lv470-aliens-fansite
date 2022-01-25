import { Mesh } from 'three';
import BaseSceneElement from '../../base/BaseSceneElement';
import SceneElementPart from '../../base/SceneElementPart';
import DrawMode from '../../DrawMode';
import SceneColors from '../../SceneColors';
import SceneElementType from '../../SceneElementType';
import MaterialFactory from '../MaterialFactory';

class Rover extends BaseSceneElement {
  static VEHICLE_NAME = 'rover';

  constructor(meshes: Mesh[] = [], name = '', drawMode: DrawMode) {
    super(name, SceneElementType.VEHICLE);

    const isBluePrint = drawMode == DrawMode.BLUEPRINT;

    meshes.forEach((mesh) => {
      const buildingMesh = mesh.clone();

      if (buildingMesh.userData.node_name == Rover.VEHICLE_NAME) {
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
        this.position = buildingMesh.position.clone();
        this.parts.push(new SceneElementPart(buildingMesh));
      } else {
        // extras
        MaterialFactory.assignBuildingMaterial(
          buildingMesh,
          SceneColors.BLUE_1,
          true,
          true,
          isBluePrint,
          false,
          false
        );
        this.parts.push(new SceneElementPart(buildingMesh));
      }
    });
  }
}

export default Rover;

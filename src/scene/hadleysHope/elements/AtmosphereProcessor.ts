import { Mesh } from 'three';
import BaseSceneElement from '../../base/BaseSceneElement';
import SceneElementPart from '../../base/SceneElementPart';
import DrawMode from '../../DrawMode';
import SceneColors from '../../SceneColors';
import SceneElementType from '../../SceneElementType';
import MaterialFactory from '../MaterialFactory';

class AtmosphereProcessor extends BaseSceneElement {
  static BUILDING_NAME = 'atmosphere_processor';

  constructor(meshes: Mesh[] = [], name = '', drawMode: DrawMode) {
    super(name, SceneElementType.BUILDING);

    const isBluePrint = drawMode == DrawMode.BLUEPRINT;

    meshes.forEach((mesh) => {
      const buildingMesh = mesh.clone();

      if (
        buildingMesh.userData.node_name == AtmosphereProcessor.BUILDING_NAME
      ) {
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

        this.parts.push(new SceneElementPart(buildingMesh));
      } else {
        if (!isBluePrint) {
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

          this.parts.push(new SceneElementPart(buildingMesh));
        }
      }
    });
    this.buildBoundingBox();
  }
}

export default AtmosphereProcessor;

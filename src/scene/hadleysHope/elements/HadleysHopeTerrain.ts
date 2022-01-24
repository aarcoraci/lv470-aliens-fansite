import { Mesh } from 'three';
import BaseSceneElement from '../../base/BaseSceneElement';
import DrawMode from '../../DrawMode';
import SceneElementType from '../../SceneElementType';
import MaterialFactory from '../MaterialFactory';

class HadleysHopeTerrain extends BaseSceneElement {
  static BUILDING_NAME = 'terrain';

  constructor(meshes: Mesh[], name: string, drawMode: DrawMode) {
    super(name, SceneElementType.TERRAIN);

    const isBluePrint = drawMode == DrawMode.BLUEPRINT;

    meshes.forEach((mesh) => {
      const buildingMesh = mesh.clone();

      this.position = buildingMesh.position;

      if (isBluePrint) {
        buildingMesh.material = MaterialFactory.getBlueprintMaterial();
      } else {
        buildingMesh.material = MaterialFactory.getRegularGroundMAterial();
        buildingMesh.receiveShadow = true;
      }
      this.meshes.push(buildingMesh);
    });
  }
}

export default HadleysHopeTerrain;

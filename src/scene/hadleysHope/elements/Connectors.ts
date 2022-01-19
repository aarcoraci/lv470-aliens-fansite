import { Mesh } from 'three';
import BaseSceneElement from '../../base/BaseSceneElement';
import SceneColors from '../../SceneColors';
import MaterialFactory from '../MaterialFactory';

class Connectors extends BaseSceneElement {
  static BUILDING_NAME = 'connector';

  constructor(meshes: Mesh[] = [], name = '') {
    super(name);

    meshes.forEach((mesh) => {
      const nodeName: string = mesh.userData.node_name as string;

      if (nodeName.includes(Connectors.BUILDING_NAME)) {
        mesh.material = MaterialFactory.getRegularBuildingMaterial();
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        this.meshes.push(mesh);
      } else {
        if (mesh.userData.accent_type == 1) {
          mesh.material = MaterialFactory.getRegularAccentRedMaterial(
            true,
            SceneColors.WHITE
          );
          this.meshes.push(mesh);
        } else if (mesh.userData.accent_type == 2) {
          mesh.material = MaterialFactory.getRegularAccentRedMaterial(true);
          this.meshes.push(mesh);
        }
      }
    });
  }
}

export default Connectors;

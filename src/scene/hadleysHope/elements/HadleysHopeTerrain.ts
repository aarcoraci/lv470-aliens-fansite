import { Mesh } from 'three';
import BaseSceneElement from '../../base/BaseSceneElement';
import MaterialFactory from '../MaterialFactory';

class HadleysHopeTerrain extends BaseSceneElement {
  static BUILDING_NAME = 'terrain';

  constructor(meshes: Mesh[], name: string) {
    super(name);
    meshes.forEach((mesh) => {
      mesh.material = MaterialFactory.getRegularGroundMAterial();
      mesh.receiveShadow = true;
      this.meshes.push(mesh);
    });
  }
}

export default HadleysHopeTerrain;

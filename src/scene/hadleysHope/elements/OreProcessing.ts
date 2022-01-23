import { Mesh } from 'three';
import BaseSceneElement from '../../base/BaseSceneElement';
import SceneColors from '../../SceneColors';
import MaterialFactory from '../MaterialFactory';

class OreProcessing extends BaseSceneElement {
  static BUILDING_NAME = 'ore_processing';
  static CRANE_BULDING = 'crane';
  static CRANE_GRIP = 'crane_grip';
  static ORE_PROCESSING = 'ore_processing';
  static GRINDER_1 = 'grinder_1';
  static GRINDER_2 = 'grinder_2';

  // animated parts
  private craneGrip: Mesh;
  private grinder1: Mesh;
  private grinder2: Mesh;

  constructor(meshes: Mesh[], name = '') {
    super(name);
    meshes.forEach((mesh) => {
      if (mesh.userData.node_name == OreProcessing.CRANE_BULDING) {
        mesh.material = MaterialFactory.getRegularBuildingMaterial();
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        this.meshes.push(mesh);
      } else if (mesh.userData.node_name == OreProcessing.ORE_PROCESSING) {
        mesh.material = MaterialFactory.getRegularBuildingMaterial();
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        this.meshes.push(mesh);
      } else if (mesh.userData.node_name == OreProcessing.GRINDER_1) {
        this.grinder1 = mesh;
        mesh.material = MaterialFactory.getRegularBuildingMaterial();
        mesh.castShadow = true;
        this.meshes.push(mesh);
      } else if (mesh.userData.node_name == OreProcessing.GRINDER_2) {
        this.grinder2 = mesh;
        mesh.material = MaterialFactory.getRegularBuildingMaterial();
        mesh.castShadow = true;
        this.meshes.push(mesh);
      } else if (mesh.userData.node_name == OreProcessing.CRANE_GRIP) {
        this.craneGrip = mesh;
        mesh.material = MaterialFactory.getRegularBuildingMaterial();
        mesh.castShadow = true;
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

  override update(delta: number): void {
    this.grinder1.rotation.y += Math.PI * -0.45 * delta;
    this.grinder2.rotation.y += Math.PI * 0.45 * delta;
  }
}

export default OreProcessing;

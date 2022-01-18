import {
  DoubleSide,
  Mesh,
  MeshPhongMaterial,
  MeshStandardMaterial,
  Side,
} from "three";
import BaseSceneElement from "../../base/BaseSceneElement";
import MaterialFactory from "../MaterialFactory";

class CommsTower extends BaseSceneElement {
  static BUILDING_NAME: string = "comms_tower";
  static BASE_BUILDING_NAME: string = "comms_tower_base";
  static ANTENNA_BUILDING_NAME: string = "comms_tower_antenna";
  static LIGHT_BUILDING_NAME: string = "comms_tower_light";

  private antenna: Mesh;
  private light: Mesh;

  constructor(meshes: Mesh[] = [], name: string = "") {
    super(name);

    meshes.forEach((mesh) => {
      if (mesh.userData.node_name == CommsTower.LIGHT_BUILDING_NAME) {
        mesh.material = MaterialFactory.getRegularAccentRedMaterial();
        mesh.castShadow = true;
        this.light = mesh;
        mesh.rotation.z = Math.PI / 3;
        mesh.rotation.y = Math.PI / 2;
        this.meshes.push(mesh);
      } else {
        mesh.castShadow = true;
        if (mesh.userData.node_name == CommsTower.BASE_BUILDING_NAME) {
          mesh.material = MaterialFactory.getRegularBuildingMaterial(false);
          mesh.receiveShadow = true;
        }
        if (mesh.userData.node_name == CommsTower.ANTENNA_BUILDING_NAME) {
          mesh.material = MaterialFactory.getRegularBuildingMaterial(true);

          this.antenna = mesh;
          mesh.rotation.z = Math.PI / 3;
          mesh.rotation.y = Math.PI / 2;
        }
        this.meshes.push(mesh);
      }
    });
  }

  override update(delta: number): void {
    this.antenna.rotation.y += Math.PI * 0.05 * delta;
    this.light.rotation.y += Math.PI * 0.05 * delta;
  }
}

export default CommsTower;

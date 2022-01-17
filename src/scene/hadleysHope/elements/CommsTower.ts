import {
  DoubleSide,
  Mesh,
  MeshPhongMaterial,
  MeshStandardMaterial,
  Side,
} from "three";
import BaseSceneElement from "../../base/BaseSceneElement";

class CommsTower extends BaseSceneElement {
  static BUILDING_NAME: string = "comms_tower";
  static BASE_BUILDING_NAME: string = "comms_tower_base";
  static ANTENNA_BUILDING_NAME: string = "comms_tower_antenna";
  static LIGHT_BUILDING_NAME: string = "comms_tower_light";

  private antenna: Mesh;
  private light: Mesh;

  constructor(meshes: Mesh[] = [], name: string = "") {
    super(meshes, name);

    meshes.forEach((mesh) => {
      if (mesh.userData.node_name == CommsTower.LIGHT_BUILDING_NAME) {
        mesh.material = new MeshStandardMaterial({
          color: 0xff4000,
          emissive: 0xff4000,
          emissiveIntensity: 0.5,
        });

        mesh.castShadow = false;
        mesh.material.needsUpdate = true;
        this.light = mesh;
        mesh.rotation.z = Math.PI / 3;
        mesh.rotation.y = Math.PI / 2;
      } else {
        mesh.material = new MeshPhongMaterial({
          color: 0x00468b,
        });
        mesh.material.side = DoubleSide;
        mesh.castShadow = true;
        mesh.material.needsUpdate = true;
        if (mesh.userData.node_name == CommsTower.ANTENNA_BUILDING_NAME) {
          this.antenna = mesh;
          mesh.rotation.z = Math.PI / 3;
          mesh.rotation.y = Math.PI / 2;
        }
      }
    });
  }

  override update(delta: number): void {
    this.antenna.rotation.y += Math.PI * 0.05 * delta;
    this.light.rotation.y += Math.PI * 0.05 * delta;
  }
}

export default CommsTower;

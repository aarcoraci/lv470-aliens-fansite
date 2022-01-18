import { Mesh } from "three";
import BaseSceneElement from "../../base/BaseSceneElement";
import SceneColors from "../../SceneColors";
import MaterialFactory from "../MaterialFactory";

class District extends BaseSceneElement {
  static BUILDING_NAME: string = "district";

  constructor(meshes: Mesh[] = [], name: string = "") {
    super(name);

    meshes.forEach((mesh) => {
      if (mesh.userData.node_name == District.BUILDING_NAME) {
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

  override update(): void {}
}

export default District;

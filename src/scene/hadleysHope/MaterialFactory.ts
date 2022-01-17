import { DoubleSide, Material, MeshPhongMaterial } from "three";
import SceneColors from "../SceneColors";

abstract class MaterialFactory {
  static getRegularBuildingMaterial(doubleSided: Boolean = false): Material {
    const result = new MeshPhongMaterial({
      color: SceneColors.BLUE_1,
    });

    if (doubleSided) {
      result.side = DoubleSide;
    }

    return result;
  }

  static getRegularAccentRedMaterial(): Material {
    const result = new MeshPhongMaterial({
      color: SceneColors.RED_1,
    });
    return result;
  }

  static getRegularGroundMAterial(): Material {
    const result = new MeshPhongMaterial({
      color: SceneColors.BLUE_1,
    });
    return result;
  }
}

export default MaterialFactory;

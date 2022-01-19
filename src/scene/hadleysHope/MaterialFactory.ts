import { DoubleSide, Material, MeshPhongMaterial } from 'three';
import SceneColors from '../SceneColors';

abstract class MaterialFactory {
  static getRegularBuildingMaterial(doubleSided: Boolean = false): Material {
    const result = new MeshPhongMaterial({
      color: SceneColors.BLUE_1
    });

    if (doubleSided) {
      result.side = DoubleSide;
    }

    return result;
  }

  static getRegularAccentRedMaterial(
    doubleSided: Boolean = false,
    color: SceneColors = SceneColors.RED_1
  ): Material {
    const result = new MeshPhongMaterial({
      color: color
    });

    if (doubleSided) {
      result.side = DoubleSide;
    }
    return result;
  }

  static getRegularGroundMAterial(): Material {
    const result = new MeshPhongMaterial({
      color: SceneColors.BLUE_1
    });
    return result;
  }

  static getMapBuildingMaterial(doubleSided: Boolean = false): Material {
    const result = new MeshPhongMaterial({
      color: SceneColors.BLUE_1,
      wireframe: true
    });

    if (doubleSided) {
      result.side = DoubleSide;
    }
    return result;
  }
}

export default MaterialFactory;

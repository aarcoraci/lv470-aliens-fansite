import { DoubleSide, Material, Mesh, MeshPhongMaterial } from 'three';
import SceneColors from '../SceneColors';

abstract class MaterialFactory {
  static getRegularBuildingMaterial(doubleSided = false): Material {
    const result = new MeshPhongMaterial({
      color: SceneColors.BLUE_1
    });

    if (doubleSided) {
      result.side = DoubleSide;
    }

    return result;
  }

  static getRegularAccentRedMaterial(
    doubleSided = false,
    color: SceneColors = SceneColors.RED_1
  ): Material {
    const result = new MeshPhongMaterial({
      color: color,
      emissive: color,
      emissiveIntensity: 0.3
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

  static getBlueprintMaterial(
    color = SceneColors.BLUE_1,
    doubleSided = false
  ): Material {
    const result = new MeshPhongMaterial({
      color: color,
      wireframe: true
    });

    if (doubleSided) {
      result.side = DoubleSide;
    }
    return result;
  }

  static getAccentColor(accentType: number): SceneColors {
    return accentType == 1 ? SceneColors.WHITE : SceneColors.RED_1;
  }

  static assignBuildingMaterial(
    mesh: Mesh,
    color = SceneColors.BLUE_1,
    castShadow = false,
    receiveShadow = false,
    bluePrint = false,
    accent = false,
    doubleSided = false
  ): void {
    if (bluePrint) {
      mesh.material = this.getBlueprintMaterial(color, doubleSided);
    } else {
      if (!accent) {
        mesh.material = this.getRegularBuildingMaterial(doubleSided);
      } else {
        mesh.material = this.getRegularAccentRedMaterial(doubleSided, color);
      }
    }
    mesh.castShadow = castShadow;
    mesh.receiveShadow = receiveShadow;
  }
}

export default MaterialFactory;

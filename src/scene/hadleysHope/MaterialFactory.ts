import {
  Color,
  DoubleSide,
  Material,
  Mesh,
  MeshPhongMaterial,
  MeshStandardMaterial,
  RepeatWrapping,
  TextureLoader
} from 'three';
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

  static getTexturedGroundMaterial(): Material {
    const size = 40;
    const texture = new TextureLoader().load('textures/ground_c.jpg');
    texture.wrapS = RepeatWrapping;
    texture.wrapT = RepeatWrapping;
    texture.repeat.set(size, size);

    const normal = new TextureLoader().load('textures/ground_n.jpg');
    normal.wrapS = RepeatWrapping;
    normal.wrapT = RepeatWrapping;
    normal.repeat.set(size, size);

    const rough = new TextureLoader().load('textures/ground_r.jpg');
    rough.wrapS = RepeatWrapping;
    rough.wrapT = RepeatWrapping;
    rough.repeat.set(size, size);

    const material = new MeshStandardMaterial();
    material.envMap = texture;
    material.envMapIntensity = 0.6;
    material.normalMap = normal;
    material.roughnessMap = rough;

    material.emissive = new Color(SceneColors.BLUE_1);
    material.color = new Color(SceneColors.BLUE_1);
    material.emissiveIntensity = 0.2;

    return material;
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

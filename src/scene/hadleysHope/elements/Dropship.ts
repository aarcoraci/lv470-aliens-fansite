import { Mesh } from 'three';
import BaseSceneElement from '../../base/BaseSceneElement';
import SceneElementPart from '../../base/SceneElementPart';
import DrawMode from '../../DrawMode';
import SceneColors from '../../SceneColors';
import SceneElementType from '../../SceneElementType';
import MaterialFactory from '../MaterialFactory';

class DropShip extends BaseSceneElement {
  static VEHICLE_NAME = 'dropship';

  private dropShipMesh: Mesh;

  constructor(meshes: Mesh[] = [], name = '', drawMode: DrawMode) {
    super(name, SceneElementType.VEHICLE);

    const isBluePrint = drawMode == DrawMode.BLUEPRINT;

    meshes.forEach((mesh) => {
      const buildingMesh = mesh.clone();

      if (buildingMesh.userData.node_name == DropShip.VEHICLE_NAME) {
        this.position = mesh.position.clone();
        MaterialFactory.assignBuildingMaterial(
          buildingMesh,
          SceneColors.BLUE_1,
          true,
          true,
          isBluePrint,
          false,
          false
        );
        this.position = buildingMesh.position.clone();
        this.dropShipMesh = buildingMesh;
        this.parts.push(new SceneElementPart(buildingMesh));
      }
    });
  }

  override update(delta: number): void {
    this.dropShipMesh.rotation.y += 0.017 * Math.PI * delta;
  }
}

export default DropShip;

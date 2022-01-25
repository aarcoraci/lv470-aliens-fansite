import { Tween } from '@tweenjs/tween.js';
import { Mesh } from 'three';
import BaseSceneElement from '../../base/BaseSceneElement';
import SceneElementPart from '../../base/SceneElementPart';
import DrawMode from '../../DrawMode';
import SceneColors from '../../SceneColors';
import SceneElementType from '../../SceneElementType';
import MaterialFactory from '../MaterialFactory';

class OreProcessing extends BaseSceneElement {
  static BUILDING_NAME = 'ore_processing';
  static CRANE_BUILDING = 'crane';
  static CRANE_GRIP = 'crane_grip';
  static ORE_PROCESSING = 'ore_processing';
  static GRINDER_1 = 'grinder_1';
  static GRINDER_2 = 'grinder_2';

  // animated parts
  private craneGrip: Mesh;
  private grinder1: Mesh;
  private grinder2: Mesh;

  private gripTween1: Tween<{ r: number }>;
  private gripTween2: Tween<{ r: number }>;

  constructor(meshes: Mesh[], name = '', drawMode: DrawMode) {
    super(name, SceneElementType.BUILDING);
    const isBluePrint = drawMode == DrawMode.BLUEPRINT;

    meshes.forEach((mesh) => {
      const buildingMesh = mesh.clone();

      if (buildingMesh.userData.node_name == OreProcessing.CRANE_BUILDING) {
        MaterialFactory.assignBuildingMaterial(
          buildingMesh,
          SceneColors.BLUE_1,
          true,
          true,
          isBluePrint,
          false,
          false
        );
        this.parts.push(new SceneElementPart(buildingMesh));
      } else if (
        buildingMesh.userData.node_name == OreProcessing.ORE_PROCESSING
      ) {
        this.position = buildingMesh.position.clone();
        MaterialFactory.assignBuildingMaterial(
          buildingMesh,
          SceneColors.BLUE_1,
          true,
          true,
          isBluePrint,
          false,
          false
        );
        this.parts.push(new SceneElementPart(buildingMesh));
      } else if (buildingMesh.userData.node_name == OreProcessing.GRINDER_1) {
        this.grinder1 = buildingMesh;
        MaterialFactory.assignBuildingMaterial(
          buildingMesh,
          SceneColors.BLUE_1,
          true,
          false,
          isBluePrint,
          false,
          false
        );
        this.parts.push(new SceneElementPart(buildingMesh));
      } else if (buildingMesh.userData.node_name == OreProcessing.GRINDER_2) {
        this.grinder2 = buildingMesh;
        MaterialFactory.assignBuildingMaterial(
          buildingMesh,
          SceneColors.BLUE_1,
          true,
          false,
          isBluePrint,
          false,
          false
        );
        this.parts.push(new SceneElementPart(buildingMesh));
      } else if (mesh.userData.node_name == OreProcessing.CRANE_GRIP) {
        this.craneGrip = buildingMesh;
        MaterialFactory.assignBuildingMaterial(
          buildingMesh,
          SceneColors.BLUE_1,
          true,
          false,
          isBluePrint,
          false,
          false
        );
        this.parts.push(new SceneElementPart(buildingMesh));
      } else {
        const color = MaterialFactory.getAccentColor(
          buildingMesh.userData.accent_type
        );

        MaterialFactory.assignBuildingMaterial(
          buildingMesh,
          color,
          false,
          false,
          isBluePrint,
          true,
          true
        );

        this.parts.push(new SceneElementPart(buildingMesh));
      }
    });

    // use tweens to handle the crane movement
    const gripBalanceAngle = Math.PI * 0.011;
    const gripBalanceTime = 8000;
    const r1 = { r: -gripBalanceAngle * Math.PI };
    const r1end = { r: gripBalanceAngle * Math.PI };

    const r2 = { r: gripBalanceAngle * Math.PI };
    const r2end = { r: -gripBalanceAngle * Math.PI };

    this.gripTween1 = new Tween(r1)
      .to(r1end, gripBalanceTime)
      .onUpdate(() => {
        this.craneGrip.rotation.x = r1.r;
      })
      .onComplete(() => {
        this.gripTween2.start();
      });
    this.gripTween2 = new Tween(r2)
      .to(r2end, gripBalanceTime)
      .onUpdate(() => {
        this.craneGrip.rotation.x = r2.r;
      })
      .onComplete(() => {
        this.gripTween1.start();
      });

    this.gripTween1.start();
  }

  override update(delta: number): void {
    this.grinder1.rotation.y += Math.PI * -0.45 * delta;
    this.grinder2.rotation.y += Math.PI * 0.45 * delta;
  }
}

export default OreProcessing;

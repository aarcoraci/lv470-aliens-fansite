import BaseScene from "../base/BaseScene";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import AtmosphereProcessor from "./buildings/AtmosphereProcessor";
import { Mesh, Fog, PointLight, HemisphereLight } from "three";
import HadleysHopeBuildingConstructor from "./BuilgingConstructor";

class HadleysHope extends BaseScene {
  private static SCENE_MODEL_NAME: string = "./models/hadleys.glb";

  private buildingConstructor: HadleysHopeBuildingConstructor =
    new HadleysHopeBuildingConstructor();

  private pointLight: PointLight;
  private hemisphereLight: HemisphereLight;

  override load(loader: GLTFLoader): void {
    super.load(loader);

    this.scene.fog = new Fog(0xf7d9aa, 10, 100);
    this.buildLights();
    loader.load(
      HadleysHope.SCENE_MODEL_NAME,
      (gltf) => {
        // prepare buildings
        gltf.scene.traverse((node) => {
          let building = this.buildingConstructor.construct(node);
          if (building != null) {
            this.buildings.push(building);
          }
        });

        this.scene.add(gltf.scene);
      },
      undefined,
      function (error) {
        console.error(error);
      }
    );
  }

  override update(): void {
    this.buildings.forEach((b) => {
      b.update();
    });
  }

  override dispose(): void {
    // TODO: really need to test this
    super.dispose();
    this.pointLight.dispose();
    this.hemisphereLight.dispose();
    this.buildings.forEach((b) => {
      this.scene.remove(b.mesh);
    });
    this.buildings = [];
  }

  private buildLights(): void {
    this.pointLight = new PointLight(0xffffff, 5, 40);
    // this.pointLight.castShadow = true;
    this.pointLight.position.set(10, 20, 15);
    this.scene.add(this.pointLight);

    this.hemisphereLight = new HemisphereLight(0xaaaaaa, 0x000000, 0.9);
    this.scene.add(this.hemisphereLight);
  }
}

export default HadleysHope;

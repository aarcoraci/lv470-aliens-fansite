import BaseScene from "../base/BaseScene";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import AtmosphereProcessor from "./elements/AtmosphereProcessor";
import {
  Mesh,
  AmbientLight,
  SpotLight,
  MeshStandardMaterial,
  DirectionalLight,
} from "three";
import HadleysHopeBuildingConstructor from "./BuilgingConstructor";
import HadleysHopeTerrain from "./elements/HadleysHopeTerrain";

class HadleysHope extends BaseScene {
  private static SCENE_MODEL_NAME: string = "./models/hadleys.glb";

  private buildingConstructor: HadleysHopeBuildingConstructor =
    new HadleysHopeBuildingConstructor();

  private terrain?: Mesh;

  override load(loader: GLTFLoader): void {
    super.load(loader);

    // this.scene.fog = new Fog(0xf7d9aa, 10, 100);
    this.buildLights();
    loader.load(
      HadleysHope.SCENE_MODEL_NAME,
      (gltf) => {
        // prepare buildings
        gltf.scene.traverse((node) => {
          if (node.isObject3D) {
            if (node.userData.building) {
              this.sceneElements.push(this.buildingConstructor.construct(node));
            } else if (node.userData.terrain) {
              this.sceneElements.push(
                new HadleysHopeTerrain(node as Mesh, "terrain")
              );
            }
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
    this.sceneElements.forEach((b) => {
      b.update();
    });
  }

  override dispose(): void {
    super.dispose();
    this.sceneElements.forEach((b) => {
      this.scene.remove(b.mesh);
    });
    this.sceneElements = [];
  }

  private buildLights(): void {
    // spotlight (sun ?)
    const spotlight = new SpotLight(0xf5fc5a);
    spotlight.position.set(0, 6, 0);
    spotlight.castShadow = true;
    spotlight.intensity = 0.45;
    this.scene.add(spotlight);

    // ambient
    const ambientLight = new AmbientLight(0xfaedf0);
    ambientLight.intensity = 0.45;
    this.scene.add(ambientLight);

    //directional
    const dirlight = new DirectionalLight(0xfaedf0);
    dirlight.position.set(4, 3, 2);
    dirlight.castShadow = true;
    dirlight.intensity = 0.25;
    this.scene.add(dirlight);
  }
}

export default HadleysHope;

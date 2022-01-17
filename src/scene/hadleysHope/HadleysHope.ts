import BaseScene from "../base/BaseScene";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { Mesh, AmbientLight, SpotLight, DirectionalLight } from "three";
import HadleysHopeBuildingConstructor from "./HadleysHopeBuildingConstructor";

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
        this.sceneElements = [...this.buildingConstructor.construct(gltf)];
        this.sceneElements.forEach((element) => {
          element.meshes.forEach((mesh) => {
            this.scene.add(mesh);
          });
        });
        // this.scene.add(gltf.scene);
      },
      undefined,
      function (error) {
        console.error(error);
      }
    );
  }

  override update(delta: number): void {
    this.sceneElements.forEach((b) => {
      b.update(delta);
    });
  }

  override dispose(): void {
    super.dispose();
    this.sceneElements.forEach((sceneElement) => {
      sceneElement.meshes.forEach((mesh) => {
        this.scene.remove(mesh);
      });
      sceneElement.meshes = [];
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
    dirlight.intensity = 0.55;
    this.scene.add(dirlight);
  }
}

export default HadleysHope;

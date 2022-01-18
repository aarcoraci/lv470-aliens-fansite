import BaseScene from "../base/BaseScene";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { Mesh, AmbientLight, SpotLight, DirectionalLight, Fog } from "three";
import HadleysHopeSceneConstructor from "./HadleysHopeSceneConstructor";

class HadleysHope extends BaseScene {
  private static SCENE_MODEL_NAME: string = "./models/hadleys.glb";

  private buildingConstructor: HadleysHopeSceneConstructor =
    new HadleysHopeSceneConstructor();

  private terrain?: Mesh;

  override async load(loader: GLTFLoader): Promise<void> {
    super.load(loader);

    this.buildLights();

    const gltf = await loader.loadAsync(HadleysHope.SCENE_MODEL_NAME);

    this.sceneElements = [...this.buildingConstructor.construct(gltf)];
    this.sceneElements.forEach((element) => {
      element.meshes.forEach((mesh) => {
        this.scene.add(mesh);
      });
    });

    // loader.load(
    //   HadleysHope.SCENE_MODEL_NAME,
    //   (gltf) => {
    //     this.sceneElements = [...this.buildingConstructor.construct(gltf)];
    //     this.sceneElements.forEach((element) => {
    //       element.meshes.forEach((mesh) => {
    //         this.scene.add(mesh);
    //       });
    //     });
    //     this.loadSceneCallback?.();
    //   },
    //   undefined,
    //   function (error) {
    //     console.error(error);
    //   }
    // );
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
    spotlight.castShadow = false;
    spotlight.intensity = 0.45;
    spotlight.shadow.mapSize.width = 2048;
    spotlight.shadow.mapSize.height = 2048;
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
    dirlight.shadow.mapSize.width = 1024;
    dirlight.shadow.mapSize.height = 1024;
    this.scene.add(dirlight);
  }
}

export default HadleysHope;

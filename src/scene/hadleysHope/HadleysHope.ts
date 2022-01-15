import BaseScene from "../base/BaseScene";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

class HadleysHope extends BaseScene {
  readonly sceneModel: string = "./models/hadleys.gltf";

  override load(loader: GLTFLoader): void {
    super.load(loader);
    loader.load(
      this.sceneModel,
      function (gltf) {
        this.scene.add(gltf.scene);
      },
      undefined,
      function (error) {
        console.error(error);
      }
    );
  }
}

export default HadleysHope;

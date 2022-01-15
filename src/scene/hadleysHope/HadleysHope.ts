import BaseScene from "../base/BaseScene";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

class HadleysHope extends BaseScene {
  readonly sceneModel: string = "./models/hadleys.glb";

  override load(loader: GLTFLoader): void {
    super.load(loader);

    loader.load(
      this.sceneModel,
      (gltf) => {
        // gltf.scene.traverse(function (node) {
        //   if (node.isObject3D) {
        //     console.log(node);
        //   }
        // });

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

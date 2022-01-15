import BaseScene from "../base/BaseScene";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import AtmosphereProcessor from "./buildings/AtmosphereProcessor";
import { Mesh } from "three";

class HadleysHope extends BaseScene {
  readonly sceneModel: string = "./models/hadleys.glb";

  override load(loader: GLTFLoader): void {
    super.load(loader);

    loader.load(
      this.sceneModel,
      (gltf) => {
        /**
         * build references to individual buildings
         */
        gltf.scene.traverse((node) => {
          if (
            node.isObject3D &&
            node.userData.node_name == AtmosphereProcessor.BUILDING_NAME
          ) {
            this.buildings.push(AtmosphereProcessor.build(node as Mesh));
            console.log(this.buildings);
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
}

export default HadleysHope;

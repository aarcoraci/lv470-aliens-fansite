import BaseScene from "../base/BaseScene";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import AtmosphereProcessor from "./buildings/AtmosphereProcessor";
import { Mesh, Fog, PointLight, HemisphereLight } from "three";

class HadleysHope extends BaseScene {
  private static SCENE_MODEL_NAME: string = "./models/hadleys.glb";

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
          if (
            node.isObject3D &&
            node.userData.node_name == AtmosphereProcessor.BUILDING_NAME
          ) {
            this.buildings.push(AtmosphereProcessor.build(node as Mesh));
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

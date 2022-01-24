import { Camera, Fog, WebGLRenderer } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import DrawMode from '../DrawMode';
import HadleysHope from './HadleysHope';
import HadleysHopeSceneConstructor from './HadleysHopeSceneConstructor';

class Orchestrator {
  private static SCENE_MODEL_NAME = './models/hadleys.glb';

  currentDrawMode = DrawMode.BLUEPRINT;

  blueprintScene: HadleysHope = new HadleysHope();
  regularScene: HadleysHope = new HadleysHope();

  private buildingConstructor: HadleysHopeSceneConstructor =
    new HadleysHopeSceneConstructor();

  async load(loader: GLTFLoader): Promise<void> {
    const gltf = await loader.loadAsync(Orchestrator.SCENE_MODEL_NAME);

    const bluePrintBuildingElements = this.buildingConstructor.construct(
      gltf,
      DrawMode.BLUEPRINT
    );
    const regularBuildingElements = this.buildingConstructor.construct(
      gltf,
      DrawMode.REGULAR
    );

    this.blueprintScene.assignElementsToScene(bluePrintBuildingElements);

    this.regularScene.assignElementsToScene(regularBuildingElements);

    // configure each scene
    this.blueprintScene.buildLights();
    this.regularScene.addFog();
    this.regularScene.buildLights();
  }

  update(delta: number): void {
    this.blueprintScene.update(delta);
    this.regularScene.update(delta);
  }

  render(renderer: WebGLRenderer, camera: Camera) {
    if (this.currentDrawMode == DrawMode.REGULAR) {
      renderer.render(this.regularScene.scene, camera);
    } else {
      renderer.render(this.blueprintScene.scene, camera);
    }
  }

  getCurrentScene(): HadleysHope {
    return this.currentDrawMode == DrawMode.BLUEPRINT
      ? this.blueprintScene
      : this.regularScene;
  }

  dispose() {
    this.blueprintScene.dispose();
    this.regularScene.dispose();
  }
}

export default Orchestrator;

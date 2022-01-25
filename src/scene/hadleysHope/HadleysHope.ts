import BaseScene from '../base/BaseScene';
import { AmbientLight, SpotLight, DirectionalLight, Fog } from 'three';
import BaseSceneElement from '../base/BaseSceneElement';

class HadleysHope extends BaseScene {
  override update(delta: number): void {
    this.sceneElements.forEach((b) => {
      if (b.update) {
        b.update(delta);
      }
    });
  }

  override dispose(): void {
    super.dispose();
    this.sceneElements.forEach((sceneElement) => {
      sceneElement.parts.forEach((part) => {
        this.scene.remove(part.mesh);
      });
      sceneElement.parts = [];
    });
    this.sceneElements = [];
  }

  assignElementsToScene(elements: BaseSceneElement[]) {
    elements.forEach((element) => {
      this.sceneElements.push(element);
      element.parts.forEach((part) => {
        this.scene.add(part.mesh);
      });
    });
  }

  addFog(): void {
    this.scene.fog = new Fog(0x2c2554, 0.0025, 41);
  }

  buildLights(d: number, near: number, far: number): void {
    const spotlight = new SpotLight(0xf5fc5a);
    spotlight.position.set(0, 16, 0);
    spotlight.castShadow = true;
    spotlight.intensity = 0.25;
    spotlight.shadow.mapSize.width = 1024;
    spotlight.shadow.mapSize.height = 1024;

    this.scene.add(spotlight);

    // ambient
    const ambientLight = new AmbientLight(0xfaedf0);
    ambientLight.intensity = 0.25;
    this.scene.add(ambientLight);

    //directional
    const dirlight = new DirectionalLight(0xfaedf0);
    dirlight.position.set(4, 3, 2);
    dirlight.castShadow = true;
    dirlight.intensity = 0.55;
    dirlight.shadow.mapSize.width = 1024;
    dirlight.shadow.mapSize.height = 1024;

    dirlight.castShadow = true;
    dirlight.shadow.camera.left = -d;
    dirlight.shadow.camera.right = d;
    dirlight.shadow.camera.top = d;
    dirlight.shadow.camera.bottom = -d;

    dirlight.shadow.camera.near = near;
    dirlight.shadow.camera.far = far;

    this.scene.add(dirlight);

    //directional
    const dirlight2 = new DirectionalLight(0x0000ff);
    dirlight2.position.set(-4, 3, 2);
    dirlight2.castShadow = false;
    dirlight2.intensity = 0.65;
    this.scene.add(dirlight2);
  }
}

export default HadleysHope;

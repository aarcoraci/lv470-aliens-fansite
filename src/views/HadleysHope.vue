<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue';
import * as TWEEN from '@tweenjs/tween.js';
import Orchestrator from '../scene/hadleysHope/Orchestrator';
import DrawMode from '../scene/DrawMode';
import CameraHelpers from '../scene/hadleysHope/helpers/CameraHelpers';

import IntroOvlerlay from '../components/IntroOverlay.vue';

let orchestrator: Orchestrator;
let animationRequestId;

const showIntro = ref(true);
const introOverlay = ref(null);

const createScene = async (targetDomElement: Element) => {
  orchestrator = new Orchestrator(
    window.innerWidth,
    window.innerHeight,
    window.devicePixelRatio
  );
  await orchestrator.load();
  targetDomElement.appendChild(orchestrator.renderer.domElement);
  introOverlay.value.removeLoadingCover();
};

const handleResize = () => {
  orchestrator.resize(window.innerWidth, window.innerHeight);
};

const animate = () => {
  TWEEN.update();
  animationRequestId = requestAnimationFrame(animate);
  orchestrator.update();
  orchestrator.render();
};

onMounted(async () => {
  const targetSceneElement = document.querySelector('#main-scene');
  await createScene(targetSceneElement);
  window.addEventListener('resize', handleResize);
  animate();
});

onBeforeUnmount(() => {
  cancelAnimationFrame(animationRequestId);
  orchestrator.dispose();
  window.removeEventListener('resize', handleResize);
});

/**
 * Moving the camera while the controls (orbit) are active requires not only moving
 * the camera to a target also move the target (focal target) of the controls keeping the
 * desired offset Vector
 * @param target
 */
// const focusTarget = (target: BaseSceneElement): void => {
//   cameraControls.enabled = false;
//   let position = new THREE.Vector3().copy(camera.position);
//   const targetPosition = target.meshes[0].position.clone();

//   targetPosition.y = d; // lock x and z
//   targetPosition.add(new THREE.Vector3(d, 0, d));
//   // zoom
//   let zoom = { z: camera.zoom };
//   let targetZoom = { z: 3 };

//   const trackingTween = new TWEEN.Tween(position)
//     .to(targetPosition, 2200)
//     .easing(TWEEN.Easing.Cubic.InOut)
//     .onUpdate(() => {
//       camera.position.copy(position);
//       // the focus point must be updated as well
//       cameraControls.target.copy(
//         camera.position.clone().sub(new THREE.Vector3(d, d, d))
//       );
//       cameraControls.update();
//     });

//   const zoomTween = new TWEEN.Tween(zoom)
//     .easing(TWEEN.Easing.Quadratic.Out)
//     .to(targetZoom, 1100)
//     .onUpdate(() => {
//       camera.zoom = zoom.z;
//       updateCamera();
//     })
//     .onComplete(() => {
//       cameraControls.enabled = true;
//     });

//   trackingTween.chain(zoomTween);
//   trackingTween.start();
// };

const animateCamera = () => {
  CameraHelpers.transitionFromTopToMain(orchestrator);
};

const targetOperations = (): void => {
  if (orchestrator.currentDrawMode == DrawMode.REGULAR) {
    orchestrator.currentDrawMode = DrawMode.BLUEPRINT;
  } else {
    orchestrator.currentDrawMode = DrawMode.REGULAR;
  }
  // const target = hadleysHope.sceneElements.find(
  //   (e) => e.name == Operations.BUILDING_NAME
  // );
  // focusTarget(target);
};

const fadeOut = (): void => {
  orchestrator.transition();
};

const initExperience = (): void => {
  showIntro.value = false;
  orchestrator.transition();
};
</script>

<template>
  <main>
    <div class="controls">
      <button @click="animateCamera">camera</button>
      <button @click="targetOperations">toggle</button>
      <button @click="fadeOut">fade out</button>
    </div>
    <intro-ovlerlay
      @explore="initExperience"
      ref="introOverlay"
      v-if="showIntro"
    />
    <div div id="main-scene" class="main-scene"></div>
  </main>
</template>

<style lang="scss" scoped>
.main-scene {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.controls {
  position: fixed;
  z-index: 1;
  right: 0;
  bottom: 0;
  padding: 8px;
  border-radius: 4px;
  background-color: #fbfbfb;
  display: flex;
  & > * {
    margin-right: 30px;
  }
}
</style>

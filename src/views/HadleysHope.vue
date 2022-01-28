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
const mainScene = ref(null);

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

const handlePointerMove = (event: MouseEvent) => {
  const x = (event.clientX / window.innerWidth) * 2 - 1;
  const y = -(event.clientY / window.innerHeight) * 2 + 1;
  orchestrator.updatePointerPosition(x, y);
  if (orchestrator.isPointerOverElement()) {
    mainScene.value.classList.add('selecting');
  } else {
    mainScene.value.classList.remove('selecting');
  }
};

const handleClick = () => {
  const selectedObject = orchestrator.focusCurrentSelection();
  if (selectedObject) {
    console.log(selectedObject);
  }
};

onMounted(async () => {
  const targetSceneElement = document.querySelector('#main-scene');
  await createScene(targetSceneElement);
  window.addEventListener('resize', handleResize);
  window.addEventListener('pointermove', handlePointerMove);
  window.addEventListener('click', handleClick);

  animate();
});

onBeforeUnmount(() => {
  cancelAnimationFrame(animationRequestId);
  orchestrator.dispose();
  window.removeEventListener('click', handleClick);
  window.removeEventListener('resize', handleResize);
  window.removeEventListener('pointermove', handlePointerMove);
});

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
    <div div id="main-scene" class="main-scene" ref="mainScene"></div>
  </main>
</template>

<style lang="scss" scoped>
.main-scene {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  &.selecting {
    cursor: pointer;
  }
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

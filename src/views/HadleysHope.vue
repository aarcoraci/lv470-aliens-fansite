<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue';
import * as TWEEN from '@tweenjs/tween.js';
import Orchestrator from '../scene/hadleysHope/Orchestrator';

import IntroOvlerlay from '../components/IntroOverlay.vue';
import { Vector2 } from 'three';
import BaseSceneElement from '../scene/base/BaseSceneElement';

let orchestrator: Orchestrator;
let animationRequestId;

const showIntro = ref(true);
const introOverlay = ref(null);
const mainScene = ref(null);
const sidePanel = ref(null);

let dragging = false;
let dragStart = new Vector2();
let dragEnd = new Vector2();
let dragDistance: number = 0;

const createScene = async (targetDomElement: Element) => {
  orchestrator = new Orchestrator(
    window.innerWidth,
    window.innerHeight,
    window.devicePixelRatio
  );
  await orchestrator.load();
  targetDomElement.appendChild(orchestrator.renderer.domElement);
  introOverlay.value.removeLoadingCover();
  orchestrator.onBuildingFocused = buildingSelected;
};

const buildingSelected = (target: BaseSceneElement) => {
  toggleInformationPanel(true);
};

const handleResize = (): void => {
  orchestrator.resize(window.innerWidth, window.innerHeight);
};

const animate = () => {
  TWEEN.update();
  animationRequestId = requestAnimationFrame(animate);
  orchestrator.update();
  orchestrator.render();
};

const toggleInformationPanel = (show: boolean) => {
  if (show) {
    sidePanel.value.classList.add('visible');
  } else {
    sidePanel.value.classList.remove('visible');
  }
};

const handleMouseDown = (event: MouseEvent) => {
  dragging = true;
  const x = (event.clientX / window.innerWidth) * 2 - 1;
  const y = -(event.clientY / window.innerHeight) * 2 + 1;
  dragStart = new Vector2(x, y);
};

// #region event listeners
const handleMouseMove = (event: MouseEvent) => {
  const x = (event.clientX / window.innerWidth) * 2 - 1;
  const y = -(event.clientY / window.innerHeight) * 2 + 1;

  orchestrator.updatePointerPosition(x, y);

  if (dragging) {
    dragEnd = new Vector2(x, y);
    dragDistance = dragEnd.distanceTo(dragStart);

    if (dragDistance >= 0.02 && orchestrator.currentSelectedElement != null) {
      closeInfoPanel();
    }
  } else {
    if (orchestrator.isPointerOverElement()) {
      mainScene.value.classList.add('selecting');
    } else {
      mainScene.value.classList.remove('selecting');
    }
  }
};

const handleTouchMove = (event: TouchEvent) => {
  if (orchestrator.currentSelectedElement != null) {
    closeInfoPanel();
  }
};

const closeInfoPanel = () => {
  orchestrator.unfocus();
  toggleInformationPanel(false);
};

const handleMouseUp = (event: MouseEvent) => {
  const x = (event.clientX / window.innerWidth) * 2 - 1;
  const y = -(event.clientY / window.innerHeight) * 2 + 1;

  dragEnd = new Vector2(x, y);
  dragDistance = dragEnd.distanceTo(dragStart);

  dragging = false;
  if (dragDistance >= 0.02) {
    return;
  }

  const selectedObject = orchestrator.attemptTapOrClick(x, y);
  if (selectedObject) {
    // console.log(selectedObject);
  }
};
// #endregion

onMounted(async () => {
  const targetSceneElement = document.querySelector('#main-scene');
  await createScene(targetSceneElement);
  window.addEventListener('resize', handleResize);
  mainScene.value.addEventListener('mousemove', handleMouseMove);
  mainScene.value.addEventListener('touchmove', handleTouchMove);
  mainScene.value.addEventListener('mousedown', handleMouseDown);
  mainScene.value.addEventListener('mouseup', handleMouseUp);

  animate();
});

onBeforeUnmount(() => {
  cancelAnimationFrame(animationRequestId);
  orchestrator.dispose();
  window.removeEventListener('resize', handleResize);
  mainScene.value.removeEventListener('mousemove', handleMouseMove);
  mainScene.value.removeEventListener('touchmove', handleTouchMove);
  mainScene.value.removeEventListener('mousedown', handleMouseDown);
  mainScene.value.removeEventListener('mouseup', handleMouseUp);
});

const initExperience = (): void => {
  showIntro.value = false;
  orchestrator.transition();
};
</script>

<template>
  <div class="main">
    <intro-ovlerlay
      @explore="initExperience"
      ref="introOverlay"
      v-if="showIntro"
    />
    <div div id="main-scene" class="main-scene" ref="mainScene"></div>
    <div class="side-panel" ref="sidePanel">
      <div class="top">
        <h3>Building Name</h3>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus at
          recusandae illum iusto incidunt laudantium nam architecto eaque
          nesciunt quis veritatis soluta optio inventore beatae omnis, nihil sed
          iste corrupti?
        </p>
      </div>
      <div class="bottom">
        <button @click="closeInfoPanel" class="button yellow">close</button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.main {
  position: relative;
  width: 100vw;
  height: 100vh;
}

.side-panel {
  position: fixed;
  bottom: 0;
  right: 0;
  height: 45vh;
  width: 100%;
  @include blueprint-background;
  color: $color-white;
  padding: 15px 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transform: translateY(100%);
  transition-property: transform;
  transition-duration: 310ms;
  transition-timing-function: ease-in-out;

  @include respond-to('large') {
    transform: translateX(100%);

    width: 33vw;
    height: 100%;
    top: 0;
    bottom: unset;
    padding: 40px 60px;
  }

  &.visible {
    transform: translateY(0);
    @include respond-to('large') {
      transform: translateX(0);
    }
  }

  p {
    @include typo-h4;
    @include respond-to('x-large') {
      @include typo-h3;
    }
  }
  .bottom {
    text-align: right;
  }
}
.main-scene {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  &.selecting {
    cursor: pointer;
  }
}
</style>

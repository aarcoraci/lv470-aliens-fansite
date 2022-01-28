<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue';
import * as TWEEN from '@tweenjs/tween.js';
import Orchestrator from '../scene/hadleysHope/Orchestrator';

import IntroOvlerlay from '../components/IntroOverlay.vue';
import { Vector2 } from 'three';

let orchestrator: Orchestrator;
let animationRequestId;

const showIntro = ref(true);
const introOverlay = ref(null);
const mainScene = ref(null);

let dragStart = new Vector2();
let dragEnd = new Vector2();

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

const handleMouseMove = (event: MouseEvent) => {
  const x = (event.clientX / window.innerWidth) * 2 - 1;
  const y = -(event.clientY / window.innerHeight) * 2 + 1;

  orchestrator.updatePointerPosition(x, y);
  if (orchestrator.isPointerOverElement()) {
    mainScene.value.classList.add('selecting');
  } else {
    mainScene.value.classList.remove('selecting');
  }
};

const handleMouseDown = (event: MouseEvent) => {
  const x = (event.clientX / window.innerWidth) * 2 - 1;
  const y = -(event.clientY / window.innerHeight) * 2 + 1;
  dragStart = new Vector2(x, y);
};

const handleMouseUp = (event: MouseEvent) => {
  const x = (event.clientX / window.innerWidth) * 2 - 1;
  const y = -(event.clientY / window.innerHeight) * 2 + 1;

  // calculate a "snapping" distance to determine dragging
  dragEnd = new Vector2(x, y);
  const dragDistance = dragEnd.distanceTo(dragStart);
  if (dragDistance >= 0.02) {
    return;
  }

  const selectedObject = orchestrator.attemptTapOrClick(x, y);
  if (selectedObject) {
    // console.log(selectedObject);
  }
};

onMounted(async () => {
  const targetSceneElement = document.querySelector('#main-scene');
  await createScene(targetSceneElement);
  window.addEventListener('resize', handleResize);
  window.addEventListener('mousemove', handleMouseMove);
  window.addEventListener('mousedown', handleMouseDown);
  window.addEventListener('mouseup', handleMouseUp);

  animate();
});

onBeforeUnmount(() => {
  cancelAnimationFrame(animationRequestId);
  orchestrator.dispose();
  window.removeEventListener('resize', handleResize);
  window.removeEventListener('mousemove', handleMouseMove);
  window.removeEventListener('mousedown', handleMouseDown);
  window.removeEventListener('mouseup', handleMouseUp);
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
    <div class="side-panel">
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
        <button class="button yellow">close</button>
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

  @include respond-to('large') {
    transform: translateX(100%);

    width: 33vw;
    height: 100%;
    top: 0;
    bottom: unset;
    padding: 40px 60px;
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

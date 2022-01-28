<script setup lang="ts">
import { ref } from 'vue';
import { gsap, Back } from 'gsap';

const welcomePanel = ref(null);
const loadingCover = ref(null);
const isLoading = ref(true);

const emit = defineEmits(['explore']);

const removeLoadingCover = (): void => {
  isLoading.value = false;
  gsap.to(loadingCover.value, {
    autoAlpha: 0,
    duration: 0.85
  });
};

const initExplore = () => {
  gsap.to(welcomePanel.value, {
    ease: Back.easeIn,
    autoAlpha: 0,
    scale: 0.9,
    duration: 0.64,
    onComplete: () => {
      setTimeout(() => {
        emit('explore');
      }, 340);
    }
  });
};

defineExpose({
  removeLoadingCover
});
</script>

<template>
  <div class="intro-overlay">
    <div class="loading-cover" ref="loadingCover"></div>
    <div class="intro container" ref="welcomePanel">
      <div class="wy-logo"></div>
      <h2>Welcome to LV&#8209;470</h2>
      <p>
        Weyland Yutani welcomes you to your new home. A small yet thriving
        community awaits you at Mutta Station.
      </p>
      <p>
        You have assigned a living unit at Mutta Station as a reward for your
        hard years working as an <span class="highlight">[Operator]</span> at
        <span class="highlight">[Fiorina Fury 223]</span>.
      </p>
      <p>
        Use this terminal to explore the settlement and get familiar with your
        environments. We know you will love it here.
      </p>
      <button
        @click.prevent="initExplore"
        class="button orange"
        :disabled="isLoading"
      >
        explore the base
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.intro-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  z-index: 15;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: $padding;

  .loading-cover {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    @include blueprint-background($color-black);
  }

  .intro {
    position: relative;
    border-radius: $border-radius;
    padding: 45px 30px;
    background-color: $color-blue;
    color: $color-white;
    box-shadow: 0px 10px 20px -5px rgba(darken($color-blue, 4), 1);

    text-align: center;
    @include blueprint-background;

    @include respond-to('large') {
      padding: 90px;
    }

    &::before {
      position: absolute;
      content: '';
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      box-shadow: inset 0 0 5rem rgba(0, 0, 0, 0.05);
      pointer-events: none;
    }

    p,
    h2 {
      margin-bottom: 18px;
      @include respond-to('large') {
        margin-bottom: 28px;
      }
    }

    p {
      span {
        &.highlight {
          color: $color-orange;
          letter-spacing: 1px;
          font-weight: 500;
        }
      }
    }
    .wy-logo {
      width: 100px;
      height: 30px;
      margin: 0 auto;
      background-image: url('~@/assets/img/wy-logo-variant.png');
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center;
    }
  }
}
</style>

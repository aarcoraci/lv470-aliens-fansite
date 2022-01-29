<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { gsap, Power2 } from 'gsap';

const modalOverlay = ref<HTMLElement>(null);
const modalDialog = ref<HTMLElement>(null);

let timeline: GSAPTimeline | null = null;

const showModal = (): void => {
  timeline.play();
};

const hideModal = (): void => {
  timeline.reverse();
};

onMounted(() => {
  timeline = gsap.timeline({ paused: true }).to(modalOverlay.value, {
    autoAlpha: 1,
    duration: 0.2,
    onComplete: () => {
      gsap.to(modalDialog.value, {
        autoAlpha: 1,
        ease: Power2.easeInOut,
        duration: 0.3
      });
    }
  });
});

defineExpose({
  showModal,
  hideModal
});
</script>

<template>
  <div class="modal-overlay" ref="modalOverlay">
    <div class="modal-dialog" ref="modalDialog">
      <div class="modal-dialog-main">
        <slot></slot>
      </div>
      <div class="modal-dialog-footer">
        <button class="button orange" @click="hideModal">OK</button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.modal-overlay {
  visibility: hidden;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: transparentize($color-black, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: $padding;
  z-index: $z-overlay;
  overflow-y: auto;

  .modal-dialog {
    visibility: hidden;
    @include blueprint-background;
    box-shadow: 0px 10px 20px -5px rgba(darken($color-blue, 4), 1);
    padding: 30px;
    border-radius: $border-radius;
    color: $color-white;
    width: 100%;

    @include respond-to('large') {
      width: 570px;
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

    &-footer {
      margin-top: $padding;
      text-align: center;
    }
  }
}
</style>

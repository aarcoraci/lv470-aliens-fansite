<script setup lang="ts">
import { ref } from 'vue';
import SiteModal from '../components/SiteModal.vue';

const userModal = ref<InstanceType<typeof SiteModal>>(null);

const clickAbout = (): void => {
  userModal.value.showModal();
};
const clickUser = (): void => {};
</script>
<template>
  <div class="navigation-panel">
    <button class="navigation-panel-button" @click="clickAbout">
      <i class="icon user"></i>
    </button>
    <button class="navigation-panel-button">
      <i class="icon help"></i>
    </button>
  </div>
  <site-modal ref="userModal"> Hello </site-modal>
</template>

<style lang="scss" scoped>
.navigation-panel {
  position: fixed;
  top: 0;
  left: 0;
  padding: 15px;
  width: 100%;
  z-index: 5;
  color: $color-white;
  display: flex;
  align-items: center;
  pointer-events: none;

  @include respond-to('large') {
    padding: 40px;
  }

  & > * {
    &:not(:last-child) {
      margin-right: 22px;
    }
  }

  .navigation-panel-button {
    pointer-events: all;
    display: inline-block;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: 1px solid $color-white;
    position: relative;
    cursor: pointer;

    @include respond-to('large') {
      width: 60px;
      height: 60px;
    }

    i.icon {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 23px;
      height: 23px;
      background-position: center center;
      background-size: 100% 100%;
      background-repeat: no-repeat;

      @include respond-to('large') {
        width: 27px;
        height: 27px;
      }
      &.user {
        background-image: url('~@/assets/img/user.svg');
      }
      &.help {
        background-image: url('~@/assets/img/help.svg');
      }
    }
  }
}
</style>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { gsap, Back } from 'gsap';
import SiteModal from '../components/SiteModal.vue';

const navigationPanel = ref<HTMLElement>(null);
const userModal = ref<InstanceType<typeof SiteModal>>(null);
const aboutModal = ref<InstanceType<typeof SiteModal>>(null);
let timeline: GSAPTimeline | null = null;

const clickUser = (): void => {
  userModal.value.showModal();
};
const clickAbout = (): void => {
  aboutModal.value.showModal();
};

const showPanel = (): void => {
  timeline.play();
};
const hidePanel = (): void => {
  timeline.reverse();
};

onMounted(() => {
  gsap.set(navigationPanel.value, {
    autoAlpha: 0,
    top: '-5%'
  });
  timeline = gsap.timeline({ paused: true }).to(navigationPanel.value, {
    duration: 0.29,
    ease: Back.easeOut,
    autoAlpha: 1,
    top: '0%'
  });
});

defineExpose({
  showPanel,
  hidePanel
});
</script>
<template>
  <div class="navigation-panel" ref="navigationPanel">
    <button class="navigation-panel-button" @click="clickUser">
      <i class="icon user"></i>
    </button>
    <button class="navigation-panel-button" @click="clickAbout">
      <i class="icon help"></i>
    </button>
  </div>
  <site-modal ref="userModal">
    <div class="modal-content">
      <h3>About Me</h3>
      <p>
        I'm Angel and I'm a software engineer with great passion for visual and
        interactive projects. I've been programming since I was a teen while I
        was in high school.
      </p>
      <p>
        This project is not only a kind of portfolio entry but also a good
        practice for me to take a look on the technologies I used to built it.
      </p>
      <p>
        I hope you find something interesting and maybe learn a bit from the
        source code 😊.
      </p>
      <p>
        I'm part of
        <a href="https://on3tech.com/" target="_blank" rel="noopener noreferrer"
          >On 3 Technologies</a
        >
        and we love to do projects like this. If you find this interesting let
        me know:
        <a href="mailto:angel@on3tech.com" target="_blank">angel@on3tech.com</a
        >.
      </p>
    </div>
  </site-modal>
  <site-modal ref="aboutModal">
    <div class="modal-content">
      <h3>About This Site</h3>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat porro
        eos, deserunt, voluptates optio amet libero, eveniet beatae laudantium
        quidem ex a iste omnis sed. Eaque explicabo unde earum necessitatibus.
      </p>
    </div>
  </site-modal>
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
<style lang="scss">
.modal-content {
  h3 {
    @include typo-h5;
  }
  p {
    margin-bottom: 15px;
  }
}
</style>

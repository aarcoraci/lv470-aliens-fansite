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
      <h4>About Me</h4>
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
      <h4>About This Site</h4>
      <p>
        The site is the result of a personal challenge I decided I wanted to
        share. The idea was to take a few technologies I like plus learn a few
        others and undust some dormant skills and try to put something together.
      </p>
      <p>
        The site is an Aliens fanpage heavily inspired by the James Cameron
        movie.
      </p>
      <h5>Technologies used</h5>
      <div class="technologies-showcase">
        <div class="tech-item">
          <div class="logo three"></div>
          three.js
        </div>
        <div class="tech-item">
          <div class="logo ts"></div>
          typescript
        </div>
        <div class="tech-item">
          <div class="logo vue"></div>
          vue
        </div>
        <div class="tech-item">
          <div class="logo blender"></div>
          blender
        </div>
        <div class="tech-item">
          <div class="logo gsap"></div>
          gsap
        </div>
      </div>
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
  p {
    margin-bottom: 15px;
  }
  .technologies-showcase {
    display: flex;
    margin-bottom: 30px;
    & > * {
      &:not(:last-child) {
        margin-right: 15px;
      }
    }
    .tech-item {
      display: inline-block;
      width: 70px;
      height: 70px;
      padding: 5px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      text-align: center;
      .logo {
        display: inline-block;
        width: 100%;
        height: 100%;
        background-repeat: no-repeat;
        background-size: contain;
        background-position: center center;
        margin-bottom: 5px;
        &.three {
          background-image: url('~@/assets/logos/logo_three.svg');
        }
        &.blender {
          background-image: url('~@/assets/logos/logo_blender.svg');
        }
        &.vue {
          background-image: url('~@/assets/logos/logo_vue.svg');
        }
        &.ts {
          background-image: url('~@/assets/logos/logo_typescript.svg');
        }
        &.gsap {
          background-image: url('~@/assets/logos/logo_gsap.svg');
        }
      }
    }
  }
}
</style>

<script setup lang="ts">
import * as THREE from 'three';
import { onMounted, onBeforeUnmount } from 'vue'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import HadleysHope from '../scene/hadleysHope/HadleysHope';
import * as TWEEN from "@tweenjs/tween.js";
import { Quaternion, Vector3 } from 'three';

const loader = new GLTFLoader();
const clock = new THREE.Clock();

let width = window.innerWidth;
let height = window.innerHeight;

const nearPlane = 0.1;
const farPlane = 1000;
const fov = 45;

let hadleysHope: HadleysHope;
let renderer: THREE.WebGLRenderer;
let camera: THREE.OrthographicCamera;
let perspectiveCamera: THREE.PerspectiveCamera;
let d = 10;

let animationRequestId;

const createScene = async (targetDomElement: Element) => {
  const aspect = width / height;
  hadleysHope = new HadleysHope();

  await hadleysHope.load(loader);

  perspectiveCamera = new THREE.PerspectiveCamera(fov, aspect, nearPlane, farPlane);
  perspectiveCamera.position.z = 0;
  perspectiveCamera.position.y = 20;
  perspectiveCamera.position.x = 0;
  perspectiveCamera.lookAt(hadleysHope.scene.position);

  camera = new THREE.OrthographicCamera(-d * aspect, d * aspect, d, -d, nearPlane, farPlane);
  camera.position.set(0, 10, 0);
  camera.lookAt(hadleysHope.scene.position);


  renderer = new THREE.WebGLRenderer({ alpha: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setClearColor(0x141A35);
  renderer.shadowMap.enabled = true;
  renderer.setSize(window.innerWidth, window.innerHeight);
  targetDomElement.appendChild(renderer.domElement);
}

const handleResize = () => {
  width = window.innerWidth;
  height = window.innerHeight;
  const aspect = width / height;

  renderer.setSize(width, height);

  updateCamera();

  // perspective
  perspectiveCamera.aspect = aspect;
  perspectiveCamera.updateProjectionMatrix();
}


const updateCamera = () => {
  width = window.innerWidth;
  height = window.innerHeight;
  const aspect = width / height;
  camera.left = -d * aspect;
  camera.right = d * aspect;
  camera.updateProjectionMatrix();
}



const animate = () => {
  camera.updateProjectionMatrix();
  TWEEN.update();
  animationRequestId = requestAnimationFrame(animate);
  hadleysHope.update(clock.getDelta());
  renderer.render(hadleysHope.scene, camera);
}

onMounted(async () => {
  const targetSceneElement = document.querySelector("#main-scene");
  await createScene(targetSceneElement);
  window.addEventListener("resize", handleResize);
  animate();
})

onBeforeUnmount(() => {
  cancelAnimationFrame(animationRequestId);
  hadleysHope.dispose();
  renderer.dispose();
  window.removeEventListener("resize", handleResize);
})

const animateCamera = () => {

  let position = new THREE.Vector3().copy(camera.position);
  const targetPosition = new THREE.Vector3(10, 10, 10);

  let rotation = { r: 0 };
  let targetRotation = { r: 1 };

  let zoom = { z: 1 };
  let targetZoom = { z: 2 };

  new TWEEN.Tween(rotation)
    .easing(TWEEN.Easing.Cubic.InOut)
    .to(targetRotation, 1200)
    .onUpdate(() => {
      camera.rotation.z += rotation.r * Math.PI / 180;
    }).onComplete(() => {
      new TWEEN.Tween(position)
        .easing(TWEEN.Easing.Quadratic.InOut)
        .to(targetPosition, 2200)
        .onUpdate(() => {
          camera.position.copy(position);
          camera.lookAt(hadleysHope.scene.position);
          updateCamera();
        })
        .onComplete(function () {
          camera.position.copy(targetPosition);
          camera.lookAt(hadleysHope.scene.position);
          updateCamera();
          new TWEEN.Tween(zoom)
            .easing(TWEEN.Easing.Quadratic.InOut)
            .to(targetZoom, 2200)
            .onUpdate(() => {
              camera.zoom = zoom.z;
              updateCamera();
            }).start();
        }).start();
    }).start();
}
</script>

<template>
  <main>
    <div class="controls">
      <button @click="animateCamera">click</button>
    </div>
    <div id="main-scene" class="main-scene"></div>
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
  gap: 10;
}
</style>
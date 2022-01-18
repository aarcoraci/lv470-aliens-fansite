<script setup lang="ts">
import * as THREE from 'three';
import { onMounted, onBeforeUnmount } from 'vue'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import HadleysHope from '../scene/hadleysHope/HadleysHope';

const loader = new GLTFLoader();
const clock = new THREE.Clock();

let width = window.innerWidth;
let height = window.innerHeight;

const nearPlane = 0.1;
const farPlane = 1000;
const fov = 75;

let hadleysHope: HadleysHope;
let renderer: THREE.WebGLRenderer;
let camera: THREE.OrthographicCamera;
let perspectiveCamera: THREE.PerspectiveCamera;
let d = 3;

let animationRequestId;

const createScene = (targetDomElement: Element) => {
  const aspect = width / height;
  hadleysHope = new HadleysHope();

  hadleysHope.load(loader);


  perspectiveCamera = new THREE.PerspectiveCamera(fov, aspect, nearPlane, farPlane);
  perspectiveCamera.position.z = 0;
  perspectiveCamera.position.y = 5;
  perspectiveCamera.position.x = 0;
  perspectiveCamera.lookAt(0, 0, 0);

  camera = new THREE.OrthographicCamera(-d * aspect, d * aspect, d, -d, nearPlane, farPlane);
  camera.position.set(10, 10, 10)
  camera.lookAt(hadleysHope.scene.position)
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
  camera.left = -d * aspect;
  camera.right = d * aspect;
  camera.updateProjectionMatrix();

  // perspective
  perspectiveCamera.aspect = aspect;
  perspectiveCamera.updateProjectionMatrix();
}

const animate = () => {
  animationRequestId = requestAnimationFrame(animate);
  hadleysHope.update(clock.getDelta());
  renderer.render(hadleysHope.scene, camera);
}

onMounted(() => {
  window.addEventListener("resize", handleResize);
  const targetSceneElement = document.querySelector("#main-scene");
  createScene(targetSceneElement);
  animate();
})

onBeforeUnmount(() => {
  cancelAnimationFrame(animationRequestId);
  hadleysHope.dispose();
  renderer.dispose();
  window.removeEventListener("resize", handleResize);
})
//createScene();

</script>

<template>
  <div id="main-scene"></div>
</template>
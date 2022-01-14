<script setup lang="ts">
import * as THREE from 'three';
import { ref, onMounted, onBeforeUnmount } from 'vue'

let width = window.innerWidth;
let height = window.innerHeight;

const nearPlane = 0.1;
const farPlane = 1000;
const fov = 75;

let scene: THREE.Scene;
let renderer: THREE.Renderer;
let camera: THREE.PerspectiveCamera;

const createScene = (targetDomElement: Element) => {
  const aspect = width / height;
  scene = new THREE.Scene();
  scene.add(createGround());
  camera = new THREE.PerspectiveCamera(fov, aspect, nearPlane, farPlane);
  camera.position
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  targetDomElement.appendChild(renderer.domElement);
  camera.position.z = 5;
}

const createGround = (): THREE.Mesh => {
  const geometry = new THREE.PlaneGeometry(2, 2);
  const material = new THREE.MeshBasicMaterial({ color: 0x2f4458 });
  const ground = new THREE.Mesh(geometry, material);
  return ground;
}

const handleResize = () => {
  width = window.innerWidth;
  height = window.innerHeight;
  renderer.setSize(width, height);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
}

const animate = () => {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

onMounted(() => {
  window.addEventListener("resize", handleResize);
  const targetSceneElement = document.querySelector("#main-scene");
  createScene(targetSceneElement);
  animate();
})

onBeforeUnmount(() => {
  window.removeEventListener("resize", handleResize);
})
//createScene();

</script>

<template>
  <div id="main-scene"></div>
</template>
<script setup lang="ts">
import * as THREE from 'three';
import { ref, onMounted, onBeforeUnmount } from 'vue'

let width = window.innerWidth;
let height = window.innerHeight;

let scene;
let renderer;
let camera;

//	const geometry = new THREE.BoxGeometry();
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);


const createScene = (targetDomElement: Element) => {
  scene = new THREE.Scene();
  scene.add(cube);
  camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  targetDomElement.appendChild(renderer.domElement);
  camera.position.z = 5;
}

const handleResize = () => {
  width = window.innerHeight;
  height = window.innerWidth;
  renderer.setSize(width, height);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
}

const animate = () => {
  requestAnimationFrame(animate);
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  renderer.render(scene, camera);
}


onMounted(() => {
  document.addEventListener("resize", handleResize);
  const targetSceneElement = document.querySelector("#main-scene");
  createScene(targetSceneElement);
  animate();
})

onBeforeUnmount(() => {
  document.removeEventListener("resize", handleResize);
})
//createScene();

</script>

<template>
  <div id="main-scene"></div>
</template>
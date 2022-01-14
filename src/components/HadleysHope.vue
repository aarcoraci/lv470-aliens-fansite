<script setup lang="ts">
import * as THREE from 'three';
import { Vector3 } from 'three';
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const loader = new GLTFLoader();

let width = window.innerWidth;
let height = window.innerHeight;

const nearPlane = 0.1;
const farPlane = 1000;
const fov = 75;

let scene: THREE.Scene;
let renderer: THREE.WebGLRenderer;
let camera: THREE.OrthographicCamera;
let d = 3;

const createScene = (targetDomElement: Element) => {
  const aspect = width / height;
  scene = new THREE.Scene();
  scene.add(createGround());
  // scene.add(createBox());

  loadModels(scene);

  scene.fog = new THREE.Fog(0xf7d9aa, 100, 950);

  scene.add(new THREE.AmbientLight(0x4000ff));
  const light = new THREE.PointLight(0xffffff, 5, 40);
  light.castShadow = true;
  light.position.set(10, 20, 15);
  scene.add(light);

  camera = new THREE.OrthographicCamera(-d * aspect, d * aspect, d, -d, nearPlane, farPlane);
  camera.position.set(20, 20, 20)
  camera.lookAt(scene.position)
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.shadowMap.enabled = true;
  renderer.setSize(window.innerWidth, window.innerHeight);
  targetDomElement.appendChild(renderer.domElement);
}

const createGround = (): THREE.Mesh => {
  const geometry = new THREE.PlaneGeometry(5, 5);
  const material = new THREE.MeshPhongMaterial({
    color: 0x555555,
    specular: 0xffffff,
    shininess: 50,
    side: THREE.DoubleSide
  });
  const ground = new THREE.Mesh(geometry, material);
  ground.receiveShadow = true;
  ground.rotateX(Math.PI / 2);
  return ground;
}

const createBox = (): THREE.Mesh => {
  const geometry = new THREE.BoxGeometry();
  const material = new THREE.MeshPhongMaterial({
    color: 0x555555,
    specular: 0xffffff,
    shininess: 50,
    side: THREE.DoubleSide
  });
  const ground = new THREE.Mesh(geometry, material);
  ground.position.y = 0.5;
  ground.castShadow = true;
  return ground;
}

const loadModels = (scene: THREE.Scene) => {
  loader.load('./models/ambient.gltf', function (gltf) {
    gltf.scene.traverse(function (node) {
      if (node.isObject3D) { node.castShadow = true; node.receiveShadow = true; }
    });
    gltf.scene.rotateY(Math.PI * .15);
    scene.add(gltf.scene);
  }, undefined, function (error) {
    console.error(error);
  });
}

const handleResize = () => {
  width = window.innerWidth;
  height = window.innerHeight;
  const aspect = width / height;

  renderer.setSize(width, height);
  camera.left = -d * aspect;
  camera.right = d * aspect;
  // camera.aspect = aspect;
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
<script setup lang="ts">
import * as THREE from 'three';
import { onMounted, onBeforeUnmount } from 'vue'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import HadleysHope from '../scene/hadleysHope/HadleysHope';
import * as TWEEN from "@tweenjs/tween.js";
import { OrthographicCamera, Quaternion, Vector3 } from 'three';
import BaseSceneElement from '../scene/base/BaseSceneElement';
import Operations from '../scene/hadleysHope/elements/Operations';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

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
let cameraControls: OrbitControls | null;
let d = 10;

let animationRequestId;

const createScene = async (targetDomElement: Element) => {
  const aspect = width / height;
  hadleysHope = new HadleysHope();

  await hadleysHope.load(loader);

  camera = new THREE.OrthographicCamera(-d * aspect, d * aspect, d, -d, nearPlane, farPlane);
  camera.position.set(0, d, 0);
  camera.lookAt(hadleysHope.scene.position);


  renderer = new THREE.WebGLRenderer({ alpha: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setClearColor(0x141A35);
  renderer.shadowMap.enabled = true;
  renderer.setSize(window.innerWidth, window.innerHeight);
  targetDomElement.appendChild(renderer.domElement);
}

const createCameraControls = () => {
  if (cameraControls != null) {
    return;
  }
  // controls
  cameraControls = new OrbitControls(camera, renderer.domElement);
  cameraControls.enableRotate = false;
  cameraControls.enableZoom = true;
  cameraControls.maxZoom = 4;
  cameraControls.minZoom = 2;
  cameraControls.touches.ONE = THREE.TOUCH.PAN;
  cameraControls.mouseButtons.LEFT = THREE.MOUSE.PAN;

  const limitPan = createLimitPan(camera, cameraControls);
  cameraControls.addEventListener("change", e => {
    limitPan({ minX: 0, maxX: 9, minZ: 0, maxZ: 6, minY: 0, maxY: 4 });
    // console.log(cameraControls.target);
    // console.log(camera.position);
  });
}

const handleResize = () => {
  width = window.innerWidth;
  height = window.innerHeight;
  renderer.setSize(width, height);
  updateCamera();
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
  TWEEN.update();
  animationRequestId = requestAnimationFrame(animate);
  if (cameraControls != null) {
    cameraControls.update();
  }
  hadleysHope.update(clock.getDelta());
  renderer.render(hadleysHope.scene, camera);
}

onMounted(async () => {
  const targetSceneElement = document.querySelector("#main-scene");
  await createScene(targetSceneElement);
  window.addEventListener("resize", handleResize);
  animate();
});

onBeforeUnmount(() => {
  cancelAnimationFrame(animationRequestId);
  hadleysHope.dispose();
  renderer.dispose();
  window.removeEventListener("resize", handleResize);
});

const createLimitPan = (camera: OrthographicCamera, controls: OrbitControls) => {
  const v = new THREE.Vector3()
  const minPan = new THREE.Vector3()
  const maxPan = new THREE.Vector3()
  return ({
    maxX = Infinity,
    minX = -Infinity,
    maxY = Infinity,
    minY = -Infinity,
    maxZ = Infinity,
    minZ = -Infinity,
  }) => {
    minPan.set(minX, minY, minZ)
    maxPan.set(maxX, maxY, maxZ)
    v.copy(controls.target)
    controls.target.clamp(minPan, maxPan)
    v.sub(controls.target)
    camera.position.sub(v)
  }
}

/**
 * Moving the camera while the controls (orbit) are active requires not only moving
 * the camera to a target also move the target (focal target) of the controls keeping the 
 * desired offset Vector
 * @param target 
 */
const focusTarget = (target: BaseSceneElement): void => {

  cameraControls.enabled = false;
  let position = new THREE.Vector3().copy(camera.position);
  const targetPosition = target.meshes[0].position.clone();



  targetPosition.y = d; // lock x and z
  targetPosition.add(new Vector3(d, 0, d));
  // zoom
  let zoom = { z: camera.zoom };
  let targetZoom = { z: 3 };

  const trackingTween = new TWEEN.Tween(position)
    .to(targetPosition, 2200)
    .easing(TWEEN.Easing.Cubic.InOut)
    .onUpdate(() => {
      camera.position.copy(position);
      // the focus point must be updated as well
      cameraControls.target.copy(camera.position.clone().sub(new Vector3(d, d, d)));
      cameraControls.update();
    });

  const zoomTween = new TWEEN.Tween(zoom)
    .easing(TWEEN.Easing.Quadratic.Out)
    .to(targetZoom, 1100)
    .onUpdate(() => {
      camera.zoom = zoom.z;
      updateCamera();
    }).onComplete(() => {
      cameraControls.enabled = true;
    });

  trackingTween.chain(zoomTween);
  trackingTween.start();
}

const animateCamera = () => {
  // position
  let position = new THREE.Vector3().copy(camera.position);
  const targetPosition = new THREE.Vector3(d, d, d);

  // rotation
  const rotation = camera.rotation.clone();
  let rotationQuaterion = new Quaternion();
  rotationQuaterion.setFromEuler(rotation);

  // calculate final rotation by moving and rotating the camera, then resetting to its original values
  camera.position.copy(targetPosition);
  camera.lookAt(hadleysHope.scene.position);
  const targetRotation = camera.rotation.clone();
  const targetRotationQuaternion = new Quaternion();
  targetRotationQuaternion.setFromEuler(targetRotation);

  // reset to initial animation
  camera.position.copy(position);
  camera.lookAt(hadleysHope.scene.position);

  // zoom
  let zoom = { z: 1 };
  let targetZoom = { z: 2 };

  const positionTween = new TWEEN.Tween(position)
    .to(targetPosition, 2200)
    .easing(TWEEN.Easing.Cubic.InOut)
    .onUpdate(() => {
      camera.position.copy(position);
      updateCamera();
    })
    .onStart(() => {
      rotationTween.start();
    });

  const rotationTween = new TWEEN.Tween(rotationQuaterion)
    .to(targetRotationQuaternion, 2200)
    .easing(TWEEN.Easing.Cubic.InOut)
    .onUpdate(() => {
      camera.rotation.setFromQuaternion(rotationQuaterion);
      updateCamera();
    });

  const zoomTween = new TWEEN.Tween(zoom)
    .easing(TWEEN.Easing.Quadratic.Out)
    .to(targetZoom, 1100)
    .onUpdate(() => {
      camera.zoom = zoom.z;
      updateCamera();
    }).onComplete(() => {
      createCameraControls();

    });

  rotationTween.chain(zoomTween);
  positionTween.start();
}

const targetOperations = (): void => {
  const target = hadleysHope.sceneElements.find(e => e.name == Operations.BUILDING_NAME);
  focusTarget(target);
}


</script>

<template>
  <main>
    <div class="controls">
      <button @click="animateCamera">click</button>
      <button @click="targetOperations">click</button>
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
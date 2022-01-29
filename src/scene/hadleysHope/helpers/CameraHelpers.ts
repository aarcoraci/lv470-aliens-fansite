import { Quaternion, Vector3 } from 'three';
import Orchestrator from '../Orchestrator';
import * as TWEEN from '@tweenjs/tween.js';

abstract class CameraHelpers {
  static transitionFromTopToMain(orchestrator: Orchestrator): void {
    // position
    const camera = orchestrator.camera;
    const d = orchestrator.d;

    let position = new Vector3().copy(camera.position);
    const targetPosition = new Vector3(d, d, d);

    // rotation
    const rotation = camera.rotation.clone();
    const rotationQuaterion = new Quaternion();
    rotationQuaterion.setFromEuler(rotation);

    // calculate final rotation by moving and rotating the camera, then resetting to its original values
    camera.position.copy(targetPosition);
    camera.lookAt(orchestrator.getCurrentScene().scene.position);
    const targetRotation = camera.rotation.clone();
    const targetRotationQuaternion = new Quaternion();
    targetRotationQuaternion.setFromEuler(targetRotation);

    // reset to initial animation
    camera.position.copy(position);
    camera.lookAt(orchestrator.getCurrentScene().scene.position);

    // zoom
    let zoom = { z: camera.zoom };
    let targetZoom = { z: 2 };

    // build tweens
    const positionTween = new TWEEN.Tween(position)
      .to(targetPosition, 2200)
      .easing(TWEEN.Easing.Cubic.InOut)
      .onUpdate(() => {
        camera.position.copy(position);
        camera.updateProjectionMatrix();
      })
      .onStart(() => {
        rotationTween.start();
      });

    const rotationTween = new TWEEN.Tween(rotationQuaterion)
      .to(targetRotationQuaternion, 2200)
      .easing(TWEEN.Easing.Cubic.InOut)
      .onUpdate(() => {
        camera.rotation.setFromQuaternion(rotationQuaterion);
        camera.updateProjectionMatrix();
      });

    const zoomTween = new TWEEN.Tween(zoom)
      .easing(TWEEN.Easing.Quadratic.Out)
      .to(targetZoom, 1100)
      .onUpdate(() => {
        camera.zoom = zoom.z;
        camera.updateProjectionMatrix();
      })
      .onComplete(() => {
        orchestrator.createCameraControls();
        if (orchestrator.onTransitionToRegularFinished) {
          orchestrator.onTransitionToRegularFinished();
        }
      });

    rotationTween.chain(zoomTween);
    positionTween.start();
  }
}

export default CameraHelpers;

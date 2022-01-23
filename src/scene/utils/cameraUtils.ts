import { OrthographicCamera, Vector3 } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const createLimitPan = (
  camera: OrthographicCamera,
  controls: OrbitControls
) => {
  const v = new Vector3();
  const minPan = new Vector3();
  const maxPan = new Vector3();
  return ({
    maxX = Infinity,
    minX = -Infinity,
    maxY = Infinity,
    minY = -Infinity,
    maxZ = Infinity,
    minZ = -Infinity
  }) => {
    minPan.set(minX, minY, minZ);
    maxPan.set(maxX, maxY, maxZ);
    v.copy(controls.target);
    controls.target.clamp(minPan, maxPan);
    v.sub(controls.target);
    camera.position.sub(v);
  };
};

export { createLimitPan };

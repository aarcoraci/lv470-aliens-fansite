import { Object3D } from "three";
import BaseSceneElement from "./BaseSceneElement";

interface SceneBuildingConstructor<T extends BaseSceneElement> {
  construct(node: Object3D): T | null;
}

export default SceneBuildingConstructor;

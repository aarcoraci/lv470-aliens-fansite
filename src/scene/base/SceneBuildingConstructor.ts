import { Object3D } from "three";
import BaseBuilding from "./BaseBuilding";

interface SceneBuildingConstructor<T extends BaseBuilding> {
  construct(node: Object3D): T | null;
}

export default SceneBuildingConstructor;

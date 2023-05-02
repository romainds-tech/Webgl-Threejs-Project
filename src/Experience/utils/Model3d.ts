import { AnimationAction, AnimationMixer, Clock, Group, Vector3 } from "three";

export enum Model3DType {
  FBX,
  GLB,
}

/**
 * Définition d'un Modele 3D
 */
export interface IModel3D {
  path: string;
  type: Model3DType;
  position: Vector3;
  rotation: Vector3;
  scale: number;
  animation: boolean;
  clock?: Clock;
}

export default class Model3D {
  path: string;
  type: Model3DType;
  position: Vector3;
  rotation: Vector3;
  scale: number;
  animation: boolean;
  clock?: Clock;
  mixer?: AnimationMixer;
  loadedModel3D?: Group;
  animationAction?: AnimationAction[];

  constructor(props: IModel3D) {
    this.path = props.path;
    this.type = props.type;
    this.position = props.position;
    this.rotation = props.rotation;
    this.scale = props.scale;
    this.animation = props.animation;
    this.clock = props.clock;
  }

  destroy() {
    this.clock?.stop();
    this.mixer?.stopAllAction();
    this.mixer = undefined;
    this.loadedModel3D = undefined;
    this.animationAction = undefined;
  }
}

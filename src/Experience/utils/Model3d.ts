import { AnimationAction, AnimationMixer, Clock, Group, Vector3 } from "three";

export enum Model3DType {
  FBX,
  GLB,
}

/**
 * Définition d'un Modele 3D
 */
export interface IModel3D {
  name: string;
  properties: {
    path: string;
    type: Model3DType;
    position: Vector3;
    rotation: Vector3;
    scale: number;
    animation: boolean;
    clock: Clock;
  };
}

export default class Model3D {
  name: string;
  properties: {
    path: string;
    type: Model3DType;
    position: Vector3;
    rotation: Vector3;
    scale: number;
    animation: boolean;
    clock: Clock;
    mixer: undefined | AnimationMixer;
    loadedModel3D: undefined | Group;
    animationAction: undefined | AnimationAction[];
  };
  constructor(props: IModel3D) {
    this.name = props.name;
    this.path = props.properties.path;
    this.type = props.properties.type;
    this.position = props.properties.position;
    this.rotation = props.properties.rotation;
    this.scale = props.properties.scale;
    this.animation = props.properties.animation;
    this.clock = props.properties.clock;
  }
}

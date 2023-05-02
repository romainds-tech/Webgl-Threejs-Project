import {
  AxesHelper,
  AnimationAction,
  AnimationMixer,
  Clock,
  Group,
  Vector3,
  Object3D,
} from "three";
import { Experience } from "../Experience";
import Debug from "./Debug";
import { GUI } from "lil-gui";

export enum Model3DType {
  FBX,
  GLB,
}

/**
 * Définition d'un Modele 3D
 */
export interface IModel3D {
  name: string;
  path: string;
  type: Model3DType;
  position: Vector3;
  rotation: Vector3;
  scale: number;
  animation: boolean;
  clock?: Clock;
}

export default class Model3D {
  experience: Experience;
  object: Object3D;
  debug: Debug;

  name: string;
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
    this.experience = Experience.getInstance();
    this.debug = this.experience.debug;

    this.name = props.name;
    this.path = props.path;
    this.type = props.type;
    this.position = props.position;
    this.rotation = props.rotation;
    this.scale = props.scale;
    this.animation = props.animation;
    this.clock = props.clock;

    this.object = new Object3D();

    this.addDebug();
  }

  destroy() {
    this.clock?.stop();
    this.mixer?.stopAllAction();
    this.mixer = undefined;
    this.loadedModel3D = undefined;
    this.animationAction = undefined;
  }

  addDebug() {
    if (this.debug.active) {
      this.object.add(new AxesHelper(10));
      const modelNameFolder: GUI = this.debug.debugModelFolder!.addFolder(
        this.name
      );
      modelNameFolder.add(this.object.position, "x").name("Position X");
      modelNameFolder.add(this.object.position, "y").name("Position Y");
      modelNameFolder.add(this.object.position, "z").name("Position Z");

      modelNameFolder.add(this.object.rotation, "x").name("Rotation X");
      modelNameFolder.add(this.object.rotation, "y").name("Rotation Y");
      modelNameFolder.add(this.object.rotation, "z").name("Rotation Z");

      modelNameFolder.add(this.object.scale, "x").name("Scale X");
      modelNameFolder.add(this.object.scale, "y").name("Scale Y");
      modelNameFolder.add(this.object.scale, "z").name("Scale Z");
    }
  }
}

import {
  AxesHelper,
  AnimationAction,
  AnimationMixer,
  Clock,
  Group,
  Vector3,
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
}

export default class Model3D {
  experience: Experience;
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
      this.loadedModel3D?.add(new AxesHelper(10));
      const modelNameFolder: GUI = this.debug.debugModelFolder!.addFolder(
        this.name
      );
      modelNameFolder.add(this.loadedModel3D!.position, "x").name("Position X");
      modelNameFolder.add(this.loadedModel3D!.position, "y").name("Position Y");
      modelNameFolder.add(this.loadedModel3D!.position, "z").name("Position Z");

      modelNameFolder.add(this.loadedModel3D!.rotation, "x").name("Rotation X");
      modelNameFolder.add(this.loadedModel3D!.rotation, "y").name("Rotation Y");
      modelNameFolder.add(this.loadedModel3D!.rotation, "z").name("Rotation Z");

      modelNameFolder.add(this.loadedModel3D!.scale, "x").name("Scale X");
      modelNameFolder.add(this.loadedModel3D!.scale, "y").name("Scale Y");
      modelNameFolder.add(this.loadedModel3D!.scale, "z").name("Scale Z");
    }
  }
}

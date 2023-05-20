import { Gltf } from "../utils/utils";
import { Clock, Vector3 } from "three";

export const glbPromises: Gltf[] = [
  {
    path: "glb/robot.glb",
    position: new Vector3(0, 0, -2),
    rotation: new Vector3(0, 0, 0),
    animation: true,
    clock: new Clock(),
    mixer: undefined,
    loadedGltf: undefined,
    animationAction: undefined,
  },
  {
    path: "glb/robot2.gltf",
    position: new Vector3(0, 0, -4),
    rotation: new Vector3(0, 0, 0),
    animation: true,
    clock: new Clock(),
    mixer: undefined,
    loadedGltf: undefined,
    animationAction: undefined,
  },
  {
    path: "glb/robot2.glb",
    position: new Vector3(0, 0, 2),
    rotation: new Vector3(0, 0, 0),
    animation: true,
    clock: new Clock(),
    mixer: undefined,
    loadedGltf: undefined,
    animationAction: undefined,
  },
  {
    path: "glb/just-robot.gltf",
    position: new Vector3(0, 0, 1),
    rotation: new Vector3(0, 0, 0),
    animation: true,
    clock: new Clock(),
    mixer: undefined,
    loadedGltf: undefined,
    animationAction: undefined,
  } /*,
  {
    path: "glb/robot_rig_export.gltf",
    position: new Vector3(0, 0, 3),
    rotation: new Vector3(0, 0, 0),
    animation: true,
    clock: new Clock(),
    mixer: undefined,
    loadedGltf: undefined,
    animationAction: undefined,
  },
  */,
  {
    path: "glb/lattive_test.gltf",
    position: new Vector3(0, 3, 1),
    rotation: new Vector3(0, 0, 0),
    animation: true,
    clock: new Clock(),
    mixer: undefined,
    loadedGltf: undefined,
    animationAction: undefined,
  },
];
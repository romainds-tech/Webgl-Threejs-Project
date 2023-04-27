import { Clock, Vector3 } from "three";
import Model3D, { Model3DType } from "../../Experience/utils/Model3d";

export const glbPromises: Model3D[] = [
  new Model3D({
    name: "robot1",
    properties: {
      path: "glb/robot.glb",
      type: Model3DType.GLB,
      position: new Vector3(0, 0, -2),
      rotation: new Vector3(0, 0, 0),
      scale: 0.1,
      animation: true,
      clock: new Clock(),
    },
  }),
  new Model3D({
    name: "robot2.1",
    properties: {
      path: "glb/robot2.gltf",
      type: Model3DType.GLB,
      position: new Vector3(0, 0, -4),
      rotation: new Vector3(0, 0, 0),
      scale: 0.1,
      animation: true,
      clock: new Clock(),
    },
  }),
  new Model3D({
    name: "robot2.2",
    properties: {
      path: "glb/robot2.glb",
      type: Model3DType.GLB,
      position: new Vector3(0, 0, 2),
      rotation: new Vector3(0, 0, 0),
      scale: 0.1,
      animation: true,
      clock: new Clock(),
    },
  }),
  new Model3D({
    name: "just-robot",
    properties: {
      path: "glb/just-robot.gltf",
      type: Model3DType.GLB,
      position: new Vector3(0, 0, 1),
      rotation: new Vector3(0, 0, 0),
      scale: 0.1,
      animation: true,
      clock: new Clock(),
    },
  }) /*,
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
  new Model3D({
    name: "lattive_test",
    properties: {
      path: "glb/lattive_test.gltf",
      type: Model3DType.GLB,
      position: new Vector3(0, 3, 1),
      rotation: new Vector3(0, 0, 0),
      scale: 0.1,
      animation: true,
      clock: new Clock(),
    },
  }),
];

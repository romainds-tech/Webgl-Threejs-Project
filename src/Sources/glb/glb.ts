import { Clock, Vector3 } from "three";
import Model3D, { Model3DType } from "../../Experience/utils/Model3d";

export const allGlbs = {
  Robot: new Model3D({
    path: "glb/robot.glb",
    type: Model3DType.GLB,
    position: new Vector3(0, 0, -2),
    rotation: new Vector3(0, 0, 0),
    scale: 0.1,
    animation: true,
    clock: new Clock(),
  }),

  Robot2Gltf: new Model3D({
    path: "glb/robot2.gltf",
    type: Model3DType.GLB,
    position: new Vector3(0, 0, -4),
    rotation: new Vector3(0, 0, 0),
    scale: 0.1,
    animation: true,
    clock: new Clock(),
  }),

  Robot2Glb: new Model3D({
    path: "glb/robot2.glb",
    type: Model3DType.GLB,
    position: new Vector3(0, 0, 2),
    rotation: new Vector3(0, 0, 0),
    scale: 0.1,
    animation: true,
    clock: new Clock(),
  }),

  JustRobot: new Model3D({
    path: "glb/just-robot.gltf",
    type: Model3DType.GLB,
    position: new Vector3(0, 0, 1),
    rotation: new Vector3(0, 0, 0),
    scale: 0.1,
    animation: true,
    clock: new Clock(),
  }),

  Lattive: new Model3D({
    path: "glb/lattive_test.gltf",
    type: Model3DType.GLB,
    position: new Vector3(0, 3, 1),
    rotation: new Vector3(0, 0, 0),
    scale: 0.1,
    animation: true,
    clock: new Clock(),
  }),
};

import { Vector3 } from "three";
import { Model3DType } from "../../Experience/utils/Model3d";

export const allGlbs = {
  ThreeVertex: {
    name: "ThreeVertex",
    path: "glb/tree_with_vertex.gltf",
    type: Model3DType.GLB,
    position: new Vector3(0, 0, 0),
    rotation: new Vector3(0, 0, 0),
    scale: 0.01,
    animation: false,
  },

  LowTree: {
    name: "LowTree",
    path: "glb/low_tree.gltf",
    type: Model3DType.GLB,
    position: new Vector3(0, 0, 0),
    rotation: new Vector3(0, 0, 0),
    scale: 0.01,
    animation: false,
  },
  TempleCircle1: {
    name: "TempleCircle1",
    path: "glb/temple_circle_1.gltf",
    type: Model3DType.GLB,
    position: new Vector3(-1, 0, 0.2),
    rotation: new Vector3(0, -90, 0),
    scale: 0.01,
    animation: false,
  },
  TempleCircle2: {
    name: "TempleCircle2",
    path: "glb/temple_circle_2.gltf",
    type: Model3DType.GLB,
    position: new Vector3(-1, 0, 0.2),
    rotation: new Vector3(0, -90, 0),
    scale: 0.01,
    animation: false,
  },
  Temple: {
    name: "Temple",
    path: "glb/temple.gltf",
    type: Model3DType.GLB,
    position: new Vector3(0, 0, 0),
    rotation: new Vector3(0, -90, 0),
    scale: 0.01,
    animation: false,
  },
  Herbe: {
    name: "Herbe",
    path: "glb/herbe.gltf",
    type: Model3DType.GLB,
    position: new Vector3(0, 3, 0),
    rotation: new Vector3(0, 0, 0),
    scale: 0.1,
    animation: true,
  },
  Island: {
    name: "Island",
    path: "glb/island.gltf",
    type: Model3DType.GLB,
    position: new Vector3(0, 0, 0),
    rotation: new Vector3(0, 0, 0),
    scale: 0.1,
    animation: true,
  },
  CubeVertexGroup: {
    name: "Cube Vertex Group",
    path: "glb/cube_vertex.gltf",
    type: Model3DType.GLB,
    position: new Vector3(0, 0, 0),
    rotation: new Vector3(0, 0, 0),
    scale: 0.1,
    animation: true,
  },
  Robot: {
    name: "Robot",
    path: "glb/robot.glb",
    type: Model3DType.GLB,
    position: new Vector3(0, 0, -2),
    rotation: new Vector3(0, 0, 0),
    scale: 0.1,
    animation: true,
  },

  Robot2Gltf: {
    name: "Robot 2 GLTF",
    path: "glb/robot2.gltf",
    type: Model3DType.GLB,
    position: new Vector3(0, 0, -4),
    rotation: new Vector3(0, 0, 0),
    scale: 0.1,
    animation: true,
  },

  Robot2Glb: {
    name: "Robot 2 Glb",
    path: "glb/robot2.glb",
    type: Model3DType.GLB,
    position: new Vector3(0, 0, 2),
    rotation: new Vector3(0, 0, 0),
    scale: 0.1,
    animation: true,
  },

  JustRobot: {
    name: "Just Robot",
    path: "glb/just-robot.gltf",
    type: Model3DType.GLB,
    position: new Vector3(0, 0, 1),
    rotation: new Vector3(0, 0, 0),
    scale: 0.1,
    animation: true,
  },

  Lattive: {
    name: "Lattive",
    path: "glb/lattive_test.gltf",
    type: Model3DType.GLB,
    position: new Vector3(0, 3, 1),
    rotation: new Vector3(0, 0, 0),
    scale: 0.1,
    animation: true,
  },
};

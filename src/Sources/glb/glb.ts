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
    position: new Vector3(0, 0, 0),
    rotation: new Vector3(0, -90, 0),
    scale: 0.01,
    animation: false,
  },
  TempleCircle2: {
    name: "TempleCircle2",
    path: "glb/temple_circle_2.gltf",
    type: Model3DType.GLB,
    position: new Vector3(0, 0, 0),
    rotation: new Vector3(0, -90, 0),
    scale: 0.01,
    animation: false,
  },
  Temple: {
    name: "Temple",
    path: "glb/temple.gltf",
    type: Model3DType.GLB,
    position: new Vector3(0.8, 0, 0),
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
    position: new Vector3(0, 0, 0),
    rotation: new Vector3(0, 0, 0),
    scale: 0.01,
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

  Island: {
    name: "Island",
    path: "glb/island_test.gltf",
    type: Model3DType.GLB,
    position: new Vector3(0, 0, 0),
    rotation: new Vector3(0, 20, 0),
    scale: 1,
    animation: true,
  },

  Cards: {
    name: "Cards",
    path: "glb/cards_v1.gltf",
    type: Model3DType.GLB,
    position: new Vector3(-4, 0, 2),
    rotation: new Vector3(0, 0, 0),
    scale: 1,
    animation: true,
  },

  Background: {
    name: "Background",
    path: "glb/bg.gltf",
    type: Model3DType.GLB,
    position: new Vector3(12, -5, 11),
    rotation: new Vector3(-1.6, 3.1, 2.4),
    scale: 2,
    animation: false,
  },

  Card1: {
    name: "Card1",
    path: "glb/cartomancie/carte_1.gltf",
    type: Model3DType.GLB,
    position: new Vector3(-4, 4, -4),
    rotation: new Vector3(0, Math.PI, 0),
    scale: 2.7,
    animation: true,
  },

  Card2: {
    name: "Card2",
    path: "glb/cartomancie/carte_2.gltf",
    type: Model3DType.GLB,
    position: new Vector3(-4, 4, -4),
    rotation: new Vector3(0, Math.PI, 0),
    scale: 2.7,
    animation: true,
  },

  Card3: {
    name: "Card3",
    path: "glb/cartomancie/carte_3.gltf",
    type: Model3DType.GLB,
    position: new Vector3(-4, 4, -4),
    rotation: new Vector3(0, Math.PI, 0),
    scale: 2.7,
    animation: true,
  },

  Card4: {
    name: "Card4",
    path: "glb/cartomancie/carte_4.gltf",
    type: Model3DType.GLB,
    position: new Vector3(-4, 4, -4),
    rotation: new Vector3(0, Math.PI, 0),
    scale: 2.7,
    animation: true,
  },
};

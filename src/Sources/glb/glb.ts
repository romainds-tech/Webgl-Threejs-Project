import { Vector3 } from "three";
import { Model3DType } from "../../Experience/utils/Model3d";
import { data } from "../../shaders/beacon/data";
import { data1 } from "../../shaders/glyphes/data";

export const allGlbs = {
  TempleCircle1: {
    name: "TempleCircle1",
    path: "glb/anneaux_grand.gltf",
    type: Model3DType.GLB,
    position: new Vector3(0, 0, 0),
    rotation: new Vector3(0, -90, 0),
    scale: 0.01,
    animation: false,
    shadow: false,
    transmission: false,
  },
  TempleCircle1Bis: {
    name: "TempleCircle1Bis",
    path: "glb/anneaux_grand_bis.gltf",
    type: Model3DType.GLB,
    position: new Vector3(0, 0, 0),
    rotation: new Vector3(0, -90, 0),
    scale: 0.01,
    animation: false,
    shadow: false,
    nodeToyMaterial: data1,
    transmission: false,
  },
  TempleCircle2: {
    name: "TempleCircle2",
    path: "glb/anneaux_petit.gltf",
    type: Model3DType.GLB,
    position: new Vector3(0, 0, 0),
    rotation: new Vector3(0, -90, 0),
    scale: 0.01,
    animation: false,
    shadow: false,
    transmission: false,
  },
  Temple: {
    name: "Temple",
    path: "glb/temple.gltf",
    type: Model3DType.GLB,
    position: new Vector3(-0.2, 0, -2.2),
    rotation: new Vector3(0, -90, 0),
    scale: 0.01,
    animation: false,
    shadow: false,
    transmission: false,
  },

  Island: {
    name: "Island",
    path: "glb/island_bake_1.gltf",
    type: Model3DType.GLB,
    position: new Vector3(0, -0.5, 0),
    rotation: new Vector3(0, Math.PI / 2, 0),
    scale: 1,
    animation: true,
    shadow: true,
    transmission: false,
  },

  Batons2: {
    name: "Batons2",
    path: "glb/cartomancie/2_batons.gltf",
    type: Model3DType.GLB,
    position: new Vector3(0, 1, 0),
    rotation: new Vector3(0, 3.8, 0),
    scale: 2.7,
    animation: true,
    shadow: true,
    transmission: false,
  },

  Batons4: {
    name: "Batons4",
    path: "glb/cartomancie/baton4.gltf",
    type: Model3DType.GLB,
    position: new Vector3(0, 1, 0),
    rotation: new Vector3(0, 3.8, 0),
    scale: 2.7,
    animation: true,
    shadow: true,
    transmission: false,
  },

  Cup6: {
    name: "Cup6",
    path: "glb/cartomancie/cup6.gltf",
    type: Model3DType.GLB,
    position: new Vector3(0, 1, 0),
    rotation: new Vector3(0, 3.8, 0),
    scale: 2.7,
    animation: true,
    shadow: true,
    transmission: false,
  },

  Jugement: {
    name: "Jugement",
    path: "glb/cartomancie/jugement.gltf",
    type: Model3DType.GLB,
    position: new Vector3(0, 1, 0),
    rotation: new Vector3(0, 3.8, 0),
    scale: 2.7,
    animation: true,
    shadow: true,
    transmission: false,
  },

  Lune: {
    name: "Lune",
    path: "glb/cartomancie/lune.gltf",
    type: Model3DType.GLB,
    position: new Vector3(0, 1, 0),
    rotation: new Vector3(0, 3.8, 0),
    scale: 2.7,
    animation: true,
    shadow: true,
    transmission: false,
  },

  Sword: {
    name: "Sword",
    path: "glb/cartomancie/sword_7.gltf",
    type: Model3DType.GLB,
    position: new Vector3(0, 1, 0),
    rotation: new Vector3(0, 3.8, 0),
    scale: 2.7,
    animation: true,
    shadow: true,
    transmission: false,
  },

  Temperance: {
    name: "Temperance",
    path: "glb/cartomancie/temperance.gltf",
    type: Model3DType.GLB,
    position: new Vector3(0, 1, 0),
    rotation: new Vector3(0, 3.8, 0),
    scale: 2.7,
    animation: true,
    shadow: true,
    transmission: false,
  },

  Cylindre: {
    name: "Cylindre",
    path: "glb/cylindre.gltf",
    type: Model3DType.GLB,
    position: new Vector3(0, 5, 0),
    rotation: new Vector3(0, 0, 0),
    scale: 1,
    animation: false,
    shadow: false,
    nodeToyMaterial: data,
    transmission: false,
  },

  IleBakeMoche: {
    name: "IleBakeMoche",
    path: "glb/island_bake_1.gltf",
    type: Model3DType.GLB,
    position: new Vector3(0, 0, 0),
    rotation: new Vector3(0, 0, 0),
    scale: 1,
    animation: true,
    shadow: true,
    transmission: false,
  },

  SceneCard: {
    name: "SceneCard",
    path: "glb/cartomancie/scene_cards.gltf",
    type: Model3DType.GLB,
    position: new Vector3(-4, 0, 2),
    rotation: new Vector3(0, Math.PI / 2, 0),
    scale: 1,
    animation: true,
    shadow: true,
    transmission: false,
  },

  Cards: {
    name: "Cards",
    path: "glb/cartomancie/cards_v3.gltf",
    type: Model3DType.GLB,
    position: new Vector3(-4, -0.4, 6),
    rotation: new Vector3(0, 0, 0),
    scale: 1,
    animation: true,
    shadow: true,
    transmission: false,
  },

  Fiole: {
    name: "Fiole",
    path: "glb/fiole_geode.gltf",
    type: Model3DType.GLB,
    position: new Vector3(0, 0, 0),
    rotation: new Vector3(0, 0, 0),
    scale: 1,
    animation: false,
    shadow: true,
    transmission: true,
  },

  RingJowel: {
    name: "RingJowel",
    path: "glb/objet_anneau.gltf",
    type: Model3DType.GLB,
    position: new Vector3(-4, 7, -5),
    rotation: new Vector3(0, 5.5, 0),
    scale: 2,
    animation: true,
    shadow: true,
    transmission: false,
  },

  flame: {
    name: "flame",
    path: "glb/FLAMME.gltf",
    type: Model3DType.GLB,
    position: new Vector3(0, 0, 0),
    rotation: new Vector3(0, 0, 0),
    scale: 1,
    animation: true,
    shadow: true,
    transmission: false,
  },
};

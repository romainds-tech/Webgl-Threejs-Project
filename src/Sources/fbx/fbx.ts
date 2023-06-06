import { Vector3 } from "three";
import { Model3DType } from "../../Experience/utils/Model3d";

export const allFbx = {
  Bee: {
    name: "Bee",
    path: "fbx/abeille/beev2.fbx",
    type: Model3DType.FBX,
    position: new Vector3(0, 2, 0),
    rotation: new Vector3(0, 0, 0),
    scale: 0.001,
    animation: true,
    shadow: true,
    transmission: false,
  },
  Whale: {
    name: "Whale",
    path: "fbx/baleine/baleine-animation.fbx",
    type: Model3DType.FBX,
    position: new Vector3(0, 0, 2),
    rotation: new Vector3(0, 0, 0),
    scale: 0.001,
    animation: true,
    shadow: true,
    transmission: false,
  },
  Cygne: {
    name: "Cygne",
    path: "fbx/cygne/cygne-fbx.fbx",
    type: Model3DType.FBX,
    position: new Vector3(0, 0, 10),
    rotation: new Vector3(0, 0, 0),
    scale: 0.001,
    animation: true,
    shadow: true,
    transmission: false,
  },
};

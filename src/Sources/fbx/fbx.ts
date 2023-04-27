import { Clock, Vector3 } from "three";
import Model3D, { Model3DType } from "../../Experience/utils/Model3d";

export const fbxPromises: Model3D[] = [
  new Model3D({
    path: "fbx/abeille/beev2.fbx",
    type: Model3DType.FBX,
    position: new Vector3(0, 2, 0),
    rotation: new Vector3(0, 0, 0),
    scale: 0.001,
    animation: true,
    clock: new Clock(),
  }),
  new Model3D({
    path: "fbx/baleine/baleine-animation.fbx",
    type: Model3DType.FBX,
    position: new Vector3(0, 0, 2),
    rotation: new Vector3(0, 0, 0),
    scale: 0.001,
    animation: true,
    clock: new Clock(),
  }),
  new Model3D({
    path: "fbx/cygne/cygne-fbx.fbx",
    type: Model3DType.FBX,
    position: new Vector3(0, 0, 10),
    rotation: new Vector3(0, 0, 0),
    scale: 0.001,
    animation: true,
    clock: new Clock(),
  }),
];

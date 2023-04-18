import { Fbx } from "../utils/utils";
import { Clock, Vector3 } from "three";

export const fbxPromises: Fbx[] = [
  {
    path: "fbx/abeille/beev2.fbx",
    position: new Vector3(0, 2, 0),
    rotation: new Vector3(0, 0, 0),
    animation: true,
    clock: new Clock(),
    mixer: undefined,
    loadedFbx: undefined,
    animationAction: undefined,
  },
  {
    path: "fbx/baleine/baleine-animation.fbx",
    position: new Vector3(0, 0, 2),
    rotation: new Vector3(0, 0, 0),
    animation: true,
    clock: new Clock(),
    mixer: undefined,
    loadedFbx: undefined,
    animationAction: undefined,
  },
  {
    path: "fbx/cygne/cygne-fbx.fbx",
    position: new Vector3(0, 0, 10),
    rotation: new Vector3(0, 0, 0),
    animation: true,
    clock: new Clock(),
    mixer: undefined,
    loadedFbx: undefined,
    animationAction: undefined,
  },
];

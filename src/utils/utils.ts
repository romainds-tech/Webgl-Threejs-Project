import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader.js";
import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/addons/loaders/DRACOLoader.js";
import {
  AnimationAction,
  AnimationClip,
  AnimationMixer,
  Group,
  Scene,
  Vector3,
} from "three";

/**
 * Définition d'un objet FBX
 */
export interface Fbx {
  path: string; // Chemin d'accès au fichier FBX
  position: Vector3; // Position de l'objet chargé dans la scène
  rotation: Vector3; // Rotation de l'objet chargé dans la scène
  animation: boolean; // Définit si l'objet doit être animé
  mixer: undefined | AnimationMixer;
  loadedFbx: undefined | Group;
  animationAction: undefined | AnimationAction[];
}

export interface Gltf {
  path: string;
  position: Vector3;
  rotation: Vector3;
}

/**
 * Charge un ou plusieurs fichiers FBX à partir de leur chemin d'accès
 * @param fbxs Tableau d'objets FBX
 * @param scene Scène dans laquelle charger les objets FBX
 */
export function loadFbx(fbxs: Fbx[], scene: Scene): Promise<Awaited<Fbx>[]> {
  const fbxLoader: FBXLoader = new FBXLoader();

  return Promise.all(
    fbxs.map((fbx: Fbx) => {
      // Charge l'objet FBX à partir du chemin d'accès spécifié
      return fbxLoader
        .loadAsync(fbx.path)
        .then((loadedFbx: Group): Fbx => {
          // Applique une échelle et une position à l'objet chargé
          loadedFbx.scale.set(0.001, 0.001, 0.001);
          loadedFbx.position.set(
            fbx.position.x,
            fbx.position.y,
            fbx.position.z
          );

          if (fbx.animation) {
            fbx.mixer = new AnimationMixer(loadedFbx);
            fbx.animationAction = [];
            loadedFbx.animations.forEach((animation: AnimationClip): void => {
              if (fbx.mixer) {
                fbx.animationAction?.push(fbx.mixer.clipAction(animation));
              } else {
                throw new Error("fbx.mixer is undefined");
              }
            });
          }

          fbx.loadedFbx = loadedFbx;

          scene.add(fbx.loadedFbx);

          return fbx;
        })
        .catch((e) => e);
    })
  );
}

/**
 * Charge un ou plusieurs fichiers GLB à partir de leur chemin d'accès
 * @param glbs Tableau d'objets GLB
 * @param scene Scène dans laquelle charger les objets GLB
 */
export function loadGlb(glbs: Gltf[], scene: Scene): Promise<Awaited<Gltf>[]> {
  const gltfLoader: GLTFLoader = new GLTFLoader();
  const dLoader: DRACOLoader = new DRACOLoader();

  dLoader.setDecoderPath("/draco/gltf/");
  dLoader.preload();

  gltfLoader.setDRACOLoader(dLoader);

  return Promise.all(
    glbs.map((gltf: Gltf) => {
      return gltfLoader
        .loadAsync(gltf.path)
        .then((gltfLoaded: GLTF): Group => {
          gltfLoaded.scene.scale.set(0.1, 0.1, 0.1);
          gltfLoaded.scene.position.set(
            gltf.position.x,
            gltf.position.y,
            gltf.position.z
          );

          scene.add(gltfLoaded.scene);

          return gltfLoaded.scene;
        })
        .catch((e) => e);
    })
  );
}

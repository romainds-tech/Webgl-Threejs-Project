import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader.js";
import { DRACOLoader } from "three/addons/loaders/DRACOLoader.js";
import { AnimationAction, AnimationMixer, Group, Scene, Vector3 } from "three";
import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

/**
 * Définition d'un objet FBX
 */
export interface Fbx {
  path: string; // Chemin d'accès au fichier FBX
  position: Vector3; // Position de l'objet chargé dans la scène
  scene: Scene; // Scène Three.js dans laquelle l'objet sera ajouté
  animation: boolean; // Définit si l'objet doit être animé
  mixer: null | AnimationMixer;
  animationAction: null | AnimationAction;
}

export interface Gltf {
  path: string;
  position: Vector3;
  scene: Scene;
  animation: boolean;
  mixer: null | AnimationMixer;
  animationAction: null | AnimationAction;
}

/**
 * Charge un ou plusieurs fichiers FBX à partir de leur chemin d'accès
 * @param fbxs
 */
export function loadFbx(fbxs: Fbx[]): Promise<Awaited<Fbx>[]> {
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
          // Ajoute l'objet chargé à la scène spécifiée
          fbx.scene.add(loadedFbx);

          if (fbx.animation) {
            fbx.mixer = new AnimationMixer(loadedFbx);
            fbx.animationAction = fbx.mixer.clipAction(loadedFbx.animations[1]);
          }
          return fbx;
        })
        .catch((e) => e);
    })
  );
}

export function loadGlb(glbs: Gltf[]): Promise<Awaited<Gltf>[]> {
  const gltfLoader: GLTFLoader = new GLTFLoader();
  const dLoader: DRACOLoader = new DRACOLoader();

  dLoader.setDecoderPath("/draco/gltf/");
  dLoader.preload();

  gltfLoader.setDRACOLoader(dLoader);

  return Promise.all(
    glbs.map((gltf: Gltf) => {
      return gltfLoader
        .loadAsync(gltf.path)
        .then((gltfLoaded: GLTF): Gltf => {
          gltfLoaded.scene.scale.set(0.1, 0.1, 0.1);
          gltfLoaded.scene.position.set(
            gltf.position.x,
            gltf.position.y,
            gltf.position.z
          );
          gltf.scene.add(gltfLoaded.scene);

          if (gltf.animation) {
            gltf.mixer = new AnimationMixer(gltfLoaded.scene);
            gltf.animationAction = gltf.mixer.clipAction(
              gltfLoaded.scene.animations[1]
            );
          }
          return gltf;
        })
        .catch((e) => e);
    })
  );
}

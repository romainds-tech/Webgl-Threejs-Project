import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader.js";
import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/addons/loaders/DRACOLoader.js";
import {
  AnimationAction,
  AnimationClip,
  AnimationMixer,
  Clock,
  Group,
  ImageLoader,
  Scene,
  Texture,
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
  clock: Clock;
  mixer: undefined | AnimationMixer;
  loadedFbx: undefined | Group;
  animationAction: undefined | AnimationAction[];
}

/**
 * Définition d'un objet GLTF
 */
export interface Gltf {
  path: string;
  position: Vector3;
  rotation: Vector3;
  animation: boolean;
  clock: Clock;
  mixer: undefined | AnimationMixer;
  loadedGltf: undefined | Group;
  animationAction: undefined | AnimationAction[];
}

/**
 * Charge un ou plusieurs fichiers FBX à partir de leur chemin d'accès
 * @param fbxs Tableau d'objets FBX
 * @param scene Scène dans laquelle charger les objets FBX
 */
export async function loadFbx(fbxs: Fbx[], scene: Scene): Promise<Fbx[]> {
  const fbxLoader: FBXLoader = new FBXLoader();

  // Utilisation de async/await au lieu de .then pour une meilleure lisibilité
  const loadFbxAsync = async (fbx: Fbx): Promise<Fbx> => {
    const loadedFbx: Group = await fbxLoader.loadAsync(fbx.path);

    loadedFbx.scale.set(0.001, 0.001, 0.001);
    loadedFbx.position.set(fbx.position.x, fbx.position.y, fbx.position.z);

    if (fbx.animation) {
      fbx.mixer = new AnimationMixer(loadedFbx);
      fbx.animationAction = [];

      for (let animation of loadedFbx.animations) {
        if (fbx.mixer) {
          fbx.animationAction.push(fbx.mixer.clipAction(animation));
        } else {
          throw new Error("fbx.mixer is undefined");
        }
      }
    } else {
      throw new Error("fbx.animation is undefined");
    }

    fbx.loadedFbx = loadedFbx;

    scene.add(loadedFbx);

    return fbx;
  };

  // Utilisation de Promise.all avec map et la nouvelle fonction loadFbxAsync
  return Promise.all(fbxs.map(loadFbxAsync));
}

/**
 * Charge un ou plusieurs fichiers FBX à partir de leur chemin d'accès
 * @param fbxs Tableau d'objets FBX
 * @param scene Scène dans laquelle charger les objets FBX
 */
export function loadFbxAsync(
  fbxs: Fbx[],
  scene: Scene
): Promise<Awaited<Fbx>[]> {
  const fbxLoader: FBXLoader = new FBXLoader();

  return Promise.all(
    fbxs.map((fbx: Fbx) => {
      // Charge l'objet FBX à partir du chemin d'accès spécifié
      return fbxLoader.loadAsync(fbx.path).then((loadedFbx: Group): Fbx => {
        // Applique une échelle et une position à l'objet chargé
        loadedFbx.scale.set(0.001, 0.001, 0.001);
        loadedFbx.position.set(fbx.position.x, fbx.position.y, fbx.position.z);

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
      });
    })
  );
}

/**
 * Charge un ou plusieurs fichiers GLB à partir de leur chemin d'accès
 * @param glbs Tableau d'objets GLB
 * @param scene Scène dans laquelle charger les objets GLB
 */
export function loadGlbAsync(
  glbs: Gltf[],
  scene: Scene
): Promise<Awaited<Gltf>[]> {
  const gltfLoader: GLTFLoader = new GLTFLoader();
  const dLoader: DRACOLoader = new DRACOLoader();

  dLoader.setDecoderConfig({ type: "wasm" });
  dLoader.setDecoderPath("/draco/gltf/");
  dLoader.preload();

  gltfLoader.setDRACOLoader(dLoader);

  return Promise.all(
    glbs.map(async (gltf: Gltf) => {
      await gltfLoader.loadAsync(gltf.path).then((gltfLoaded: GLTF): Group => {
        gltfLoaded.scene.scale.set(0.1, 0.1, 0.1);
        gltfLoaded.scene.position.set(
          gltf.position.x,
          gltf.position.y,
          gltf.position.z
        );

        // add animation
        if (gltf.animation) {
          gltf.mixer = new AnimationMixer(gltfLoaded.scene);
          gltf.animationAction = [];
          gltfLoaded.animations.forEach((animation: AnimationClip): void => {
            if (gltf.mixer) {
              gltf.animationAction?.push(gltf.mixer.clipAction(animation));
            } else {
              throw new Error("gltf.mixer is undefined");
            }
          });
        }

        gltf.loadedGltf = gltfLoaded.scene;

        scene.add(gltfLoaded.scene);

        return gltfLoaded.scene;
      });
      return gltf;
    })
  );
}

/**
 * Charge un ou plusieurs fichiers GLB à partir de leur chemin d'accès
 * @param glbs Tableau d'objets GLB
 * @param scene Scène dans laquelle charger les objets GLB
 */
export async function loadGlb(glbs: Gltf[], scene: Scene): Promise<Gltf[]> {
  const gltfLoader: GLTFLoader = new GLTFLoader();
  const dLoader: DRACOLoader = new DRACOLoader();

  dLoader.setDecoderPath("/draco/gltf/");
  dLoader.preload();

  gltfLoader.setDRACOLoader(dLoader);

  const loadGlbAsync = async (gltf: Gltf): Promise<Gltf> => {
    const gltfLoaded: GLTF = await gltfLoader.loadAsync(gltf.path);

    gltfLoaded.scene.scale.set(0.1, 0.1, 0.1);
    gltfLoaded.scene.position.set(
      gltf.position.x,
      gltf.position.y,
      gltf.position.z
    );

    // add animation
    if (gltf.animation) {
      gltf.mixer = new AnimationMixer(gltfLoaded.scene);
      gltf.animationAction = [];
      gltfLoaded.animations.forEach((animation: AnimationClip): void => {
        if (gltf.mixer) {
          gltf.animationAction?.push(gltf.mixer.clipAction(animation));
        } else {
          throw new Error("gltf.mixer is undefined");
        }
      });
    }

    scene.add(gltfLoaded.scene);

    gltf.loadedGltf = gltfLoaded.scene;

    return gltf;
  };

  return Promise.all(glbs.map(loadGlbAsync));
}

export function createMaterialFromArrayImages(images: string[]): Texture[] {
  const loader = new ImageLoader();

  return images.map((image: string) => {
    const texture = new Texture();
    loader.load(image, (image: HTMLImageElement) => {
      texture.image = image;
      texture.needsUpdate = true;
    });
    return texture;
  });
}

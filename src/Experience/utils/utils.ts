import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader.js";
import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/addons/loaders/DRACOLoader.js";
import {
  AnimationClip,
  AnimationMixer,
  Group,
  ImageLoader,
  Scene,
  Texture,
} from "three";
import { IModel3D } from "./Model3d";

/**
 * Charge un ou plusieurs fichiers FBX à partir de leur chemin d'accès
 * @param models Tableau d'objets FBX
 * @param scene Scène dans laquelle charger les objets FBX
 */
export async function loadFbx(
  models: IModel3D[],
  scene: Scene
): Promise<IModel3D[]> {
  const fbxLoader: FBXLoader = new FBXLoader();

  // Utilisation de async/await au lieu de .then pour une meilleure lisibilité
  const loadFbxAsync = async (model: IModel3D): Promise<IModel3D> => {
    const loadedModel: Group = await fbxLoader.loadAsync(model.path);

    loadedModel.scale.set(0.001, 0.001, 0.001);
    loadedModel.position.set(
      model.position.x,
      model.position.y,
      model.position.z
    );

    if (model.animation) {
      // @ts-ignore
      model.mixer = new AnimationMixer(loadedModel);
      // @ts-ignore
      model.animationAction = [];

      for (let animation of loadedModel.animations) {
        // @ts-ignore
        if (model.mixer) {
          // @ts-ignore
          model.animationAction.push(model.mixer.clipAction(animation));
        } else {
          throw new Error("fbx.mixer is undefined");
        }
      }
    } else {
      throw new Error("fbx.animation is undefined");
    }
    // @ts-ignore
    model.loadedModel3D = loadedModel;

    scene.add(loadedModel);

    return model;
  };

  // Utilisation de Promise.all avec map et la nouvelle fonction loadFbxAsync
  return Promise.all(models.map(loadFbxAsync));
}

/**
 * Charge un ou plusieurs fichiers FBX à partir de leur chemin d'accès
 * @param models Tableau d'objets FBX
 * @param scene Scène dans laquelle charger les objets FBX
 */
export function loadFbxAsync(
  models: IModel3D[],
  scene: Scene
): Promise<Awaited<IModel3D>[]> {
  const fbxLoader: FBXLoader = new FBXLoader();

  return Promise.all(
    models.map((model: IModel3D) => {
      // Charge l'objet FBX à partir du chemin d'accès spécifié
      return fbxLoader
        .loadAsync(model.path)
        .then((loadedModel: Group): IModel3D => {
          // Applique une échelle et une position à l'objet chargé
          loadedModel.scale.set(0.001, 0.001, 0.001);
          loadedModel.position.set(
            model.position.x,
            model.position.y,
            model.position.z
          );

          if (model.animation) {
            // @ts-ignore
            model.mixer = new AnimationMixer(loadedModel);
            // @ts-ignore
            model.animationAction = [];
            loadedModel.animations.forEach((animation: AnimationClip): void => {
              // @ts-ignore
              if (model.mixer) {
                // @ts-ignore
                model.animationAction?.push(model.mixer.clipAction(animation));
              } else {
                throw new Error("fbx.mixer is undefined");
              }
            });
          }
          // @ts-ignore
          model.loadedModel3D = loadedModel;
          // @ts-ignore
          scene.add(model.loadedModel3D);

          return model;
        });
    })
  );
}

/**
 * Charge un ou plusieurs fichiers GLB à partir de leur chemin d'accès
 * @param models Tableau d'objets GLB
 * @param scene Scène dans laquelle charger les objets GLB
 */
export function loadGlbAsync(
  models: IModel3D[],
  scene: Scene
): Promise<Awaited<IModel3D>[]> {
  const gltfLoader: GLTFLoader = new GLTFLoader();
  const dLoader: DRACOLoader = new DRACOLoader();

  dLoader.setDecoderConfig({ type: "wasm" });
  dLoader.setDecoderPath("/draco/gltf/");
  dLoader.preload();

  gltfLoader.setDRACOLoader(dLoader);

  return Promise.all(
    models.map(async (model: IModel3D) => {
      await gltfLoader
        .loadAsync(model.path)
        .then((loadedModel: GLTF): Group => {
          loadedModel.scene.scale.set(0.1, 0.1, 0.1);
          loadedModel.scene.position.set(
            model.position.x,
            model.position.y,
            model.position.z
          );

          // add animation
          if (model.animation) {
            // @ts-ignore
            model.mixer = new AnimationMixer(loadedModel.scene);
            // @ts-ignore
            model.animationAction = [];
            loadedModel.animations.forEach((animation: AnimationClip): void => {
              // @ts-ignore
              if (model.mixer) {
                // @ts-ignore
                model.animationAction?.push(model.mixer.clipAction(animation));
              } else {
                throw new Error("gltf.mixer is undefined");
              }
            });
          }
          // @ts-ignore
          model.loadedModel3D = loadedModel.scene;

          scene.add(loadedModel.scene);

          return loadedModel.scene;
        });
      return model;
    })
  );
}

/**
 * Charge un ou plusieurs fichiers GLB à partir de leur chemin d'accès
 * @param models Tableau d'objets GLB
 * @param scene Scène dans laquelle charger les objets GLB
 */
export async function loadGlb(
  models: IModel3D[],
  scene: Scene
): Promise<IModel3D[]> {
  const gltfLoader: GLTFLoader = new GLTFLoader();
  const dLoader: DRACOLoader = new DRACOLoader();

  dLoader.setDecoderPath("/draco/gltf/");
  dLoader.preload();

  gltfLoader.setDRACOLoader(dLoader);

  const loadGlbAsync = async (model: IModel3D): Promise<IModel3D> => {
    const loadedModel: GLTF = await gltfLoader.loadAsync(model.path);

    loadedModel.scene.scale.set(0.1, 0.1, 0.1);
    loadedModel.scene.position.set(
      model.position.x,
      model.position.y,
      model.position.z
    );

    // add animation
    if (model.animation) {
      // @ts-ignore
      model.mixer = new AnimationMixer(loadedModel.scene);
      // @ts-ignore
      model.animationAction = [];
      loadedModel.animations.forEach((animation: AnimationClip): void => {
        // @ts-ignore
        if (model.mixer) {
          // @ts-ignore
          model.animationAction?.push(model.mixer.clipAction(animation));
        } else {
          throw new Error("gltf.mixer is undefined");
        }
      });
    }

    scene.add(loadedModel.scene);
    // @ts-ignore
    model.loadedModel3D = loadedModel.scene;

    return model;
  };

  return Promise.all(models.map(loadGlbAsync));
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

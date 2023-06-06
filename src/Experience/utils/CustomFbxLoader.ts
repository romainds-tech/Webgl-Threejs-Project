// this is a Singleton class because we only need one instance of the loader
import Model3D from "./Model3d";
import {
  AnimationClip,
  AnimationMixer,
  Clock,
  Euler,
  Group,
  Mesh,
  MeshToonMaterial,
} from "three";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader.js";

export default class CustomFbxLoader {
  private static instance: CustomFbxLoader;
  private static fbxLoader: FBXLoader;

  private constructor() {
    CustomFbxLoader.instance = this;
    CustomFbxLoader.fbxLoader = new FBXLoader();
  }

  public static getInstance(): CustomFbxLoader {
    if (!CustomFbxLoader.instance) {
      CustomFbxLoader.instance = new CustomFbxLoader();
    }
    return CustomFbxLoader.instance;
  }
  // @ts-ignore
  private setMaterial(child) {
    child.material = new MeshToonMaterial({
      ...child.material,
      type: "MeshToonMaterial",
    });
  }

  loadOne(model: Model3D): Promise<Model3D> {
    // todo : don't forget to add the model to the scene
    // Charge l'objet FBX à partir du chemin d'accès spécifié

    return new Promise((resolve) => {
      CustomFbxLoader.fbxLoader.load(model.path, (loadedModel: Group) => {
        // Applique une échelle et une position à l'objet chargé
        loadedModel.scale.set(model.scale, model.scale, model.scale);
        loadedModel.position.copy(model.position);
        loadedModel.rotation.copy(
          new Euler(model.rotation.x, model.rotation.y, model.rotation.z, "XYZ")
        );

        if (model.animation) {
          model.clock = new Clock();
          model.mixer = new AnimationMixer(loadedModel);
          model.animationAction = [];
          loadedModel.animations.forEach((animation: AnimationClip): void => {
            if (model.mixer) {
              model.animationAction?.push(model.mixer.clipAction(animation));
            } else {
              throw new Error("fbx.mixer is undefined");
            }
          });
        }

        if (model.shadow) {
          loadedModel.traverse((child) => {
            if (child instanceof Mesh) {
              // this.setMaterial(child);
              child.castShadow = true;
              child.receiveShadow = true;
            }
          });
        }

        model.loadedModel3D = loadedModel;
        model.addDebug();
        resolve(model);
      });
    });
  }

  loadMany(models: Model3D[]): Promise<Model3D[]> {
    return Promise.all(models.map((model: Model3D) => this.loadOne(model)));
  }
}

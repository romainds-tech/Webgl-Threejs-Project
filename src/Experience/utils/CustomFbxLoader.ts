// this is a Singleton class because we only need one instance of the loader
import Model3D from "./Model3d";
import { AnimationClip, AnimationMixer, Group } from "three";
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

  loadOne(model: Model3D): Promise<Model3D> {
    // todo : don't forget to add the model to the scene
    // Charge l'objet FBX à partir du chemin d'accès spécifié
    return CustomFbxLoader.fbxLoader
      .loadAsync(model.path)
      .then((loadedModel: Group): Model3D => {
        // Applique une échelle et une position à l'objet chargé
        loadedModel.scale.set(model.scale, model.scale, model.scale);
        loadedModel.position.copy(model.position);

        if (model.animation) {
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

        model.loadedModel3D = loadedModel;

        return model;
      });
  }

  loadMany(models: Model3D[]): Promise<Model3D[]> {
    return Promise.all(models.map((model: Model3D) => this.loadOne(model)));
  }
}

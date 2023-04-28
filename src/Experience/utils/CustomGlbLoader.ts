import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/addons/loaders/DRACOLoader.js";
import Model3D from "./Model3d";
import { AnimationClip, AnimationMixer } from "three";

export default class CustomGlbLoader {
  private static instance: CustomGlbLoader;
  private static gltfLoader: GLTFLoader;
  constructor() {
    CustomGlbLoader.instance = this;
    CustomGlbLoader.gltfLoader = this.setLoader();
  }

  public static getInstance(): CustomGlbLoader {
    if (!CustomGlbLoader.instance) {
      CustomGlbLoader.instance = new CustomGlbLoader();
    }
    return CustomGlbLoader.instance;
  }

  private setLoader(): GLTFLoader {
    const gltfLoader: GLTFLoader = new GLTFLoader();
    const dLoader: DRACOLoader = new DRACOLoader();
    dLoader.setDecoderConfig({ type: "wasm" });
    dLoader.setDecoderPath("./src/Experience/utils/draco/gltf/");
    dLoader.preload();

    gltfLoader.setDRACOLoader(dLoader);

    return gltfLoader;
  }

  loadOne(model: Model3D): Promise<Model3D> {
    // todo : don't forget to add the model to the scene
    return CustomGlbLoader.gltfLoader
      .loadAsync(model.path)
      .then((loadedModel: GLTF): Model3D => {
        loadedModel.scene.scale.set(model.scale, model.scale, model.scale);
        loadedModel.scene.position.copy(model.position);

        // add animation
        if (model.animation) {
          model.mixer = new AnimationMixer(loadedModel.scene);
          model.animationAction = [];
          loadedModel.animations.forEach((animation: AnimationClip): void => {
            if (model.mixer) {
              model.animationAction?.push(model.mixer.clipAction(animation));
            } else {
              throw new Error("gltf.mixer is undefined");
            }
          });
        }

        model.loadedModel3D = loadedModel.scene;

        return model;
      });
  }

  loadMany(models: Model3D[]): Promise<Model3D[]> {
    return Promise.all(models.map((model: Model3D) => this.loadOne(model)));
  }
}

import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/addons/loaders/DRACOLoader.js";
import Model3D from "./Model3d";
import {
  AnimationClip,
  AnimationMixer,
  Clock,
  CubeTextureLoader,
  DataTexture,
  Euler,
  Mesh,
  MeshLambertMaterial,
  MeshStandardMaterial,
  PMREMGenerator,
  Scene,
  MeshPhysicalMaterial,
  MeshStandardMaterial,
  PMREMGenerator,
  Scene,
} from "three";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";
import { Experience } from "../Experience";
import { NodeToyMaterial } from "@nodetoy/three-nodetoy";

export default class CustomGlbLoader {
  public experience: Experience;
  public scene: Scene;
  private static instance: CustomGlbLoader;
  private static gltfLoader: GLTFLoader;
  private static rbgeLoader: RGBELoader;
  private dataTexture: DataTexture;
  constructor() {
    this.experience = Experience.getInstance();
    this.scene = this.experience.scene;
    CustomGlbLoader.instance = this;
    CustomGlbLoader.gltfLoader = this.setLoader();
    CustomGlbLoader.rbgeLoader = this.setRbgeLoader();
    this.setDataTexture("./envMap/hdr.hdr");
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

  private setRbgeLoader(): RGBELoader {
    return new RGBELoader();
  }

  private async setDataTexture(path: string) {
    await CustomGlbLoader.rbgeLoader.load(path, (texture) => {
      this.scene.background = texture;

      //texture.mapping = EquirectangularReflectionMapping;

      // this.scene.environment = texture;
      // console.log(this.scene.environment);

      this.scene.backgroundIntensity = 0;

      this.dataTexture = texture;
    });
  }

  private setEnvMap(child) {
    child.material.roughness = 0;
    child.material.metalness = 0.5;

    child.material.envMap = this.dataTexture;
    child.material.needsUpdate = true;
  }

  loadOne(model: Model3D): Promise<Model3D> {
    // todo : don't forget to add the model to the scene
    return new Promise((resolve) => {
      CustomGlbLoader.gltfLoader.load(model.path, (loadedModel) => {
        loadedModel.scene.scale.set(model.scale, model.scale, model.scale);
        loadedModel.scene.position.copy(model.position);
        loadedModel.scene.rotation.copy(
          new Euler(model.rotation.x, model.rotation.y, model.rotation.z, "XYZ")
        );

        // add animation
        if (model.animation) {
          model.clock = new Clock();
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

        loadedModel.scene.traverse((child) => {
          if (child instanceof Mesh) {
            if (model.shadow) {
              this.setEnvMap(child);
              child.castShadow = true;
              child.receiveShadow = true;
              if (child.material.map) {
                child.material.map.anisotropy = 16;
              }
            } else if (model.nodeToyMaterial) {
              child.material = new NodeToyMaterial({
                data: model.nodeToyMaterial,
              });
            }

            child.material.depthTest = true;
            child.material.depthWrite = true;
          }
        });

        if (model.transmission) {
          loadedModel.scene.traverse((child) => {
            if (child instanceof Mesh) {
              console.log(child);
              child.material = new MeshPhysicalMaterial({
                color: 0xffffff,
                metalness: 0.7,
                roughness: 0.05,
                ior: 1.5,
                depthWrite: false,
                map: child.material.map,
                metalnessMap: child.material.metalnessMap,
                normalMap: child.material.normalMap,
                roughnessMap: child.material.roughnessMap,
                envMapIntensity: 1,
                transmission: 0.7, // use material.transmission for glass materials
                opacity: 1,
                // side: DoubleSide,
                transparent: true,
              });
            }
          });
        }

        model.loadedModel3D = loadedModel.scene;
        model.addDebug();

        resolve(model);
      });
    });
  }

  loadMany(models: Model3D[]): Promise<Model3D[]> {
    return Promise.all(models.map((model: Model3D) => this.loadOne(model)));
  }
}

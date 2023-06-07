import { Experience } from "./Experience";
import Sizes from "./utils/Sizes";
import {
  ACESFilmicToneMapping,
  CineonToneMapping,
  LinearToneMapping,
  NoToneMapping,
  PCFSoftShadowMap,
  ReinhardToneMapping,
  Scene,
  WebGLRenderer,
} from "three";
import Camera from "./Camera";
import { GUI } from "lil-gui";

export default class Renderer {
  public experience: Experience;
  public canvas: HTMLCanvasElement | undefined;
  public sizes?: Sizes;
  public scene?: Scene;
  public camera?: Camera;
  public instance: WebGLRenderer;
  public envDebug: GUI | undefined;

  public constructor() {
    this.experience = Experience.getInstance();
    this.canvas = this.experience.canvas;
    this.sizes = this.experience.sizes;
    this.scene = this.experience.scene;
    this.camera = this.experience.camera;

    this.instance = this.setInstance();
    this.envDebug = this.addDebug();
  }

  private setInstance(): WebGLRenderer {
    let instance: WebGLRenderer = new WebGLRenderer({
      canvas: this.canvas,
      antialias: false,
      powerPreference: "high-performance",
    });
    instance.autoClear = false;
    instance.clear();
    // @ts-ignore
    instance.gammaFactor = 2.2;
    instance.useLegacyLights = true;
    instance.toneMapping = ReinhardToneMapping;
    instance.toneMappingExposure = 3.7;
    instance.shadowMap.enabled = true;
    instance.shadowMap.type = PCFSoftShadowMap;
    instance.setClearColor("#211d20");
    instance.setSize(this.sizes!.width, this.sizes!.height);
    instance.setPixelRatio(this.sizes!.pixelRatio);

    return instance;
  }

  public resize() {
    this.instance.setSize(this.sizes!.width, this.sizes!.height);
    this.instance.setPixelRatio(Math.min(this.sizes!.pixelRatio, 2));
  }

  public addDebug() {
    if (this.experience.debug?.active) {
      //create a folder for the renderer
      let rendererFolder: GUI = this.experience.debug.ui!.addFolder("Renderer");

      rendererFolder.add(this.instance, "toneMapping", {
        No: NoToneMapping,
        Linear: LinearToneMapping,
        Reinhard: ReinhardToneMapping,
        Cineon: CineonToneMapping,
        AcesFilmic: ACESFilmicToneMapping,
      });

      rendererFolder
        .add(this.instance, "toneMappingExposure")
        .min(0)
        .max(10)
        .step(0.1);

      return rendererFolder;
    }
    return;
  }

  public update() {
    if (this.scene && this.camera) {
      this.instance.render(this.scene, this.camera.instance);
    }
  }
}

import { Experience } from "./Experience";
import Sizes from "./utils/Sizes";
import {
  CineonToneMapping,
  PCFSoftShadowMap,
  Scene,
  sRGBEncoding,
  WebGLRenderer,
} from "three";
import Camera from "./Camera";

export default class Renderer {
  public experience: Experience;
  public canvas: HTMLCanvasElement | undefined;
  public sizes: Sizes;
  public scene: Scene;
  public camera: Camera;
  public instance: WebGLRenderer;

  public constructor() {
    this.experience = Experience.getInstance();
    this.canvas = this.experience.canvas;
    this.sizes = this.experience.sizes;
    this.scene = this.experience.scene;
    this.camera = this.experience.camera;

    this.instance = this.setInstance();
  }

  private setInstance(): WebGLRenderer {
    let instance: WebGLRenderer = new WebGLRenderer({
      canvas: this.canvas,
      antialias: true, //  todo invert for performance
      // powerPreference: "high-performance", // todo reactivate for performance
    });
    instance.useLegacyLights = true;
    instance.outputEncoding = sRGBEncoding;
    instance.toneMapping = CineonToneMapping;
    instance.toneMappingExposure = 1.75;
    instance.shadowMap.enabled = true;
    instance.shadowMap.type = PCFSoftShadowMap;
    instance.setClearColor("#211d20");
    instance.setSize(this.sizes.width, this.sizes.height);
    instance.setPixelRatio(this.sizes.pixelRatio);
    return instance;
  }

  public resize() {
    this.instance.setSize(this.sizes.width, this.sizes.height);
    this.instance.setPixelRatio(Math.min(this.sizes.pixelRatio, 2));
  }

  public update() {
    this.instance.render(this.scene, this.camera.instance);
  }
}

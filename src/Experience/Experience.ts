import Sizes from "./utils/Sizes";
import Time from "./utils/Time";
import { Scene } from "three";
import Camera from "./Camera";
import Renderer from "./Renderer";
// import Island from "./Island/Island";
import Debug from "./utils/Debug";
import Sky from "./Sky/Sky";
import Light from "./Light/Light";
import Onboarding from "./Onboarding/Onboarding";
import Island from "./Island/Island";

export class Experience {
  private static instance: Experience;

  public canvas: HTMLCanvasElement | undefined;
  public sizes: Sizes;
  public time: Time;
  public scene: Scene;
  public camera: Camera;
  public renderer: Renderer;
  public island: Island;
  public light: Light;
  public sky: Sky;
  public debug: Debug;
  public onBoarding: Onboarding;

  private constructor() {
    Experience.instance = this;

    this.debug = new Debug();
    this.sizes = new Sizes();
    this.canvas = this.setCanvas();
    this.time = new Time();
    this.scene = new Scene();
    this.camera = new Camera();
    // this.island = new Island();
    this.light = new Light();
    // this.sky = new Sky();
    this.onBoarding = new Onboarding();

    this.renderer = new Renderer();

    this.sizes.on("resize", (): void => {
      this.resize();
    });

    this.time.on("tick", (): void => {
      this.update();
    });
  }

  private setCanvas(): HTMLCanvasElement | undefined {
    let canvas: HTMLCanvasElement | null =
      document.querySelector("canvas.webgl");
    if (canvas) {
      return canvas;
    }
    return undefined;
  }

  private resize() {
    this.camera.resize();
    this.renderer.resize();
  }

  private update() {
    this.camera.update();
    this.renderer.update();
    this.onBoarding.update();
    // this.sky.update();
    // this.island.update();
  }

  static getInstance() {
    if (!Experience.instance) {
      Experience.instance = new Experience();
    }
    return Experience.instance;
  }
}

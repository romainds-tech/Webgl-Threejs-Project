import Sizes from "./utils/Sizes";
import Time from "./utils/Time";
import { Scene } from "three";
import Camera from "./Camera";
import Renderer from "./Renderer";
import Island from "./Island/Island";
import Debug from "./utils/Debug";
// import Sky from "./Sky/Sky";
import Light from "./Light/Light";
import Onboarding from "./Onboarding/Onboarding";
import Cartomancie from "./Cartomancie/Cartomancie";
import Sky from "./Sky/Sky";
import PostProcessing from "./utils/PostProcessing";
import Model3D from "./utils/Model3d";
import { allGlbs } from "../Sources/glb/glb";
import CustomGlbLoader from "./utils/CustomGlbLoader";

export class Experience {
  private static instance: Experience;

  public canvas: HTMLCanvasElement | undefined;
  public sizes?: Sizes;
  public time?: Time;
  public scene?: Scene;
  public camera?: Camera;
  public renderer?: Renderer;
  public island?: Island;
  public cartomancie?: Cartomancie;
  public light?: Light;
  public sky?: Sky;
  public debug?: Debug;
  public onBoarding?: Onboarding;
  public postProcessing?: PostProcessing;
  public allModels: any = {};

  private constructor() {
    Experience.instance = this;

    this.debug = new Debug();
    this.sizes = new Sizes();
    this.canvas = this.setCanvas();
    this.time = new Time();
    this.scene = new Scene();
    this.camera = new Camera();
    this.light = new Light();

    this.loadAllModels();
  }

  private completeSetup() {
    // this.sky = new Sky();
    this.onBoarding = new Onboarding();
    this.renderer = new Renderer();
    this.postProcessing = new PostProcessing();

    this.sizes?.on("resize", (): void => {
      this.resize();
    });

    this.time?.on("tick", (): void => {
      this.update();
    });

    this.onBoarding.on("onboardingFinish", () => {
      console.log("onboardingFinish");
      this.onBoarding?.destroy();
      this.island = new Island();
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
    this.camera?.resize();
    this.renderer?.resize();
    this.postProcessing?.resize();
  }

  private update() {
    this.camera?.update();
    this.renderer?.update();
    this.onBoarding?.update();

    this.island?.update();
    if (this.cartomancie) {
      this.cartomancie.update();
    }

    if (this.sky) {
      this.sky.update();
    }
    this.postProcessing?.update();
  }

  private async loadAllModels() {
    // parcours allGlb et charge les modèles avec un for en utilisant objectKeys
    for (let [key, value] of Object.entries(allGlbs)) {
      console.log(`${key}: ${allGlbs[key]}`);
      this.allModels[key] = await CustomGlbLoader.getInstance().loadOne(
        new Model3D(value)
      );
    }
    console.log("this.allModels", this.allModels);
    console.log("END");
    this.completeSetup();
  }

  static getInstance() {
    if (!Experience.instance) {
      Experience.instance = new Experience();
    }
    return Experience.instance;
  }
}

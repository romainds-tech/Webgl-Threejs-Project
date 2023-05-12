import { Experience } from "../Experience";
import { DirectionalLight, Light, Scene } from "three";
import Debug from "../utils/Debug";
import { GUI } from "lil-gui";

export default class Light {
  public experience: Experience;
  public scene: Scene;

  public sunLight?: Light;
  public debug: Debug;
  public debugFolder: GUI | null;

  constructor() {
    this.experience = Experience.getInstance();
    this.scene = this.experience.scene;

    this.debug = this.experience.debug;
    this.debugFolder = this.addDebugFolder();

    this.loadLightIsland();
  }

  addDebugFolder(): GUI | null {
    if (this.debug.active) {
      return this.debug.ui!.addFolder("Light").close();
    }
    return null;
  }

  loadLightIsland(): void {
    this.sunLight = new DirectionalLight("#ffffff");
    this.sunLight.intensity = 0.2;
    this.sunLight!.castShadow = true;
    this.sunLight!.shadow.mapSize.set(1024, 1024);
    this.sunLight!.shadow.normalBias = 0.05;
    this.sunLight!.position.set(3.5, 2, -1.25);
    this.scene.add(this.sunLight);
    // Debug
    if (this.debug.active) {
      const lightFolder: GUI = this.debugFolder!.addFolder("Light");
      lightFolder!
        .add(this.sunLight!, "intensity")
        .name("sunLightIntensity")
        .min(0)
        .max(10)
        .step(0.001);

      lightFolder
        .add(this.sunLight!.position, "x")
        .name("sunLightX")
        .min(-5)
        .max(5)
        .step(0.001);

      lightFolder
        .add(this.sunLight!.position, "y")
        .name("sunLightY")
        .min(-5)
        .max(5)
        .step(0.001);

      lightFolder
        .add(this.sunLight!.position, "z")
        .name("sunLightZ")
        .min(-5)
        .max(5)
        .step(0.001);

      lightFolder.addColor(this.sunLight!, "color");
    }
  }
  destroy() {
    this.sunLight?.dispose();
  }
}
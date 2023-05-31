import { Experience } from "../Experience";
import { DirectionalLight, HemisphereLight, Scene } from "three";
import Debug from "../utils/Debug";
import { GUI } from "lil-gui";

export default class Light {
  public experience: Experience;
  public scene: Scene;

  public sunLight?: DirectionalLight;
  public hemisphereLight?: HemisphereLight;
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
    this.sunLight = new DirectionalLight(0xf4e8bc, 5.3);

    this.sunLight.intensity = 5.3;
    this.sunLight!.castShadow = true;
    this.sunLight!.shadow.mapSize.set(1024 * 4, 1024 * 4);
    this.sunLight!.shadow.normalBias = -0.0001;
    this.sunLight!.position.set(5, 6.235, 7.5);
    // this.sunLight.color.setHSL(0.1, 1, 0.95);
    // this.sunLight.position.multiplyScalar(30);
    this.scene.add(this.sunLight);

    this.hemisphereLight = new HemisphereLight(0xadaff0, 0xcdf0ca, 1.2);
    // this.hemisphereLight.castShadow = true;
    this.scene.add(this.hemisphereLight);

    // Debug
    if (this.debug.active) {
      const lightFolder: GUI = this.debugFolder!.addFolder("Light");
      lightFolder!
        .add(this.sunLight!, "intensity")
        .name("sunLightIntensity")
        .min(0)
        .max(100)
        .step(0.1);

      lightFolder
        .add(this.sunLight!.position, "x")
        .name("sunLightX")
        .min(-5)
        .max(100)
        .step(1);

      lightFolder
        .add(this.sunLight!.position, "y")
        .name("sunLightY")
        .min(-5)
        .max(100)
        .step(1);

      lightFolder
        .add(this.sunLight!.position, "z")
        .name("sunLightZ")
        .min(-5)
        .max(5)
        .step(1);

      lightFolder
        .add(this.hemisphereLight!, "intensity")
        .name("hemisphereLightIntensity")
        .min(0)
        .max(10)
        .step(0.1);

      lightFolder.addColor(this.sunLight!, "color");
    }
  }
  destroy() {
    this.sunLight?.dispose();
  }
}

import { Experience } from "../Experience";
import {
  DirectionalLight,
  HemisphereLight,
  Scene,
  SpotLight,
  SpotLightHelper,
} from "three";
import Debug from "../utils/Debug";
import { GUI } from "lil-gui";

export default class Light {
  public experience: Experience;
  public scene: Scene;

  public sunLight?: DirectionalLight;
  public spotLight?: SpotLight;
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

    this.sunLight.intensity = 86.9;
    this.sunLight!.castShadow = true;
    this.sunLight!.shadow.mapSize.set(1024 * 4, 1024 * 4);
    this.sunLight!.shadow.normalBias = -0.0001;
    this.sunLight!.position.set(7, 13, 1);

    // increase shadow surface
    this.sunLight.shadow.camera.top = 100;
    this.sunLight.shadow.camera.bottom = -100;
    this.sunLight.shadow.camera.left = -100;
    this.sunLight.shadow.camera.right = 100;

    // this.sunLight.color.setHSL(0.1, 1, 0.95);
    // this.sunLight.position.multiplyScalar(30);
    this.scene.add(this.sunLight);

    this.hemisphereLight = new HemisphereLight(0xadaff0, 0xcdf0ca, 6);
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

  loadLightCartomancie(): void {
    this.spotLight = new SpotLight(0x78ff00, 0.5, 10, Math.PI * 0.1, 0.25, 1);

    this.spotLight.shadow.camera.near = 500;
    this.spotLight.shadow.camera.far = 4000;
    this.spotLight.shadow.camera.fov = 30;

    this.spotLight.intensity = 60;

    this.spotLight!.shadow.mapSize.set(1024 * 4, 1024 * 4);
    this.spotLight!.shadow.normalBias = -0.0001;

    this.spotLight!.position.set(24, 26, 13);
    // this.sunLight.color.setHSL(0.1, 1, 0.95);
    // this.sunLight.position.multiplyScalar(30);
    this.scene.add(this.spotLight);
    const spotLightHelper = new SpotLightHelper(this.spotLight, 1);
    this.scene.add(spotLightHelper);

    // Debug
    if (this.debug.active) {
      const lightFolder: GUI = this.debugFolder!.addFolder("PointLight");
      lightFolder!
        .add(this.spotLight!, "intensity")
        .name("spotLightIntensity")
        .min(0)
        .max(100)
        .step(0.1);

      lightFolder
        .add(this.spotLight!, "distance")
        .name("distance")
        .min(-100)
        .max(100)
        .step(1);

      lightFolder
        .add(this.spotLight!, "penumbra")
        .name("penumbra")
        .min(-100)
        .max(100)
        .step(1);

      lightFolder
        .add(this.spotLight!.position, "x")
        .name("spotLightX")
        .min(-100)
        .max(100)
        .step(1);
      lightFolder
        .add(this.spotLight!.position, "y")
        .name("spotLightY")
        .min(-100)
        .max(100)
        .step(1);

      lightFolder
        .add(this.spotLight!.position, "z")
        .name("spotLightZ")
        .min(-100)
        .max(100)
        .step(1);

      lightFolder
        .add(this.spotLight!, "angle")
        .name("angle")
        .min(-10)
        .max(10)
        .step(Math.PI * 0.1);

      lightFolder.addColor(this.spotLight!, "color");
    }
  }
  destroy() {
    this.sunLight?.dispose();
    this.spotLight?.dispose();
  }
}

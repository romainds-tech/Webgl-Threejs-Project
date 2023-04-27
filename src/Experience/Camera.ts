import Sizes from "./utils/Sizes";
import { PerspectiveCamera, Scene } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { Experience } from "./Experience";

export default class Camera {
  public experience: Experience;
  public sizes: Sizes;
  public scene: Scene;
  public canvas: HTMLCanvasElement | undefined;
  public constrols: OrbitControls;
  public instance: PerspectiveCamera;
  constructor() {
    this.experience = Experience.getInstance();
    this.sizes = this.experience.sizes;
    this.scene = this.experience.scene;
    this.canvas = this.experience.canvas;
    this.instance = this.setInstance();
    this.constrols = this.setOrbitControls();
  }
  private setInstance(): PerspectiveCamera {
    let instance: PerspectiveCamera = new PerspectiveCamera(
      75,
      this.sizes.width / this.sizes.height,
      0.1,
      100
    );
    instance.position.set(6, 4, 8);
    this.scene.add(instance);
    return instance;
  }

  private setOrbitControls(): OrbitControls {
    let controls: OrbitControls = new OrbitControls(this.instance, this.canvas);
    controls.enableDamping = true;
    return controls;
  }

  resize(): void {
    this.instance.aspect = this.sizes.width / this.sizes.height;
    this.instance.updateProjectionMatrix();
  }

  update(): void {
    this.constrols.update();
  }
}

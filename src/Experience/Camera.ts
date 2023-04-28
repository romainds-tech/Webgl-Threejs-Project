import Sizes from "./utils/Sizes";
import { OrthographicCamera, PerspectiveCamera, Scene } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { Experience } from "./Experience";

export default class Camera {
  public experience: Experience;
  public orthoContent: Boolean;
  public sizes: Sizes;
  public scene: Scene;
  public canvas: HTMLCanvasElement | undefined;
  public constrols: OrbitControls;
  public instance: PerspectiveCamera | OrthographicCamera;
  constructor() {
    this.experience = Experience.getInstance();
    this.orthoContent = window.location.pathname.includes("ortho");
    this.sizes = this.experience.sizes;
    this.scene = this.experience.scene;
    this.canvas = this.experience.canvas;
    this.instance = this.setInstance();
    this.constrols = this.setOrbitControls();
  }
  private setInstance(): PerspectiveCamera | OrthographicCamera {
    let cameraInstance: PerspectiveCamera | OrthographicCamera;
    if (this.orthoContent) {
      cameraInstance = new OrthographicCamera(
        this.sizes.width / -1000,
        this.sizes.width / 1000,
        this.sizes.height / 1000,
        this.sizes.height / -1000,
        1,
        100
      );
    } else {
      cameraInstance = new PerspectiveCamera(
        75,
        this.sizes.width / this.sizes.height,
        0.1,
        100
      );
    }

    cameraInstance.position.set(1, 2, 1);
    this.scene.add(cameraInstance);
    return cameraInstance;
  }

  private setOrbitControls(): OrbitControls {
    let controls: OrbitControls = new OrbitControls(this.instance, this.canvas);
    controls.enableDamping = true;
    return controls;
  }

  resize(): void {
    // this.instance.aspect = this.sizes.width / this.sizes.height;
    this.instance.updateProjectionMatrix();
  }

  update(): void {
    this.constrols.update();
  }
}

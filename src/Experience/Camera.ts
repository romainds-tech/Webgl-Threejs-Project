import Sizes from "./utils/Sizes";
import {
  AxesHelper,
  OrthographicCamera,
  PerspectiveCamera,
  Scene,
} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { Experience } from "./Experience";
import gsap from "gsap";
import Debug from "./utils/Debug";
import { GUI } from "lil-gui";

export default class Camera {
  public experience: Experience;
  public ortho: Boolean;
  public sizes: Sizes;
  public scene: Scene;
  public canvas: HTMLCanvasElement | undefined;
  public constrols: OrbitControls;
  public instance: PerspectiveCamera | OrthographicCamera;
  public debug: Debug;
  public debugFolder?: GUI;

  constructor() {
    this.experience = Experience.getInstance();
    this.ortho = window.location.pathname.includes("ortho");
    this.sizes = this.experience.sizes;
    this.scene = this.experience.scene;
    this.canvas = this.experience.canvas;
    this.instance = this.setInstance();
    this.constrols = this.setOrbitControls();
    this.debug = this.experience.debug;
    this.onZTyped();
  }
  private setInstance(): PerspectiveCamera | OrthographicCamera {
    let cameraInstance: PerspectiveCamera | OrthographicCamera;
    if (this.ortho) {
      const aspect = this.sizes.width / this.sizes.height;
      const frustumSize = 10;
      cameraInstance = new OrthographicCamera(
        (frustumSize * aspect) / -2,
        (frustumSize * aspect) / 2,
        frustumSize / 2,
        frustumSize / -2,
        1,
        1000
      );

      cameraInstance.zoom = 0.35;
      cameraInstance.updateProjectionMatrix();
    } else {
      cameraInstance = new PerspectiveCamera(
        75,
        this.sizes.width / this.sizes.height,
        0.1,
        100
      );
    }

    // cameraInstance.position.set(1, 2, 30);
    cameraInstance.position.set(-5, 5, -5);
    this.scene.add(cameraInstance);
    return cameraInstance;
  }

  private setOrbitControls(): OrbitControls {
    let controls: OrbitControls = new OrbitControls(this.instance, this.canvas);
    controls.enableDamping = true;
    return controls;
  }

  addDebug() {
    if (this.debug.active) {
      this.instance.add(new AxesHelper(10));
      const cameraName: GUI = this.debug.debugModelFolder!.addFolder("Camera");

      console.log(this.instance);

      if (this.instance instanceof OrthographicCamera) {
        cameraName
          .add(this.instance, "zoom", 0, 5)
          .name("Zoom")
          .onChange(() => {
            this.instance.updateProjectionMatrix();
          });
      }

      cameraName.add(this.instance.position, "x").name("Position X");
      cameraName.add(this.instance.position, "y").name("Position Y");
      cameraName.add(this.instance.position, "z").name("Position Z");

      cameraName.add(this.instance.rotation, "x").name("Rotation X");
      cameraName.add(this.instance.rotation, "y").name("Rotation Y");
      cameraName.add(this.instance.rotation, "z").name("Rotation Z");

      cameraName.add(this.instance.scale, "x").name("Scale X");
      cameraName.add(this.instance.scale, "y").name("Scale Y");
      cameraName.add(this.instance.scale, "z").name("Scale Z");

      return cameraName;
    }
    return undefined;
  }

  resize(): void {
    if (!(this.instance instanceof PerspectiveCamera)) {
      this.instance.left = this.sizes.width / -1000;
      this.instance.right = this.sizes.width / 1000;
      this.instance.top = this.sizes.height / 1000;
      this.instance.bottom = this.sizes.height / -1000;
    } else {
      this.instance.aspect = this.sizes.width / this.sizes.height;
    }

    this.instance.updateProjectionMatrix();
  }

  onZTyped() {
    window.addEventListener("keydown", (e) => {
      if (e.key === "z") {
        this.rotateCamera(50);
      }
    });
  }

  rotateCamera(angle: number): void {
    gsap.to(this.instance.position, {
      duration: 2,
      y: Math.sin(angle),
      ease: "Expo.easeOut",
    });
    gsap.to(this.instance.position, {
      delay: 1,
      duration: 1,
      y: Math.cos(angle * 0.75),
    });
  }

  update(): void {
    this.constrols.update();
  }
}

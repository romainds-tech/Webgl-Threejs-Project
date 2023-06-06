import Sizes from "./utils/Sizes";
import { AxesHelper, PerspectiveCamera, Scene } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { Experience } from "./Experience";
import gsap from "gsap";
import Debug from "./utils/Debug";
import { GUI } from "lil-gui";

export default class Camera {
  public experience: Experience;
  public sizes: Sizes;
  public scene: Scene;
  public canvas: HTMLCanvasElement | undefined;
  public controls: OrbitControls;
  public instance: PerspectiveCamera;
  public debug: Debug;
  public debugFolder?: GUI;

  public updateActive: boolean;

  constructor() {
    this.experience = Experience.getInstance();
    this.sizes = this.experience.sizes;
    this.scene = this.experience.scene;
    this.canvas = this.experience.canvas;
    // this.instance = this.setInstance();
    this.instance = this.setInstancePerspective();

    this.controls = this.setOrbitControls();
    this.debug = this.experience.debug;

    this.updateActive = true;
  }
  // private setInstance(): OrthographicCamera {
  //   let cameraInstance: OrthographicCamera;
  //   const aspect = this.sizes.width / this.sizes.height;
  //   const frustumSize = 10;
  //   cameraInstance = new OrthographicCamera(
  //     (frustumSize * aspect) / -4,
  //     (frustumSize * aspect) / 4,
  //     frustumSize / 4,
  //     frustumSize / -4,
  //     0.1,
  //     300
  //   );
  //
  //   cameraInstance.zoom = 0.35;
  //   cameraInstance.updateProjectionMatrix();
  //
  //   // cameraInstance.position.set(1, 2, 30);
  //   cameraInstance.position.set(-5, 5, -5);
  //   this.scene.add(cameraInstance);
  //   return cameraInstance;
  // }

  private setInstancePerspective(): PerspectiveCamera {
    let cameraInstance: PerspectiveCamera;
    cameraInstance = new PerspectiveCamera(
      30,
      this.sizes.width / this.sizes.height,
      0.1,
      100
    );
    cameraInstance.position.set(0, 0, 3);

    this.scene.add(cameraInstance);
    return cameraInstance;
  }

  private setOrbitControls(): OrbitControls {
    let controls: OrbitControls = new OrbitControls(this.instance, this.canvas);
    // controls.enableDamping = true;
    return controls;
  }

  addDebug() {
    if (this.debug.active) {
      this.instance.add(new AxesHelper(10));
      const cameraName: GUI = this.debug.debugModelFolder!.addFolder("Camera");

      cameraName
        .add(this.instance, "zoom", 0, 5)
        .name("Zoom")
        .onChange(() => {
          this.instance.updateProjectionMatrix();
        });

      cameraName
        .add(this.instance, "fov", 0, 100)
        .name("fov")
        .onChange(() => {
          this.instance.updateProjectionMatrix();
        });

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
    const aspect = this.sizes.width / this.sizes.height;

    this.instance.aspect = aspect;
    // this.instance.left = (frustumSize * aspect) / -2;
    // this.instance.right = (frustumSize * aspect) / 2;
    // this.instance.top = frustumSize / 2;
    // this.instance.bottom = frustumSize / -2;

    this.instance.updateProjectionMatrix();
  }

  rotateCamera(angle: number): void {
    gsap.to(this.instance.position, {
      duration: 3,
      y: Math.sin(angle),
      ease: "Expo.easeOut",
    });
  }

  update(): void {
    if (this.updateActive) {
      this.controls.update();
    }
  }
}

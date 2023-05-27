import { Experience } from "../Experience";
import {
  Color,
  DoubleSide,
  Group,
  Mesh,
  MeshToonMaterial,
  Object3D,
  Scene,
  TorusGeometry,
} from "three";
import Debug from "../utils/Debug";
import { GUI } from "lil-gui";
import Time from "../utils/Time";
import Camera from "../Camera";
import {
  createUISky,
  deleteUISky,
  disablePredictionSky,
  displayPredicitonSky,
} from "./displayInterfaceSky";

export default class Sky {
  public experience: Experience;
  public scene: Scene;
  private camera: Camera;

  public debug: Debug;
  public debugFolder: GUI | null;
  public time: Time;

  public loveRing: Object3D | null;
  public workRing: Object3D | null;
  public healthRing: Object3D | null;

  constructor() {
    this.experience = Experience.getInstance();
    this.scene = this.experience.scene;
    this.camera = this.experience.camera;
    this.setupCamera();

    this.debug = this.experience.debug;
    this.debugFolder = this.addDebugFolder();

    this.time = this.experience.time;

    this.loveRing = null;
    this.workRing = null;
    this.healthRing = null;

    this.addRings();
    console.log(this.experience.cartomancie?.lovePercent);
    console.log(this.experience.cartomancie?.workPercent);
    console.log(this.experience.cartomancie?.healthPercent);
    createUISky();
    this.displayTextRing();
    this.allActionOnButton();
  }

  addDebugFolder(): GUI | null {
    if (this.debug.active) {
      return this.debug.ui!.addFolder("Sky");
    }
    return null;
  }

  private setupCamera() {
    this.camera.instance.zoom = 0.15;
    this.camera.instance.position.set(-5, 10, -5);
    this.camera.controls.enabled = false;
    this.camera.instance.updateProjectionMatrix();
  }

  private allActionOnButton() {
    this.clickBackOnIslandButton();
    this.buttonLastPrediction();
    this.clickGoBackToRings();
    this.clickOnLastPrediction();
  }

  private clickBackOnIslandButton() {
    document
      .getElementById("button_back_island_sky")!
      .addEventListener("click", () => {
        this.destroy();
        deleteUISky();
        this.experience.island?.loadAllScene();
      });
  }

  private calculPercentToArc(number?: number): number {
    if (number) {
      return (6.283185307179586 * number) / 100;
    }
    return 0;
  }

  private displayTextRing() {
    if (this.experience.cartomancie) {
      if (
        this.experience.cartomancie.lovePercent &&
        this.experience.cartomancie.workPercent &&
        this.experience.cartomancie.healthPercent
      ) {
        document.getElementById("id_percent_left_ring")!.innerHTML =
          this.experience.cartomancie.lovePercent.toString() + "%";
        document.getElementById("id_percent_center_ring")!.innerHTML =
          this.experience.cartomancie.workPercent.toString() + "%";
        document.getElementById("id_percent_right_ring")!.innerHTML =
          this.experience.cartomancie.healthPercent.toString() + "%";
      }
    }
  }

  private buttonLastPrediction() {
    if (!this.experience.cartomancie?.textPrediction) {
      document.getElementById(
        "button_show_last_prediction_sky"
      )!.style.display = "none";
    }
  }

  private clickGoBackToRings() {
    document
      .getElementById("button_return_rings_sky")!
      .addEventListener("click", () => {
        disablePredictionSky();
      });
  }

  private clickOnLastPrediction() {
    document
      .getElementById("button_show_last_prediction_sky")!
      .addEventListener("click", () => {
        displayPredicitonSky();
        document.querySelector("#popup_last_prediction_sky h4")!.innerHTML =
          this.experience.cartomancie!.textPrediction!;
      });
  }

  private addRings(): void {
    this.loveRing = this.createRing(
      10,
      0.7,
      this.calculPercentToArc(this.experience.cartomancie?.lovePercent),
      -0.9,
      0.55,
      -1.15,
      new Color(0xfb607f),
      new Color(0x1a1b36),
      "Love Ring"
    );

    this.workRing = this.createRing(
      7,
      0.7,
      this.calculPercentToArc(this.experience.cartomancie?.workPercent!),
      -1,
      0.2,
      0,
      new Color("cyan"),
      new Color(0x1a1b36),
      "Work Ring"
    );

    this.healthRing = this.createRing(
      4,
      0.7,
      this.calculPercentToArc(this.experience.cartomancie?.healthPercent!),
      -1,
      2.7,
      1.8,
      new Color("red"),
      new Color(0x1a1b36),
      "Work Ring"
    );
    this.scene.add(this.loveRing);
    this.scene.add(this.workRing);
    this.scene.add(this.healthRing);
  }

  private createRing(
    radius: number,
    tube: number,
    arc: number,
    rotationX: number,
    rotationY: number,
    rotationZ: number,
    colorFirstRing: Color,
    colorSecondRing: Color,
    titleFolder: string
  ): Object3D {
    let firstRingGeometry = new TorusGeometry(radius, tube, 16, 50, arc);
    let secondRingGeometry = new TorusGeometry(
      radius,
      tube,
      16,
      50,
      -6.283185307179586 + firstRingGeometry.parameters.arc
    );

    const firstRingMaterial = new MeshToonMaterial({
      color: colorFirstRing,
      transparent: false,
      side: DoubleSide,
      // wireframe: true,
    });

    const secondRingMaterial = new MeshToonMaterial({
      color: colorSecondRing,
      transparent: false,
      side: DoubleSide,
      // wireframe: true,
    });

    const firstRingMesh = new Mesh(firstRingGeometry, firstRingMaterial);
    const secondRingMesh = new Mesh(secondRingGeometry, secondRingMaterial);

    secondRingMesh.rotation.z = 2 * Math.PI;
    const ringGroup = new Group();
    ringGroup.add(firstRingMesh);
    ringGroup.add(secondRingMesh);

    ringGroup.rotation.set(rotationX, rotationY, rotationZ);

    if (this.debug.active) {
      const ringsFolder: GUI = this.debugFolder!.addFolder(titleFolder);

      ringsFolder
        .add(ringGroup.rotation, "x")
        .min(-3)
        .max(3)
        .step(0.01)
        .name("Rotation X");
      ringsFolder
        .add(ringGroup.rotation, "y")
        .min(-3)
        .max(3)
        .step(0.01)
        .name("Rotation Y");
      ringsFolder
        .add(ringGroup.rotation, "z")
        .min(-3)
        .max(3)
        .step(0.01)
        .name("Rotation Z");
      ringsFolder
        .add(firstRingMesh.geometry.parameters, "arc")
        .min(0)
        .max(6.283185307179586)
        .step(0.1)
        .name("Arc")
        .onChange((newArc: number) => {
          firstRingGeometry = new TorusGeometry(radius, tube, 16, 100, newArc);
          secondRingGeometry = new TorusGeometry(
            radius,
            tube,
            16,
            100,
            -6.283185307179586 + newArc
          );
          firstRingMesh.geometry = firstRingGeometry;
          secondRingMesh.geometry = secondRingGeometry;
        });
    }
    return ringGroup;
  }
  public update() {
    this.loveRing!.rotation.x += this.time.delta * 0.0005;
    this.loveRing!.rotation.z += this.time.delta * 0.0002;

    this.workRing!.rotation.x -= this.time.delta * 0.0002;
    this.workRing!.rotation.y += this.time.delta * 0.0002;
    this.workRing!.rotation.z += this.time.delta * 0.0002;

    this.healthRing!.rotation.x -= this.time.delta * 0.0002;
    this.healthRing!.rotation.z -= this.time.delta * 0.0002;
  }

  destroy() {
    this.scene.remove(this.loveRing!);
    // this.loveRing = null;
    this.scene.remove(this.workRing!);
    // this.workRing = null;
    this.scene.remove(this.healthRing!);
    // this.healthRing = null;
  }
}

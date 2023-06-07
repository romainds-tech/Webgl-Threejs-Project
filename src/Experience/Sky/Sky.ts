import { Experience } from "../Experience";
import {
  CubeTextureLoader,
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
import gsap from "gsap";

export default class Sky {
  public experience: Experience;
  public scene?: Scene;
  private camera?: Camera;

  private allRings: Group;

  public debug?: Debug;
  public debugFolder: GUI | null;
  public time?: Time;

  public loveRing: Object3D | null;
  public prosperityRing: Object3D | null;
  public studyRing: Object3D | null;

  constructor() {
    this.experience = Experience.getInstance();
    this.scene = this.experience.scene;
    this.camera = this.experience.camera;
    this.setupCamera();

    this.debug = this.experience.debug;
    this.debugFolder = this.addDebugFolder();

    this.time = this.experience.time;

    this.allRings = new Group();
    this.loveRing = null;
    this.prosperityRing = null;
    this.studyRing = null;

    createUISky();
    this.displayTextRing();
    this.allActionOnButton();
    this.loadJowel();
  }

  addDebugFolder(): GUI | null {
    if (this.debug?.active) {
      return this.debug.ui!.addFolder("Sky");
    }
    return null;
  }

  private setupCamera() {
    this.camera!.updateActive = false;
    this.camera!.instance.zoom = 0.05;
    this.camera!.instance.position.set(-4, 1, -32);
    this.camera!.instance.rotation.set(0, -3, 6);
    this.camera!.instance.fov = 4;
    this.camera!.controls.enabled = false;

    this.experience.postProcessing!.selectiveBloomEffect!.intensity = 3;
    this.camera!.instance.updateProjectionMatrix();

    gsap.to(this.experience.planeTransition!.material, {
      duration: 0.5,
      delay: 0.5,
      opacity: 0,
      ease: "none",
      onComplete: () => {
        this.camera!.updateActive = false;
        // @ts-ignore
        this.experience.planeTransition!.material.visible = false;
      },
    });
    this.setBackGround();
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
        deleteUISky();
        // @ts-ignore
        this.experience.planeTransition!.material.visible = true;
        gsap.to(this.experience.planeTransition!.material, {
          duration: 0.5,
          opacity: 1,
          ease: "none",
          onComplete: () => {
            this.destroy();
            this.camera!.updateActive = true;
            this.experience.island?.backFromSky();
            this.experience.island?.loadAllScene();
          },
        });
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
        this.experience.cartomancie.prosperityPercent &&
        this.experience.cartomancie.studyPercent
      ) {
        document.getElementById("id_percent_left_ring")!.innerHTML =
          this.experience.cartomancie.lovePercent.toString() + "%";
        document.getElementById("id_percent_center_ring")!.innerHTML =
          this.experience.cartomancie.prosperityPercent.toString() + "%";
        document.getElementById("id_percent_right_ring")!.innerHTML =
          this.experience.cartomancie.studyPercent.toString() + "%";
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

  private async loadJowel() {
    this.addRings();

    this.allRings.add(this.loveRing!);
    this.allRings.add(this.prosperityRing!);
    this.allRings.add(this.studyRing!);

    this.scene?.add(this.allRings);
  }
  private addRings(): void {
    this.loveRing = this.createRing(
      10,
      0.7,
      this.calculPercentToArc(this.experience.cartomancie?.lovePercent),
      -0.9,
      0.55,
      -1.15,
      "Love Ring"
    );

    this.prosperityRing = this.createRing(
      7,
      0.7,
      this.calculPercentToArc(this.experience.cartomancie?.prosperityPercent!),
      -1,
      0.2,
      0,
      "Prosperity Ring"
    );

    this.studyRing = this.createRing(
      4,
      0.7,
      this.calculPercentToArc(this.experience.cartomancie?.studyPercent!),
      -1,
      2.7,
      1.8,
      "Study Ring"
    );
  }

  private createRing(
    radius: number,
    tube: number,
    arc: number,
    rotationX: number,
    rotationY: number,
    rotationZ: number,
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
      color: 0xffffff,
      transparent: false,
      side: DoubleSide,
      // wireframe: true,
    });

    const secondRingMaterial = new MeshToonMaterial({
      color: 0x000000,
      transparent: true,
      opacity: 0.5,
      side: DoubleSide,
      // wireframe: true,
    });

    const firstRingMesh = new Mesh(firstRingGeometry, firstRingMaterial);
    const secondRingMesh = new Mesh(secondRingGeometry, secondRingMaterial);

    this.experience.postProcessing?.setSelectObjectsForBloom(firstRingMesh);

    secondRingMesh.rotation.z = 2 * Math.PI;
    const ringGroup = new Group();
    ringGroup.add(firstRingMesh);
    ringGroup.add(secondRingMesh);

    ringGroup.rotation.set(rotationX, rotationY, rotationZ);

    if (this.debug?.active) {
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
    if (this.loveRing) {
      this.loveRing!.rotation.x += this.time!.delta * 0.0005;
      this.loveRing!.rotation.z += this.time!.delta * 0.0002;
    }

    if (this.prosperityRing) {
      this.prosperityRing!.rotation.x -= this.time!.delta * 0.0002;
      this.prosperityRing!.rotation.y += this.time!.delta * 0.0002;
      this.prosperityRing!.rotation.z += this.time!.delta * 0.0002;
    }

    if (this.studyRing) {
      this.studyRing!.rotation.x -= this.time!.delta * 0.0002;
      this.studyRing!.rotation.z -= this.time!.delta * 0.0002;
    }
  }

  private setBackGround() {
    // load a cubeMap texture

    new CubeTextureLoader()
      .setPath("envMap/hdrSky/")
      .load(
        ["px.png", "nx.png", "py.png", "ny.png", "pz.png", "nz.png"],
        (l) => {
          this.scene!.background = l;
          this.scene!.backgroundIntensity = 2;
        }
      );
  }

  destroy() {
    this.scene?.remove(this.loveRing!);
    this.loveRing = null;

    this.scene?.remove(this.prosperityRing!);
    this.prosperityRing = null;
    this.scene?.remove(this.studyRing!);
    this.scene!.background = null;
    this.studyRing = null;

    this.scene?.remove(this.allRings);
  }
}

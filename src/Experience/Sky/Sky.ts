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

export default class Sky {
  public experience: Experience;
  public scene: Scene;
  public debug: Debug;
  public debugFolder: GUI | null;
  public time: Time;

  public loveRing: Object3D | null;
  public workRing: Object3D | null;
  public healthRing: Object3D | null;

  constructor() {
    this.experience = Experience.getInstance();
    this.scene = this.experience.scene;

    this.debug = this.experience.debug;
    this.debugFolder = this.addDebugFolder();

    this.time = this.experience.time;

    this.loveRing = null;
    this.workRing = null;
    this.healthRing = null;

    this.addRings();
  }

  addDebugFolder(): GUI | null {
    if (this.debug.active) {
      return this.debug.ui!.addFolder("Sky");
    }
    return null;
  }

  addRings(): void {
    this.loveRing = this.createRing(
      10,
      0.7,
      4.5,
      -0.9,
      0.55,
      -1.15,
      new Color(0xfb607f),
      new Color("green"),
      "Love Ring"
    );

    this.workRing = this.createRing(
      7,
      0.7,
      5,
      -1,
      0.2,
      0,
      new Color("cyan"),
      new Color("yellow"),
      "Work Ring"
    );

    this.healthRing = this.createRing(
      4,
      0.7,
      5,
      -1,
      2.7,
      1.8,
      new Color("red"),
      new Color("yellow"),
      "Health Ring"
    );
    this.scene.add(this.loveRing);
    this.scene.add(this.workRing);
    this.scene.add(this.healthRing);
  }

  createRing(
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
  update() {
    this.loveRing!.rotation.x += this.time.delta * 0.0005;
    this.loveRing!.rotation.z += this.time.delta * 0.0002;

    this.workRing!.rotation.x -= this.time.delta * 0.0002;
    this.workRing!.rotation.y += this.time.delta * 0.0002;
    this.workRing!.rotation.z += this.time.delta * 0.0002;

    this.healthRing!.rotation.x -= this.time.delta * 0.0002;
    this.healthRing!.rotation.z -= this.time.delta * 0.0002;
  }

  destroy() {
    this.loveRing = null;
    this.workRing = null;
    this.healthRing = null;
  }
}

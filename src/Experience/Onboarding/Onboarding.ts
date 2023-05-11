import { Experience } from "../Experience";
import { Scene } from "three";
import Model3D from "../utils/Model3d";
import { allGlbs } from "../../Sources/glb/glb";
import CustomGlbLoader from "../utils/CustomGlbLoader";

export default class Onboarding {
  public experience: Experience;
  public scene: Scene;
  private temple?: Model3D;
  private circle1?: Model3D;
  private circle2?: Model3D;

  constructor() {
    this.experience = Experience.getInstance();
    this.scene = this.experience.scene;

    this.loadAllModels();
    this.setupCamera();
  }

  private async loadAllModels() {
    this.temple = await CustomGlbLoader.getInstance().loadOne(
      new Model3D(allGlbs.Temple)
    );
    this.scene.add(this.temple.loadedModel3D!);

    this.circle1 = await CustomGlbLoader.getInstance().loadOne(
      new Model3D(allGlbs.TempleCircle1)
    );
    this.scene.add(this.circle1.loadedModel3D!);

    this.circle2 = await CustomGlbLoader.getInstance().loadOne(
      new Model3D(allGlbs.TempleCircle2)
    );
    this.scene.add(this.circle2.loadedModel3D!);
  }

  private setupCamera() {
    this.experience.camera.instance.position.set(-5, 20, 20);

    this.experience.camera.debugFolder = this.experience.camera.addDebug();
  }

  update() {}

  destroy() {}
}

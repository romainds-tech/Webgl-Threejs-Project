import { Experience } from "../Experience";
import { Scene, DirectionalLight, Light } from "three";
import CustomGlbLoader from "../utils/CustomGlbLoader";
import { allGlbs } from "../../Sources/glb/glb";
import Model3D from "../utils/Model3d";

export default class Island {
  public experience: Experience;
  public scene: Scene;
  public glbRobot?: Promise<Model3D>;
  public glbCubeVertex?: Promise<Model3D>;
  public sunLight?: Light;

  constructor() {
    this.experience = Experience.getInstance();
    this.scene = this.experience.scene;

    this.glbRobot = CustomGlbLoader.getInstance().loadOne(allGlbs.JustRobot);
    this.glbCubeVertex = CustomGlbLoader.getInstance().loadOne(
      allGlbs.CubeVertexGroup
    );
    this.sunLight = new DirectionalLight("#ffffff", 4);
    this.loadLightIsland();
  }

  loadLightIsland() {
    this.sunLight!.castShadow = true;
    this.sunLight!.shadow.mapSize.set(1024, 1024);
    this.sunLight!.shadow.normalBias = 0.05;
    this.sunLight!.position.set(3.5, 2, -1.25);
    this.scene.add(this.sunLight!);

    // Debug
    // if (this.debug.active) {
    //   this.debugFolder
    //       .add(this.sunLight, "intensity")
    //       .name("sunLightIntensity")
    //       .min(0)
    //       .max(10)
    //       .step(0.001);
    //
    //   this.debugFolder
    //       .add(this.sunLight.position, "x")
    //       .name("sunLightX")
    //       .min(-5)
    //       .max(5)
    //       .step(0.001);
    //
    //   this.debugFolder
    //       .add(this.sunLight.position, "y")
    //       .name("sunLightY")
    //       .min(-5)
    //       .max(5)
    //       .step(0.001);
    //
    //   this.debugFolder
    //       .add(this.sunLight.position, "z")
    //       .name("sunLightZ")
    //       .min(-5)
    //       .max(5)
    //       .step(0.001);
    // }
  }

  update() {}

  destroy() {
    delete this.glbRobot;
    delete this.sunLight;
  }
}

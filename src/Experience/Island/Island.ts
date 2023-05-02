import { Experience } from "../Experience";
import { Scene, DirectionalLight, Light } from "three";
import CustomGlbLoader from "../utils/CustomGlbLoader";
import { allGlbs } from "../../Sources/glb/glb";
import Model3D from "../utils/Model3d";
import { allFbx } from "../../Sources/fbx/fbx";
import CustomFbxLoader from "../utils/CustomFbxLoader";
import Debug from "../utils/Debug";
import { GUI } from "lil-gui";

export default class Island {
  public experience: Experience;
  public scene: Scene;
  private baleine?: Model3D;
  private cubeVertex?: Model3D;
  public sunLight?: Light;

  public debug: Debug;
  public debugFolder: GUI | null;

  constructor() {
    this.experience = Experience.getInstance();
    this.scene = this.experience.scene;

    this.debug = this.experience.debug;
    this.debugFolder = this.addDebugFolder();

    this.loadLightIsland();
    this.loadAllModels();
  }

  addDebugFolder(): GUI | null {
    if (this.debug.active) {
      return this.debug.ui!.addFolder("Island");
    }
    return null;
  }

  private async loadAllModels() {
    this.cubeVertex = await CustomGlbLoader.getInstance().loadOne(
      new Model3D(allGlbs.CubeVertexGroup)
    );
    this.baleine = await CustomFbxLoader.getInstance().loadOne(
      new Model3D(allFbx.Whale)
    );

    this.scene.add(this.cubeVertex.object!);
    this.scene.add(this.baleine.object);

    this.playAnimations();
  }

  private playAnimations(): void {
    if (this.baleine?.animationAction) {
      this.baleine.animationAction[1].play();
    }
  }

  loadLightIsland(): void {
    this.sunLight = new DirectionalLight("#ffffff", 4);
    this.sunLight!.castShadow = true;
    this.sunLight!.shadow.mapSize.set(1024, 1024);
    this.sunLight!.shadow.normalBias = 0.05;
    this.sunLight!.position.set(3.5, 2, -1.25);
    this.scene.add(this.sunLight!);
    // Debug
    if (this.debug.active) {
      const lightFolder: GUI = this.debugFolder!.addFolder("Light");
      lightFolder!
        .add(this.sunLight!, "intensity")
        .name("sunLightIntensity")
        .min(0)
        .max(10)
        .step(0.001);

      lightFolder
        .add(this.sunLight!.position, "x")
        .name("sunLightX")
        .min(-5)
        .max(5)
        .step(0.001);

      lightFolder
        .add(this.sunLight!.position, "y")
        .name("sunLightY")
        .min(-5)
        .max(5)
        .step(0.001);

      lightFolder
        .add(this.sunLight!.position, "z")
        .name("sunLightZ")
        .min(-5)
        .max(5)
        .step(0.001);

      lightFolder.addColor(this.sunLight!, "color");
    }
  }

  update() {
    this.baleine?.mixer?.update(this.experience.time.delta * 0.001);
    // this.cubeVertex?.mixer?.update(this.experience.time.delta);
  }

  destroy() {
    this.baleine?.destroy();
    this.cubeVertex?.destroy();
    this.sunLight?.dispose();
  }
}

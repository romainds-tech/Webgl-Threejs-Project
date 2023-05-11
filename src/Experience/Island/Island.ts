import { Experience } from "../Experience";
import { Scene } from "three";
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

  public debug: Debug;
  public debugFolder: GUI | null;

  constructor() {
    this.experience = Experience.getInstance();
    this.scene = this.experience.scene;

    this.debug = this.experience.debug;
    this.debugFolder = this.addDebugFolder();

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

    this.scene.add(this.cubeVertex.loadedModel3D!);
    this.scene.add(this.baleine.loadedModel3D!);

    this.playAnimations();
  }

  private playAnimations(): void {
    if (this.baleine?.animationAction) {
      this.baleine.animationAction[1].play();
    }
  }

  update() {
    this.baleine?.mixer?.update(this.experience.time.delta * 0.001);
    // this.cubeVertex?.mixer?.update(this.experience.time.delta);
  }

  destroy() {
    this.baleine?.destroy();
    this.cubeVertex?.destroy();
  }
}

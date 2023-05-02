import { Experience } from "../Experience";
import { Scene, DirectionalLight, Light } from "three";
import CustomGlbLoader from "../utils/CustomGlbLoader";
import { allGlbs } from "../../Sources/glb/glb";
import Model3D from "../utils/Model3d";
import { allFbx } from "../../Sources/fbx/fbx";
import CustomFbxLoader from "../utils/CustomFbxLoader";

export default class Island {
  public experience: Experience;
  public scene: Scene;
  private baleine?: Model3D;
  private cubeVertex?: Model3D;
  public sunLight?: Light;

  constructor() {
    this.experience = Experience.getInstance();
    this.scene = this.experience.scene;

    this.loadLightIsland();
    this.loadAllModels();
  }

  private async loadAllModels() {
    this.cubeVertex = await CustomGlbLoader.getInstance().loadOne(
      allGlbs.CubeVertexGroup
    );

    this.baleine = await CustomFbxLoader.getInstance().loadOne(allFbx.Whale);

    this.scene.add(this.cubeVertex.loadedModel3D!);
    this.scene.add(this.baleine.loadedModel3D!);

    this.playAnimations();
  }

  private playAnimations() {
    if (this.baleine?.animationAction) {
      this.baleine.animationAction[1].play();
    }
  }

  loadLightIsland() {
    this.sunLight = new DirectionalLight("#ffffff", 4);
    this.sunLight!.castShadow = true;
    this.sunLight!.shadow.mapSize.set(1024, 1024);
    this.sunLight!.shadow.normalBias = 0.05;
    this.sunLight!.position.set(3.5, 2, -1.25);
    this.scene.add(this.sunLight!);
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

import { Experience } from "../Experience";
import {BoxGeometry, Mesh, MeshLambertMaterial, Scene} from "three";
import CustomGlbLoader from "../utils/CustomGlbLoader";
import { allGlbs } from "../../Sources/glb/glb";
import Model3D from "../utils/Model3d";
import { allFbx } from "../../Sources/fbx/fbx";
import CustomFbxLoader from "../utils/CustomFbxLoader";
import Debug from "../utils/Debug";
import { GUI } from "lil-gui";
import {mapMainIslandData, loadMap} from "./map"
export default class Island {
  public experience: Experience;
  public scene: Scene;
  private baleine?: Model3D;
  private cubeVertex?: Model3D;

  public debug: Debug;
  public debugFolder: GUI | null;
  public cubeMesh? : Mesh

  constructor() {
    this.experience = Experience.getInstance();
    this.scene = this.experience.scene;

    this.debug = this.experience.debug;
    this.debugFolder = this.addDebugFolder();

    // this.loadAllModels();
    loadMap(mapMainIslandData, this.scene)
    // this.addCube()
  }

  addCube() {
    const geometry = new BoxGeometry(2,2,2)
    const material = new MeshLambertMaterial()

    this.cubeMesh = new Mesh(geometry, material)
    this.scene.add(this.cubeMesh)
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

  update() {
    this.baleine?.mixer?.update(this.experience.time.delta * 0.001);
    // this.cubeVertex?.mixer?.update(this.experience.time.delta);
  }

  destroy() {
    this.baleine?.destroy();
    this.cubeVertex?.destroy();
  }
}

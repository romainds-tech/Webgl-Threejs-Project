import { Experience } from "../Experience";
import { DirectionalLight, Light, Scene } from "three";
import Model3D from "../utils/Model3d";
import CustomGlbLoader from "../utils/CustomGlbLoader";
import { allGlbs } from "../../Sources/glb/glb";

export default class Ortho {
  public experience: Experience;
  public scene: Scene;
  public cubeVertex: Promise<void | Model3D>;
  public sunLight?: Light;
  constructor() {
    this.experience = Experience.getInstance();
    this.scene = this.experience.scene;
    this.cubeVertex = CustomGlbLoader.getInstance()
      .loadOne(allGlbs.CubeVertexGroup)
      .then((cubeVertex: Model3D): void => {
        console.log(cubeVertex.loadedModel3D?.children[0].children[0]);
        cubeVertex.loadedModel3D?.children[0].children[0].position.set(0, 1, 0);
        cubeVertex.loadedModel3D?.children[0].children[1].position.set(
          0,
          -1,
          0
        );
        this.scene.add(cubeVertex.loadedModel3D!);
      });
    this.sunLight = new DirectionalLight("#ffffff", 4);
    this.loadLightOrtho();
  }

  loadLightOrtho() {
    this.sunLight!.castShadow = true;
    this.sunLight!.shadow.mapSize.set(1024, 1024);
    this.sunLight!.shadow.normalBias = 0.05;
    this.sunLight!.position.set(3.5, 2, -1.25);
    this.scene.add(this.sunLight!);
  }

  destroy() {
    this.scene.remove(this.sunLight!);
    delete this.sunLight;
  }
}

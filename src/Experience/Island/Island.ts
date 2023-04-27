import { Experience } from "../Experience";
import { Scene } from "three";
import CustomGlbLoader from "../utils/CustomGlbLoader";
import { glbPromises } from "../../Sources/glb/glb";

export default class Island {
  public experience: Experience;
  public scene: Scene;
  public glbLoader: CustomGlbLoader;

  constructor() {
    this.experience = Experience.getInstance();
    this.scene = this.experience.scene;
    this.glbLoader = CustomGlbLoader.getInstance();

    this.loadModelInScene();
  }

  loadModelInScene() {
    console.log(glbPromises);
    this.robotModel = this.glbLoader.loadOne(glbPromises[3]);
    this.robotModel.then((robot) => {
      this.scene.add(robot.loadedModel3D);
    });

    // console.log(this.truc);
    // console.log(this.plane);
    // this.scene.add(this.plane);
  }

  update() {}
}

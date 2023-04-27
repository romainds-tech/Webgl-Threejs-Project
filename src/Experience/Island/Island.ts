import { Experience } from "../Experience";
import { Scene } from "three";

export default class Island {
  public experience: Experience;
  public scene: Scene;

  constructor() {
    this.experience = Experience.getInstance();
    this.scene = this.experience.scene;
  }

  update() {}
}

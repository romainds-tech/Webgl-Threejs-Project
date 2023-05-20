import Experience from "../Experience.js";
import Environment from "./Environment.js";
import Floor from "./Floor.js";
import Fox from "./Fox.js";
import Robot from "./Robot.js";
import Whale from "./Whale.js";
import Griffe from "./Griffe.js";
import HTMLPoint from "../HTMLInterface/HTMLPoint.js";
import Cube from "./Cube.js";

export default class World {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;

    // Wait for resources
    this.resources.on("ready", () => {
      // Setup
      // this.floor = new Floor();
      // this.fox = new Fox();
      // this.robot = new Robot("robot1");
      // this.whale = new Whale();
      // this.griffe = new Griffe();
      this.cube = new Cube();
      this.htmlPoint = new HTMLPoint();

      this.environment = new Environment();
    });
  }

  update() {
    if (this.fox) this.fox.update();
    if (this.whale) this.whale.update();
    if (this.robot) this.robot.update();
    if (this.griffe) this.griffe.update();
    if (this.htmlPoint) this.htmlPoint.update();
  }
}

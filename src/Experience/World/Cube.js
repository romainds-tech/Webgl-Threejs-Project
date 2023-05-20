import * as THREE from "three";
import Experience from "../Experience.js";
import {
  BoxGeometry,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
  ShaderMaterial,
} from "three";

export default class Cube {
  constructor(name) {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.camera = this.experience.camera;
    this.time = this.experience.time;
    this.debug = this.experience.debug;

    // Debug
    if (this.debug.active) {
      this.debugFolder = this.debug.ui.addFolder("robot");
    }

    // Resource
    this.resource = this.resources.items[name];

    this.setModel();
  }
  setModel() {
    this.geometryCube = new BoxGeometry(2, 2, 2);
    this.materialCube = new MeshStandardMaterial({
      color: 0xff0000,
      transparent: true,
    });
    this.mesh = new Mesh(this.geometryCube, this.materialCube);

    // this.mesh.layers.toggle(this.experience.postProcessing.BLOOM_SCENE );
    this.mesh.layers.toggle(1);
    this.scene.add(this.mesh);
  }
}

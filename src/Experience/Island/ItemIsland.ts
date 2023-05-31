import { Object3D } from "three";

// Object to add in map
export default class ItemIsland {
  public object: Object3D | null;
  public text: string | null;
  constructor() {
    this.object = null;
    this.text = null;
  }
}

import { Object3D } from "three";
import ItemIsland from "./ItemIsland";

export default class ItemIslandManager {
  public itemArray: ItemIsland[];
  public newItemToCreate: Object3D | null;
  public newTextToCreate: string | undefined;
  public selectedItem: Object3D | null;
  public selectItemPrediction: string | null;

  constructor() {
    this.itemArray = [];

    this.newItemToCreate = null;
    this.newTextToCreate = undefined;
    this.selectedItem = null;
    this.selectItemPrediction = null;
  }

  // add new item (type object3D) in the array of item
  addItem(newItemMesh: Object3D, newItemText: string) {
    let newItem = new ItemIsland();
    newItem.object = newItemMesh;
    newItem.text = newItemText;
    this.itemArray.push(newItem);
  }

  // returns an object based on the position passed in parameter else returns null
  getItemAtPosition(x: number, z: number) {
    for (var i = 0; i < this.itemArray.length; i++) {
      if (this.itemArray[i].object != null) {
        if (
          this.itemArray[i].object!.position.x == x &&
          this.itemArray[i].object!.position.z == z
        ) {
          return this.itemArray[i];
        }
      }
    }
    return null;
  }
}

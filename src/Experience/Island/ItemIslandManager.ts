import { AxesHelper, Object3D } from "three";
import ItemIsland from "./ItemIsland";

export default class ItemIslandManager {
  public itemArray: ItemIsland[];
  public newItemMeshToCreate: Object3D | null;
  public selectedItem: Object3D | null;

  constructor() {
    this.itemArray = [];

    this.newItemMeshToCreate = null;
    this.selectedItem = null;
  }

  addItem(newItemMesh: Object3D) {
    let newItem = new ItemIsland();
    newItem.object = newItemMesh;
    newItem.object.add(new AxesHelper(5));
    this.itemArray.push(newItem);
  }

  deleteItem(item: ItemIsland) {
    const index = this.itemArray.indexOf(item);
    if (index > -1) {
      this.itemArray.splice(index, 1);
    }
  }

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

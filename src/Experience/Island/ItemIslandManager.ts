import { Mesh } from "three";
import ItemIsland from "./ItemIsland";

export default class ItemIslandManager {
  public itemArray: ItemIsland[];
  public newItemMeshToCreate: Mesh | null;
  public selectedItem: Mesh | null;

  constructor() {
    this.itemArray = [];

    this.newItemMeshToCreate = null;
    this.selectedItem = null;
  }

  addItem(newItemMesh: Mesh) {
    var newItem = new ItemIsland();
    newItem.mesh = newItemMesh;
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
      if (this.itemArray[i].mesh != null) {
        if (
          this.itemArray[i].mesh!.position.x == x &&
          this.itemArray[i].mesh!.position.z == z
        ) {
          return this.itemArray[i];
        }
      }
    }
    return null;
  }
}

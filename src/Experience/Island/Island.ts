import { Experience } from "../Experience";
import { Group, Object3D, Scene, Vector2, Event, Color } from "three";
import CustomGlbLoader from "../utils/CustomGlbLoader";
import { allGlbs } from "../../Sources/glb/glb";
import Model3D from "../utils/Model3d";
import { mapMainIslandData, loadMap } from "./map";
import Sizes from "../utils/Sizes";
import Camera from "../Camera";
import ItemIslandManager from "./ItemIslandManager";

import {
  displayInterfaceInformationItem,
  disablePopupIterfaceModificateItem,
  onClickOnDisabledModificationButton,
  displayPopupIterfaceModificateItem,
  disableInterfaceInformationItem,
  disableInterfaceCreationItem,
  displayInterfaceCreationItem,
} from "./displayInterfaceIsland";
import RaycasterExperience from "../UI/Interactions/RaycasterExperience";
import Popup from "../UI/Popups/Popup";
import Button from "../UI/Buttons/Button";
import Cartomancie from "../Cartomancie/Cartomancie";
import ItemIsland from "./ItemIsland";
import Debug from "../utils/Debug";

export default class Island {
  public experience: Experience;
  public debug: Debug;
  public scene: Scene;
  public sizes: Sizes;
  public camera: Camera;

  public item?: Model3D;
  public textItem?: string;
  private island?: Model3D;

  public numberOfElementToAdd: number;

  // Map
  // var for trigger event
  private readonly onMouseDown: (event: MouseEvent) => void;

  // Map object
  public mapGroup: Group;
  private raycaster: RaycasterExperience;
  private canRaycast: boolean;
  private isSelected: boolean;
  private readonly mouse: Vector2;
  private readonly allObjectsCreateInMap: Array<Object3D>;
  //
  public itemIslandManager: ItemIslandManager;
  // // public textItemIsland: TextItemIsland;
  public popupIsland: Popup;
  public imageItem: Object3D<Event> | null;
  public buttonIsland: Button;

  constructor() {
    // Experience
    this.experience = Experience.getInstance();
    this.scene = this.experience.scene;
    this.sizes = this.experience.sizes;
    this.camera = this.experience.camera;
    this.debug = this.experience.debug;
    this.setupCamera();

    // Mouse position
    this.mouse = new Vector2();

    // Map
    this.numberOfElementToAdd = 0;
    //
    this.itemIslandManager = new ItemIslandManager();
    this.allObjectsCreateInMap = new Array<Object3D>();
    this.raycaster = new RaycasterExperience();
    //
    this.isSelected = false;
    // Load the map
    this.mapGroup = loadMap(
      mapMainIslandData,
      this.scene,
      this.allObjectsCreateInMap
    );

    // Ui of item create an modificate
    this.popupIsland = new Popup();
    this.buttonIsland = new Button();

    // Get all map and apply methods
    this.mapGroupInfo();
    this.onMouseDown = this.onClickDown;

    this.canRaycast = true;

    // check if we click on plane
    document.addEventListener("pointerdown", this.onMouseDown, true);

    this.displayEditMode(false);

    this.loadIsland();

    this.popupIsland.setPopupIsland();
    this.buttonIsland.setButtonIsland();

    this.actionOnClickButtons();
    this.imageItem = null;

    this.checkIfAddItemToCreate();
  }

  public loadAllScene() {
    this.scene.add(this.island?.loadedModel3D!);
    this.scene.add(this.mapGroup);
  }

  public setupScene() {
    this.scene.background = new Color(0x000000);
  }

  public setupCamera() {
    this.camera.controls.enabled = true;
    this.experience.camera.instance.zoom = 0.6;
    this.experience.camera.instance.position.set(-5, 5, -5);
    this.experience.camera.instance.updateProjectionMatrix();
  }

  public checkIfAddItemToCreate() {
    if (this.numberOfElementToAdd > 0) {
      displayInterfaceCreationItem();
      this.displayEditMode(true);
    } else if (this.isSelected) {
      this.displayEditMode(true);
      disableInterfaceCreationItem();
    } else {
      this.displayEditMode(false);
      disableInterfaceCreationItem();
    }
  }

  private displayEditMode(isEdit: boolean) {
    let opacity = 0.4;
    if (!isEdit) {
      opacity = 0.2;
    }
    this.mapGroup.children.forEach((group) => {
      if (group.name == "editMode") {
        group.children.forEach((mesh) => {
          // @ts-ignore
          mesh.material.opacity = opacity;
        });
      }
    });
  }

  // Get map and apply modification on all the map
  private mapGroupInfo() {
    this.mapGroup.position.set(3, -0.15, 3);
  }

  //change the value of all the scene

  // get the mouse positipn, if we click on a gray cube : add Item on this cube
  // modify the position of the item if we click on
  onClickDown = (event: MouseEvent) => {
    // event.preventDefault();

    // position cursor on screen from center of the screen
    this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    console.log(this.mouse);

    // Checking if the mouse projection is targeting a valid block in the clickableObjs array
    let intersects = this.raycaster.getRaycastObject(
      this.mouse,
      this.camera.instance,
      this.allObjectsCreateInMap
    );
    // if I clicked on a raycastable object
    if (intersects.length > 0 && this.canRaycast) {
      // first plane clicked
      let selectedPlane = intersects[0].object;

      // modification item position
      if (this.isSelected) {
        this.modificationItemPosition(selectedPlane);
      }
      // if create object
      else {
        let checkItem = this.itemIslandManager.getItemAtPosition(
          selectedPlane.position.x,
          selectedPlane.position.z
        );
        // If we dont have item on this case, we create one
        if (
          checkItem == null &&
          this.numberOfElementToAdd > 0 &&
          selectedPlane.name == "edit"
        ) {
          this.createItemAtPosition(selectedPlane);
        }
        // Click on center to have a prediction
        else if (
          selectedPlane.name == "cartomancie" &&
          this.numberOfElementToAdd == 0
        ) {
          this.destroy();
          this.experience.cartomancie = new Cartomancie();
        }
        // Else we gonna change position of this item
        else {
          if (checkItem) {
            this.selectItem(checkItem);
          }
        }

        // add object in array of object
        let templateItem = this.itemIslandManager.newItemToCreate;
        let templateItemText = this.itemIslandManager.newTextToCreate;
        if (templateItem && templateItemText) {
          this.mapGroup.add(templateItem);
          this.itemIslandManager.addItem(templateItem, templateItemText);
          this.itemIslandManager.newItemToCreate = null;
          this.itemIslandManager.newTextToCreate = undefined;
        }
      }
      // if i didn't click on a raycastable object i reset the props
    } else {
      if (this.itemIslandManager.selectedItem && this.canRaycast) {
        this.resetPositionOfSelectedObject();
        disablePopupIterfaceModificateItem();
      }
      this.checkIfAddItemToCreate();
    }
  };

  // MANAGE ITEM
  private modificationItemPosition(selectedBloc: Object3D<Event>) {
    this.displayEditMode(true);
    // places item on a new selected block
    if (
      !this.itemIslandManager.getItemAtPosition(
        selectedBloc.position.x,
        selectedBloc.position.z
      ) &&
      selectedBloc.name == "edit"
    ) {
      this.itemIslandManager.selectedItem!.position.set(
        selectedBloc.position.x,
        0,
        selectedBloc.position.z
      );
    }
    // put back the item if it is already on the block or if the place is already taken
    else {
      this.itemIslandManager.selectedItem!.position.y = 0;
    }
    this.isSelected = false;
    this.destroyImageItem();
    this.checkIfAddItemToCreate();
    disablePopupIterfaceModificateItem();
  }

  private createItemAtPosition(positionPlane: Object3D<Event>) {
    let newItem = this.item!.loadedModel3D!.clone();

    newItem.position.set(positionPlane.position.x, 0, positionPlane.position.z);
    this.itemIslandManager.newItemToCreate = newItem;
    this.itemIslandManager.newTextToCreate =
      this.experience.cartomancie?.textPrediction;
    this.numberOfElementToAdd -= 1;
    this.checkIfAddItemToCreate();
  }

  private selectItem(itemSelected: ItemIsland) {
    this.itemIslandManager.selectedItem = itemSelected.object;
    this.itemIslandManager.selectItemPrediction = itemSelected.text;
    document.querySelector("#popup_select_item_island h4")!.innerHTML =
      this.itemIslandManager.selectItemPrediction!;

    this.itemIslandManager.selectedItem!.position.y = 1;
    this.isSelected = true;
    this.canRaycast = false;

    this.imageItem = itemSelected.object!.clone();
    this.setImageItem();
    this.displayEditMode(true);
    displayInterfaceInformationItem();
    disableInterfaceCreationItem();
  }

  setImageItem() {
    let sizeImageItem = 0.05;
    if (this.imageItem) {
      this.imageItem.scale.set(sizeImageItem, sizeImageItem, sizeImageItem);

      this.imageItem.position.set(0, 3, 0);
      this.scene.add(this.imageItem);
    }
  }

  // BUTTONS
  // all action on buttons
  private actionOnClickButtons() {
    onClickOnDisabledModificationButton();

    this.clickOnCrossButtonInformationItem();
    this.clickOnAbandonedModificationItemButton();
    this.clickOnMoveItemButton();
    this.clickOnDeleteItemButton();
  }

  private clickOnCrossButtonInformationItem() {
    document
      .getElementById("button_disable_select_item_island")!
      .addEventListener("click", () => {
        disableInterfaceInformationItem();
        console.log("cross button");
        this.resetPositionOfSelectedObject();
        this.canRaycast = true;
        this.checkIfAddItemToCreate();
        this.destroyImageItem();
      });
  }

  private clickOnAbandonedModificationItemButton() {
    document
      .getElementById("abandonned_modificate_item_position_island")!
      .addEventListener("click", () => {
        disablePopupIterfaceModificateItem();
        console.log("annuler button");
        this.resetPositionOfSelectedObject();
        this.checkIfAddItemToCreate();
        this.destroyImageItem();
      });
  }

  private clickOnMoveItemButton() {
    document
      .getElementById("button_select_modificate_item_island")!
      .addEventListener("click", () => {
        displayPopupIterfaceModificateItem();
        disableInterfaceInformationItem();
        disableInterfaceCreationItem();
        console.log("deplacer button");
        this.canRaycast = true;
        this.destroyImageItem();
      });
  }

  private clickOnDeleteItemButton() {
    document
      .getElementById("delete_button_item_island")!
      .addEventListener("click", () => {
        this.numberOfElementToAdd -= 1;
        this.checkIfAddItemToCreate();
      });
  }

  private resetPositionOfSelectedObject() {
    this.isSelected = false;
    this.itemIslandManager.selectedItem!.position.y = 0;
  }

  // ITEMS
  private async loadIsland() {
    this.island = await CustomGlbLoader.getInstance().loadOne(
      new Model3D(allGlbs.Island)
    );
    this.island.loadedModel3D!.castShadow = true;
    this.island.loadedModel3D!.receiveShadow = true;
    console.log(this.island.loadedModel3D!);
    this.scene.add(this.island.loadedModel3D!);
    console.log(this.island.animationAction, "animation");
    this.island.animationAction![0].play();
    this.island.animationAction![1].play();
    this.island.animationAction![2].play();
  }

  private destroyImageItem() {
    this.scene.remove(this.imageItem!);
    this.imageItem = null;
  }

  update() {
    this.island?.mixer?.update(this.experience.time.delta * 0.002);
  }

  destroy() {
    this.scene.remove(this.island?.loadedModel3D!);
    this.island?.loadedModel3D?.remove();

    this.scene.remove(this.mapGroup);
    this.mapGroup.remove();
  }
}

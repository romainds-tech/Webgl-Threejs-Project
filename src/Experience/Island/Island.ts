import { Experience } from "../Experience";
import {
  ArrowHelper,
  Group,
  Mesh,
  Object3D,
  Scene,
  Vector2,
  Event,
} from "three";
import CustomGlbLoader from "../utils/CustomGlbLoader";
import { allGlbs } from "../../Sources/glb/glb";
import Model3D from "../utils/Model3d";
import Debug from "../utils/Debug";
import { GUI } from "lil-gui";
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

export default class Island {
  public experience: Experience;
  public scene: Scene;
  public sizes: Sizes;
  public camera: Camera;

  public item?: Model3D;
  private island?: Model3D;

  public debug: Debug;
  public debugFolder: GUI | null;

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

  public itemIslandManager: ItemIslandManager;
  // public textItemIsland: TextItemIsland;
  public popupIsland: Popup;
  public imageItem: Object3D<Event> | null;
  public buttonIsland: Button;

  private allScene?: Group;
  public overlay?: HTMLDivElement | null;
  public cursor?: Mesh;

  constructor(elementToAdd: number) {
    // Experience
    this.experience = Experience.getInstance();
    this.scene = this.experience.scene;
    this.sizes = this.experience.sizes;
    this.camera = this.experience.camera;
    this.setupCamera();

    // Debug
    this.debug = this.experience.debug;
    this.debugFolder = this.addDebugFolder();

    // Mouse position
    this.mouse = new Vector2();

    // Map
    this.numberOfElementToAdd = elementToAdd;

    this.itemIslandManager = new ItemIslandManager();
    this.allObjectsCreateInMap = new Array<Object3D>();
    this.raycaster = new RaycasterExperience();

    // this.loadModelsItemIsland();

    this.isSelected = false;
    // Load the map
    this.mapGroup = loadMap(
      mapMainIslandData,
      this.scene,
      this.allObjectsCreateInMap
    );

    // Ui of item create an modificate
    // this.textItemIsland = new TextItemIsland();
    this.popupIsland = new Popup();
    this.buttonIsland = new Button();

    // Get all map and apply methods
    this.mapGroupInfo();
    this.onMouseDown = this.onClickDown;

    this.canRaycast = true;

    document.addEventListener("pointerdown", this.onMouseDown, false);

    this.displayEditMode(false);

    this.loadIsland();

    this.popupIsland.setPopupIsland();
    this.buttonIsland.setButtonIsland();

    this.actionOnClickButtons();
    this.imageItem = null;

    console.log(this.numberOfElementToAdd);
    this.checkIfAddItemToCreate();
    console.log(this.camera.instance);
  }

  checkIfAddItemToCreate() {
    if (this.numberOfElementToAdd > 0) {
      displayInterfaceCreationItem();
    } else if (this.isSelected) {
      this.displayEditMode(true);
      disableInterfaceCreationItem();
    } else {
      this.displayEditMode(false);
      disableInterfaceCreationItem();
    }
  }

  displayEditMode(isEdit: boolean) {
    var opacity = 0.4;
    if (!isEdit) {
      opacity = 0.2;
    }
    this.mapGroup.children.forEach((group) => {
      if (group.name == "editMode") {
        group.children.forEach((mesh) => {
          mesh.material.opacity = opacity;
        });
      }
    });
  }

  // Get map and apply modification on all the map
  mapGroupInfo() {
    this.mapGroup.position.set(3, -0.15, 3);
  }

  //change the value of all the scene
  setupCamera() {
    this.experience.camera.instance.zoom = 0.6;
    this.experience.camera.instance.position.set(-5, 5, -5);

    this.experience.camera.instance.updateProjectionMatrix();
  }

  // get the mouse positipn, if we click on a gray cube : add Item on this cube
  // modify the position of the item if we click on
  onClickDown = (event: MouseEvent) => {
    event.preventDefault();

    this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    // Checking if the mouse projection is targeting a valid block in the clickableObjs array
    let intersects = this.raycaster.getRaycastObject(
      this.mouse,
      this.camera.instance,
      this.allObjectsCreateInMap
    );

    // if I clicked on a raycastable object
    if (intersects.length > 0 && this.canRaycast) {
      this.addDebug();

      // Add cursor on the bloc
      let selectedBloc = intersects[0].object;
      // modification item position
      if (this.isSelected) {
        this.displayEditMode(true);
        // places item on a new selected block

        if (
          !this.itemIslandManager.getItemAtPosition(
            selectedBloc.position.x,
            selectedBloc.position.z
          )
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
      // if we create object
      else {
        let checkItem = this.itemIslandManager.getItemAtPosition(
          selectedBloc.position.x,
          selectedBloc.position.z
        );

        // If we dont have item on this case, we create one
        if (checkItem == null && this.numberOfElementToAdd > 0) {
          let newItem = this.item!.loadedModel3D!.clone();

          newItem.position.set(
            selectedBloc.position.x,
            0,
            selectedBloc.position.z
          );
          this.itemIslandManager.newItemToCreate = newItem;
          this.numberOfElementToAdd -= 1;
          this.checkIfAddItemToCreate();
        }
        // Else we gonna change position of this item
        else {
          if (checkItem) {
            this.itemIslandManager.selectedItem = checkItem.object;
            this.itemIslandManager.selectedItem!.position.y = 1;
            this.isSelected = true;
            this.canRaycast = false;

            this.imageItem = checkItem.object!.clone();
            this.setImageItem();
            this.displayEditMode(true);
            displayInterfaceInformationItem();
            disableInterfaceCreationItem();
          }
        }

        // add object in array of object
        let templateItem = this.itemIslandManager.newItemToCreate;
        if (templateItem) {
          this.mapGroup.add(templateItem);
          this.itemIslandManager.addItem(templateItem);
          this.itemIslandManager.newItemToCreate = null;
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

  actionOnClickButtons() {
    onClickOnDisabledModificationButton();

    this.clickOnCrossButtonInformationItem();
    this.clickOnAbandonedModificationItemButton();
    this.clickOnMoveItemButton();
    this.clickOnDeleteItemButton();
  }

  clickOnCrossButtonInformationItem() {
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

  clickOnAbandonedModificationItemButton() {
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

  clickOnMoveItemButton() {
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

  clickOnDeleteItemButton() {
    document
      .getElementById("delete_button_item_island")!
      .addEventListener("click", () => {
        this.numberOfElementToAdd -= 1;
        this.checkIfAddItemToCreate();
      });
  }
  resetPositionOfSelectedObject() {
    this.isSelected = false;
    this.itemIslandManager.selectedItem!.position.y = 0;
  }

  // Debug
  addDebugFolder(): GUI | null {
    if (this.debug.active) {
      return this.debug.ui!.addFolder("Island");
    }
    return null;
  }

  addDebug() {
    if (this.debug.active) {
      var arrow = new ArrowHelper(
        this.raycaster.raycaster.ray.direction,
        this.raycaster.raycaster.ray.origin,
        8,
        0xff0000
      );
      this.scene.add(arrow);
    }
  }

  private async loadIsland() {
    this.island = await CustomGlbLoader.getInstance().loadOne(
      new Model3D(allGlbs.Island)
    );

    this.scene.add(this.island.loadedModel3D!);

    // this.allScene.add(this.island.loadedModel3D!);
  }

  setImageItem() {
    let sizeImageItem = 0.05;
    if (this.imageItem) {
      this.imageItem.scale.set(sizeImageItem, sizeImageItem, sizeImageItem);

      this.imageItem.position.set(0, 3, 0);
      this.scene.add(this.imageItem);
    }
  }

  destroyImageItem() {
    this.scene.remove(this.imageItem!);
    this.imageItem = null;
  }
  destroy() {}
}

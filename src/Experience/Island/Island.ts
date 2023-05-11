import { Experience } from "../Experience";
import {
  ArrowHelper,
  BoxGeometry,
  Group,
  Mesh,
  MeshLambertMaterial,
  Object3D,
  Raycaster,
  Scene,
  Vector2,
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
import TextItemIsland from "./TextItemIsland";
import {
  displayPopupIterfaceCreateItem,
  disablePopupIterfaceCreateItem,
  displayPopupIterfaceModificateItem,
  disablePopupIterfaceModificateItem,
} from "./displayInterfaceIsland";

export default class Island {
  public experience: Experience;
  public scene: Scene;
  public sizes: Sizes;
  public camera: Camera;

  private robot?: Model3D;

  public debug: Debug;
  public debugFolder: GUI | null;

  private numberOfElementToAdd: number;

  // Map
  // var for trigger event
  private readonly onMouseDown: (event: MouseEvent) => void;

  // Map object
  public mapGroup: Group;
  private raycaster: Raycaster;
  private readonly canRaycast: boolean;
  private isSelected: boolean;
  private readonly mouse: Vector2;
  private readonly allObjectsCreateInMap: Array<Object3D>;

  public itemIslandManager: ItemIslandManager;
  public textItemIsland: TextItemIsland;

  public overlay: HTMLDivElement | null;
  public cursor?: Mesh;

  constructor() {
    // Experience
    this.experience = Experience.getInstance();
    this.scene = this.experience.scene;
    this.sizes = this.experience.sizes;
    this.camera = this.experience.camera;

    // Debug
    this.debug = this.experience.debug;
    this.debugFolder = this.addDebugFolder();

    // Mouse position
    this.mouse = new Vector2();

    // Map
    this.numberOfElementToAdd = 2;

    this.itemIslandManager = new ItemIslandManager();
    this.allObjectsCreateInMap = new Array<Object3D>();
    this.raycaster = new Raycaster();

    this.loadModelsItemIsland();

    this.isSelected = false;
    // Load the map
    this.mapGroup = loadMap(
      mapMainIslandData,
      this.scene,
      this.allObjectsCreateInMap
    );

    // Ui of item create an modificate
    this.textItemIsland = new TextItemIsland();
    // Get all map and apply methods
    this.mapGroupInfo();
    this.onMouseDown = this.onClickDown;

    this.canRaycast = true;

    document.addEventListener("pointerdown", this.onMouseDown, false);

    this.displayEditMode(false);
    this.checkIfAddItemToCreate();

    // this.overlay = document.querySelector(".popup_island_div");
    //
    //
    // this.textItemIsland.divCreateItemIsland.addEventListener(
    //   "mouseenter",
    //   () => {
    //     console.log("enter");
    //     this.canRaycast = false;
    //   }
    // );
    //
    // this.textItemIsland.divCreateItemIsland.addEventListener(
    //   "mouseleave",
    //   () => {
    //     console.log("leave");
    //     this.canRaycast = true;
    //   }
    // );
  }

  checkIfAddItemToCreate() {
    if (this.numberOfElementToAdd > 0 || this.isSelected) {
      this.displayEditMode(true);
    } else {
      this.displayEditMode(false);
    }
  }

  displayEditMode(isEdit: boolean) {
    var opacity = 0.4;
    if (!isEdit) {
      opacity = 0;
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
    this.mapGroup.position.set(0, 0, 0);
    // this.mapGroup.scale.set(2,2,2)
  }

  // Create cursor for select item on map
  cursorMap() {
    const cursorGeometry = new BoxGeometry(0.5, 4, 0.5);
    const cursorMaterial = new MeshLambertMaterial({
      color: 0xc0392b,
      transparent: true,
      opacity: 0,
    });
    this.cursor = new Mesh(cursorGeometry, cursorMaterial);
  }

  // get the mouse positipn, if we click on a gray cube : add Item on this cube
  // modify the position of the item if we click on
  onClickDown = (event: MouseEvent) => {
    event.preventDefault();

    this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    // Checking if the mouse projection is targeting a valid block in the clickableObjs array
    this.raycaster.setFromCamera(this.mouse, this.camera.instance);
    let intersects = this.raycaster.intersectObjects(
      this.allObjectsCreateInMap
    ); // get the list of targetable objects currently intersecting with raycaster

    if (intersects.length > 0 && this.canRaycast) {
      // TODO A METTRE DANS LE DEBUGGER
      var arrow = new ArrowHelper(
        this.raycaster.ray.direction,
        this.raycaster.ray.origin,
        8,
        0xff0000
      );
      this.scene.add(arrow);

      // displayPopupIterfaceCreateItem();
      // Add cursor on the bloc
      let selectedBloc = intersects[0].object;
      // modification item position
      if (this.isSelected) {
        this.displayEditMode(true);
        if (
          !this.itemIslandManager.getItemAtPosition(
            selectedBloc.position.x,
            selectedBloc.position.z
          ) &&
          selectedBloc.name == "gray"
        ) {
          this.itemIslandManager.selectedItem!.position.set(
            selectedBloc.position.x,
            1,
            selectedBloc.position.z
          );
        } else {
          this.itemIslandManager.selectedItem!.position.y = 1;
        }
        this.isSelected = false;
        this.displayEditMode(false);
      }
      // if we create object
      else {
        // TODO A remplacer par le model et mettre les wireframe de base quand on a un objet en cache
        if (selectedBloc.name == "gray") {
          let checkItem = this.itemIslandManager.getItemAtPosition(
            selectedBloc.position.x,
            selectedBloc.position.z
          );

          // If we dont have item on this case, we create one
          if (checkItem == null && this.numberOfElementToAdd > 0) {
            let newItem = this.robot!.object.clone();
            newItem.position.set(
              selectedBloc.position.x,
              1,
              selectedBloc.position.z
            );
            this.itemIslandManager.newItemToCreate = newItem;
            this.numberOfElementToAdd -= 1;
            this.checkIfAddItemToCreate();
          }
          // Else we gonna to change position of this item
          else {
            if (checkItem) {
              this.itemIslandManager.selectedItem = checkItem.object;
              this.itemIslandManager.selectedItem!.position.y = 2;
              this.isSelected = true;
              this.displayEditMode(true);
            }
          }

          let templateItem = this.itemIslandManager.newItemToCreate;
          if (templateItem) {
            this.scene.add(templateItem);
            this.itemIslandManager.addItem(templateItem);
            this.itemIslandManager.newItemToCreate = null;
          }
        }
      }
    } else {
      this.displayEditMode(false);
    }
  };

  // Debug
  addDebugFolder(): GUI | null {
    if (this.debug.active) {
      return this.debug.ui!.addFolder("Island");
    }
    return null;
  }

  // Models
  private async loadModelsItemIsland() {
    this.robot = await CustomGlbLoader.getInstance().loadOne(
      new Model3D(allGlbs.JustRobot)
    );
  }

  destroy() {}
}

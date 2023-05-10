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
import { allFbx } from "../../Sources/fbx/fbx";
import CustomFbxLoader from "../utils/CustomFbxLoader";
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

  private baleine?: Model3D;
  private cubeVertex?: Model3D;
  private robot?: Model3D;

  public debug: Debug;
  public debugFolder: GUI | null;

  // Map
  // var for trigger event
  public onMouseDown: (event: MouseEvent) => void;
  public onMouseUp: () => void;

  // Map object
  public mapGroup: Group;
  private raycaster: Raycaster;
  private canRaycast: boolean;
  private isSelected: boolean;
  private mouse: Vector2;
  private allObjectsCreateInMap: Array<Object3D>;

  public itemIslandManager: ItemIslandManager;
  public textItemIsland: TextItemIsland;

  public overlay: HTMLDivElement | null;
  public cursor?: Mesh;

  constructor() {
    this.experience = Experience.getInstance();
    this.scene = this.experience.scene;
    this.sizes = this.experience.sizes;
    this.camera = this.experience.camera;

    this.debug = this.experience.debug;
    this.debugFolder = this.addDebugFolder();

    // Map
    this.itemIslandManager = new ItemIslandManager();
    this.mouse = new Vector2();
    this.allObjectsCreateInMap = new Array<Object3D>();
    this.raycaster = new Raycaster();

    this.loadAllModels();

    this.isSelected = false;
    // Load the map
    this.mapGroup = loadMap(
      mapMainIslandData,
      this.scene,
      this.allObjectsCreateInMap
    );

    // Ui of item create an modificate
    this.textItemIsland = new TextItemIsland();
    this.mapGroupInfo();

    this.cursorMap();
    this.onMouseDown = this.onClickDown;

    this.canRaycast = true;

    this.overlay = document.querySelector(".popup_island_div");

    document.addEventListener("pointerdown", this.onMouseDown, false);
    document.addEventListener("pointerup", this.onMouseUp, false);

    this.opacityWireframe(false);
    this.textItemIsland.divCreateItemIsland.addEventListener(
      "mouseenter",
      () => {
        console.log("enter");
        this.canRaycast = false;
      }
    );

    this.textItemIsland.divCreateItemIsland.addEventListener(
      "mouseleave",
      () => {
        console.log("leave");
        this.canRaycast = true;
      }
    );
  }

  // display the edit mode
  opacityWireframe(isEdit: boolean) {
    var opacity = 0.4;
    if (!isEdit) {
      opacity = 0;
    }
    this.mapGroup.children.forEach((group) => {
      if (group.name == "wireframe") {
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

  // get the mouse positipn, if we click on a gray cube : display popup and cursor
  // for create item on island on this cube
  onClickDown = (event: MouseEvent) => {
    console.log(this.sizes);
    event.preventDefault();

    this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    // Checking if the mouse projection is targeting a valid block in the clickableObjs array
    this.raycaster.setFromCamera(this.mouse, this.camera.instance);
    let intersects = this.raycaster.intersectObjects(
      this.allObjectsCreateInMap
    ); // get the list of targetable objects currently intersecting with raycaster

    if (
      intersects.length > 0 &&
      intersects[0].object.name != "blue" &&
      this.canRaycast
    ) {
      // TODO A METTRE DANS LE DEBUGGER
      var arrow = new ArrowHelper(
        this.raycaster.ray.direction,
        this.raycaster.ray.origin,
        8,
        0xff0000
      );
      this.scene.add(arrow);

      this.opacityWireframe(true);

      // displayPopupIterfaceCreateItem();
      // Add cursor on the bloc
      let selectedBloc = intersects[0].object;
      console.log(this.isSelected);
      if (this.isSelected) {
        if (
          !this.itemIslandManager.getItemAtPosition(
            selectedBloc.position.x,
            selectedBloc.position.z
          )
        ) {
          console.log("is selected true");
          this.itemIslandManager.selectedItem!.position.set(
            selectedBloc.position.x,
            1,
            selectedBloc.position.z
          );
        } else {
          this.itemIslandManager.selectedItem!.position.y = 1;
        }
        this.isSelected = false;
      } else {
        // TODO A remplacer par le model et mettre les wireframe de base quand on a un objet en cache

        let checkItem = this.itemIslandManager.getItemAtPosition(
          selectedBloc.position.x,
          selectedBloc.position.z
        );

        if (checkItem == null) {
          let newItem = this.robot!.object.clone();
          newItem.position.set(
            selectedBloc.position.x,
            1,
            selectedBloc.position.z
          );
          this.itemIslandManager.newItemMeshToCreate = newItem;
        } else {
          this.itemIslandManager.selectedItem = checkItem.object;
          this.itemIslandManager.selectedItem!.position.y = 2;
          this.isSelected = true;
        }

        let templateItem = this.itemIslandManager.newItemMeshToCreate;
        this.scene.add(templateItem!);
        this.itemIslandManager.addItem(templateItem!);
        this.itemIslandManager.newItemMeshToCreate = null;
      }
    } else {
      this.opacityWireframe(false);
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
  private async loadAllModels() {
    this.cubeVertex = await CustomGlbLoader.getInstance().loadOne(
      new Model3D(allGlbs.CubeVertexGroup)
    );
    this.baleine = await CustomFbxLoader.getInstance().loadOne(
      new Model3D(allFbx.Whale)
    );

    this.robot = await CustomGlbLoader.getInstance().loadOne(
      new Model3D(allGlbs.JustRobot)
    );

    // this.scene.add(this.cubeVertex.object!);
    // this.scene.add(this.baleine.object);
    this.scene.add(this.robot.object);

    this.playAnimations();
  }

  private playAnimations(): void {
    if (this.baleine?.animationAction) {
      this.baleine.animationAction[1].play();
    }
  }

  update() {
    this.baleine?.mixer?.update(this.experience.time.delta * 0.001);
    // this.cubeVertex?.mixer?.update(this.experience.time.delta);
  }

  destroy() {
    this.baleine?.destroy();
    this.cubeVertex?.destroy();
  }
}

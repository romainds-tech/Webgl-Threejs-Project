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
  private cursorValid: boolean;
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
    this.onMouseUp = this.onClickUp;

    this.canRaycast = true;
    this.cursorValid = false;

    console.log(this.sizes);

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

  opacityWireframe(isEdit: boolean) {
    var opacity = 1;
    if (!isEdit) {
      opacity = 0;
    }
    this.mapGroup.children.forEach((group) => {
      if (group.name == "wireframe") {
        group.children.forEach((mesh) => {
          console.log(mesh.material.opacity);
          console.log(-mesh.material.opacity);
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
      if (this.cursor) {
        this.cursor.position.set(
          selectedBloc.position.x,
          selectedBloc.position.y,
          selectedBloc.position.z
        );
        this.scene.add(this.cursor);
        this.cursor.material.opacity = 0.5;
        this.cursor.material.emissive.g = 0.5;

        this.cursorValid = true;
      }
    } else {
      if (this.cursor && this.canRaycast) {
        this.cursor.material.opacity = 0.0;
        this.opacityWireframe(false);
        // disablePopupIterfaceCreateItem();
        this.cursorValid = false;
      }
    }
  };

  // change color of the cursor when we stop to click on a cube
  onClickUp = () => {
    if (this.cursor) {
      this.cursor.material.emissive.g = 0;
      this.itemIslandManager.newItemMeshToCreate = null;
      this.itemIslandManager.selectedItem = null;

      if (this.cursorValid) {
        let checkItem = this.itemIslandManager.getItemAtPosition(
          this.cursor.position.x,
          this.cursor.position.z
        );
        console.log(checkItem);

        if (checkItem == null) {
        }
      }
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

import { Experience } from "../Experience";
import {
  CubeTextureLoader,
  Event,
  Group,
  Object3D,
  Scene,
  Vector2,
  Intersection,
  MeshBasicMaterial,
  Mesh,
  AnimationMixer,
  AnimationAction,
  LoopOnce,
} from "three";
import Model3D from "../utils/Model3d";
import { loadMap, mapMainIslandData } from "./map";
import Sizes from "../utils/Sizes";
import Camera from "../Camera";
import ItemIslandManager from "./ItemIslandManager";
import gsap from "gsap";
import {
  createUIIsland,
  disableInterfaceCreationItem,
  disableInterfaceGlobalOnIsland,
  disableInterfaceInformationItem,
  disablePopupIterfaceModificateItem,
  displayInterfaceCreationItem,
  displayInterfaceGlobalOnIsland,
  displayInterfaceInformationItem,
  displayPopupIterfaceModificateItem,
  onClickOnDisabledModificationButton,
} from "./displayInterfaceIsland";
import RaycasterExperience from "../UI/Interactions/RaycasterExperience";
import Cartomancie from "../Cartomancie/Cartomancie";
import ItemIsland from "./ItemIsland";
import Debug from "../utils/Debug";
import Sky from "../Sky/Sky";
// @ts-ignore
import { NodeToyMaterial } from "@nodetoy/three-nodetoy";
import { GUI } from "lil-gui";
import ClickAndDrag, { EventClickDrag } from "../UI/Interactions/ClickAndDrag";

import { transitionCartomancieData } from "../../shaders/TransitionCartomancie";
import Time from "../utils/Time";
import { predictions } from "../Cartomancie/predictions";
import { displayInterfaceFirstArcaneCartomancie } from "../Cartomancie/displayInterfaceCartomancie";

export default class Island {
  public experience: Experience;
  public debug?: Debug;
  public time?: Time;
  public scene?: Scene;
  public sizes?: Sizes;
  public camera?: Camera;

  public item?: Model3D;
  private island?: Model3D;
  private islandWithAllItem?: Model3D;

  public mixerIsland?: AnimationMixer;
  public mixerIslandAllItem?: AnimationMixer;

  private cylindre?: Model3D;

  public numberOfElementToAdd: number;

  // var for trigger event
  private readonly onMouseDown: (event: MouseEvent) => void;

  // Map object
  private mapGroup: Group;
  private islandGroup: Group;
  private raycaster: RaycasterExperience;
  private canRaycast: boolean;
  private isSelected: boolean;
  private readonly mouse: Vector2;
  public readonly allObjectsCreateInMap: Array<Object3D>;
  // private cloud?: Mesh;

  //
  public itemIslandManager: ItemIslandManager;
  // // public textItemIsland: TextItemIsland;
  public imageItem: Object3D<Event> | null;

  constructor() {
    // Experience
    this.experience = Experience.getInstance();

    this.scene = this.experience.scene;
    this.sizes = this.experience.sizes;
    this.time = this.experience.time;
    this.camera = this.experience.camera;
    this.debug = this.experience.debug;
    // this.setupPlaneInFrontOfCamera();
    this.setBackGround();
    // this.setupCamera();
    this.setupLight();

    // Mouse position
    this.mouse = new Vector2();

    // Map
    this.numberOfElementToAdd = -1;
    //
    this.itemIslandManager = new ItemIslandManager();
    this.allObjectsCreateInMap = new Array<Object3D>();
    this.raycaster = new RaycasterExperience();
    //
    this.isSelected = false;
    // Load the map
    this.mapGroup = loadMap(
      mapMainIslandData,
      this.scene!,
      this.allObjectsCreateInMap
    );

    this.islandGroup = new Group();

    // Get all map and apply methods
    this.mapGroupInfo();
    this.onMouseDown = this.onClickDown;

    this.canRaycast = true;

    // check if we click on plane
    document.addEventListener("pointerdown", this.onMouseDown, true);

    this.displayEditMode(false);

    this.loadIsland();
    this.islandGroup.remove(this.islandWithAllItem?.loadedModel3D!);

    createUIIsland();

    this.actionOnClickButtons();
    this.imageItem = null;
  }

  public backFromSky() {
    gsap.to(this.experience.planeTransition!.material, {
      duration: 0.5,
      opacity: 0,
      ease: "none",
    });
  }

  public loadAllScene() {
    this.setupCamera();
    if (this.experience.cartomancie?.itemPrediction == null) {
    } else {
      this.islandGroup?.remove(this.island?.loadedModel3D!);
      this.islandGroup.add(this.islandWithAllItem?.loadedModel3D!);
    }
    this.scene?.add(this.islandGroup);
    this.setupLight();
    this.setBackGround();
    this.displayCylinder();
    // this.scene.add(this.cylindre?.loadedModel3D!);

    displayInterfaceGlobalOnIsland();
  }

  public setupCamera() {
    this.experience.camera!.instance.zoom = 0.2;
    this.camera!.instance.fov = 30;
    this.camera!.controls.enabled = true;

    this.experience.camera?.instance.position.set(-5, 17, 17);
    this.experience.camera?.instance.updateProjectionMatrix();
  }

  setupLight() {
    this.experience.light!.sunLight!.intensity = 86.9;
    this.experience.light!.hemisphereLight!.intensity = 6;
    this.experience.light!.sunLight!.castShadow = true;
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

  private displayCylinder() {
    if (this.numberOfElementToAdd == -1) {
      this.loadCylinder();
    }
  }

  private movementCamera() {
    this.experience.camera!.instance.zoom = 3.15;
    this.camera!.controls.enabled = true;

    this.experience.camera?.instance.position.set(5.5, -10, 13.5);
    this.experience.camera?.instance.updateProjectionMatrix();

    gsap.to(this.experience.planeTransition!.material, {
      delay: 0.5,
      duration: 0.5,
      opacity: 0,
      ease: "none",
    });

    gsap.to(this.camera!.instance, {
      duration: 3.2,
      zoom: 0.2,
      ease: "ease.out",
      onUpdate: () => {
        this.camera?.instance.updateProjectionMatrix();
      },
    });

    gsap.timeline({ repeat: 0, delay: 2 }).to(this.camera!.instance.position, {
      duration: 3.2,
      x: -5,
      y: 17,
      ease: "circ.out",
      onComplete: () => {
        this.camera!.updateActive = true;
        this.displayCylinder();
        displayInterfaceGlobalOnIsland();
      },
    });
  }

  private displayEditMode(isEdit: boolean) {
    let opacity = 0.4;
    if (!isEdit) {
      opacity = 0;
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
    this.mapGroup.position.set(-1, 4, 1);
    this.mapGroup.rotation.set(0, 2.15, 0);
    this.mapGroup.scale.set(2.5, 2.5, 2.5);
    if (this.debug?.active) {
      const mapGroupFolder: GUI =
        this.debug.debugModelFolder!.addFolder("Map group");

      mapGroupFolder.add(this.mapGroup.position, "x").name("Position X");
      mapGroupFolder.add(this.mapGroup.position, "y").name("Position Y");
      mapGroupFolder.add(this.mapGroup.position, "z").name("Position Z");

      mapGroupFolder.add(this.mapGroup.rotation, "x").name("Rotation X");
      mapGroupFolder.add(this.mapGroup.rotation, "y").name("Rotation Y");
      mapGroupFolder.add(this.mapGroup.rotation, "z").name("Rotation Z");

      mapGroupFolder.add(this.mapGroup.scale, "x").name("Scale X");
      mapGroupFolder.add(this.mapGroup.scale, "y").name("Scale Y");
      mapGroupFolder.add(this.mapGroup.scale, "z").name("Scale Z");
    }
  }

  //change the value of all the scene

  // get the mouse positipn, if we click on a gray cube : add Item on this cube
  // modify the position of the item if we click on
  onClickDown = (event: MouseEvent) => {
    // event.preventDefault();

    // position cursor on screen from center of the screen
    this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    // Checking if the mouse projection is targeting a valid block in the clickableObjs array
    let intersects = this.raycaster.getRaycastObject(
      this.mouse,
      this.camera!.instance,
      this.allObjectsCreateInMap
    );
    // if I clicked on a raycastable object
    if (intersects.length > 0 && this.canRaycast) {
      // first plane clicked
      let selectedPlane = intersects[0].object;

      // modification item position
      if (this.isSelected) {
        this.modificationItemPosition(selectedPlane, intersects);
      }
      // if create object
      else {
        let checkItem = this.itemIslandManager.getItemAtPosition(
          selectedPlane.position.x,
          selectedPlane.position.z
        );
        // If we dont have item on this case, we create one
        if (checkItem == null && this.numberOfElementToAdd > 0) {
          this.createItemAtPosition(selectedPlane, intersects);
        }
        // Click on center to have a prediction
        else if (
          selectedPlane.name == "cartomancie" &&
          this.numberOfElementToAdd == -1
        ) {
          disableInterfaceGlobalOnIsland();

          for (let i = 0; i < this.allObjectsCreateInMap.length; i++) {
            if (this.allObjectsCreateInMap[i].name == "cartomancie") {
              this.allObjectsCreateInMap.splice(i, 1);
            }
          }

          this.camera!.updateActive = true;
          this.experience.planeTransition!.material = new NodeToyMaterial({
            data: transitionCartomancieData,
          });

          // @ts-ignore
          gsap.to(this.experience.planeTransition!.material.uniforms.Transi, {
            duration: 0.5,
            delay: 0.5,
            value: 2,
            ease: "none",
            onComplete: () => {
              setTimeout(() => {
                this.destroy();
                // @ts-ignore
                this.experience.planeTransition!.material.visible = false;
                this.experience.cartomancie = new Cartomancie();
              }, 500);
            },
          });

          //
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
  private modificationItemPosition(
    selectedBloc: Object3D<Event>,
    intersect: Intersection<Object3D<Event>>[]
  ) {
    this.displayEditMode(true);
    // places item on a new selected block
    if (
      !this.itemIslandManager.getItemAtPosition(
        selectedBloc.position.x,
        selectedBloc.position.z
      )
    ) {
      if (selectedBloc.name == "cartomancie") {
        selectedBloc = intersect[1].object;
      }
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
    this.moveIslandGroup(0, 1);
    this.camera!.controls.enabled = true;
    this.experience.camera?.instance.updateProjectionMatrix();
  }

  private createItemAtPosition(
    positionPlane: Object3D<Event>,
    intersect: Intersection<Object3D<Event>>[]
  ) {
    let newItem =
      this.experience.cartomancie!.itemPrediction!.loadedModel3D!.clone();

    newItem.children[0].children.forEach((mesh) => {
      // @ts-ignore
      mesh.material = new MeshBasicMaterial({
        depthWrite: true,
        // @ts-ignore
        map: mesh.material.map,
        opacity: 1,
        // side: DoubleSide,
        transparent: false,
      });
    });

    if (positionPlane.name == "cartomancie") {
      positionPlane = intersect[1].object;
    }
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

    this.moveIslandGroup(-5, 0.5);
    displayInterfaceInformationItem();
    disableInterfaceCreationItem();
    this.camera!.controls.enabled = false;
    this.experience.camera?.instance.updateProjectionMatrix();
  }

  private moveIslandGroup(y: number, scale: number) {
    gsap.to(this.islandGroup.position, { duration: 1, y: y });
    gsap.to(this.islandGroup.scale, {
      duration: 1,
      x: scale,
      y: scale,
      z: scale,
    });
  }

  setImageItem() {
    let sizeImageItem = 2.5;
    if (this.imageItem) {
      gsap.to(this.imageItem.position, { duration: 1, x: 0, y: 8, z: 0 });
      gsap.to(this.imageItem.scale, {
        duration: 1,
        x: sizeImageItem,
        y: sizeImageItem,
        z: sizeImageItem,
      });

      new ClickAndDrag(this.imageItem, EventClickDrag.ROTATION, false);

      this.scene?.add(this.imageItem);
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
    this.clickOnRingButton();
  }

  private clickOnRingButton() {
    document
      .getElementById("button_rings_island")!
      .addEventListener("click", () => {
        disableInterfaceGlobalOnIsland();
        this.experience.planeTransition!.material = new MeshBasicMaterial({
          color: 0x000000,
          opacity: 0,
          transparent: true,
          visible: true,
        });

        gsap.to(this.camera!.instance.position, {
          duration: 1.2,
          y: 50,
          ease: "expo.inOut",
        });

        gsap.to(this.camera!.instance.rotation, {
          duration: 1.2,
          x: Math.PI / 2,
          z: 0.5,
          ease: "expo.inOut",
          onComplete: () => {
            this.destroy();
            this.camera!.updateActive = true;
            this.experience.sky = new Sky();
          },
        });

        gsap.to(this.experience.planeTransition!.material, {
          duration: 0.5,
          delay: 0.5,
          opacity: 1,
          ease: "none",
        });
      });
  }
  private clickOnCrossButtonInformationItem() {
    document
      .getElementById("button_disable_select_item_island")!
      .addEventListener("click", () => {
        disableInterfaceInformationItem();
        this.camera!.controls.enabled = true;
        this.resetPositionOfSelectedObject();
        this.canRaycast = true;
        this.checkIfAddItemToCreate();
        this.moveIslandGroup(0, 1);
        this.destroyImageItem();
      });
  }

  private clickOnAbandonedModificationItemButton() {
    document
      .getElementById("abandonned_modificate_item_position_island")!
      .addEventListener("click", () => {
        disablePopupIterfaceModificateItem();
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
        this.canRaycast = true;
        this.destroyImageItem();
        this.camera!.controls.enabled = true;
        this.moveIslandGroup(0, 1);
        this.experience.camera?.instance.updateProjectionMatrix();
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
    this.island = this.experience.allModels.Island;
    this.islandWithAllItem = this.experience.allModels.IslandWithAllObject;

    // @ts-ignore
    this.island.loadedModel3D!.children[0].material.transparent = false;
    this.islandWithAllItem!.loadedModel3D!.renderOrder = -1;

    this.islandWithAllItem?.loadedModel3D!.traverse((child) => {
      if (child instanceof Mesh) {
        child.material.depthWrite = true;

        child.material.transparent = false;
      }
    });

    this.island!.loadedModel3D!.castShadow = true;
    this.island!.loadedModel3D!.receiveShadow = true;

    this.islandWithAllItem!.loadedModel3D!.castShadow = true;
    this.islandWithAllItem!.loadedModel3D!.receiveShadow = true;

    this.islandGroup.add(this.mapGroup);
    this.islandGroup.add(this.island?.loadedModel3D!);
    this.islandGroup.add(this.islandWithAllItem?.loadedModel3D!);
    this.scene?.add(this.islandGroup);

    this.mixerIsland = this.island?.mixer;
    this.mixerIslandAllItem = this.islandWithAllItem?.mixer;
    this.animationIsland(this.island!, this.mixerIsland!);
    this.animationIsland(this.islandWithAllItem!, this.mixerIslandAllItem!);

    this.movementCamera();
  }

  private animationIsland(model: Model3D, mixer: AnimationMixer) {
    model.animationAction?.forEach((animation) => {
      const clipMixer = mixer?.clipAction(animation.getClip());
      clipMixer.play();
    });
  }
  private async loadCylinder() {
    this.cylindre = this.experience.allModels.Cylindre;

    this.cylindre?.loadedModel3D!.scale.set(0.6, 3, 0.6);
    this.cylindre?.loadedModel3D!.position.set(-1, 15, 1.5);

    this.scene?.add(this.cylindre?.loadedModel3D!);
  }
  private destroyImageItem() {
    this.scene?.remove(this.imageItem!);
    this.imageItem = null;
  }

  update() {
    this.mixerIsland?.update(this.time!.delta * 0.001);
    this.mixerIslandAllItem?.update(this.time!.delta * 0.001);
    // varying the height with sin between -1 and 1
    if (
      // @ts-ignore
      this.cylindre?.loadedModel3D?.children[0].material.uniforms.Hauteur1.value
    ) {
      // @ts-ignore
      this.cylindre.loadedModel3D.children[0].material.uniforms.Hauteur1.value =
        //@ts-ignore
        this.cylindre.loadedModel3D.children[0].material.uniforms.Hauteur1
          .value - 0.004;
    }

    NodeToyMaterial.tick();

    // fix light to follow the same movement as the camera but not the same position
    // camera : this.camera.instance
    // light : this.experience.light.sunLight

    this.experience.light?.sunLight!.position.copy(
      this.experience.camera!.instance.position
    );
    this.experience.light!.sunLight!.position.y += 7;
    this.experience.light!.sunLight!.position.z += 13;
    this.experience.light!.sunLight!.position.x += 1;
  }

  destroy() {
    this.scene?.remove(this.islandGroup);
    this.islandGroup.remove();

    this.scene?.remove(this.cylindre?.loadedModel3D!);
    this.cylindre?.loadedModel3D!.remove();

    this.scene!.background = null;
  }

  private setBackGround() {
    // load a cubeMap texture

    new CubeTextureLoader()
      .setPath("envMap/hdr/")
      .load(
        ["+X.png", "-X.png", "Y+.png", "Y-.png", "+Z.png", "-Z.png"],
        (l) => {
          this.scene!.background = l;
          this.scene!.backgroundIntensity = 2;
        }
      );
  }
}

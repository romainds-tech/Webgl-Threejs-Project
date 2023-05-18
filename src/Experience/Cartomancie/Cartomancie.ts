import { Experience } from "../Experience";
import {
  AnimationMixer,
  BoxGeometry,
  Color,
  DoubleSide,
  LoopOnce,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
  Object3D,
  PlaneGeometry,
  Scene,
  ShaderMaterial,
  TextureLoader,
} from "three";
import Debug from "../utils/Debug";
import Time from "../utils/Time";
import { GUI } from "lil-gui";
import CustomGlbLoader from "../utils/CustomGlbLoader";
import Model3D from "../utils/Model3d";
import { allGlbs } from "../../Sources/glb/glb";
import cardVertexShader from "../../shaders/card/vertex.glsl";
import cardFragmentShader from "../../shaders/card/fragment.glsl";
import { gsap } from "gsap";
import Camera from "../Camera";
import Sizes from "../utils/Sizes";
import Popup from "../UI/Popups/Popup";
import {
  disabledInterfaceStartCartomancie,
  displayInterfaceStartCartomancie,
  displayInterfaceFirstArcaneCartomancie,
  disabledInterfaceFirstArcaneCartomancie,
  displayInterfaceSecondArcaneCartomancie,
  disabledInterfaceSecondArcaneCartomancie,
  displayInterfacePredictionCartomancie,
  disabledInterfacePredictionCartomancie,
  displayInterfaceSelectItemCartomancie,
  disabledInterfaceSelectItemCartomancie,
} from "./displayInterfaceCartomancie";
import Button from "../UI/Buttons/Button";
import Input from "../UI/Inputs/Input";
import Overlay from "../UI/Overlays/Overlay";
import Island from "../Island/Island";

export default class Cartomancie {
  public experience: Experience;
  public scene: Scene;
  public camera: Camera;
  public sizes: Sizes;
  public island?: Island;

  public debug: Debug;
  public debugFolder: GUI | null;

  public time: Time;

  public overlay?: Mesh;
  public cards?: Model3D;
  public lowItem?: Model3D;
  public higherItem?: Model3D;
  public mixer?: AnimationMixer;

  public popup: Popup;
  public button: Button;
  public input: Input;
  public overlayUI: Overlay;
  public firstArcaneImageItem?: Object3D;
  public secondArcaneImageItem?: Object3D;

  constructor() {
    this.experience = Experience.getInstance();
    this.scene = this.experience.scene;
    this.camera = this.experience.camera;
    let cameraPosition = 10;
    this.camera.instance.position.set(
      -cameraPosition,
      cameraPosition,
      -cameraPosition
    );
    this.camera.constrols.enabled = false;
    this.sizes = this.experience.sizes;

    this.debug = this.experience.debug;
    this.debugFolder = this.addDebugFolder();

    this.time = this.experience.time;

    this.loadModelsItemIsland();

    // this.loadCarte();
    this.popup = new Popup();
    this.popup.setPopupCartomancie();

    this.button = new Button();
    this.button.setButtonCartomancie();

    this.input = new Input();
    this.input.setInputCartomancie();

    this.overlayUI = new Overlay();
    this.overlayUI.setOverlayCartomancie();

    displayInterfaceStartCartomancie();
    this.startPrediction();
    this.displayButton();
  }

  startPrediction() {
    document
      .getElementById("button_start_cartomancie")!
      .addEventListener("click", () => {
        this.loadCards();
        disabledInterfaceStartCartomancie();
      });
  }
  addDebugFolder(): GUI | null {
    if (this.debug.active) {
      return this.debug.ui!.addFolder("Cartomancie");
    }
    return null;
  }

  private async loadCards() {
    this.cards = await CustomGlbLoader.getInstance().loadOne(
      new Model3D(allGlbs.Cards)
    );

    this.scene.add(this.cards.loadedModel3D!);
    this.playAnimations();
  }

  private playAnimations(): void {
    if (this.cards?.animationAction) {
      this.mixer = new AnimationMixer(this.cards.loadedModel3D!);

      const clipMixer = this.mixer.clipAction(
        this.cards.animationAction[0].getClip()
      );
      console.log(clipMixer);
      clipMixer.play();
      clipMixer.setLoop(LoopOnce, 1);
      clipMixer.clampWhenFinished = true;
      this.mixer.addEventListener("finished", () => {
        setTimeout(() => {
          this.setImageItem();
          this.destroyCard();
          displayInterfaceFirstArcaneCartomancie();
          this.setOverlayArcane();
          if (this.firstArcaneImageItem) {
            this.scene.add(this.firstArcaneImageItem);
          }
        }, 500);
      });
    }
  }

  displayButton() {
    this.displaySecondArcane();
    this.displayPrediction();
    this.displayChooseItem();
    this.displayBackSelectItem();
    this.selectLowItem();
    this.selectHigherItem();
  }
  displaySecondArcane() {
    document
      .getElementById("button_first_arcane_cartomancie")!
      .addEventListener("click", () => {
        disabledInterfaceFirstArcaneCartomancie();
        this.destroyFirstArcane();
        if (this.secondArcaneImageItem) {
          this.secondArcaneImageItem.material.color.b = 0;
          this.scene.add(this.secondArcaneImageItem);
          console.log(this.secondArcaneImageItem.material);
        }
        displayInterfaceSecondArcaneCartomancie();
      });
  }

  displayPrediction() {
    document
      .getElementById("button_second_arcane_cartomancie")!
      .addEventListener("click", () => {
        disabledInterfaceSecondArcaneCartomancie();
        this.destroySecondArcane();
        displayInterfacePredictionCartomancie();
      });
  }

  displayChooseItem() {
    document
      .getElementById("button_display_prediction_cartomancie")!
      .addEventListener("click", () => {
        disabledInterfacePredictionCartomancie();
        this.destroySecondArcane();
        displayInterfaceSelectItemCartomancie();
        this.setLowItem(0, 5, 0);
        this.setHightItem(0, -9, 0);
      });
  }

  displayBackSelectItem() {
    document
      .getElementById("button_back_cartomancie")!
      .addEventListener("click", () => {
        disabledInterfaceSelectItemCartomancie();
        displayInterfacePredictionCartomancie();
        this.removeItemFromScene();
      });
  }

  selectLowItem() {
    document
      .getElementById("button_select_low_item_cartomancie")!
      .addEventListener("click", () => {
        disabledInterfaceSelectItemCartomancie();
        this.destroyAll();
        this.experience.island = new Island(1);
        this.experience.island.item = this.lowItem;
        this.experience.island.item?.loadedModel3D!.scale.set(0.01, 0.01, 0.01);
        this.removeItemFromScene();
        this.destroyAll();
      });
  }

  selectHigherItem() {
    document
      .getElementById("button_select_higher_item_cartomancie")!
      .addEventListener("click", () => {
        disabledInterfaceSelectItemCartomancie();

        this.experience.island = new Island(1);
        this.experience.island.item = this.higherItem;
        this.experience.island.item?.loadedModel3D!.scale.set(0.1, 0.1, 0.1);
        this.removeItemFromScene();
        this.destroyAll();
      });
  }

  private async loadModelsItemIsland() {
    this.lowItem = await CustomGlbLoader.getInstance().loadOne(
      new Model3D(allGlbs.JustRobot)
    );

    this.higherItem = await CustomGlbLoader.getInstance().loadOne(
      new Model3D(allGlbs.JustRobot)
    );
  }

  setLowItem(x: number, y: number, z: number) {
    let sizeImageItem = 0.08;
    if (this.lowItem) {
      if (this.lowItem.loadedModel3D) {
        this.lowItem.loadedModel3D.scale.set(
          sizeImageItem,
          sizeImageItem,
          sizeImageItem
        );

        this.lowItem.loadedModel3D.position.set(x, y, z);
        this.scene.add(this.lowItem.loadedModel3D!);
      }
    }
  }

  setHightItem(x: number, y: number, z: number) {
    let sizeImageItem = 0.08;
    if (this.higherItem) {
      if (this.higherItem.loadedModel3D) {
        this.higherItem.loadedModel3D.scale.set(
          sizeImageItem,
          sizeImageItem,
          sizeImageItem
        );

        this.higherItem.loadedModel3D.position.set(x, y, z);
        this.scene.add(this.higherItem.loadedModel3D!);
      }
    }
  }
  setOverlayArcane() {
    const geometry = new PlaneGeometry(this.sizes.width, this.sizes.height);
    const material = new MeshBasicMaterial({
      color: 0x1b2b2c,
      side: DoubleSide,
    });
    this.overlay = new Mesh(geometry, material);
    this.overlay.position.set(0, -15, 0);
    this.overlay.lookAt(this.camera.instance.position);
    this.scene.add(this.overlay);
  }

  setImageItem() {
    const geometry = new PlaneGeometry(1, 2);
    const material = new MeshBasicMaterial({
      color: 0xff00ff,
      side: DoubleSide,
    });
    this.firstArcaneImageItem = new Mesh(geometry, material);

    let sizeImageItem = 4;
    if (this.firstArcaneImageItem) {
      this.firstArcaneImageItem.scale.set(
        sizeImageItem,
        sizeImageItem,
        sizeImageItem
      );

      this.firstArcaneImageItem.position.set(-4, 10, -4);
      this.firstArcaneImageItem.rotation.set(0, Math.PI / 2, 0);

      this.secondArcaneImageItem = this.firstArcaneImageItem.clone();
    }
  }

  update() {
    this.mixer?.update(this.experience.time.delta * 0.001);
    // this.cubeVertex?.mixer?.update(this.experience.time.delta);
  }

  destroyCard() {
    this.scene.remove(this.cards?.loadedModel3D!);
    this.cards?.destroy();
    this.cards = undefined;
  }

  destroyFirstArcane() {
    if (this.firstArcaneImageItem) {
      this.scene.remove(this.firstArcaneImageItem);
      this.firstArcaneImageItem.remove();
      this.firstArcaneImageItem = undefined;
    }
  }
  destroySecondArcane() {
    if (this.secondArcaneImageItem) {
      this.scene.remove(this.secondArcaneImageItem);
      this.secondArcaneImageItem.remove();
      this.secondArcaneImageItem = undefined;
    }
  }

  removeItemFromScene() {
    if (this.lowItem && this.higherItem) {
      this.scene.remove(this.lowItem.loadedModel3D!);
      this.scene.remove(this.higherItem.loadedModel3D!);
    }
  }

  destroyAll() {
    if (this.overlay) {
      this.scene.remove(this.overlay);
      this.overlay.remove();
      this.overlay = undefined;
    }
  }
}

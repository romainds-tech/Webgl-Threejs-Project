import { Experience } from "../Experience";
import {
  AnimationMixer,
  DoubleSide,
  LoopOnce,
  Mesh,
  MeshBasicMaterial,
  // MeshStandardMaterial,
  // Object3D,
  PlaneGeometry,
  Scene,
  // ShaderMaterial,
  // TextureLoader,
} from "three";
import Debug from "../utils/Debug";
import Time from "../utils/Time";
import { GUI } from "lil-gui";
import CustomGlbLoader from "../utils/CustomGlbLoader";
import Model3D from "../utils/Model3d";
import { allGlbs } from "../../Sources/glb/glb";
// import cardVertexShader from "../../shaders/card/vertex.glsl";
// import cardFragmentShader from "../../shaders/card/fragment.glsl";
// import { gsap } from "gsap";
import Camera from "../Camera";
import Sizes from "../utils/Sizes";
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
  createUICartomancie,
} from "./displayInterfaceCartomancie";
import { predictions } from "./predictions";

export default class Cartomancie {
  public textPrediction?: string;
  public itemPrediction?: Model3D;

  private experience: Experience;
  private scene: Scene;
  public camera: Camera;
  private sizes: Sizes;

  private debug: Debug;
  private debugFolder: GUI | null;

  private time: Time;

  private overlay?: Mesh;
  private cards?: Model3D;
  private item?: Model3D;
  private mixer?: AnimationMixer;

  private firstArcaneImageItem?: Model3D;
  private secondArcaneImageItem?: Model3D;

  private predictionNumber: number;

  constructor() {
    this.experience = Experience.getInstance();
    this.scene = this.experience.scene;
    this.camera = this.experience.camera;
    this.setupCamera();
    this.predictionNumber = this.setupPrediction();
    this.sizes = this.experience.sizes;

    this.debug = this.experience.debug;
    this.debugFolder = this.addDebugFolder();

    this.time = this.experience.time;

    this.loadModelsItemIsland();

    createUICartomancie();
    displayInterfaceStartCartomancie();
    this.startPrediction();
    this.displayButton();
  }

  private setupCamera() {
    let cameraPosition = 10;
    this.camera.instance.position.set(
      -cameraPosition,
      cameraPosition,
      -cameraPosition
    );
    this.camera.instance.zoom = 0.35;
    this.camera.controls.enabled = true;
    this.camera.instance.updateProjectionMatrix();
  }

  private setupPrediction() {
    return Math.floor(Math.random() * predictions.length);
  }
  private startPrediction() {
    document
      .getElementById("button_start_cartomancie")!
      .addEventListener("click", () => {
        this.loadCards();
        disabledInterfaceStartCartomancie();
      });
  }
  private addDebugFolder(): GUI | null {
    if (this.debug.active) {
      return this.debug.ui!.addFolder("Cartomancie");
    }
    return null;
  }

  private async loadCards() {
    if (this.cards == undefined) {
      this.cards = await CustomGlbLoader.getInstance().loadOne(
        new Model3D(allGlbs.Cards)
      );

      this.scene.add(this.cards.loadedModel3D!);
    }

    this.playAnimations();
  }

  private playAnimations(): void {
    if (this.cards?.animationAction) {
      this.mixer = this.cards.mixer;

      const clipMixer = this.mixer!.clipAction(
        this.cards.animationAction[0].getClip()
      );

      clipMixer.play();
      clipMixer.setLoop(LoopOnce, 1);
      clipMixer.clampWhenFinished = true;
      this.mixer!.addEventListener("finished", () => {
        console.log("card finished");
        setTimeout(() => {
          document.querySelector(
            "#popup_first_arcane_cartomancie .text_arcane"
          )!.innerHTML = predictions[this.predictionNumber].textMajorArcane;
          this.destroyCard();
          displayInterfaceFirstArcaneCartomancie();
          this.setOverlayArcane();
          this.loadMajorArcane();
        }, 500);
      });
    }
  }

  private async loadMajorArcane() {
    this.firstArcaneImageItem = await CustomGlbLoader.getInstance().loadOne(
      new Model3D(predictions[this.predictionNumber].modelMajorArcane)
    );
    console.log(this.firstArcaneImageItem);

    this.scene.add(this.firstArcaneImageItem.loadedModel3D!);
  }

  private async loadMinorArcane() {
    this.secondArcaneImageItem = await CustomGlbLoader.getInstance().loadOne(
      new Model3D(predictions[this.predictionNumber].modelMinorArcane)
    );

    this.scene.add(this.secondArcaneImageItem.loadedModel3D!);
  }

  private displayButton() {
    this.displaySecondArcane();
    this.displayPrediction();
    this.displayChooseItem();
    this.displayBackSelectItem();
    this.selectAnswerQuestionForItem();
    this.selectPaidItem();
  }
  private displaySecondArcane() {
    document
      .getElementById("button_first_arcane_cartomancie")!
      .addEventListener("click", () => {
        disabledInterfaceFirstArcaneCartomancie();
        this.destroyFirstArcane();
        this.loadMinorArcane();
        document.querySelector(
          "#popup_second_arcane_cartomancie .text_arcane"
        )!.innerHTML = predictions[this.predictionNumber].textMinorArcane;
        displayInterfaceSecondArcaneCartomancie();
      });
  }

  private displayPrediction() {
    document
      .getElementById("button_second_arcane_cartomancie")!
      .addEventListener("click", () => {
        disabledInterfaceSecondArcaneCartomancie();
        this.destroySecondArcane();
        displayInterfacePredictionCartomancie();
        document.querySelector(
          "#popup_prediction_cartomancie .text_arcane"
        )!.innerHTML = predictions[this.predictionNumber].textPrediction;
      });
  }

  private displayChooseItem() {
    document
      .getElementById("button_display_prediction_cartomancie")!
      .addEventListener("click", () => {
        disabledInterfacePredictionCartomancie();
        this.destroySecondArcane();
        displayInterfaceSelectItemCartomancie();
        this.setupItem(0, 2, 0);
      });
  }

  private displayBackSelectItem() {
    document
      .getElementById("button_back_cartomancie")!
      .addEventListener("click", () => {
        disabledInterfaceSelectItemCartomancie();
        displayInterfacePredictionCartomancie();
        this.removeItemFromScene();
      });
  }

  private selectAnswerQuestionForItem() {
    document
      .getElementById("button_select_answer_question_item_cartomancie")!
      .addEventListener("click", () => {
        this.setupIsland();
      });
  }

  private selectPaidItem() {
    document
      .getElementById("button_select_paid_item_cartomancie")!
      .addEventListener("click", () => {
        this.setupIsland();
      });
  }

  private setupIsland() {
    disabledInterfaceSelectItemCartomancie();
    if (this.experience.island) {
      this.experience.island.numberOfElementToAdd = 1;
      this.experience.island.checkIfAddItemToCreate();
      this.itemPrediction = this.item;
      this.textPrediction = predictions[this.predictionNumber].textPrediction;

      if (this.itemPrediction) {
        this.itemPrediction.loadedModel3D!.scale.set(0.01, 0.01, 0.01);
      }
      this.experience.island.setupCamera();
      this.experience.island.loadAllScene();
    }

    this.removeItemFromScene();
    this.destroyAll();
  }

  private async loadModelsItemIsland() {
    this.item = await CustomGlbLoader.getInstance().loadOne(
      new Model3D(predictions[this.predictionNumber].item)
    );
  }

  private setupItem(x: number, y: number, z: number) {
    let sizeImageItem = 0.08;
    if (this.item) {
      if (this.item.loadedModel3D) {
        this.item.loadedModel3D.scale.set(
          sizeImageItem,
          sizeImageItem,
          sizeImageItem
        );

        this.item.loadedModel3D.position.set(x, y, z);
        this.scene.add(this.item.loadedModel3D!);
      }
    }
  }

  private setOverlayArcane() {
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

  public update() {
    this.mixer?.update(this.time.delta * 0.01);
    // this.cubeVertex?.mixer?.update(this.experience.time.delta);
  }

  private destroyCard() {
    console.log(this.cards);
    this.scene.remove(this.cards?.loadedModel3D!);
    this.cards?.destroy();
    // this.cards = undefined;
  }

  private destroyFirstArcane() {
    if (this.firstArcaneImageItem) {
      this.scene.remove(this.firstArcaneImageItem.loadedModel3D!);
      this.firstArcaneImageItem.loadedModel3D!.remove();
      this.firstArcaneImageItem = undefined;
    }
  }
  private destroySecondArcane() {
    if (this.secondArcaneImageItem) {
      this.scene.remove(this.secondArcaneImageItem.loadedModel3D!);
      this.secondArcaneImageItem.loadedModel3D!.remove();
      this.secondArcaneImageItem = undefined;
    }
  }

  private removeItemFromScene() {
    if (this.item) {
      this.scene.remove(this.item.loadedModel3D!);
    }
  }

  public destroyAll() {
    if (this.overlay) {
      this.scene.remove(this.overlay);
      this.overlay.remove();
      this.overlay = undefined;
    }

    this.scene.remove(this.item?.loadedModel3D!);
    this.item?.loadedModel3D?.remove();
    this.item = undefined;
  }
}

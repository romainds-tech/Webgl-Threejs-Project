import { Experience } from "../Experience";
import {
  AnimationAction,
  AnimationMixer,
  Color,
  Group,
  LoopOnce,
  Scene,
  // ShaderMaterial,
  // TextureLoader,
} from "three";
import Debug from "../utils/Debug";
import Time from "../utils/Time";
import { GUI } from "lil-gui";
import Model3D from "../utils/Model3d";
import Camera from "../Camera";
import {
  disabledInterfaceStartCartomancie,
  displayInterfaceStartCartomancie,
  disabledInterfaceFirstArcaneCartomancie,
  displayInterfaceSecondArcaneCartomancie,
  disabledInterfaceSecondArcaneCartomancie,
  displayInterfacePredictionCartomancie,
  disabledInterfacePredictionCartomancie,
  displayInterfaceSelectItemCartomancie,
  disabledInterfaceSelectItemCartomancie,
  createUICartomancie,
  deleteAllUI,
  displayInterfaceFirstArcaneCartomancie,
  displayQuestionCartomancie,
  disabledQuestionItemCartomancie,
} from "./displayInterfaceCartomancie";
import { predictions } from "./predictions";
// @ts-ignore
import { NodeToyMaterial } from "@nodetoy/three-nodetoy";

import ClickAndDrag, { EventClickDrag } from "../UI/Interactions/ClickAndDrag";

export default class Cartomancie {
  public textPrediction?: string;
  public itemPrediction?: Model3D;
  public lovePercent?: number;
  public prosperityPercent?: number;
  public studyPercent?: number;

  private experience: Experience;
  private scene?: Scene;
  public camera?: Camera;

  private debug?: Debug;
  private debugFolder: GUI | null;

  private time?: Time;

  private overlay?: Model3D;
  private cards?: Model3D;
  private sceneCard?: Model3D;
  private flame?: Model3D;
  private secondFlame?: Model3D;
  private item?: Model3D;
  private mixer?: AnimationMixer;

  private firstArcaneImageItem?: Model3D;
  private secondArcaneImageItem?: Model3D;

  private groupeScene: Group;
  private predictionNumber: number;

  constructor() {
    this.experience = Experience.getInstance();

    this.scene = this.experience.scene;
    this.camera = this.experience.camera;
    this.setupCamera();
    this.predictionNumber = this.setupPrediction();

    this.debug = this.experience.debug;
    this.debugFolder = this.addDebugFolder();

    this.time = this.experience.time;
    this.groupeScene = new Group();

    this.createCube();
    this.loadModelsItemIsland();

    createUICartomancie();
    displayInterfaceStartCartomancie();
    this.startPrediction();
    this.displayButton();
    this.setupLight();
  }

  private setupLight() {
    this.experience.light!.sunLight!.intensity = 0;
    this.experience.light!.hemisphereLight!.intensity = 0;
    this.experience.renderer!.instance.toneMappingExposure = 7;
  }

  private setupCamera() {
    if (this.camera) {
      this.camera.instance.position.set(-30, 15, 21);
      this.camera.instance.zoom = 0.6;

      this.camera.controls.enabled = false;
      this.experience.postProcessing!.selectiveBloomEffect!.intensity = 10.5;

      this.camera.instance.updateProjectionMatrix();
    }
  }

  private setupPrediction() {
    return Math.floor(Math.random() * predictions.length);
  }
  private startPrediction() {
    document
      .getElementById("button_start_cartomancie")!
      .addEventListener("click", () => {
        this.loadScene();
        // this.loadCards();
        disabledInterfaceStartCartomancie();
      });
  }

  private createCube() {
    this.scene!.background = new Color(0x000000);
  }
  private addDebugFolder(): GUI | null {
    if (this.debug?.active) {
      return this.debug.ui!.addFolder("Cartomancie");
    }
    return null;
  }

  private async loadScene() {
    // if (this.sceneCard)
    this.sceneCard = this.experience.allModels.SceneCard;

    this.flame = this.experience.allModels.Flame;
    this.flame?.loadedModel3D?.position.set(4, 4.3, -2.7);
    this.groupeScene.add(this.flame?.loadedModel3D!);
    this.experience.postProcessing?.setSelectObjectsForBloom(
      // @ts-ignore
      this.flame.loadedModel3D?.children[0]
    );

    this.secondFlame = this.experience.allModels.SecondFlame;
    this.secondFlame?.loadedModel3D?.position.set(-14.5, 2, 6.4);
    this.groupeScene.add(this.secondFlame?.loadedModel3D!);
    this.experience.postProcessing?.setSelectObjectsForBloom(
      // @ts-ignore
      this.secondFlame.loadedModel3D?.children[0]
    );

    this.groupeScene.add(this.sceneCard?.loadedModel3D!);
    this.groupeScene.add(this.flame?.loadedModel3D!);
    this.groupeScene.add(this.secondFlame?.loadedModel3D!);

    this.loadCards();
  }

  private async loadCards() {
    if (this.cards == undefined) {
      this.cards = this.experience.allModels.Cards;

      this.groupeScene.rotation.set(0, -0.2, 0);
      this.groupeScene.add(this.cards?.loadedModel3D!);

      this.scene?.add(this.groupeScene);

      this.addDebug();
    }

    this.playAnimations();
  }

  private addDebug() {
    if (this.debug?.active) {
      const sceneFolder: GUI =
        this.debugFolder!.addFolder("SceneCarto entiere");
      sceneFolder!
        .add(this.groupeScene.position, "x")
        .name("pos x")
        .min(-100)
        .max(100)
        .step(1);

      sceneFolder
        .add(this.groupeScene!.position, "y")
        .name("pos Y")
        .min(-100)
        .max(100)
        .step(1);

      sceneFolder
        .add(this.groupeScene!.position, "z")
        .name("pos z")
        .min(-100)
        .max(100)
        .step(1);

      sceneFolder
        .add(this.groupeScene!.rotation, "x")
        .name("rota x")
        .min(-100)
        .max(100)
        .step(0.1);

      sceneFolder
        .add(this.groupeScene!.rotation, "y")
        .name("rota y")
        .min(-100)
        .max(100)
        .step(0.1);

      sceneFolder
        .add(this.groupeScene!.rotation, "z")
        .name("rota z")
        .min(-100)
        .max(100)
        .step(0.1);
    }
  }

  private playAnimations(): void {
    if (this.cards?.animationAction) {
      this.mixer = this.cards.mixer;

      setTimeout(() => {
        this.showOneTimeAnimation(this.cards!.animationAction![0]);
      }, 1000);

      this.showOneTimeAnimation(this.cards.animationAction[1]);

      this.mixer!.addEventListener("finished", () => {
        setTimeout(() => {
          document.querySelector(
            "#popup_first_arcane_cartomancie .text_arcane"
          )!.innerHTML = predictions[this.predictionNumber].textMajorArcane!;
          this.destroyCard();
          displayInterfaceFirstArcaneCartomancie();
          this.setOverlayArcane();
          this.loadMajorArcane();
        }, 700);
      });
    }
  }

  private showOneTimeAnimation(animation: AnimationAction) {
    const clipMixer = this.mixer!.clipAction(animation.getClip());

    clipMixer.play();
    clipMixer.setLoop(LoopOnce, 1);
    clipMixer.clampWhenFinished = true;
  }

  private async loadMajorArcane() {
    for (let [key] of Object.entries(this.experience.allModels)) {
      if (key === predictions[this.predictionNumber].modelMajorArcane.name) {
        this.firstArcaneImageItem = this.experience.allModels[key];
      }
    }

    new ClickAndDrag(
      this.firstArcaneImageItem!.loadedModel3D!,
      EventClickDrag.ROTATION,
      false
    );
    this.scene?.add(this.firstArcaneImageItem?.loadedModel3D!);
  }

  private async loadMinorArcane() {
    for (let [key] of Object.entries(this.experience.allModels)) {
      if (key === predictions[this.predictionNumber].modelMinorArcane.name) {
        this.secondArcaneImageItem = this.experience.allModels[key];
      }
    }

    new ClickAndDrag(
      this.secondArcaneImageItem!.loadedModel3D!,
      EventClickDrag.ROTATION,
      false
    );
    this.scene?.add(this.secondArcaneImageItem?.loadedModel3D!);
  }

  private displayButton() {
    this.displaySecondArcane();
    this.displayPrediction();
    this.displayChooseItem();
    this.displayBackSelectItem();
    this.selectAnswerQuestionForItem();
    this.selectYesOrNoQuestionForItem();
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
        this.setupItem(0, -6, 0);
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
        displayQuestionCartomancie();
        disabledInterfaceSelectItemCartomancie();
      });
  }

  private selectYesOrNoQuestionForItem() {
    document
      .getElementById("button_question_left")!
      .addEventListener("click", () => {
        this.setupIsland();
        this.setupSky();
        disabledQuestionItemCartomancie();
        deleteAllUI();
      });

    document
      .getElementById("button_question_right")!
      .addEventListener("click", () => {
        this.setupIsland();
        this.setupSky();
        disabledQuestionItemCartomancie();
        deleteAllUI();
      });
  }

  private setupIsland() {
    if (this.experience.island) {
      this.experience.island.numberOfElementToAdd = 1;
      this.experience.island.checkIfAddItemToCreate();
      this.itemPrediction = this.item;
      this.textPrediction = predictions[this.predictionNumber].textPrediction;

      if (this.itemPrediction) {
        this.itemPrediction.loadedModel3D!.scale.set(0.2, 0.2, 0.2);
      }

      for (
        let i = 0;
        i < this.experience.island.allObjectsCreateInMap.length;
        i++
      ) {
        if (
          this.experience.island.allObjectsCreateInMap[i].name == "cartomancie"
        ) {
          this.experience.island.allObjectsCreateInMap.splice(i, 1);
        }
      }

      this.experience.island.setupCamera();
      this.experience.island.loadAllScene();
    }

    this.removeItemFromScene();
    this.destroyAll();
  }

  private setupSky() {
    this.lovePercent = predictions[this.predictionNumber].love;
    this.prosperityPercent = predictions[this.predictionNumber].work;
    this.studyPercent = predictions[this.predictionNumber].health;
  }

  private async loadModelsItemIsland() {
    for (let [key] of Object.entries(this.experience.allModels)) {
      console.log(`${key}: ${this.experience.allModels[key]}`);
      if (key === predictions[this.predictionNumber].item.name) {
        this.item = this.experience.allModels[key];
      }
    }
  }

  private setupItem(x: number, y: number, z: number) {
    let sizeImageItem = 3;
    if (this.item) {
      if (this.item.loadedModel3D) {
        this.item.loadedModel3D.scale.set(
          sizeImageItem,
          sizeImageItem,
          sizeImageItem
        );

        this.item.loadedModel3D.position.set(x, y, z);

        new ClickAndDrag(
          this.item!.loadedModel3D!,
          EventClickDrag.ROTATION,
          false
        );
        this.scene?.add(this.item.loadedModel3D!);
      }
    }
  }

  private setOverlayArcane() {
    this.overlay = this.experience.allModels.BackgroundObjectCarto;

    this.overlay?.loadedModel3D!.scale.set(10, 10, 1);
    this.overlay?.loadedModel3D!.lookAt(this.camera!.instance.position);
    this.overlay?.loadedModel3D!.position.set(55, -20, 10);
    this.scene?.add(this.overlay?.loadedModel3D!);
  }

  public update() {
    this.mixer?.update(this.time!.delta * 0.001);
    NodeToyMaterial.tick();

    if (
      // @ts-ignore
      this.flame?.loadedModel3D!.children[0].material.uniforms.Haut.value &&
      // @ts-ignore
      this.secondFlame.loadedModel3D!.children[0].material.uniforms.Haut.value
    ) {
      // @ts-ignore
      this.flame!.loadedModel3D!.children[0].material.uniforms.Haut.value =
        Math.sin(this.experience.time!.elapsed * 0.001) * 0.5 + 0.5;
      // @ts-ignore
      this.secondFlame!.loadedModel3D!.children[0].material.uniforms.Haut.value =
        Math.sin(this.experience.time!.elapsed * 0.001) * 0.5 + 0.5;
    }
  }

  private destroyCard() {
    this.scene?.remove(this.groupeScene);
    this.cards?.destroy();
    this.sceneCard?.destroy();
    this.flame?.destroy();
    this.secondFlame?.destroy();
    this.flame = undefined;
    this.secondFlame = undefined;

    this.experience.light?.destroyLightCartomancie();
  }

  private destroyFirstArcane() {
    if (this.firstArcaneImageItem) {
      this.scene?.remove(this.firstArcaneImageItem.loadedModel3D!);
      this.firstArcaneImageItem.loadedModel3D!.remove();
      this.firstArcaneImageItem = undefined;
    }
  }
  private destroySecondArcane() {
    if (this.secondArcaneImageItem) {
      this.scene?.remove(this.secondArcaneImageItem.loadedModel3D!);
      this.secondArcaneImageItem.loadedModel3D!.remove();
      this.secondArcaneImageItem = undefined;
    }
  }

  private removeItemFromScene() {
    if (this.item) {
      this.scene?.remove(this.item.loadedModel3D!);
    }
  }

  public destroyAll() {
    if (this.overlay) {
      this.scene?.remove(this.overlay.loadedModel3D!);
      this.overlay.loadedModel3D?.remove();
      this.overlay = undefined;
    }

    this.scene?.remove(this.item?.loadedModel3D!);
    this.item?.loadedModel3D?.remove();
    this.item = undefined;
    this.scene!.background = null;
  }
}

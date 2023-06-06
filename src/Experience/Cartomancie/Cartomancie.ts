import { Experience } from "../Experience";
import {
  AnimationAction,
  AnimationMixer,
  Color,
  DoubleSide,
  Group,
  LoopOnce,
  Mesh,
  MeshBasicMaterial,
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
import Camera from "../Camera";
import Sizes from "../utils/Sizes";
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
} from "./displayInterfaceCartomancie";
import { predictions } from "./predictions";
import { flameData } from "../../shaders/Flame";
// @ts-ignore
import { NodeToyMaterial } from "@nodetoy/three-nodetoy";
// import {element} from "three/examples/jsm/nodes/shadernode/ShaderNodeBaseElements";

import ClickAndDrag, { EventClickDrag } from "../UI/Interactions/ClickAndDrag";

export default class Cartomancie {
  public textPrediction?: string;
  public itemPrediction?: Model3D;
  public lovePercent?: number;
  public workPercent?: number;
  public healthPercent?: number;

  private experience: Experience;
  private scene: Scene;
  public camera: Camera;
  private sizes: Sizes;

  private debug: Debug;
  private debugFolder: GUI | null;

  private time: Time;

  private overlay?: Mesh;
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
    this.sizes = this.experience.sizes;

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
    this.experience.light.sunLight!.intensity = 0;
    this.experience.light.hemisphereLight!.intensity = 0;
    this.experience.renderer.instance.toneMappingExposure = 7;
  }

  private setupCamera() {
    this.camera.instance.position.set(-30, 15, 21);
    this.camera.instance.zoom = 0.6;

    this.camera.controls.enabled = false;

    this.camera.instance.updateProjectionMatrix();
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
    this.scene.background = new Color(0x000000);
    // const cube = new Mesh(
    //   new BoxGeometry(1, 1, 1),
    //   new MeshBasicMaterial({ color: 0x000000, side: DoubleSide })
    // );
    //
    // cube.scale.set(90, 90, 90);
    // this.scene.add(cube);
    //
    // if (this.debug.active) {
    //   const cubeFolder: GUI =
    //     this.debug.debugModelFolder!.addFolder("Cube carto");
    //
    //   cubeFolder.add(cube.position, "x").name("Position X");
    //   cubeFolder.add(cube.position, "y").name("Position Y");
    //   cubeFolder.add(cube.position, "z").name("Position Z");
    //
    //   cubeFolder.add(cube.rotation, "x").name("rotation X");
    //   cubeFolder.add(cube.rotation, "y").name("rotation Y");
    //   cubeFolder.add(cube.rotation, "z").name("rotation Z");
    //
    //   cubeFolder.add(cube.scale, "x").name("scale X");
    //   cubeFolder.add(cube.scale, "y").name("scale Y");
    //   cubeFolder.add(cube.scale, "z").name("scale Z");
    // }
  }
  private addDebugFolder(): GUI | null {
    if (this.debug.active) {
      return this.debug.ui!.addFolder("Cartomancie");
    }
    return null;
  }

  private async loadScene() {
    // if (this.sceneCard)
    this.sceneCard = await CustomGlbLoader.getInstance().loadOne(
      new Model3D(allGlbs.SceneCard)
    );

    const flameMaterial = new NodeToyMaterial({
      data: flameData,
    });

    this.flame = await this.createFlame(
      this.flame!,
      flameMaterial,
      4,
      4.3,
      -2.7
    );
    this.experience.postProcessing.setSelectObjectsForBloom(
      // @ts-ignore
      this.flame.loadedModel3D?.children[0]
    );

    this.secondFlame = await this.createFlame(
      this.secondFlame!,
      flameMaterial,
      -14.5,
      2,
      6.4
    );
    flameMaterial.needsUpdate = true;

    this.experience.postProcessing.setSelectObjectsForBloom(
      // @ts-ignore
      this.secondFlame.loadedModel3D?.children[0]
    );

    this.groupeScene.add(this.sceneCard.loadedModel3D!);

    this.loadCards();
  }

  private async createFlame(
    model: Model3D,
    material: NodeToyMaterial,
    x: number,
    y: number,
    z: number
  ) {
    model = await CustomGlbLoader.getInstance().loadOne(
      new Model3D(allGlbs.flame)
    );

    console.log(model.loadedModel3D!.children);
    // @ts-ignore
    model.loadedModel3D!.children[0].material = material;

    model.loadedModel3D?.position.set(x, y, z);
    this.groupeScene.add(model.loadedModel3D!);

    return model;
  }

  private async loadCards() {
    if (this.cards == undefined) {
      this.cards = await CustomGlbLoader.getInstance().loadOne(
        new Model3D(allGlbs.Cards)
      );

      console.log(this.cards);

      this.groupeScene.rotation.set(0, -0.2, 0);
      this.groupeScene.add(this.cards.loadedModel3D!);

      this.scene.add(this.groupeScene);
      this.addDebug();
    }

    this.playAnimations();
  }

  private addDebug() {
    if (this.debug.active) {
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
        console.log("card finished");
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
    this.firstArcaneImageItem = await CustomGlbLoader.getInstance().loadOne(
      new Model3D(predictions[this.predictionNumber].modelMajorArcane)
    );

    new ClickAndDrag(
      this.firstArcaneImageItem!.loadedModel3D!,
      EventClickDrag.ROTATION,
      false
    );
    this.scene.add(this.firstArcaneImageItem.loadedModel3D!);
  }

  private async loadMinorArcane() {
    this.secondArcaneImageItem = await CustomGlbLoader.getInstance().loadOne(
      new Model3D(predictions[this.predictionNumber].modelMinorArcane)
    );

    new ClickAndDrag(
      this.secondArcaneImageItem!.loadedModel3D!,
      EventClickDrag.ROTATION,
      false
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
        this.setupSky();
        deleteAllUI();
      });
  }

  private selectPaidItem() {
    document
      .getElementById("button_select_paid_item_cartomancie")!
      .addEventListener("click", () => {
        this.setupIsland();
        this.setupSky();
        deleteAllUI();
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
        this.itemPrediction.loadedModel3D!.scale.set(0.1, 0.1, 0.1);
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
    this.workPercent = predictions[this.predictionNumber].work;
    this.healthPercent = predictions[this.predictionNumber].health;
  }

  private async loadModelsItemIsland() {
    this.item = await CustomGlbLoader.getInstance().loadOne(
      new Model3D(predictions[this.predictionNumber].item)
    );
  }

  private setupItem(x: number, y: number, z: number) {
    let sizeImageItem = 1.5;
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
    this.mixer?.update(this.time.delta * 0.001);
    NodeToyMaterial.tick();
    // @ts-ignore
    if (this.flame?.loadedModel3D?.children[0].material.uniforms.Haut.value) {
      // @ts-ignore
      this.flame.loadedModel3D.children[0].material.uniforms.Haut.value =
        Math.sin(this.experience.time.elapsed * 0.001) * 0.5 + 0.5;
    }
  }

  private destroyCard() {
    this.scene.remove(this.groupeScene);
    this.cards?.destroy();
    this.sceneCard?.destroy();
    this.flame?.destroy();
    this.secondFlame?.destroy();

    this.experience.light.destroyLightCartomancie();
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
    this.scene.background = null;
  }
}

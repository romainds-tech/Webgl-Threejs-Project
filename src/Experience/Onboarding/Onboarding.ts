import { Experience } from "../Experience";
import Model3D from "../utils/Model3d";
import { allGlbs } from "../../Sources/glb/glb";
import CustomGlbLoader from "../utils/CustomGlbLoader";
import CustomImageLoader from "../utils/CustomImageLoader";
import ClickAndDrag, { Event } from "../UI/Interactions/ClickAndDrag";
import questions from "./questions.json";
import gsap from "gsap";
import { Scene } from "three";
import Text from "../UI/Texts/Text";
import { typeText } from "../UI/Enums/Text";
import Button from "../UI/Buttons/Button";
import { EventEmitter } from "../utils/EventEmitter";

type EventMap = {
  onboardingFinish: [];
};
export default class Onboarding extends EventEmitter<EventMap> {
  public experience: Experience;
  public scene: Scene;
  private temple?: Model3D;
  private circle1?: Model3D;
  private circle2?: Model3D;
  private questions?: (
    | { Title: string; Content: string; Type: string; Options?: undefined }
    | { Title: string; Content: string; Type: string; Options: string[] }
  )[];
  private currentQuestionIndex = 0;
  private buttonOnboarding?: Button;
  private drag?: ClickAndDrag;

  constructor() {
    super();
    this.experience = Experience.getInstance();
    this.scene = this.experience.scene;
    this.questions = questions;

    this.buttonOnboarding = new Button();
    this.buttonOnboarding.setButtonOnboarding();
    let button = document.querySelector(".button_onboarding");
    button?.addEventListener("click", () => {
      this.showQuestion();
    });

    this.loadAllModels();
    this.setupCamera();
    this.setupBackgroundImage();
    this.showQuestion();
  }

  private async loadAllModels() {
    this.temple = await CustomGlbLoader.getInstance().loadOne(
      new Model3D(allGlbs.Temple)
    );
    this.scene.add(this.temple.loadedModel3D!);

    this.circle1 = await CustomGlbLoader.getInstance().loadOne(
      new Model3D(allGlbs.TempleCircle1)
    );
    this.scene.add(this.circle1.loadedModel3D!);

    this.circle2 = await CustomGlbLoader.getInstance().loadOne(
      new Model3D(allGlbs.TempleCircle2)
    );
    this.scene.add(this.circle2.loadedModel3D!);
  }

  private setupCamera() {
    console.log(this.experience.camera.instance.position);
    this.experience.camera.instance.position.set(-5, 5, 20);
    // remove orbit controls
    this.experience.camera.instance.zoom = 0.35;
    this.experience.camera.instance.updateProjectionMatrix();
    this.experience.camera.controls.enabled = false;

    this.experience.camera.debugFolder = this.experience.camera.addDebug();
    this.startMovementCamera();
  }

  private startMovementCamera() {
    addEventListener("load", () => {
      gsap.to(this.experience.camera.instance.position, {
        duration: 1,
        y: 20,
        ease: "Expo.easeOut",
      });

      gsap.to(this.experience.camera.instance, {
        duration: 1,
        zoom: 1.75,
        ease: "Expo.easeOut",
        onUpdate: () => {
          this.experience.camera.instance.updateProjectionMatrix();
        },
      });
    });
  }

  private setupBackgroundImage() {
    let textureback = CustomImageLoader.getInstance().loadImage(
      "material/background/temple_bg.jpg"
    );

    this.scene.background = textureback;
  }

  private showQuestion() {
    document.querySelectorAll(".text")?.forEach((text) => {
      text.remove();
    });
    document.querySelector(".input")?.remove();
    this.drag?.destroy();
    this.drag = undefined;

    if (this.currentQuestionIndex >= this.questions!.length) {
      this.trigger("onboardingFinish");
      document.querySelector(".button_onboarding")?.remove();
      this.buttonOnboarding = undefined;
      return;
    }

    // avant de montrer la question, on détruit la précédente

    let question = this.questions![this.currentQuestionIndex];
    // on affiche la question
    let title = new Text(question.Title, typeText.TITLE);
    let content = new Text(question.Content, typeText.TEXT);

    if (question.Type === "input") {
      let input = document.createElement("input");
      input.type = "text";
      input.className = "input";
      document.querySelector("#interactions")?.appendChild(input);

      // on attend la réponse
      input.addEventListener("input", (e) => {
        console.log(e);
      });

      // on stocke la réponse dans les cookies
    }

    if (question.Type === "wheel") {
      this.drag = new ClickAndDrag(
        this.circle1!.loadedModel3D!,
        Event.ROTATION
      );
      // on découpe le cercle en fonction du nombre de réponses
      let nbOptions = question.Options!.length - 1;
      let angle = 360 / nbOptions;

      this.drag.on("rotationMovement", (): void => {
        // faire un console.log de l'option selectionné par rapport à l'angle
        let angleRotation = this.circle1?.loadedModel3D?.rotation.y;
        // on normalise l'angle pour qu'il soit entre 0 et 360
        angleRotation = angleRotation! % 360;
        let index = Math.abs(Math.floor(angleRotation / angle));
        //

        console.log(question.Options![index], index, angleRotation);
      });
    }

    this.currentQuestionIndex++;
  }

  update() {}

  destroy() {
    this.scene.remove(this.temple?.loadedModel3D!);
    this.temple?.loadedModel3D?.remove();
    this.temple = undefined;

    this.scene.remove(this.circle1?.loadedModel3D!);
    this.circle1?.loadedModel3D?.remove();
    this.circle1 = undefined;

    this.scene.remove(this.circle2?.loadedModel3D!);
    this.circle2?.loadedModel3D?.remove();
    this.circle2 = undefined;
  }
}

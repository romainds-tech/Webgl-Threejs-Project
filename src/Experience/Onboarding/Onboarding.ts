import { Experience } from "../Experience";
import Model3D from "../utils/Model3d";
import CustomImageLoader from "../utils/CustomImageLoader";
import ClickAndDrag, { EventClickDrag } from "../UI/Interactions/ClickAndDrag";
import questions from "./questions.json";
import { Scene } from "three";
import Button from "../UI/Buttons/Button";
import { EventEmitter } from "../utils/EventEmitter";
import { User } from "../utils/Types";
import CookieManager from "../CookieManager";
// @ts-ignore
import { NodeToyMaterial } from "@nodetoy/three-nodetoy";
import { typeText } from "../UI/Enums/Text";
import Text from "../UI/Texts/Text";
import gsap from "gsap";

type EventMap = {
  onboardingFinish: [];
};
export default class Onboarding extends EventEmitter<EventMap> {
  public experience: Experience;
  public scene?: Scene;
  private cookieManager: CookieManager;
  private temple?: Model3D;
  private circle1?: Model3D;
  private circle1Bis?: Model3D;
  private circle2?: Model3D;
  private porte?: Model3D;
  private questions?: any;
  private currentQuestionIndex = 0;
  private buttonOnboarding?: Button;
  private drag?: ClickAndDrag;
  private user?: User;

  constructor() {
    super();
    this.cookieManager = CookieManager.getInstance();
    this.experience = Experience.getInstance();
    this.scene = this.experience.scene;
    this.questions = questions;
    // this.setupBackgroundImage();
    this.user = this.cookieManager.getCookie("user");

    this.buttonOnboarding = new Button();
    this.buttonOnboarding.setButtonOnboarding();
    let button = document.querySelector("#button_onboarding");
    button?.addEventListener("click", () => {
      this.showQuestion();
    });

    this.loadAllModels();
    this.setupLight();
    this.setupCamera();
    this.showQuestion();
  }

  private setupLight() {
    this.experience.light!.sunLight!.intensity = 0;
    this.experience.light!.sunLight!.castShadow = false;
  }

  private async loadAllModels() {
    this.temple = this.experience.allModels.Temple;
    this.scene?.add(this.temple?.loadedModel3D!);

    let textureCircle = CustomImageLoader.getInstance().loadImage(
      "textures/circle/glyphes_4.png"
    );
    this.circle1 = this.experience.allModels.TempleCircle1;

    //apply texture to circle

    // @ts-ignore
    this.circle1!.loadedModel3D!.children[0].material.map = textureCircle;
    this.scene?.add(this.circle1?.loadedModel3D!);

    this.circle1Bis = this.experience.allModels.TempleCircle1Bis;
    this.scene?.add(this.circle1Bis?.loadedModel3D!);

    this.circle2 = this.experience.allModels.TempleCircle2;
    this.scene?.add(this.circle2?.loadedModel3D!);

    this.porte = this.experience.allModels.Porte;
    this.scene?.add(this.porte?.loadedModel3D!);

    // this.startMovementCamera();
  }

  private setupCamera() {
    this.experience.camera?.instance.position.set(-1, 5, 4);

    this.experience.camera!.instance.zoom = 0.7;
    this.experience.camera!.instance.updateProjectionMatrix();

    this.experience.camera!.controls.enabled = false;

    this.experience.camera!.debugFolder = this.experience.camera!.addDebug();
  }

  // private startMovementCamera() {
  //   gsap.to(this.experience.camera.instance.position, {
  //     duration: 2,
  //     x: -1,
  //     y: 5,
  //     z: 4,
  //     ease: "Expo.easeOut",
  //     onUpdate: () => {
  //       this.experience.camera.instance.updateProjectionMatrix();
  //     },
  //   });
  //   gsap.to(this.experience.camera.instance, {
  //     duration: 2,
  //     zoom: 0.7,
  //     ease: "Expo.easeOut",
  //     onUpdate: () => {
  //       this.experience.camera.instance.updateProjectionMatrix();
  //     },
  //   });
  // }

  private showQuestion() {
    document.querySelectorAll(".text")?.forEach((text) => {
      text.remove();
    });
    document.querySelector(".input_onboarding")?.remove();
    this.drag?.destroy();
    this.drag = undefined;

    if (this.currentQuestionIndex >= this.questions!.length) {
      document.querySelector("#button_onboarding")?.remove();
      this.buttonOnboarding = undefined;
      this.endCameraMovement();
      return;
    }

    // before show the question, we delete the previous one

    let question: typeof questions = this.questions![this.currentQuestionIndex];

    // si la question est déjà enregistré dans le user on passe à la suivante
    // @ts-ignore
    if (this.user[question.id] !== "") {
      this.currentQuestionIndex++;
      this.showQuestion();
      return;
    }

    // we show the question
    // @ts-ignore
    let title = new Text(question.Title, typeText.TITLE);
    // @ts-ignore
    let content = new Text(question.Content, typeText.TEXT);

    // @ts-ignore
    if (question.Type === "input") {
      let input = document.createElement("input");
      input.type = "text";
      input.className = "input_onboarding center_position top_70_position";
      document.body.appendChild(input);

      // user answer
      // @ts-ignore
      input.addEventListener("input", (e) => {
        // save the answer in the user object
        // @ts-ignore
        switch (question.id) {
          case "phoneNumber":
            this.user!.phoneNumber = input.value;
            break;
          default:
            // @ts-ignore
            console.error(`Unrecognized question id: ${question.id}`);
        }

        this.cookieManager.setCookie(this.user!);
      });

      // save the answer in the cookies
    }

    // @ts-ignore
    if (question.Type === "wheel") {
      this.drag = new ClickAndDrag(
        this.circle1!.loadedModel3D!,
        EventClickDrag.ROTATION,
        true
      );
      // cut the circle in parts
      // @ts-ignore
      let nbOptions = question.Options!.length - 1;
      let angle = 360 / nbOptions;

      this.drag.on("rotationMovement", (): void => {
        let angleRotation = this.circle1?.loadedModel3D?.rotation.y;
        // @ts-ignore
        angleRotation = angleRotation * (180 / Math.PI);
        angleRotation = Math.abs(Math.floor(angleRotation! % 360));
        let index = Math.abs(Math.floor(angleRotation / angle));

        // @ts-ignore
        switch (question.id) {
          case "zodiacSign":
            this.user!.zodiacSign = index.toString(); // Or however you determine the zodiac sign
            break;
          case "hourBirth":
            this.user!.hourBirth = index.toString(); // Or however you determine the birth hour
            break;
        }

        this.cookieManager.setCookie(this.user!);
      });
    }

    this.currentQuestionIndex++;
  }

  private endCameraMovement() {
    this.experience.camera!.updateActive = false;

    gsap.to(this.experience.camera!.instance.position, {
      duration: 3.2,
      x: 0.53,
      y: 0.3,
      z: -2.5,
      ease: "power2.out",
      onUpdate: () => {
        this.experience.camera!.instance.updateProjectionMatrix();
      },
    });

    gsap.to(this.experience.camera!.instance.rotation, {
      duration: 3.2,
      x: 0.2,
      y: 0,
      z: 0,
      ease: "power2.out",
      onUpdate: () => {
        this.experience.camera!.instance.updateProjectionMatrix();
      },
      onComplete: () => {
        this.trigger("onboardingFinish");
      },
    });
  }

  update() {
    if (
      // @ts-ignore
      this.circle1Bis?.loadedModel3D?.children[0].material.uniforms.Aparition
        .value
    ) {
      // @ts-ignore
      this.circle1Bis.loadedModel3D.children[0].material.uniforms.Aparition.value =
        Math.sin(this.experience.time!.elapsed * 0.0005) * 0.5 + 0.5;
    }
    NodeToyMaterial.tick();
  }

  destroy() {
    this.scene?.remove(this.temple?.loadedModel3D!);
    this.temple?.loadedModel3D?.remove();
    this.temple = undefined;

    this.scene?.remove(this.circle1?.loadedModel3D!);
    this.circle1?.loadedModel3D?.remove();
    this.circle1 = undefined;

    this.scene?.remove(this.circle1Bis?.loadedModel3D!);
    this.circle1Bis?.loadedModel3D?.remove();
    this.circle1Bis = undefined;

    this.scene?.remove(this.circle2?.loadedModel3D!);
    this.circle2?.loadedModel3D?.remove();
    this.circle2 = undefined;

    this.drag?.destroy();
    this.drag = undefined;

    this.experience.camera!.updateActive = true;

    document
      .querySelector("#button_onboarding")
      ?.removeEventListener("click", () => {});

    document.querySelector("#button_onboarding")?.remove();
  }
}

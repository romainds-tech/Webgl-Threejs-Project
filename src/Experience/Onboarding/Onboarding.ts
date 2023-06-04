import { Experience } from "../Experience";
import Model3D from "../utils/Model3d";
import { allGlbs } from "../../Sources/glb/glb";
import CustomGlbLoader from "../utils/CustomGlbLoader";
import CustomImageLoader from "../utils/CustomImageLoader";
import ClickAndDrag, {Event, EventClickDrag} from "../UI/Interactions/ClickAndDrag";
import questions from "./questions.json";
import gsap from "gsap";
import { Scene } from "three";
import Text from "../UI/Texts/Text";
import { typeText } from "../UI/Enums/Text";
import Button from "../UI/Buttons/Button";
import { EventEmitter } from "../utils/EventEmitter";
import { User } from "../utils/Types";
import CookieManager from "../CookieManager";

type EventMap = {
  onboardingFinish: [];
};
export default class Onboarding extends EventEmitter<EventMap> {
  public experience: Experience;
  public scene: Scene;
  // private cookieManager: CookieManager;
  private temple?: Model3D;
  private circle1?: Model3D;
  private circle2?: Model3D;
  private questions?: any;
  private currentQuestionIndex = 0;
  private buttonOnboarding?: Button;
  private drag?: ClickAndDrag;
  private user?: User;

  constructor() {
    super();
    // this.cookieManager = CookieManager.getInstance();
    this.experience = Experience.getInstance();
    this.scene = this.experience.scene;
    this.questions = questions;
    // this.setupBackgroundImage();
    // this.user = this.cookieManager.getCookie("user");

    this.buttonOnboarding = new Button();
    this.buttonOnboarding.setButtonOnboarding();
    let button = document.querySelector("#button_onboarding");
    button?.addEventListener("click", () => {
      this.showQuestion();
    });
    this.loadAllModels();
    this.setupCamera();
    // this.setupBackgroundImage();
    // this.user = this.setUserFromCookie();

<<<<<<< HEAD
    this.showQuestion();
  }

  private setUserFromCookie(): User {
    let cookie = document.cookie;
    if (cookie) {
      console.log(cookie);
      return JSON.parse(cookie);
    }
    return {
      phoneNumber: "",
      zodiacSign: "",
      hourBirth: "",
    };
  }

  private setCookie(user: User) {
    document.cookie = JSON.stringify(user);
  }

=======
    this.loadAllModels().then(() => {
      this.setupCamera();
      this.showQuestion();
    });
  }

>>>>>>> 4ad27b49412903d37209038d8dd85c0703b0cc3e
  private async loadAllModels() {
    this.temple = await CustomGlbLoader.getInstance().loadOne(
      new Model3D(allGlbs.Temple)
    );

    this.scene.add(this.temple.loadedModel3D!);

    let textureCircle = CustomImageLoader.getInstance().loadImage(
      "textures/circle/glyphes.png"
    );
    this.circle1 = await CustomGlbLoader.getInstance().loadOne(
      new Model3D(allGlbs.TempleCircle1)
    );

    this.circle1.loadedModel3D!.children[0].material.map = textureCircle;
    console.log(this.circle1.loadedModel3D!.children[0]);
    this.scene.add(this.circle1.loadedModel3D!);

    this.circle2 = await CustomGlbLoader.getInstance().loadOne(
      new Model3D(allGlbs.TempleCircle2)
    );

    this.scene.add(this.circle2.loadedModel3D!);
  }

  private setupCamera() {
    console.log(this.experience.camera.instance.position);
    this.experience.camera.instance.position.set(-5, 5, 20);

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

  private showQuestion() {
    document.querySelectorAll(".text")?.forEach((text) => {
      text.remove();
    });
    document.querySelector(".input")?.remove();
    this.drag?.destroy();
    this.drag = undefined;

    if (this.currentQuestionIndex >= this.questions!.length) {
      this.trigger("onboardingFinish");
      document.querySelector("#button_onboarding")?.remove();
      this.buttonOnboarding = undefined;
      return;
    }

    // before show the question, we delete the previous one

    let question: typeof questions = this.questions![this.currentQuestionIndex];

    // si la question est déjà enregistré dans le user on passe à la suivante
    // if (this.user[question.id] !== "") {
    //   console.log("question déjà répondu");
    //   this.currentQuestionIndex++;
    //   this.showQuestion();
    //   return;
    // }

    // we show the question
    let title = new Text(question.Title, typeText.TITLE);
    let content = new Text(question.Content, typeText.TEXT);

    if (question.Type === "input") {
      let input = document.createElement("input");
      input.type = "text";
      input.className = "input center_position top_70_position";
      document.body.appendChild(input);

      // user answer
      input.addEventListener("input", (e) => {
        // save the answer in the user object
<<<<<<< HEAD
        // this.user!.phoneNumber = input.value;
        // this.setCookie(this.user!);
=======
        // switch (question.id) {
        //   case "phoneNumber":
        //     this.user!.phoneNumber = input.value;
        //     break;
        //   default:
        //     console.error(`Unrecognized question id: ${question.id}`);
        // }
        // this.cookieManager.setCookie(this.user!);
>>>>>>> 4ad27b49412903d37209038d8dd85c0703b0cc3e
      });

      // save the answer in the cookies
    }

    if (question.Type === "wheel") {
      this.drag = new ClickAndDrag(
        this.circle1!.loadedModel3D!,
          EventClickDrag.ROTATION,
          true
      );
      // cut the circle in parts
      let nbOptions = question.Options!.length - 1;
      let angle = 360 / nbOptions;

      this.drag.on("rotationMovement", (): void => {
        let angleRotation = this.circle1?.loadedModel3D?.rotation.y;
        angleRotation = angleRotation * (180 / Math.PI);
        angleRotation = Math.abs(Math.floor(angleRotation! % 360));
        let index = Math.abs(Math.floor(angleRotation / angle));

        // switch (question.id) {
        //   case "zodiacSign":
        //     this.user!.zodiacSign = index.toString(); // Or however you determine the zodiac sign
        //     break;
        //   case "hourBirth":
        //     this.user!.hourBirth = index.toString(); // Or however you determine the birth hour
        //     break;
        // }

        // this.cookieManager.setCookie(this.user!);
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
    // this.circle1 = undefined;
<<<<<<< HEAD
=======
    // this.circle1 = undefined;
>>>>>>> 4ad27b49412903d37209038d8dd85c0703b0cc3e

    this.scene.remove(this.circle2?.loadedModel3D!);
    this.circle2?.loadedModel3D?.remove();
    this.circle2 = undefined;

    this.drag?.destroy();
    this.drag = undefined;

    console.log("destroy onboarding");
    console.log(document.querySelector("#button_onboarding"));

    document
      .querySelector("#button_onboarding")
      ?.removeEventListener("click", (e) => {
        console.log("click", e);
      });

    document.querySelector("#button_onboarding")?.remove();
  }
}

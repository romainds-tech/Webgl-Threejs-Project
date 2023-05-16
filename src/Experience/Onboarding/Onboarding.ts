import {Experience} from "../Experience";
import Model3D from "../utils/Model3d";
import {allGlbs} from "../../Sources/glb/glb";
import CustomGlbLoader from "../utils/CustomGlbLoader";
import CustomImageLoader from "../utils/CustomImageLoader";
import ClickAndDrag, {Event} from "../UI/Interactions/ClickAndDrag";
import gsap from "gsap";
import {Scene} from "three";

export default class Onboarding {
  public experience: Experience;
  public scene: Scene;
  private temple?: Model3D;
  private circle1?: Model3D;
  private circle2?: Model3D;

  constructor() {
    this.experience = Experience.getInstance();
    this.scene = this.experience.scene;

    this.loadAllModels();
    this.setupCamera();
    this.setupBackgroundImage();
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
    new ClickAndDrag(this.circle1.loadedModel3D!, Event.ROTATION);

    this.circle2 = await CustomGlbLoader.getInstance().loadOne(
      new Model3D(allGlbs.TempleCircle2)
    );
    this.scene.add(this.circle2.loadedModel3D!);
    new ClickAndDrag(this.circle2.loadedModel3D!, Event.ROTATION);
  }

  private setupCamera() {
    this.experience.camera.instance.position.set(-5, 5, 20);
    // remove orbit controls
    this.experience.camera.instance.zoom = 0.35;
    this.experience.camera.instance.updateProjectionMatrix();
    this.experience.camera.controls.enabled = false;

    this.experience.camera.debugFolder = this.experience.camera.addDebug();
    this.startMovementCamera();

  }

  private startMovementCamera() {
      gsap.to(this.experience.camera.instance.position, {
        duration: 5,
        y: 15,
        ease: "Expo.easeOut",
        onUpdate: () => {
          this.experience.camera.instance.updateProjectionMatrix();
        }
      });





      gsap.to(this.experience.camera.instance, {
          duration: 5,
          zoom: 2.25,
          ease: "Expo.easeOut",
        onUpdate: () => {
              this.experience.camera.instance.updateProjectionMatrix();
            }
      });
  }

  private setupBackgroundImage() {
    this.scene.background = CustomImageLoader.getInstance().loadImage(
        "material/background/temple_bg.jpg",
    );
  }



  update() {
  }

  destroy() {}
}

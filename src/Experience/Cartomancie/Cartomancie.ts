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
} from "./displayInterfaceCartomancie";
import Button from "../UI/Buttons/Button";
import Input from "../UI/Inputs/Input";
import Overlay from "../UI/Overlays/Overlay";

export default class Cartomancie {
  public experience: Experience;
  public scene: Scene;
  public camera: Camera;
  public sizes: Sizes;

  public debug: Debug;
  public debugFolder: GUI | null;

  public time: Time;

  public carteVertex?: Model3D;
  public card2DMesh?: Mesh;
  public card?: Mesh;
  public cards?: Model3D;
  public mixer?: AnimationMixer;

  public popup: Popup;
  public button: Button;
  public input: Input;
  public overlay: Overlay;
  public imageItem?: Object3D;

  constructor() {
    this.experience = Experience.getInstance();
    this.scene = this.experience.scene;
    this.camera = this.experience.camera;
    let cameraPosition = 20;
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

    // this.loadCarte();
    this.popup = new Popup();
    this.popup.setPopupCartomancie();

    this.button = new Button();
    this.button.setButtonCartomancie();

    this.input = new Input();
    this.input.setInputCartomancie();

    this.overlay = new Overlay();
    this.overlay.setOverlayCartomancie();

    displayInterfaceStartCartomancie();
    this.startPrediction();
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
        this.setImageItem();
        this.destroyCard();
        displayInterfaceFirstArcaneCartomancie();
        this.setOverlayArcane();
      });
    }
  }

  setOverlayArcane() {
    const geometry = new PlaneGeometry(this.sizes.width, this.sizes.height);
    const material = new MeshBasicMaterial({
      color: 0x1b2b2c,
      side: DoubleSide,
    });
    const overlay = new Mesh(geometry, material);

    this.scene.add(overlay);
  }

  setImageItem() {
    const geometry = new PlaneGeometry(1, 2);
    const material = new MeshBasicMaterial({
      color: 0xff00ff,
      side: DoubleSide,
    });
    this.imageItem = new Mesh(geometry, material);

    let sizeImageItem = 4;
    if (this.imageItem) {
      this.imageItem.scale.set(sizeImageItem, sizeImageItem, sizeImageItem);

      this.imageItem.position.set(-4, 8, -4);
      this.imageItem.rotation.set(0, Math.PI / 2, 0);
      this.scene.add(this.imageItem);
    }
  }
  card2D() {
    const textureLoader = new TextureLoader();
    const card2DGeometry = new PlaneGeometry(10, 20);
    const card2DMaterial = new MeshStandardMaterial({
      side: DoubleSide,
    });

    card2DMaterial.map = textureLoader.load("/textures/door/color.jpg");
    card2DMaterial.alphaMap = textureLoader.load("/textures/door/alpha.jpg");
    card2DMaterial.aoMap = textureLoader.load(
      "/textures/door/ambientOcclusion.jpg"
    );
    card2DMaterial.displacementMap = textureLoader.load(
      "/textures/door/height.jpg"
    );
    card2DMaterial.normalMap = textureLoader.load("/textures/door/normal.jpg");
    card2DMaterial.metalnessMap = textureLoader.load(
      "/textures/door/metalness.jpg"
    );
    card2DMaterial.roughnessMap = textureLoader.load(
      "/textures/door/roughness.jpg"
    );

    this.card2DMesh = new Mesh(card2DGeometry, card2DMaterial);

    this.card2DMesh.position.set(-10, 50, 10);
    this.card2DMesh.rotation.set(0, 0.2, -3);

    this.scene.add(this.card2DMesh);

    if (this.debug.active) {
      const ringsFolder: GUI = this.debugFolder!.addFolder("Card 2D");
      ringsFolder
        .add(this.card2DMesh.position, "x")
        .min(-3)
        .max(3)
        .step(0.01)
        .name("Position X");

      ringsFolder
        .add(this.card2DMesh.rotation, "x")
        .min(-10)
        .max(10)
        .step(0.1)
        .name("Rotation X");

      ringsFolder
        .add(this.card2DMesh.rotation, "y")
        .min(-10)
        .max(10)
        .step(0.1)
        .name("Rotation Y");

      ringsFolder
        .add(this.card2DMesh.rotation, "z")
        .min(-10)
        .max(10)
        .step(0.1)
        .name("Rotation Z");
    }
    this.animationCard2D();
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
}

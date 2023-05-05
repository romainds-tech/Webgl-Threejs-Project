import { Experience } from "../Experience";
import {
  Color,
  DoubleSide,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
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
import TextCartomancie from "./TextCartomancie";
import Sizes from "../utils/Sizes";

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
  public cursor: { x: number; y: number };

  public text: TextCartomancie;

  constructor() {
    this.experience = Experience.getInstance();
    this.scene = this.experience.scene;
    this.camera = this.experience.camera;
    this.sizes = this.experience.sizes;

    this.debug = this.experience.debug;
    this.debugFolder = this.addDebugFolder();

    this.time = this.experience.time;

    this.cursor = { x: 0, y: 0 };
    this.text = new TextCartomancie();
    this.loadCarte();
  }

  addDebugFolder(): GUI | null {
    if (this.debug.active) {
      return this.debug.ui!.addFolder("Cartomancie");
    }
    return null;
  }

  private async loadCarte() {
    this.carteVertex = await CustomGlbLoader.getInstance().loadOne(
      new Model3D(allGlbs.CubeVertexGroup)
    );
    this.carteVertex.object.scale.set(20, 20, 20);
    this.carteVertex.object.rotation.y = Math.PI / 2;

    const allMesh = this.carteVertex.object.children[0].children[0].children;
    allMesh.forEach((mesh) => {
      mesh.material = new MeshBasicMaterial();
      console.log(mesh.material);
    });

    allMesh[1].material = new ShaderMaterial({
      vertexShader: cardVertexShader,
      fragmentShader: cardFragmentShader,
      uniforms: {
        uColor: { value: new Color("#0051da") },
      },
    });

    this.scene.add(this.carteVertex.object);

    this.animationCard();
    this.card2D();
  }

  animationCard() {
    if (this.carteVertex) {
      gsap.to(this.carteVertex.object.rotation, {
        duration: 2,
        x: Math.PI * 2,
      });
    }
  }

  card2D() {
    window.addEventListener("mousemove", (event) => {
      this.cursor.x = event.clientX / this.sizes.width - 0.5;
      this.cursor.y = event.clientY / this.sizes.height - 0.5;
    });

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

  animationCard2D() {
    if (this.card2DMesh) {
      console.log();
      gsap.to(this.card2DMesh.position, { delay: 2, duration: 3, y: 2 });
      gsap.to(this.text.divCartomancie.style, {
        delay: 2,
        duration: 3,
        top: "50%",
      });
    }
  }

  update() {
    // const parallaxX = this.cursor.x * 0.5;
    // const parallaxY = -this.cursor.y * 0.5;
    //
    // if (this.card2DMesh) {
    //   this.card2DMesh.position.x +=
    //     (parallaxX - this.card2DMesh.position.x) * 5 * this.time.delta;
    //   this.card2DMesh.position.y +=
    //     (parallaxY - this.card2DMesh.position.y) * 5 * this.time.delta;
    // }
  }
}

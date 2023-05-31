import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { GlitchPass } from "three/examples/jsm/postprocessing/GlitchPass.js";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";
import { TintShader } from "../../shaders/postProcessingShader";
import { FilmPass } from "three/addons/postprocessing/FilmPass.js";
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";
import {
  ColorManagement,
  Layers,
  MeshBasicMaterial,
  Scene,
  ShaderMaterial,
  Vector2,
  Vector3,
  WebGLRenderTarget,
} from "three";
import { Experience } from "../Experience";
import Sizes from "./Sizes";
import Camera from "../Camera";
import Renderer from "../Renderer";
import Debug from "./Debug";
import { GUI } from "lil-gui";

export default class PostProcessing {
  private experience: Experience;
  private scene: Scene;
  private sizes: Sizes;
  private camera: Camera;
  private renderer: Renderer;
  private debug: Debug;
  private debugFolder: GUI | null;

  private ENTIRE_SCENE: number;
  private BLOOM_SCENE: number;

  private materials: {};

  private bloomLayer: Layers;
  private renderTarget?: WebGLRenderTarget;
  private instance?: EffectComposer;
  private bloomComposer?: EffectComposer;
  private renderPass?: RenderPass;
  constructor() {
    ColorManagement.enabled = false;
    this.experience = Experience.getInstance();
    this.scene = this.experience.scene;
    this.sizes = this.experience.sizes;
    this.camera = this.experience.camera;
    this.renderer = this.experience.renderer;

    this.debug = this.experience.debug;
    this.debugFolder = this.addDebugFolder();

    this.ENTIRE_SCENE = 0;
    this.BLOOM_SCENE = 1;

    this.materials = {};

    // if (this.debug.active) {
    //   this.debugFolder = this.debug.ui.addFolder("Post preocessing");
    // }

    //Layer
    this.bloomLayer = new Layers();
    this.bloomLayer.set(this.BLOOM_SCENE);

    this.setInstance();

    this.setBloomPass();
    this.settFilmPass();
    this.setFinalPass();

    // this.renderer.autoClear = false;
  }

  private addDebugFolder(): GUI | null {
    if (this.debug.active) {
      return this.debug.ui!.addFolder("Post processing");
    }
    return null;
  }

  setInstance() {
    this.renderTarget = new WebGLRenderTarget(800, 600, {
      samples: 2,
    });

    this.instance = new EffectComposer(
      this.renderer.instance,
      this.renderTarget
    );
    this.instance.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.instance.setSize(this.sizes.width, this.sizes.height);

    // A besoin d'un render pass pour pouvoir cumuler les effets
    this.renderPass = new RenderPass(this.scene, this.camera.instance);
    this.instance.addPass(this.renderPass);
  }

  setEffect() {
    if (this.instance) {
      // Glitch pass
      const glitchPass = new GlitchPass();
      glitchPass.goWild = false;
      glitchPass.enabled = false;
      this.instance.addPass(glitchPass);

      const tintPass = new ShaderPass(TintShader);
      tintPass.material.uniforms.uTint.value = new Vector3();
      this.instance.addPass(tintPass);

      if (this.debug.active) {
        const glitchFolder = this.debugFolder!.addFolder("Glitch");
        glitchFolder.add(glitchPass, "enabled").name("Enabled");
        glitchFolder.add(glitchPass, "goWild").name("Go wild");

        const tintFolder = this.debugFolder!.addFolder("Interface");
        tintFolder
          .add(tintPass.material.uniforms.uTint.value, "x")
          .min(-1)
          .max(1)
          .step(0.001)
          .name("red");
        tintFolder
          .add(tintPass.material.uniforms.uTint.value, "y")
          .min(-1)
          .max(1)
          .step(0.001)
          .name("green");
        tintFolder
          .add(tintPass.material.uniforms.uTint.value, "y")
          .min(-1)
          .max(1)
          .step(0.001)
          .name("blue");
      }
    }
  }

  setBloomPass() {
    const params = {
      exposure: 0.3,
      bloomStrength: 30,
      bloomThreshold: 0.15,
      bloomRadius: 0,
      scene: "Scene with Glow",
    };

    const bloomPass = new UnrealBloomPass(
      new Vector2(this.sizes.width, this.sizes.height),
      1.5,
      0.4,
      0.3
    );
    bloomPass.threshold = params.bloomThreshold;
    bloomPass.strength = params.bloomStrength;
    bloomPass.radius = params.bloomRadius;

    this.bloomComposer = new EffectComposer(this.renderer.instance);
    this.bloomComposer.renderToScreen = false;
    this.bloomComposer.addPass(this.renderPass!);
    this.bloomComposer.addPass(bloomPass);

    if (this.debug.active) {
      const bloomFolder = this.debugFolder!.addFolder("Bloom");

      bloomFolder
        .add(params, "bloomThreshold")
        .min(0.15)
        .max(1)
        .step(0.01)
        .onChange((value) => {
          bloomPass.threshold = value;
        });

      bloomFolder.add(params, "bloomStrength", 0.0, 50.0).onChange((value) => {
        bloomPass.strength = value;
      });

      bloomFolder
        .add(params, "bloomRadius", 0.0, 1.0)
        .step(0.01)
        .onChange((value) => {
          bloomPass.radius = value;
        });
    }
  }

  setFinalPass() {
    const finalPass = new ShaderPass(
      new ShaderMaterial({
        uniforms: {
          baseTexture: { value: null },
          bloomTexture: { value: this.bloomComposer!.renderTarget2.texture },
        },
        vertexShader: `
        varying vec2 vUv;

        void main() {

            vUv = uv;

            gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
        }`,

        fragmentShader: `
        uniform sampler2D baseTexture;
        uniform sampler2D bloomTexture;

        varying vec2 vUv;
        
        

        void main() {
            gl_FragColor = ( texture2D( baseTexture, vUv ) + vec4( 1.0 ) * texture2D( bloomTexture, vUv ) );
        }
`,
        defines: {},
      }),
      "baseTexture"
    );

    finalPass.needsSwap = true;

    this.instance!.addPass(finalPass);
  }
  settFilmPass() {
    const filmPass = new FilmPass(
      0.35, // intensité du bruit
      0.025, // intensité de la ligne de balayage
      648, // nombre de lignes de balayage
      0 // niveaux de gris
    );
    filmPass.renderToScreen = true;
    filmPass.enabled = false;
    this.instance!.addPass(filmPass);

    if (this.debug.active) {
      const filmFolder = this.debugFolder!.addFolder("Bruit");
      filmFolder.add(filmPass, "enabled").name("Enabled");
    }
  }

  resize() {
    this.instance!.setSize(this.sizes.width, this.sizes.height);
    this.instance!.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  }

  renderPostProcessing() {
    this.renderBloom(true);

    // render the entire scene, then render bloom scene on top
    this.instance!.render();
  }

  renderBloom(mask) {
    if (mask) {
      this.scene.traverse((objet) => {
        this.darkenNonBloomed(objet);
      });
      // this.renderer.clear()
      this.bloomComposer!.render();
      this.scene.traverse((objet) => {
        this.restoreMaterial(objet);
      });
    }
  }

  darkenNonBloomed(obj) {
    const darkMaterial = new MeshBasicMaterial({ color: "black" });
    if (obj.isMesh && this.bloomLayer.test(obj.layers) === false) {
      this.materials[obj.uuid] = obj.material;
      obj.material = darkMaterial;
    }
  }

  restoreMaterial(obj) {
    if (this.materials[obj.uuid]) {
      obj.material = this.materials[obj.uuid];
      delete this.materials[obj.uuid];
    }
  }

  update() {
    this.renderPostProcessing();
  }
}

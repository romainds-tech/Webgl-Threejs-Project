import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import Experience from "./Experience.js";
import { GlitchPass } from "three/examples/jsm/postprocessing/GlitchPass.js";
import * as THREE from "three";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";
import {
  TintShader,
  DisplacementShader,
} from "./Shaders/PostProcessingShader.js";
import { BloomPass } from "three/addons/postprocessing/BloomPass.js";
import { FilmPass } from "three/addons/postprocessing/FilmPass.js";
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";
import { ColorManagement, ShaderMaterial } from "three";

export default class PostProcessing {
  constructor() {
    ColorManagement.enabled = false;
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.sizes = this.experience.sizes;
    this.camera = this.experience.camera;
    this.renderer = this.experience.renderer;

    this.resources = this.experience.resources;
    this.debug = this.experience.debug;

    this.ENTIRE_SCENE = 0;
    this.BLOOM_SCENE = 1;

    this.params = {
      exposure: 1,
      bloomStrength: 5,
      bloomThreshold: 0,
      bloomRadius: 0,
      scene: "Scene with Glow",
    };

    if (this.debug.active) {
      this.debugFolder = this.debug.ui.addFolder("Post preocessing");
    }

    this.resources.on("ready", () => {
      this.setEffect();
    });
    this.setInstance();
  }

  setInstance() {
    this.renderTarget = new THREE.WebGLRenderTarget(800, 600, {
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
    // Glitch pass
    const glitchPass = new GlitchPass();
    glitchPass.goWild = false;
    glitchPass.enabled = false;
    this.instance.addPass(glitchPass);

    const tintPass = new ShaderPass(TintShader);
    tintPass.material.uniforms.uTint.value = new THREE.Vector3();
    this.instance.addPass(tintPass);

    const displacementPass = new ShaderPass(DisplacementShader);
    displacementPass.material.uniforms.uTime.value = 0;
    displacementPass.material.uniforms.uNormalMap.value =
      this.resources.loaders.textureLoader.load(
        "/textures/interfaceNormalMap.png"
      );
    displacementPass.enabled = false;
    this.instance.addPass(displacementPass);

    this.setBloomPass();
    this.settFilmPass();
    this.setFinalPass();
    if (this.debug.active) {
      this.glitchFolder = this.debugFolder.addFolder("Glitch");
      this.glitchFolder.add(glitchPass, "enabled").name("Enabled");
      this.glitchFolder.add(glitchPass, "goWild").name("Go wild");

      this.tintFolder = this.debugFolder.addFolder("Interface");
      this.tintFolder
        .add(tintPass.material.uniforms.uTint.value, "x")
        .min(-1)
        .max(1)
        .step(0.001)
        .name("red");
      this.tintFolder
        .add(tintPass.material.uniforms.uTint.value, "y")
        .min(-1)
        .max(1)
        .step(0.001)
        .name("green");
      this.tintFolder
        .add(tintPass.material.uniforms.uTint.value, "y")
        .min(-1)
        .max(1)
        .step(0.001)
        .name("blue");

      this.interfaceFolder = this.debugFolder.addFolder("Interface");
      this.interfaceFolder.add(displacementPass, "enabled").name("Enabled");
      this.interfaceFolder
        .add(displacementPass.material.uniforms.uXColor, "value")
        .min(-1)
        .max(1)
        .step(0.01)
        .name("Interior");
    }
  }

  setBloomPass() {
    // const bloomPass = new BloomPass(
    //   1, // force
    //   25, // taille du noyau
    //   4, // sigma ?
    //   256 // flouter la résolution de la cible de rendu
    // );

    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(this.sizes.width, this.sizes.height),
      1.5,
      0.4,
      0.85
    );
    bloomPass.threshold = this.params.bloomThreshold;
    bloomPass.strength = this.params.bloomStrength;
    bloomPass.radius = this.params.bloomRadius;

    this.instance.addPass(bloomPass);

    //Layer
    const bloomLayer = new THREE.Layers();
    bloomLayer.set(this.BLOOM_SCENE);

    if (this.debug.active) {
      this.bloomFolder = this.debugFolder.addFolder("Bloom");
      this.bloomFolder.add(bloomPass, "enabled").name("Enabled");

      this.bloomFolder
        .add(this.params, "exposure")
        .min(0.1)
        .max(2)
        .step(0.01)
        .name("Interior")
        .onChange(function (value) {
          this.renderer.toneMappingExposure = Math.pow(value, 4.0);
        });

      this.bloomFolder
        .add(this.params, "bloomThreshold")
        .min(0.1)
        .max(2)
        .step(0.01)
        .onChange(function (value) {
          bloomPass.threshold = value;
        });

      this.bloomFolder
        .add(this.params, "bloomStrength", 0.0, 10.0)
        .onChange(function (value) {
          bloomPass.strength = value;
        });

      this.bloomFolder
        .add(this.params, "bloomRadius", 0.0, 1.0)
        .step(0.01)
        .onChange(function (value) {
          bloomPass.radius = value;
        });
    }
  }

  setFinalPass() {
    this.finalPass = new ShaderPass(
      new ShaderMaterial({
        uniforms: {
          baseTexture: { value: null },
          bloomTexture: { value: this.instance.renderTarget2.texture },
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

    this.finalPass.needsSwap = true;

    this.finalComposer = new EffectComposer(
      this.renderer.instance,
      this.renderTarget
    );
    this.finalComposer.addPass(this.renderPass);
    this.finalComposer.addPass(this.finalPass);
  }
  settFilmPass() {
    const filmPass = new FilmPass(
      0.35, // intensité du bruit
      0.025, // intensité de la ligne de balayage
      648, // nombre de lignes de balayage
      false // niveaux de gris
    );
    filmPass.renderToScreen = true;
    filmPass.enabled = false;
    this.instance.addPass(filmPass);

    if (this.debug.active) {
      this.filmFolder = this.debugFolder.addFolder("Bruit");
      this.filmFolder.add(filmPass, "enabled").name("Enabled");
    }
  }

  resize() {
    this.instance.setSize(this.sizes.width, this.sizes.height);
    this.instance.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  }

  render() {
    this.renderBloom(true);

    // render the entire scene, then render bloom scene on top
    this.finalComposer.render();
  }

  renderBloom(mask) {
    if (mask === true) {
      this.instance.render();
    }
  }

  update() {
    this.instance.render();
  }
}
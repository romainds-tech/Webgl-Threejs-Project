import {
  SelectiveBloomEffect,
  Selection,
  EffectComposer,
  RenderPass,
  EffectPass,
} from "postprocessing";
import { ColorManagement, Scene, WebGLRenderTarget } from "three";
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

  private materials: {};
  // @ts-ignore
  private selectedObjectsForBloom: Selection;

  private renderTarget?: WebGLRenderTarget;
  private instance?: EffectComposer;
  private renderPass?: RenderPass;
  public effectPass?: EffectPass;
  constructor() {
    ColorManagement.enabled = false;
    this.experience = Experience.getInstance();
    this.scene = this.experience.scene;
    this.sizes = this.experience.sizes;
    this.camera = this.experience.camera;
    this.renderer = this.experience.renderer;

    this.debug = this.experience.debug;
    this.debugFolder = this.addDebugFolder();

    this.materials = {};
    this.selectedObjectsForBloom = new Selection();

    // if (this.debug.active) {
    //   this.debugFolder = this.debug.ui.addFolder("Post preocessing");
    // }

    this.setInstance();

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
    this.instance.setSize(this.sizes.width, this.sizes.height);

    // A besoin d'un render pass pour pouvoir cumuler les effets
    this.renderPass = new RenderPass(this.scene, this.camera.instance);
    this.instance.addPass(this.renderPass);

    // Selective bloom pass
    // @ts-ignore
    const selectiveBloomEffect = new SelectiveBloomEffect(
      this.scene,
      this.camera.instance,
      {
        intensity: 10.5,
        mipmapBlur: true,
        luminanceThreshold: 0.1,
        luminanceSmoothing: 0.75,
        radius: 0.5,
      }
    );
    selectiveBloomEffect.selection = this.selectedObjectsForBloom;
    selectiveBloomEffect.ignoreBackground = true;
    this.effectPass = new EffectPass(
      this.camera.instance,
      selectiveBloomEffect
    );
    this.effectPass.renderToScreen = true;
    this.instance.addPass(this.effectPass);
  }

  setSelectObjectsForBloom(mesh) {
    this.selectedObjectsForBloom.add(mesh);
  }

  resize() {
    this.instance!.setSize(this.sizes.width, this.sizes.height);
  }

  renderPostProcessing() {
    // render the entire scene, then render bloom scene on top
    this.instance!.render();
  }

  update() {
    this.renderPostProcessing();
  }
}

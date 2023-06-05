import { Experience } from "../Experience";
import {
  CylinderGeometry,
  DirectionalLight,
  HemisphereLight, Mesh, MeshBasicMaterial, PointLight, PointLightHelper,
  Scene,
  SpotLight,
  SpotLightHelper,
} from "three";
import Debug from "../utils/Debug";
import { GUI } from "lil-gui";

export default class Light {
  public experience: Experience;
  public scene: Scene;

  public sunLight?: DirectionalLight;
  public spotLight?: SpotLight;
  public pointLight?: PointLight;
  public spotLightHelper?: SpotLightHelper;
  public pointLightHelper?: PointLightHelper;
  public hemisphereLight?: HemisphereLight;
  public debug: Debug;
  public debugFolder: GUI | null;

  constructor() {
    this.experience = Experience.getInstance();
    this.scene = this.experience.scene;

    this.debug = this.experience.debug;
    this.debugFolder = this.addDebugFolder();

    this.loadLightIsland();
  }

  addDebugFolder(): GUI | null {
    if (this.debug.active) {
      return this.debug.ui!.addFolder("Light").close();
    }
    return null;
  }

  loadLightIsland(): void {
    this.sunLight = new DirectionalLight(0xf4e8bc, 5.3);

    this.sunLight.intensity = 86.9;
    this.sunLight!.castShadow = true;
    this.sunLight!.shadow.mapSize.set(1024 * 4, 1024 * 4);
    this.sunLight!.shadow.normalBias = -0.0001;
    this.sunLight!.position.set(7, 13, 1);

    // increase shadow surface
    this.sunLight.shadow.camera.top = 100;
    this.sunLight.shadow.camera.bottom = -100;
    this.sunLight.shadow.camera.left = -100;
    this.sunLight.shadow.camera.right = 100;

    // this.sunLight.color.setHSL(0.1, 1, 0.95);
    // this.sunLight.position.multiplyScalar(30);
    this.scene.add(this.sunLight);

    this.hemisphereLight = new HemisphereLight(0xadaff0, 0xcdf0ca, 6);
    // this.hemisphereLight.castShadow = true;
    this.scene.add(this.hemisphereLight);

    // Debug
    if (this.debug.active) {
      const lightFolder: GUI = this.debugFolder!.addFolder("Light");
      lightFolder!
        .add(this.sunLight!, "intensity")
        .name("sunLightIntensity")
        .min(0)
        .max(100)
        .step(0.1);

      lightFolder
        .add(this.sunLight!.position, "x")
        .name("sunLightX")
        .min(-5)
        .max(100)
        .step(1);

      lightFolder
        .add(this.sunLight!.position, "y")
        .name("sunLightY")
        .min(-5)
        .max(100)
        .step(1);

      lightFolder
        .add(this.sunLight!.position, "z")
        .name("sunLightZ")
        .min(-5)
        .max(5)
        .step(1);

      lightFolder
        .add(this.hemisphereLight!, "intensity")
        .name("hemisphereLightIntensity")
        .min(0)
        .max(10)
        .step(0.1);

      lightFolder.addColor(this.sunLight!, "color");
    }
  }


  loadLightCartomancie(): void {
    this.createSpotLightCartomancie()
    this.pointPointLightCartomancie()
  }

  private createSpotLightCartomancie() {
    this.spotLight = new SpotLight(0xffffff, 7, 100, Math.PI * 0.1, 0.25, 1);

    this.spotLight.shadow.camera.near = 500;
    this.spotLight.shadow.camera.far = 4000;
    this.spotLight.shadow.camera.fov = 30;

    this.spotLight!.shadow.mapSize.set(1024 * 4, 1024 * 4);
    this.spotLight!.shadow.normalBias = -0.0001;

    this.spotLight!.position.set(24, 26, 13);
    // this.sunLight.color.setHSL(0.1, 1, 0.95);
    // this.sunLight.position.multiplyScalar(30);

    this.scene.add(this.spotLight);

    this.spotLightHelper = new SpotLightHelper(this.spotLight, 1);
    this.scene.add(this.spotLightHelper);

    const mesh = new Mesh(
        new CylinderGeometry(2, 2, 10, 32),
        new MeshBasicMaterial({ transparent: true, opacity: 0 })
    );
    mesh.position.set(-19, 0, -6);
    this.scene.add(mesh);

    this.spotLight!.target = mesh;

    // Debug
    if (this.debug.active) {
      const lightFolder: GUI = this.debugFolder!.addFolder("PointLight");
      lightFolder!
          .add(this.spotLight!, "intensity")
          .name("spotLightIntensity")
          .min(0)
          .max(100)
          .step(0.1);

      lightFolder
          .add(this.spotLight!, "distance")
          .name("distance")
          .min(-100)
          .max(100)
          .step(1);

      lightFolder
          .add(this.spotLight!, "penumbra")
          .name("penumbra")
          .min(-100)
          .max(100)
          .step(1);

      lightFolder
          .add(this.spotLight!.position, "x")
          .name("spotLightX")
          .min(-100)
          .max(100)
          .step(1);
      lightFolder
          .add(this.spotLight!.position, "y")
          .name("spotLightY")
          .min(-100)
          .max(100)
          .step(1);

      lightFolder
          .add(this.spotLight!.position, "z")
          .name("spotLightZ")
          .min(-100)
          .max(100)
          .step(1);

      lightFolder
          .add(this.spotLight!, "angle")
          .name("angle")
          .min(-10)
          .max(10)
          .step(Math.PI * 0.1);

      lightFolder.addColor(this.spotLight!, "color");
    }
  }
  private pointPointLightCartomancie() {
    this.pointLight = new PointLight( 0x4300fa, 4, 100 );
    this.pointLight.position.set( 4, 2, -3 );
    this.scene.add( this.pointLight );

    this.pointLightHelper = new PointLightHelper( this.pointLight, 1 );
    this.scene.add( this.pointLightHelper );

    if (this.debug.active) {
      const lightFolder: GUI = this.debugFolder!.addFolder("PointLight");
      lightFolder!
          .add(this.pointLight!, "intensity")
          .name("spotLightIntensity")
          .min(0)
          .max(100)
          .step(0.1);

      lightFolder
          .add(this.pointLight!, "distance")
          .name("distance")
          .min(-100)
          .max(100)
          .step(1);


      lightFolder
          .add(this.pointLight!.position, "x")
          .name("spotLightX")
          .min(-100)
          .max(100)
          .step(1);
      lightFolder
          .add(this.pointLight!.position, "y")
          .name("spotLightY")
          .min(-100)
          .max(100)
          .step(1);

      lightFolder
          .add(this.pointLight!.position, "z")
          .name("spotLightZ")
          .min(-100)
          .max(100)
          .step(1);



      lightFolder.addColor(this.pointLight!, "color");
    }
  }

  public destroyLightCartomancie() {
    this.spotLight?.dispose();
    this.pointLight?.dispose();

    this.spotLightHelper?.dispose();
    this.pointLightHelper?.dispose();

    this.scene.remove(this.spotLight!, this.pointLight!, this.spotLightHelper!, this.pointLightHelper!)
  }
  destroy() {
    this.sunLight?.dispose();
    this.spotLight?.dispose();
    this.pointLight?.dispose();
  }
}

import "./style.css";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import {
  AmbientLight,
  Clock,
  PerspectiveCamera,
  Scene,
  Vector3,
  WebGLRenderer,
} from "three";
import { Fbx, Gltf, loadFbx, loadGlb } from "./utils/utils";

/**
 *
 * Define all constantes and variables
 *
 */

const clock: Clock = new Clock();

const scene: Scene = new Scene();
const camera: PerspectiveCamera = new PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer: WebGLRenderer = new WebGLRenderer({
  antialias: true, //  todo invert for performance
  // powerPreference: "high-performance", todo reactivate for performance
});
const controls: OrbitControls = new OrbitControls(camera, renderer.domElement);
const light: AmbientLight = new AmbientLight(0xfff); // soft white light

let glbPromises: Gltf[] = [
  {
    path: "glb/robot.glb",
    position: new Vector3(0, 0, -2),
    scene: scene,
    animation: false,
    mixer: null,
    animationAction: null,
  },
  {
    path: "glb/robot2.gltf",
    position: new Vector3(0, 0, -4),
    scene: scene,
    animation: false,
    mixer: null,
    animationAction: null,
  },
  {
    path: "glb/robot2.glb",
    position: new Vector3(0, 0, 2),
    scene: scene,
    animation: false,
    mixer: null,
    animationAction: null,
  },
];

let fbxPromises: Fbx[] = [
  {
    path: "fbx/abeille/beev2.fbx",
    position: new Vector3(0, 0, 0),
    scene: scene,
    animation: true,
    mixer: null,
    animationAction: null,
  },
  {
    path: "fbx/baleine/baleine-animation.fbx",
    position: new Vector3(0, 0, 2),
    scene: scene,
    animation: true,
    mixer: null,
    animationAction: null,
  },
  {
    path: "fbx/cygne/cygne-fbx.fbx",
    position: new Vector3(0, 0, 10),
    scene: scene,
    animation: true,
    mixer: null,
    animationAction: null,
  },
];

let bee: Fbx | undefined;
let whale: Fbx | undefined;
let swan: Fbx | undefined;

let robot1: Gltf | undefined;
let robot2: Gltf | undefined;
let robot3: Gltf | undefined;

/**
 *
 * End of constantes and variables definition
 *
 */

function init(): void {
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  window.addEventListener("resize", onWindowResize, false);

  /*
   * Load all fbxs
   */
  loadFbx(fbxPromises).then((e: Fbx[]): void => {
    console.log("chargement des fbxs terminé");

    bee = e[0];
    bee.animationAction?.play();

    whale = e[1];
    console.log(whale);
    // whale.animationAction?.play();

    swan = e[2];
    console.log(swan);
    // swan.animationAction?.play();
  });

  /*
   * Load all glbs
   */
  loadGlb(glbPromises).then((e: Gltf[]): void => {
    robot1 = e[0];
    console.log(robot1);

    robot2 = e[1];
    console.log(robot2);

    robot3 = e[2];
    console.log(robot3);
    // robot.animationAction?.play();
    console.log("chargement des glbs terminé");
  });

  scene.add(light);
  light.position.set(0, 12, 1);
  camera.position.z = 5;
}

function onWindowResize(): void {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  render();
}

function render(): void {
  renderer.render(scene, camera);
}

function animate(): void {
  bee?.mixer?.update(clock.getDelta());
  // whale?.mixer?.update(clock.getDelta());
  // swan?.mixer?.update(clock.getDelta());

  // robot?.mixer?.update(clock.getDelta());

  controls.update();
  render();
  requestAnimationFrame(animate);
}

init();
animate();

import "./style.css";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import {
  AmbientLight,
  Clock,
  Group,
  PerspectiveCamera,
  Scene,
  Vector3,
  WebGLRenderer,
} from "three";
import { Fbx, Gltf, loadFbx, loadGlbAsync } from "./utils/utils";

/**
 *
 * Define all constantes and variables
 *
 */

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
    rotation: new Vector3(0, 0, 0),
  },
  {
    path: "glb/robot2.gltf",
    position: new Vector3(0, 0, -4),
    rotation: new Vector3(0, 0, 0),
  },
  {
    path: "glb/robot2.glb",
    position: new Vector3(0, 0, 2),
    rotation: new Vector3(0, 0, 0),
  },
  {
    path: "glb/just-robot.gltf",
    position: new Vector3(0, 0, 1),
    rotation: new Vector3(0, 0, 0),
  },
];

let fbxPromises: Fbx[] = [
  {
    path: "fbx/abeille/beev2.fbx",
    position: new Vector3(0, 2, 0),
    rotation: new Vector3(0, 0, 0),
    animation: true,
    clock: new Clock(),
    mixer: undefined,
    loadedFbx: undefined,
    animationAction: undefined,
  },
  {
    path: "fbx/baleine/baleine-animation.fbx",
    position: new Vector3(0, 0, 2),
    rotation: new Vector3(0, 0, 0),
    animation: true,
    clock: new Clock(),
    mixer: undefined,
    loadedFbx: undefined,
    animationAction: undefined,
  },
  {
    path: "fbx/cygne/cygne-fbx.fbx",
    position: new Vector3(0, 0, 10),
    rotation: new Vector3(0, 0, 0),
    animation: true,
    clock: new Clock(),
    mixer: undefined,
    loadedFbx: undefined,
    animationAction: undefined,
  },
];

let bee: Fbx | undefined;
let whale: Fbx | undefined;
let swan: Fbx | undefined;

let robot1: Group | undefined;
let robot2: Group | undefined;
let robot3: Group | undefined;
let robot4: Group | undefined;

/**
 *
 * End of constantes and variables definition
 *
 */

async function init(): Promise<void> {
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  window.addEventListener("resize", onWindowResize, false);

  /*
   * Load all fbxs
   */
  let all: Fbx[] = await loadFbx(fbxPromises, scene);

  bee = all[0];
  whale = all[1];
  swan = all[2];

  if (bee.animationAction) {
    bee.animationAction[1].play();
  } else {
    console.log("no animation : ", bee);
  }

  if (whale.animationAction) {
    whale.animationAction[0].play();
  } else {
    console.log("no animation : ", whale);
  }

  if (swan.animationAction) {
    swan.animationAction[1].play();
  } else {
    console.log("no animation : ", swan);
  }

  /*
   * Load all glbs
   */
  loadGlbAsync(glbPromises, scene).then((e: Group[]): void => {
    robot1 = e[0];
    console.log(robot1);

    robot2 = e[1];
    console.log(robot2);

    robot3 = e[2];
    console.log(robot3);

    robot4 = e[3];
    console.log(robot4);

    // robot.animationAction?.play();
    console.log("chargement des glbs terminé");
  });

  // await loadGlbSecond(glbPromises, scene);

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
  if (whale && whale.loadedFbx) {
    whale.mixer?.update(whale.clock.getDelta());
    // whale.loadedFbx.rotation.y += 0.01;
  }

  if (bee && bee.loadedFbx) {
    bee.mixer?.update(bee.clock.getDelta());
    bee.loadedFbx.rotation.y += 0.01;
  } else {
    console.log("no bee");
  }

  if (swan && swan.loadedFbx) {
    swan.mixer?.update(swan.clock.getDelta());
  } else {
    console.log("no swan");
  }

  if (robot1 && robot2 && robot3 && robot4) {
    robot1.rotation.x += 0.1;
    robot1.rotation.y += 0.1;
    robot1.rotation.z += 0.1;

    robot2.rotation.x -= 0.1;
    robot2.rotation.y -= 0.1;
    robot2.rotation.z -= 0.1;

    robot3.rotation.x += 0.2;
    robot3.rotation.y += 0.1;
    robot3.rotation.z += 0.2;

    robot4.rotation.x -= 0.1;
    robot4.rotation.y -= 0.3;
    robot4.rotation.z -= 0.1;
  }

  controls.update();
  render();
  requestAnimationFrame(animate);
}

init().then((): void => {
  animate();
});

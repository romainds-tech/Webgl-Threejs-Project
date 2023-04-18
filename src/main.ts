import "./style.css";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import {
  BoxGeometry,
  Clock,
  Color,
  DoubleSide,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  PointLight,
  Scene,
  WebGLRenderer,
} from "three";
import {
  createMaterialFromArrayImages,
  Fbx,
  Gltf,
  loadFbx,
  loadGlbAsync,
} from "./utils/utils";
import { fbxPromises } from "./fbx/fbx";
import { glbPromises } from "./glb/glb";

/**
 *
 * Define all constantes and variables
 *
 */

const scene: Scene = new Scene();
scene.background = new Color("grey");
const camera: PerspectiveCamera = new PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer: WebGLRenderer = new WebGLRenderer({
  antialias: true, //  todo invert for performance
  // powerPreference: "high-performance", // todo reactivate for performance
});
const controls: OrbitControls = new OrbitControls(camera, renderer.domElement);
const light: PointLight = new PointLight("white", 20, 100); // soft white light

let bee: Fbx | undefined;
let whale: Fbx | undefined;
let swan: Fbx | undefined;

let robot1: Gltf | undefined;
let robot2: Gltf | undefined;
let robot3: Gltf | undefined;
let robot4: Gltf | undefined;
let lattive: Gltf | undefined;

const clock = new Clock();
const PERIOD = 0.75;

const images = [
  "animations/tornado/Calque_0000.png",
  "animations/tornado/Calque_0001.png",
  "animations/tornado/Calque_0002.png",
  "animations/tornado/Calque_0003.png",
  "animations/tornado/Calque_0004.png",
  "animations/tornado/Calque_0005.png",
  "animations/tornado/Calque_0006.png",
  "animations/tornado/Calque_0007.png",
  "animations/tornado/Calque_0008.png",
  "animations/tornado/Calque_0009.png",
  "animations/tornado/Calque_0010.png",
  "animations/tornado/Calque_0011.png",
  "animations/tornado/Calque_0012.png",
  "animations/tornado/Calque_0013.png",
  "animations/tornado/Calque_0014.png",
  "animations/tornado/Calque_0015.png",
  "animations/tornado/Calque_0016.png",
  "animations/tornado/Calque_0017.png",
  "animations/tornado/Calque_0018.png",
  "animations/tornado/Calque_0019.png",
];

const textures = createMaterialFromArrayImages(images);
const texturesLength = textures.length;

const geometry = new BoxGeometry(5, 5, 5);
const plane = new Mesh(
  geometry,
  new MeshBasicMaterial({
    map: textures[4],
    side: DoubleSide,
    transparent: true,
  })
);

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
    bee.animationAction[0].play();
  } else {
    console.log("no animation : ", bee);
  }

  if (whale.animationAction) {
    whale.animationAction[0].play();
  } else {
    console.log("no animation : ", whale);
  }

  if (swan.animationAction) {
    swan.animationAction[0].play();
  } else {
    console.log("no animation : ", swan);
  }

  /*
   * Load all glbs
   */
  loadGlbAsync(glbPromises, scene).then((e: Gltf[]): void => {
    robot1 = e[0];
    console.log(robot1);

    robot2 = e[1];
    console.log(robot2);

    robot3 = e[2];
    console.log(robot3);

    robot4 = e[3];
    console.log(robot4);

    lattive = e[4];
    if (lattive.animationAction) {
      lattive.animationAction[0].play();
    }

    console.log("chargement des glbs terminé");
  });

  // await loadGlbSecond(glbPromises, scene);

  scene.add(plane);
  plane.rotation.y = Math.PI;

  scene.add(light);
  light.position.set(0, 20, 0);
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
  const elapsedTime = clock.getElapsedTime();

  if (whale && whale.loadedFbx) {
    whale.mixer?.update(whale.clock.getDelta() * 4);
    // whale.loadedFbx.rotation.y += 0.01;
  }

  if (bee && bee.loadedFbx) {
    bee.mixer?.update(bee.clock.getDelta() * 2);

    let now = Date.now();

    //add sinus movement
    bee.loadedFbx.position.y = camera.position.y + Math.cos(now / 200);
    bee.loadedFbx.position.z = camera.position.z + Math.sin(now / 200);
  } else {
    console.log("no bee");
  }

  if (swan && swan.loadedFbx) {
    swan.mixer?.update(swan.clock.getDelta() * 4);
    // swan.loadedFbx.lookAt(camera.position);
  } else {
    console.log("no swan");
  }

  if (
    robot1?.loadedGltf &&
    robot2?.loadedGltf &&
    robot3?.loadedGltf &&
    robot4?.loadedGltf && // robot
    lattive?.loadedGltf
  ) {
    // make robot1 position varying with sinus
    robot1.loadedGltf.position.y = Math.cos(Date.now() / 100);
    robot1.loadedGltf.lookAt(camera.position);

    robot2.loadedGltf.rotation.x += 0.1;
    robot2.loadedGltf.rotation.y += 0.1;

    robot3.loadedGltf.rotation.x += 0.1;
    robot3.loadedGltf.rotation.y += 0.1;

    robot4.loadedGltf.rotation.x -= 0.1;
    robot4.loadedGltf.rotation.y -= 0.3;

    lattive.mixer?.update(lattive.clock.getDelta());
  }

  // plane.rotation.y -= 0.02;
  // value between 0 and textures.length with elapsed time and Period
  const index =
    Math.floor((elapsedTime / PERIOD) * texturesLength) % texturesLength;
  plane.material.map = textures[index];

  plane.lookAt(camera.position);

  controls.update();
  render();
  requestAnimationFrame(animate);
}

init().then((): void => {
  animate();
});

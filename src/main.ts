import "./style.css";
import "./Experience/UI/Popups/popup.css";
import "./Experience/UI/Buttons/button.css";
import "./Experience/UI/Inputs/input.css";
import "./Experience/UI/Overlays/overlay.css";
import { Experience } from "./Experience/Experience";

// const experience =
Experience.getInstance();

/*
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

let bee: IModel3D | undefined;
let whale: IModel3D | undefined;
let swan: IModel3D | undefined;

let robot1: IModel3D | undefined;
let robot2: IModel3D | undefined;
let robot3: IModel3D | undefined;
let robot4: IModel3D | undefined;
let lattive: IModel3D | undefined;

const clock = new Clock();
const PERIOD = 1;
const textures = createMaterialFromArrayImages(griffes);
const texturesLength = textures.length;

const geometry = new SphereGeometry(5, 32, 32);

const plane = new Mesh(
    geometry,
    new MeshBasicMaterial({
      map: textures[4],
      side: DoubleSide,
      transparent: true,
    })
);

async function init(): Promise<void> {
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  window.addEventListener("resize", onWindowResize, false);


  let all: IModel3D[] = await loadFbx(fbxPromises, scene);

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

  loadGlbAsync(glbPromises, scene).then((e: IModel3D[]): void => {
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

  if (whale && whale.loadedModel3D) {
    whale.mixer?.update(whale.clock.getDelta() * 4);
    // whale.loadedFbx.rotation.y += 0.01;
  }

  if (bee && bee.loadedModel3D) {
    bee.mixer?.update(bee.clock.getDelta() * 2);

    let now = Date.now();

    //add sinus movement
    bee.loadedModel3D.position.y = camera.position.y + Math.cos(now / 200);
    bee.loadedModel3D.position.z = camera.position.z + Math.sin(now / 200);
  } else {
    console.log("no bee");
  }

  if (swan && swan.loadedModel3D) {
    swan.mixer?.update(swan.clock.getDelta() * 4);
    // swan.loadedFbx.lookAt(camera.position);
  } else {
    console.log("no swan");
  }

  if (
      robot1?.loadedModel3D &&
      robot2?.loadedModel3D &&
      robot3?.loadedModel3D &&
      robot4?.loadedModel3D && // robot
      lattive?.loadedModel3D
  ) {
    // make robot1 position varying with sinus
    robot1.loadedModel3D.position.y = Math.cos(Date.now() / 100);
    robot1.loadedModel3D.lookAt(camera.position);

    robot2.loadedModel3D.rotation.x += 0.1;
    robot2.loadedModel3D.rotation.y += 0.1;

    robot3.loadedModel3D.rotation.x += 0.1;
    robot3.loadedModel3D.rotation.y += 0.1;

    robot4.loadedModel3D.rotation.x -= 0.1;
    robot4.loadedModel3D.rotation.y -= 0.3;

    lattive.mixer?.update(lattive.clock.getDelta());
  }

  // plane.rotation.y -= 0.02;
  // value between 0 and textures.length with elapsed time and Period
  const index =
      Math.floor((elapsedTime / PERIOD) * texturesLength) % texturesLength;
  plane.material.map = textures[index];

  // plane.lookAt(camera.position);

  controls.update();
  render();
  requestAnimationFrame(animate);
}

init().then((): void => {
  animate();
});

 */

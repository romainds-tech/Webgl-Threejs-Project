import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const scene: THREE.Scene = new THREE.Scene();
const camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer({
  antialias: true, //  todo invert for performance
  // powerPreference: "high-performance", todo reactivate for performance
});
const geometry: THREE.BoxGeometry = new THREE.BoxGeometry(1, 1, 1);
const material: THREE.MeshLambertMaterial = new THREE.MeshLambertMaterial({
  color: 0x9080ff,
});
const cube: THREE.Mesh<THREE.BoxGeometry, THREE.Material> = new THREE.Mesh(
  geometry,
  material
);
const controls = new OrbitControls(camera, renderer.domElement);
const light: THREE.AmbientLight = new THREE.AmbientLight(0xffffff, 0.5);

function init(): void {
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  window.addEventListener("resize", onWindowResize, false);

  scene.add(cube);
  scene.add(light);
  light.position.set(0, 3, 1);
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
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  cube.rotation.z += 0.01;

  controls.update();
  render();
  requestAnimationFrame(animate);
}

init();
animate();

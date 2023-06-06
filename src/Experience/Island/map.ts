// ATTENTION - For this game, map width and length will be the same !

import {
  BoxGeometry,
  DoubleSide,
  Group,
  Mesh,
  MeshLambertMaterial,
  Object3D,
  PlaneGeometry,
} from "three";
import { Scene } from "three";

// main map of island
export var mapPayIslandData = {
  data: [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ],
};

// new island add if user paid for more space
export var mapMainIslandData = {
  data: [
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
  ],
};

// return a group three js containing the map (object and edit mode)
// add the map in the scene and get all the objects in the scene
// mapdata : get the matrix for create map
// scene : enabled to add the intirer map in the scene
// clickableObject : Get all the object in the scene
export function loadMap(
  mapdata: { data: number[][] },
  scene: Scene,
  allObjectsCreateInMap: Array<Object3D>
) {
  let sizeY: number = mapdata.data.length;
  let sizeX: number = mapdata.data[0].length;

  const planeGeometry = new PlaneGeometry(0.8, 0.8);
  const planeMaterial = new MeshLambertMaterial({
    color: 0xff00ff,
    side: DoubleSide,
    transparent: true,
    opacity: 1,
  });
  const planeOtherMaterial = new MeshLambertMaterial({
    color: 0xffffff,
    visible: false,
    transparent: true,
    opacity: 0,
  });

  const plane = new Mesh(planeGeometry, planeMaterial);
  const otherPlane = new Mesh(new BoxGeometry(0.8, 0.8, 3), planeOtherMaterial);

  let map: Group = new Group();
  let editMode: Group = new Group();
  let allObjectInMap: Group = new Group();

  // the map is created with a matrix containing numbers corresponding to different objects
  for (let x = 0; x < sizeX; x++) {
    for (let y = 0; y < sizeY; y++) {
      const distance = 1;
      let posx = x * distance - sizeX / 2 + distance / 2; // position x
      let posy = y * distance - sizeY / 2 + distance / 2; // position y (it's the Z axis)

      // display a different object in function of the number in the matrix
      switch (mapdata.data[y][x]) {
        case 0:
          let templatePlane = plane.clone();

          templatePlane.position.set(posx, 0, posy);
          templatePlane.rotation.x = Math.PI / 2;

          templatePlane.name = "edit";
          allObjectsCreateInMap.push(templatePlane);
          map.add(templatePlane);
          editMode.add(templatePlane);

          break;
        case 1:
          let templateOtherPlane = otherPlane.clone();
          templateOtherPlane.position.set(posx, 0, posy);
          templateOtherPlane.rotation.x = Math.PI / 2;
          // scene.add(templateOtherPlane);
          templateOtherPlane.name = "cartomancie";
          allObjectsCreateInMap.push(templateOtherPlane);
          map.add(templateOtherPlane);
          break;
      }
    }
  }
  editMode.name = "editMode";
  allObjectInMap.add(map);
  allObjectInMap.add(editMode);
  console.log(editMode.position);
  scene.add(allObjectInMap);
  return allObjectInMap;
}

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
export var mapMainIslandData = {
  data: [
    [0, 0, 0],
    [0, 1, 0],
    [0, 0, 0],
  ],
};

// new island add if user paid for more space
export var mapPayIslandData = {
  data: [
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
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

  const planeGeometry = new PlaneGeometry(1.5, 1.5);
  const planeMaterial = new MeshLambertMaterial({
    color: 0xff00ff,
    side: DoubleSide,
    transparent: true,
    opacity: 1,
  });
  const planeOtherMaterial = new MeshLambertMaterial({
    color: 0xffffff,
    side: DoubleSide,
    transparent: true,
    opacity: 1,
  });

  const plane = new Mesh(planeGeometry, planeMaterial);
  const otherPlane = new Mesh(planeGeometry, planeOtherMaterial);

  let map: Group = new Group();
  let editMode: Group = new Group();
  let allObjectInMal: Group = new Group();

  // the map is created with a matrix containing numbers corresponding to different objects
  for (let x = 0; x < sizeX; x++) {
    for (let y = 0; y < sizeY; y++) {
      let posx = x * 2 - (sizeX / 2) * 2; // position x
      let posy = y * 2 - (sizeY / 2) * 2; // position y (it's the Z axis)

      // display a different object in function of the number in the matrix
      switch (mapdata.data[y][x]) {
        case 0:
          let templatePlane = plane.clone();

          templatePlane.position.set(posx, 0, posy);
          templatePlane.rotation.x = Math.PI / 2;

          templatePlane.name = "gray";
          allObjectsCreateInMap.push(templatePlane);
          map.add(templatePlane);
          editMode.add(templatePlane);

          break;
        case 1:
          let templateOtherPlane = otherPlane.clone();
          templateOtherPlane.position.set(posx, 0.2, posy);
          templateOtherPlane.rotation.x = Math.PI / 2;
          // scene.add(templateOtherPlane);
          templateOtherPlane.name = "blue";
          allObjectsCreateInMap.push(templateOtherPlane);
          map.add(templateOtherPlane);
          break;
      }
    }
  }
  editMode.name = "editMode";
  allObjectInMal.add(map);
  allObjectInMal.add(editMode);
  scene.add(allObjectInMal);
  return allObjectInMal;
}

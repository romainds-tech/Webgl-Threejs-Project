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

export var mapMainIslandData = {
  data: [
    [0, 0, 0],
    [0, 1, 0],
    [0, 0, 0],
  ],
};

export var mapPayIslandData = {
  data: [
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
  ],
};

// create a map in function of the number in a matrix
// mapdata : get the matrix for create map
// scene : enabled to add the intirer map in the scene
// clickableObject : Get all the object in the scene
export function loadMap(
  mapdata: { data: number[][] },
  scene: Scene,
  allObjectsCreateInMap: Array<Object3D>
) {
  console.log(mapdata);
  let size_Y: number = mapdata.data.length;
  let size_X: number = mapdata.data[0].length;

  const geometry = new BoxGeometry(2, 2, 2);
  const material = new MeshLambertMaterial({});

  const planeGeometry = new PlaneGeometry(1.5, 1.5);
  const planeMaterial = new MeshLambertMaterial({
    color: 0xff00ff,
    side: DoubleSide,
    transparent: true,
    opacity: 1,
  });

  const plane = new Mesh(planeGeometry, planeMaterial);
  let basicCube = new Mesh(geometry, material);

  const otherMaterial = new MeshLambertMaterial({ color: 0x2c3e50 });
  let otherCube = new Mesh(geometry, otherMaterial);

  let map: Group = new Group();
  let wireframe: Group = new Group();
  let all: Group = new Group();

  for (let x = 0; x < size_X; x++) {
    for (let y = 0; y < size_Y; y++) {
      let posx = x * 2 - (size_X / 2) * 2; // position x
      let posy = y * 2 - (size_Y / 2) * 2; // position y (it's the Z axis)

      // display a different object in function of the number in the matrix
      switch (mapdata.data[y][x]) {
        case 0:
          let templateBasicBloc = basicCube.clone();
          let templatePlane = plane.clone();

          templateBasicBloc.position.set(posx, 0, posy);

          templatePlane.position.set(
            posx,
            templateBasicBloc.geometry.parameters.height / 2 + 0.01,
            posy
          );
          templatePlane.rotation.x = Math.PI / 2;

          templateBasicBloc.name = "gris";
          allObjectsCreateInMap.push(templateBasicBloc);
          map.add(templateBasicBloc);
          wireframe.add(templatePlane);

          break;
        case 1:
          let templateOtherBloc = otherCube.clone();
          templateOtherBloc.position.set(posx, 0.2, posy);
          // scene.add(templateOtherBloc);
          templateOtherBloc.name = "blue";
          allObjectsCreateInMap.push(templateOtherBloc);
          map.add(templateOtherBloc);
          break;
      }
    }
  }
  wireframe.name = "wireframe";
  all.add(map);
  all.add(wireframe);
  scene.add(all);
  return all;
}

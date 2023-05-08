// ATTENTION - For this game, map width and length will be the same !

import {BoxGeometry, Group, Mesh, MeshLambertMaterial, Object3D} from "three";
import {Scene} from "three";

export var mapMainIslandData = {
    "data" : [
        [0, 0, 0],
        [0, 1, 0],
        [0, 0, 0],
    ]
};

export var mapPayIslandData = {
    "data" : [
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
    ]
};

// permet de créer plusieurs type de cube en fonction du chiffre passer dans la map
export function loadMap(mapdata: {data: number[][]}, scene: Scene, clickableObject: Array<Object3D>)
{
    console.log(mapdata)
    let size_Y: number = mapdata.data.length;
    let size_X: number = mapdata.data[0].length;

    const geometry = new BoxGeometry( 2, 2, 2 );
    const material = new MeshLambertMaterial({ });

    let basicCube = new Mesh( geometry, material );

    const otherMaterial = new MeshLambertMaterial({ color : 0x2c3e50});
    let otherCube = new Mesh( geometry, otherMaterial );

    let map: Group = new Group()
    for(let x = 0 ; x < size_X ; x++)
    {
        for(let y = 0 ; y < size_Y ; y++) {

            let posx = (x*2) - (size_X/2)*2; // position x
            let posy = (y*2) - (size_Y/2)*2; // position y (it's the Z axis)

            switch (mapdata.data[y][x]) {
                case 0:
                    let templateBasicBloc = basicCube.clone();
                    templateBasicBloc.position.set(posx, 0, posy);
                    // scene.add(templateBasicBloc);
                    clickableObject.push(templateBasicBloc)
                    map.add(templateBasicBloc)
                break;
                case 1:
                    let templateOtherBloc = otherCube.clone();
                    templateOtherBloc.position.set(posx, 0.2, posy);
                    // scene.add(templateOtherBloc);
                    map.add(templateOtherBloc)
                break;
            }
        }

    }
    scene.add(map)
    return map
    console.log(map)

}
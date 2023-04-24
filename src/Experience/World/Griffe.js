import * as THREE from 'three'
import Experience from '../Experience.js'
import {DoubleSide, MeshBasicMaterial, SphereGeometry} from "three";

export default class Griffe
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.camera = this.experience.camera
        this.time = this.experience.time
        this.debug = this.experience.debug

        // Debug
        if(this.debug.active)
        {
            this.debugFolder = this.debug.ui.addFolder('griffe')
        }

        // Resource
        this.resource = this.resources.items.griffe
        this.setModel()
    }
    setModel()
    {
        this.texturesLength = this.resource.length;

        // const geometry = new THREE.PlaneGeometry( 2, 2 );
        const geometry = new THREE.SphereGeometry(2);

        this.material = new THREE.MeshBasicMaterial({
            map: this.resource[4], transparent: true,  side: THREE.DoubleSide
        })
        this.plane = new THREE.Mesh(
            geometry,
            this.material
        );
        this.plane.position.set(4, 1, 0)

        this.scene.add(this.plane);
        this.plane.rotation.y = Math.PI;
    }

    update()
    {
        const index =
            Math.floor((this.time.elapsed * 0.001 ) * this.texturesLength) % this.texturesLength;
        this.plane.material.map = this.resource[index];

    }
}
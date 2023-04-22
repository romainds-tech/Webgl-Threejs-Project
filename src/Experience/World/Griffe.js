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
        this.time = this.experience.time
        this.debug = this.experience.debug
        this.clock = new THREE.Clock()

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
        this.textures = this.resource
        this.texturesLength = this.resource.length;

        const geometry = new SphereGeometry(5, 32, 32);
        const material = new THREE.MeshBasicMaterial({
            map: this.textures[12], transparent: true,  side: THREE.DoubleSide
        })
        this.plane = new THREE.Mesh(
            geometry,
            material
        );
        this.plane.position.set(2, 1, 0)

        this.scene.add(this.plane);
        this.plane.rotation.y = Math.PI;
    }

    update()
    {

        const index =
            Math.floor((this.clock.getElapsedTime() / 1) * this.texturesLength) % this.texturesLength;
        this.plane.material.map = this.resource[index];


        //this.plane.

    }
}
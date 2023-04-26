import * as THREE from 'three'
import Experience from './Experience.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

export default class Camera
{
    constructor()
    {
        this.experience = new Experience()
        this.sizes = this.experience.sizes
        this.scene = this.experience.scene
        this.canvas = this.experience.canvas
        this.debug = this.experience.debug
        // Debug
        if(this.debug.active)
        {
            this.debugFolder = this.debug.ui.addFolder('Controls')
        }

        this.setInstance()
        this.setControls()
    }

    setInstance()
    {
        this.instance = new THREE.PerspectiveCamera(90, this.sizes.width / this.sizes.height, 0.1, 100)
        this.instance.position.set(6, 4, 8)
        this.scene.add(this.instance)
    }

    setControls()
    {
        this.controls = new OrbitControls(this.instance, this.canvas)
        this.controls.enableDamping = true

        // Debug
        if(this.debug.active)
        {
            this.orbitControls = this.debugFolder.addFolder('Orbit Controls')
            this.orbitControls.add(this.controls, 'enabled').name("Enabled")
        }
    }

    resize()
    {
        this.instance.aspect = this.sizes.width / this.sizes.height
        this.instance.updateProjectionMatrix()
    }

    update()
    {
        this.controls.update()
    }
}
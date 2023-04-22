import * as THREE from "three"
import Experience from "../Experience.js";

export default class Whale
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.time = this.experience.time
        this.debug = this.experience.debug

        // Debug
        if(this.debug.active)
        {
            this.debugFolder = this.debug.ui.addFolder('whale')
        }

        // Resource
        this.resource = this.resources.items.whale

        this.setModel()
    }

    setModel()
    {
        console.log(this.resource)
        this.model = this.resource
        this.model.scale.set(1, 1, 1)
        this.model.position.set(-1, 0, 0)
        this.scene.add(this.model)

        this.model.traverse((child) =>
        {
            if(child instanceof THREE.Mesh)
            {
                child.castShadow = true
            }
        })
    }

    update()
    {
        //this.animation.mixer.update(this.time.delta * 0.001)
    }
}
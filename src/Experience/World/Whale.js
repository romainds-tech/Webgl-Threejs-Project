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
        this.setAnimation()
    }

    setModel()
    {
        this.model = this.resource
        this.model.scale.set(0.001, 0.001, 0.001)
        this.model.position.set(1, 2, 0)
        this.scene.add(this.model)

        this.model.traverse((child) =>
        {
            if(child instanceof THREE.Mesh)
            {
                child.castShadow = true
            }
        })
    }

    setAnimation()
    {
        this.animation = {}

        // Mixer
        this.animation.mixer = new THREE.AnimationMixer(this.model)

        // Actions
        this.animation.actions = {}

        this.animation.actions.swim = this.animation.mixer.clipAction(this.resource.animations[0])

        this.animation.actions.current = this.animation.actions.swim
        this.animation.actions.current.play()

        // Play the action
        this.animation.play = (name) =>
        {
            const newAction = this.animation.actions[name]
            const oldAction = this.animation.actions.current

            newAction.reset()
            newAction.play()
            newAction.crossFadeFrom(oldAction, 1)

            this.animation.actions.current = newAction
        }

        // Debug
        if(this.debug.active)
        {
            const debugObject = {
                playSwim: () => { this.animation.play('swim') },
            }
            this.debugFolder.add(debugObject, 'playSwim')
        }
    }
    update()
    {
        this.animation.mixer.update(this.time.delta * 0.001)
    }
}
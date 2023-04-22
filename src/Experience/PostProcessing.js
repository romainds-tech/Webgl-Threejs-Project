import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import Experience from "./Experience.js";
import { GlitchPass } from 'three/examples/jsm/postprocessing/GlitchPass.js'
import * as THREE from 'three'


export default class PostProcessing
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.sizes = this.experience.sizes
        this.camera = this.experience.camera
        this.renderer = this.experience.renderer

        this.resources = this.experience.resources
        this.debug = this.experience.debug

        if(this.debug.active)
        {
            this.debugFolder = this.debug.ui.addFolder('Post preocessing')
        }

        this.resources.on("ready", () => {
            this.setEffect()
        })
        this.setInstance()


    }

    setInstance()
    {
        const renderTarget = new THREE.WebGLRenderTarget(
            800,
            600,
            {
                samples: 2
            }
        )

        this.instance = new EffectComposer(this.renderer.instance, renderTarget)
        this.instance.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        this.instance.setSize(this.sizes.width, this.sizes.height)

        // A besoin d'un render pass pour pouvoir cumuler les effets
        const renderPass = new RenderPass(this.scene, this.camera.instance)
        this.instance.addPass(renderPass)
    }

    setEffect() {
        // Glitch pass
        const glitchPass = new GlitchPass()
        glitchPass.goWild = false
        glitchPass.enabled = false
        this.instance.addPass(glitchPass)

        if(this.debug.active)
        {
            this.glitchFolder = this.debugFolder.addFolder('Glitch')
            this.glitchFolder.add(glitchPass, 'enabled').name("Enabled")
            this.glitchFolder.add(glitchPass, 'goWild').name("Go wild")
        }
    }

    resize()
    {
        this.instance.setSize(this.sizes.width, this.sizes.height)
        this.instance.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    }

    update()
    {
        this.instance.render()
    }
}
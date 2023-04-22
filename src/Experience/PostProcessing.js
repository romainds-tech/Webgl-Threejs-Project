import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import Experience from "./Experience.js";
import { GlitchPass } from 'three/examples/jsm/postprocessing/GlitchPass.js'
import * as THREE from 'three'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js'
import { TintShader, DisplacementShader } from "./Shaders/PostProcessingShader.js";


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

        const displacementPass = new ShaderPass(DisplacementShader)
        displacementPass.material.uniforms.uTime.value = 0
        displacementPass.material.uniforms.uNormalMap.value = this.resources.loaders.textureLoader.load('/textures/interfaceNormalMap.png')
        this.instance.addPass(displacementPass)

        const tintPass = new ShaderPass(TintShader)
        tintPass.material.uniforms.uTint.value = new THREE.Vector3()
        this.instance.addPass(tintPass)

        if(this.debug.active)
        {
            this.glitchFolder = this.debugFolder.addFolder('Glitch')
            this.glitchFolder.add(glitchPass, 'enabled').name("Enabled")
            this.glitchFolder.add(glitchPass, 'goWild').name("Go wild")

            this.tintFolder = this.debugFolder.addFolder('Interface')
            this.tintFolder.add(tintPass.material.uniforms.uTint.value, 'x').min(- 1).max(1).step(0.001).name('red')
            this.tintFolder.add(tintPass.material.uniforms.uTint.value, 'y').min(- 1).max(1).step(0.001).name('green')
            this.tintFolder.add(tintPass.material.uniforms.uTint.value, 'y').min(- 1).max(1).step(0.001).name('blue')

            this.interfaceFolder = this.debugFolder.addFolder('Interface')
            this.interfaceFolder.add(displacementPass, 'enabled').name("Enabled")
            this.interfaceFolder.add(displacementPass.material.uniforms.uXColor, 'value').min(- 1).max(1).step(0.01).name('Interior')

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
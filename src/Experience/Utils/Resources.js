import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import EventEmitter from './EventEmitter.js'
import {DRACOLoader} from "three/addons/loaders/DRACOLoader.js";
import { overlayMaterial } from "../Shaders/OverlayShaders.js";
import { gsap } from "gsap";
import Experience from "../Experience.js";
import {FBXLoader} from "three/examples/jsm/loaders/FBXLoader.js";
import {Texture} from "three";

export default class Resources extends EventEmitter
{
    constructor(sources)
    {
        super()

        this.sources = sources

        this.items = {}
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.toLoad = this.sources.length
        this.loaded = 0


        this.setLoaders()
        this.startLoading()
    }

    setLoaders()
    {
        /**
         * Overlay
         */
        const overlayGeometry = new THREE.PlaneGeometry(2, 2, 1, 1)
        const overlay = new THREE.Mesh(overlayGeometry, overlayMaterial)
        this.scene.add(overlay)

        const loadingBarElement = document.querySelector(".loading-bar")
        const loadingManager = new THREE.LoadingManager(
            // Loaded
            () =>
            {
                window.setTimeout(() =>
                {
                    gsap.to(overlayMaterial.uniforms.uAlpha, { duration: 3, value: 0, delay: 1 })

                    loadingBarElement.classList.add('ended')
                    loadingBarElement.style.transform = ''
                }, 500)
            },
            (itemUrl, itemsLoaded, itemsTotal) =>
            {
                const progressRatio = itemsLoaded / itemsTotal
                loadingBarElement.style.transform = `scaleX(${progressRatio})`
            }
        )

        this.loaders = {}
        this.loaders.gltfLoader = new GLTFLoader(loadingManager)
        this.loaders.dracoLoader = new DRACOLoader()
        this.loaders.fbxLoader = new FBXLoader()
        this.loaders.textureLoader = new THREE.TextureLoader()
        this.loaders.imageLoader = new THREE.ImageLoader()
        this.loaders.cubeTextureLoader = new THREE.CubeTextureLoader()
    }

    startLoading()
    {
        // Load each source
        for(const source of this.sources)
        {
            if(source.type === 'gltfModel')
            {
                this.loaders.gltfLoader.load(
                    source.path,
                    (file) =>
                    {
                        this.sourceLoaded(source, file)
                    }
                )
            }
            else if(source.type === 'fbxModel')
            {
                this.loaders.fbxLoader.load(
                    source.path,
                    (file) =>
                    {
                        this.sourceLoaded(source, file)
                    }
                )
            }
            else if(source.type === 'imageModel')
            {
                const images = source.path.map((image) => {
                    const texture = new Texture();
                    this.loaders.imageLoader.load(image, (image) => {
                        texture.image = image;
                        texture.needsUpdate = true;
                    });
                    return texture;
                });
                this.sourceLoaded(source, images)
            }
            else if(source.type === 'dracoModel')
            {
                this.loaders.dracoLoader.setDecoderPath("/draco/gltf/")
                this.loaders.dracoLoader.preload()
                this.loaders.gltfLoader.setDRACOLoader(this.loaders.dracoLoader)
                this.loaders.gltfLoader.load(
                    source.path,
                    (file) =>
                    {
                        this.sourceLoaded(source, file)
                    }
                )
            }
            else if(source.type === 'texture')
            {
                this.loaders.textureLoader.load(
                    source.path,
                    (file) =>
                    {
                        this.sourceLoaded(source, file)
                    }
                )
            }
            else if(source.type === 'cubeTexture')
            {
                this.loaders.cubeTextureLoader.load(
                    source.path,
                    (file) =>
                    {
                        this.sourceLoaded(source, file)
                    }
                )
            }
        }
    }

    sourceLoaded(source, file)
    {
        this.items[source.name] = file

        this.loaded++

        if(this.loaded === this.toLoad)
        {
            this.trigger('ready')
        }
    }
}
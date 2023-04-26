import * as THREE from 'three'

export const overlayMaterial = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    uniforms:
        {
            uAlpha: { value: 1 }
        },
    vertexShader: `
        void main()
        {
            gl_Position = vec4(position, 1.0);
        }
    `,
    fragmentShader: `
        uniform float uAlpha;
        
        void main()
        {
            gl_FragColor = vec4(0.0, 0.0, 0.0, uAlpha);
        }
    `
})
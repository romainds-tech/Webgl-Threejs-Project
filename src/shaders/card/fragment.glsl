
//// Précise à quel point un float peut être précis (3 valeur, highp, mediump, lowp)
//precision mediump float;

uniform vec3 uColor;

void main()
{
    gl_FragColor = vec4(uColor, 1.0);
}
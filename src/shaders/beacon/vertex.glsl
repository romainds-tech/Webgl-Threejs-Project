// Created with NodeToy | Three.js r149

// <node_builder>

// uniforms
uniform float _time; uniform float Speed; uniform float Scale; uniform float Intensity;
// attributes

// varys
varying vec2 nodeVary0;
// vars
float nodeVar0; float nodeVar1; float nodeVar2; float nodeVar3; vec2 nodeVar4; vec2 nodeVar5; float nodeVar6; float nodeVar7; vec2 nodeVar8; vec2 nodeVar9; float nodeVar10; float nodeVar11; float nodeVar12; float nodeVar13; float nodeVar14; vec3 nodeVar15; vec3 nodeVar16;
// codes
vec3 mod2D289_SDnCrYCH1rJp ( vec3 x ) { return x - floor( x * ( 1.0 / 289.0 ) ) * 289.0; }

vec2 mod2D289_SDnCrYCH1rJp( vec2 x ) { return x - floor( x * ( 1.0 / 289.0 ) ) * 289.0; }

vec3 permute_SDnCrYCH1rJp( vec3 x ) { return mod2D289_SDnCrYCH1rJp( ( ( x * 34.0 ) + 1.0 ) * x ); }

float snoise_SDnCrYCH1rJp( vec2 v ){
    const vec4 C = vec4( 0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439 );
    vec2 i = floor( v + dot( v, C.yy ) );
    vec2 x0 = v - i + dot( i, C.xx );
    vec2 i1;
    i1 = ( x0.x > x0.y ) ? vec2( 1.0, 0.0 ) : vec2( 0.0, 1.0 );
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod2D289_SDnCrYCH1rJp( i );
    vec3 p = permute_SDnCrYCH1rJp( permute_SDnCrYCH1rJp( i.y + vec3( 0.0, i1.y, 1.0 ) ) + i.x + vec3( 0.0, i1.x, 1.0 ) );
    vec3 m = max( 0.5 - vec3( dot( x0, x0 ), dot( x12.xy, x12.xy ), dot( x12.zw, x12.zw ) ), 0.0 );
    m = m * m;
    m = m * m;
    vec3 x = 2.0 * fract( p * C.www ) - 1.0;
    vec3 h = abs( x ) - 0.5;
    vec3 ox = floor( x + 0.5 );
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * ( a0 * a0 + h * h );
    vec3 g;
    g.x = a0.x * x0.x + h.x * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot( m, g );
}
float customFn_NdWO8hIXc4Ge ( vec2 uv, float scale ) {

    float noise = snoise_SDnCrYCH1rJp( uv * scale );

    noise = noise*0.5 + 0.5;
    return noise;


}
vec3 mod2D289_PNWXcxPnum27 ( vec3 x ) { return x - floor( x * ( 1.0 / 289.0 ) ) * 289.0; }

vec2 mod2D289_PNWXcxPnum27( vec2 x ) { return x - floor( x * ( 1.0 / 289.0 ) ) * 289.0; }

vec3 permute_PNWXcxPnum27( vec3 x ) { return mod2D289_PNWXcxPnum27( ( ( x * 34.0 ) + 1.0 ) * x ); }

float snoise_PNWXcxPnum27( vec2 v ){
    const vec4 C = vec4( 0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439 );
    vec2 i = floor( v + dot( v, C.yy ) );
    vec2 x0 = v - i + dot( i, C.xx );
    vec2 i1;
    i1 = ( x0.x > x0.y ) ? vec2( 1.0, 0.0 ) : vec2( 0.0, 1.0 );
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod2D289_PNWXcxPnum27( i );
    vec3 p = permute_PNWXcxPnum27( permute_PNWXcxPnum27( i.y + vec3( 0.0, i1.y, 1.0 ) ) + i.x + vec3( 0.0, i1.x, 1.0 ) );
    vec3 m = max( 0.5 - vec3( dot( x0, x0 ), dot( x12.xy, x12.xy ), dot( x12.zw, x12.zw ) ), 0.0 );
    m = m * m;
    m = m * m;
    vec3 x = 2.0 * fract( p * C.www ) - 1.0;
    vec3 h = abs( x ) - 0.5;
    vec3 ox = floor( x + 0.5 );
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * ( a0 * a0 + h * h );
    vec3 g;
    g.x = a0.x * x0.x + h.x * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot( m, g );
}
float customFn_ivlgCrQWh4Y4 ( vec2 uv, float scale ) {

    float noise = snoise_PNWXcxPnum27( uv * scale );

    noise = noise*0.5 + 0.5;
    return noise;


}

// variables
// </node_builder>

#define PHYSICAL





#define STANDARD

varying vec3 vViewPosition;

#ifdef USE_TRANSMISSION

varying vec3 vWorldPosition;

#endif

#include <common>
#include <uv_pars_vertex>
#include <uv2_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>

void main() {
    nodeVary0 = uv;



    #include <uv_vertex>
    #include <uv2_vertex>
    #include <color_vertex>
    #include <morphcolor_vertex>

    #include <beginnormal_vertex>
    #include <morphnormal_vertex>
    #include <skinbase_vertex>
    #include <skinnormal_vertex>
    #include <defaultnormal_vertex>
    #include <normal_vertex>

    #include <begin_vertex>
    nodeVar0 = ( _time * 1.0 );
    nodeVar1 = nodeVar0;
    nodeVar2 = ( Speed + 0.2 );
    nodeVar3 = ( nodeVar1 * nodeVar2 );
    nodeVar4 = vec2(0.0,nodeVar3);
    nodeVar5 = (uv * vec2( 1, 1 ) + nodeVar4);
    nodeVar6 = customFn_NdWO8hIXc4Ge( nodeVar5, Scale );
    nodeVar7 = ( nodeVar1 * Speed );
    nodeVar8 = vec2(0.0,nodeVar7);
    nodeVar9 = (uv * vec2( 1, 1 ) + nodeVar8);
    nodeVar10 = ( Scale + 1.0 );
    nodeVar11 = customFn_ivlgCrQWh4Y4( nodeVar9, nodeVar10 );
    nodeVar12 = max( nodeVar6, nodeVar11 );
    nodeVar13 = smoothstep( 0.2, 1.0, nodeVar12 );
    nodeVar14 = ( nodeVar13 - 0.5 );
    nodeVar15 = ( vec3( nodeVar14 ) * normal );
    nodeVar16 = ( nodeVar15 * vec3( Intensity ) );

    transformed = position + nodeVar16;

    #include <morphtarget_vertex>
    #include <skinning_vertex>
    #include <displacementmap_vertex>
    #include <project_vertex>
    #include <logdepthbuf_vertex>
    #include <clipping_planes_vertex>

    vViewPosition = - mvPosition.xyz;

    #include <worldpos_vertex>
    #include <shadowmap_vertex>
    #include <fog_vertex>

    #ifdef USE_TRANSMISSION

    vWorldPosition = worldPosition.xyz;

    #endif
}


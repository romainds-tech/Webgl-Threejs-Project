// Created with NodeToy | Three.js r149

// <node_builder>

// uniforms
uniform sampler2D Gradient; uniform float _time; uniform float Speed; uniform float Scale; uniform vec4 _sinTime;
// attributes

// varys
varying vec2 nodeVary0;
// vars
float nodeVar0; float nodeVar1; float nodeVar2; float nodeVar3; vec2 nodeVar4; vec2 nodeVar5; float nodeVar6; float nodeVar7; vec2 nodeVar8; vec2 nodeVar9; float nodeVar10; float nodeVar11; float nodeVar12; float nodeVar13; vec4 nodeVar14; vec4 nodeVar15; vec3 nodeVar16; float nodeVar17;
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
float customFn_Per6jhII6Vtk ( vec2 uv, float scale ) {

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
float customFn_4tJWIoSpvZVN ( vec2 uv, float scale ) {

    float noise = snoise_PNWXcxPnum27( uv * scale );

    noise = noise*0.5 + 0.5;
    return noise;


}

// variables
// </node_builder>

#define PHYSICAL





#define STANDARD

#ifdef PHYSICAL
#define IOR
#define SPECULAR
#endif

#ifdef IOR
float ior;
#endif

#ifdef SPECULAR
uniform float specularIntensity;
uniform vec3 specularColor;

#ifdef USE_SPECULARINTENSITYMAP
uniform sampler2D specularIntensityMap;
#endif

#ifdef USE_SPECULARCOLORMAP
uniform sampler2D specularColorMap;
#endif
#endif

#ifdef USE_CLEARCOAT
float clearcoat;
float clearcoatRoughness;
#endif

#ifdef USE_IRIDESCENCE
float iridescence;
float iridescenceIOR;
uniform float iridescenceThicknessMinimum;
float iridescenceThicknessMaximum;
#endif

#ifdef USE_SHEEN
uniform vec3 sheenColor;
uniform float sheenRoughness;

#ifdef USE_SHEENCOLORMAP
uniform sampler2D sheenColorMap;
#endif

#ifdef USE_SHEENROUGHNESSMAP
uniform sampler2D sheenRoughnessMap;
#endif
#endif

varying vec3 vViewPosition;

#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <uv2_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <bsdfs>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>

void main() {



    #include <clipping_planes_fragment>

    vec4 diffuseColor = vec4( 0.0 );
    ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
    vec3 totalEmissiveRadiance = vec3( 0.0 );

    #include <logdepthbuf_fragment>
    #include <map_fragment>

    ior = 1.5;

    #include <color_fragment>
    nodeVar0 = ( _time * 1.0 );
    nodeVar1 = nodeVar0;
    nodeVar2 = ( Speed + 0.2 );
    nodeVar3 = ( nodeVar1 * nodeVar2 );
    nodeVar4 = vec2(0.0,nodeVar3);
    nodeVar5 = (nodeVary0 * vec2( 1, 1 ) + nodeVar4);
    nodeVar6 = customFn_Per6jhII6Vtk( nodeVar5, Scale );
    nodeVar7 = ( nodeVar1 * Speed );
    nodeVar8 = vec2(0.0,nodeVar7);
    nodeVar9 = (nodeVary0 * vec2( 1, 1 ) + nodeVar8);
    nodeVar10 = ( Scale + 1.0 );
    nodeVar11 = customFn_4tJWIoSpvZVN( nodeVar9, nodeVar10 );
    nodeVar12 = max( nodeVar6, nodeVar11 );
    nodeVar13 = smoothstep( 0.2, 1.0, nodeVar12 );
    nodeVar14 = ( texture2D( Gradient, vec2( nodeVar13 ) ) );
    nodeVar15 = ( nodeVar14 * vec4( vec3( _sinTime.w ), 1.0 ) );
    nodeVar16 = ( nodeVar15.xyz * vec3( 1, 1, 1 ) );

    diffuseColor = vec4( nodeVar16, 1.0 );

    #include <alphamap_fragment>
    #include <alphatest_fragment>
    #include <roughnessmap_fragment>

    roughnessFactor = 0.0;

    #include <metalnessmap_fragment>
    #include <normal_fragment_begin>

    #include <clearcoat_normal_fragment_begin>
    #include <clearcoat_normal_fragment_maps>
    #include <emissivemap_fragment>

    // accumulation
    #include <lights_physical_fragment>
    #include <lights_fragment_begin>
    #include <lights_fragment_maps>
    #include <lights_fragment_end>

    // modulation

    nodeVar17 = vec4( vec3( nodeVar13 ), 1.0 ).y;

    reflectedLight.indirectDiffuse *= nodeVar17;


    vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
    vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;

    #include <transmission_fragment>

    vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;

    #ifdef USE_SHEEN

    // Sheen energy compensation approximation calculation can be found at the end of
    // https://drive.google.com/file/d/1T0D1VSyR4AllqIJTQAraEIzjlb5h4FKH/view?usp=sharing
    float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );

    outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecular;

    #endif

    #ifdef USE_CLEARCOAT

    float dotNVcc = saturate( dot( geometry.clearcoatNormal, geometry.viewDir ) );

    vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );

    outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + clearcoatSpecular * material.clearcoat;

    #endif

    #include <output_fragment>
    #include <tonemapping_fragment>
    #include <encodings_fragment>
    #include <fog_fragment>
    #include <premultiplied_alpha_fragment>
    #include <dithering_fragment>

}


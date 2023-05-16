//    // Transformera finalement nos coordonnées en coordonnées finales du clip space.
//    uniform mat4 projectionMatrix;
//
//    // appliquera des transformations relatives à la caméra
//    // Si nous tournons la caméra vers la gauche, les sommets devraient être à droite.
//    // Si nous déplaçons la caméra en direction du Mesh , les sommets devraient s'agrandir
//    uniform mat4 viewMatrix;
//
//    // Appliquera toutes les transformations relatives au Mesh
//    // Si nous redimensionnons, faisons pivoter ou déplaçons le Mesh
//    // ces transformations seront contenues dans le modelMatrixet appliquées au position
//    uniform mat4 modelMatrix;

void main()
{
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);

    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;

    gl_Position = projectedPosition;
}
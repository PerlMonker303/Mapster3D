import React from 'react';
import {useSpring, a} from 'react-spring/three';

import {tree_mappings} from '../../Mappings/MappingNature';

const Tree = ({position, mapSize, type, removeTree}) => {
    const size_tree_square = [0.5,0.7,0.5];
    const size_tree_cone = [0.4,0.8,20];
    const size_tree_pyramid = [0.4,0.8,4];
    
    const trunk_height = 0.5;
    const size_trunk_cylinder = [0.1,0.1,trunk_height,32];
    // types of trees: 'square', 'cone', 'pyramid', 'square_rotated'
    const tree_square = (
        <group>
            <a.mesh position={[1,trunk_height/2,1]}>
                <cylinderBufferGeometry attach='geometry' args={size_trunk_cylinder}/>
                <meshStandardMaterial attach='material' color='brown' />
            </a.mesh>
            <a.mesh position={[1,1-trunk_height/2,1]}>
                <boxBufferGeometry attach='geometry' args={size_tree_square}/>
                <meshStandardMaterial attach='material' color='green' />
            </a.mesh>
        </group>
    );
    const tree_cone = (
        <group>
            <a.mesh position={[1,trunk_height/2,1]}>
                <cylinderBufferGeometry attach='geometry' args={size_trunk_cylinder}/>
                <meshStandardMaterial attach='material' color='brown' />
            </a.mesh>
            <a.mesh position={[1,1-trunk_height/2,1]}>
                <coneBufferGeometry attach='geometry' args={size_tree_cone}/>
                <meshStandardMaterial attach='material' color='green' />
            </a.mesh>
        </group>
    );
    const tree_pyramid = (
        <group>
            <a.mesh position={[1,trunk_height/2,1]}>
                <cylinderBufferGeometry attach='geometry' args={size_trunk_cylinder}/>
                <meshStandardMaterial attach='material' color='brown' />
            </a.mesh>
            <a.mesh position={[1,1-trunk_height/2,1]}>
                <coneBufferGeometry attach='geometry' args={size_tree_pyramid}/>
                <meshStandardMaterial attach='material' color='green' />
            </a.mesh>
        </group>
    );
    const tree_square_rotated = (
        <group>
            <a.mesh position={[1,trunk_height/2,1]}>
                <cylinderBufferGeometry attach='geometry' args={size_trunk_cylinder}/>
                <meshStandardMaterial attach='material' color='brown' />
            </a.mesh>
            <a.mesh position={[1,1-trunk_height/2,1]} rotation={[0, Math.PI/4, 0]}>
                <boxBufferGeometry attach='geometry' args={size_tree_square}/>
                <meshStandardMaterial attach='material' color='green' />
            </a.mesh>
        </group>
    );
    const tree_pyramid_rotated = (
        <group>
            <a.mesh position={[1,trunk_height/2,1]}>
                <cylinderBufferGeometry attach='geometry' args={size_trunk_cylinder}/>
                <meshStandardMaterial attach='material' color='brown' />
            </a.mesh>
            <a.mesh position={[1,1-trunk_height/2,1]} rotation={[0, Math.PI/4, 0]}>
                <coneBufferGeometry attach='geometry' args={size_tree_pyramid}/>
                <meshStandardMaterial attach='material' color='green' />
            </a.mesh>
        </group>
    );

    const tree_mappings_components = {
        'square': tree_square,
        'cone': tree_cone,
        'pyramid': tree_pyramid,
        'square_rotated': tree_square_rotated,
        'pyramid_rotated': tree_pyramid_rotated
    }

    return (
        <group 
            onContextMenu={(event) => removeTree(event, [position[0],position[2]])}
            position={[position[0]-mapSize[0]/2 - size_tree_square[0], position[1]/2 ,position[2]-mapSize[1]/2 - size_tree_square[2]]}
        >
            {tree_mappings_components[type]}
        </group>
    )
}

export default Tree;
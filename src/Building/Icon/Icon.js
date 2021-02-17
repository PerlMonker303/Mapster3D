import React, {useRef, useState} from 'react';
import {useFrame} from "react-three-fiber";
import {a} from "react-spring/three";

import {icons_mappings_colors} from '../../Mappings/MappingCodes';

const Icon = ({mapSize, height, position, type, iconHoverIn, iconHoverOut}) => {
    const mesh = useRef(null);
    const dif = 0.2;
    const max_height = height + dif;
    const min_height = height - dif;
    const delta = 0.01;
    const [direction, setDirection] = useState(1); // 1=up, 0=down
    const actual_position = [position[0]-mapSize[0]/2 - 0.5 + 1, 0,position[2]-mapSize[1]/2 - 0.5 + 1];
    useFrame(() => {
        if(mesh.current != null){
            direction === 1 ? mesh.current.position.y += delta : mesh.current.position.y -= delta
            mesh.current.rotation.y += delta;
            if(mesh.current && mesh.current.position.y >= max_height){
                setDirection(0);
            }else if (mesh.current && mesh.current.position.y <= min_height){
                setDirection(1);
            }
        }
    });

    return (
        <group 
            onPointerOver={(event) => iconHoverIn(event, type)}
            onPointerOut={(event) => iconHoverOut(event)}
        >
            <a.mesh castShadow position={[actual_position[0],height,actual_position[2]]} ref={mesh}>
            <octahedronBufferGeometry attach='geometry' args={[0.3,0]} />
            <meshStandardMaterial attach='material' color={icons_mappings_colors[type]} />
            </a.mesh>
        </group>
      )
}

export default Icon;
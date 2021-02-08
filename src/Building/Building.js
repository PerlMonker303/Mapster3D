import React, {useRef, useState} from 'react';
import {useFrame} from "react-three-fiber";
import {a} from 'react-spring/three';
import {tile_mappings_zones} from '../Mappings/MappingCodes';

const Building = ({position, size, mapSize, type, builtBuildings, updateBuiltBuildings, destroyBuilding, isBuilt}) => {
    // position - based on matrices
    const mesh = useRef(null);
    const initial_position = [...position];
    const [isDestroyed, setDestroyed] = useState(false);

    const actual_size = size.map(coord => coord - 0.00); // 0.01
    position[0] -= mapSize[0]/2 - 1;
    position[2] -= mapSize[1]/2 - 1;
    position[1] = size[1]/2;//
    if(size[0] % 2 !== 0){
        position[0] -= size[0] / 2;
    }
    if(size[2] % 2 !== 0){
        position[2] -= size[2] / 2;
    }
    let initialScale = true;
    useFrame(() => {
        if(isDestroyed === false && isBuilt === false && builtBuildings[initial_position[0]][initial_position[2]] === 0){
            if(initialScale){
                mesh.current.scale.y = 0;
                mesh.current.position.y = 0;
                initialScale = false;
            }else{
                if(mesh.current.scale.y < 1){
                    mesh.current.scale.y += 0.01;
                    mesh.current.position.y += size[1]/200;
                }else{
                    updateBuiltBuildings([initial_position],1);
                }
            }
        }
    });

    const destroy = () => {
        setDestroyed(true);
        destroyBuilding(initial_position);
    }
    
    return (
        <a.mesh castShadow position={position} ref={mesh} onClick={() => destroy()}>
            <boxBufferGeometry attach='geometry' args={actual_size}/>
            <meshStandardMaterial attach='material' color={tile_mappings_zones[type]}/>
        </a.mesh>
    )
}

export default Building;
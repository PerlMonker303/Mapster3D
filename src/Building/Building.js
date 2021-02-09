import React, {useRef, useState} from 'react';
import {useFrame} from "react-three-fiber";
import {a} from 'react-spring/three';
import {tile_mappings_zones} from '../Mappings/MappingCodes';
import {buildings_levels_codes} from '../Mappings/MappingBuildings';

const Building = ({position, size, mapSize, type, clickHandlerBuilding, level, loaded}) => {
    // position - based on matrices
    const mesh = useRef(null);
    const initial_position = [...position];
    const [isPreBuild, setPreBuild] = useState(loaded ? false : true); // is in prebuild stage? (only zone is visible, not building)
    const [isBuilt, setBuilt] = useState(false);
    //const randomLevel = Math.floor(Math.random() * 5) + 1; level = randomLevel;

    const actual_size = size.map(coord => coord - 0.00); // 0.01
    actual_size[1] = buildings_levels_codes[level]['height'];
    useFrame(() => {
        if(isPreBuild){
            setTimeout(() => {
                setPreBuild(false);
                if(mesh.current){
                    mesh.current.scale.y = 0;
                    mesh.current.position.y = 0;
                }
            }, 1000);
        }else{
            if(!isBuilt){
                
                if(mesh.current && mesh.current.scale.y < 1){
                    
                    mesh.current.scale.y += 0.01;
                    mesh.current.position.y += size[1]/200;
                }else{
                    setBuilt(true);
                }
            }else{
                if(mesh.current){
                    mesh.current.scale.y = 1;
                    mesh.current.position.y = size[1]/2;
                }
            }
        }
    });
    
    return (
        <group>
        {!isPreBuild ? // maybe change here
                <a.mesh 
                    castShadow 
                    position={
                        [position[0]-mapSize[0]/2 - size[0]/2 + 1, position[1]/2 ,position[2]-mapSize[1]/2 - size[2]/2 + 1]
                    } 
                    ref={mesh} 
                    onClick={() => clickHandlerBuilding([initial_position[0],initial_position[2],type])}>
                    <boxBufferGeometry attach='geometry' args={actual_size}/>
                    <meshStandardMaterial attach='material' color={tile_mappings_zones[type]}/>
                </a.mesh>
        : null}
        </group>
        )
}

export default Building;
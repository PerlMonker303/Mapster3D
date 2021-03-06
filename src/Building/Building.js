import React, {useRef, useState, useEffect} from 'react';
import {useFrame, useLoader} from "react-three-fiber";
import {a} from 'react-spring/three';
import {tile_mappings_zones} from '../Mappings/MappingCodes';
import {buildings_levels_codes} from '../Mappings/MappingBuildings';
import * as THREE from 'three';
import Icon from './Icon/Icon';

const Building = ({
    position,
    size,
    mapSize,
    type,
    clickHandlerBuilding,
    level,
    loaded,
    alt,
    texturesShow,
    textures,
    defaultTexture,
    orientation,
    buildingsShow,
    sewageMode,
    isPaused,
    buildingHoverIn,
    buildingHoverOut,
    waterAvailability,
    iconHoverIn,
    iconHoverOut,
    elevationLevel}) => {

    // position - based on matrices
    const mesh = useRef(null);
    const initial_position = [...position];
    const [isPreBuild, setPreBuild] = useState(loaded ? false : true); // is in prebuild stage? (only zone is visible, not building)
    const [isBuilt, setBuilt] = useState(false);

    // assets
    const defaultTextureLocal = useLoader(THREE.TextureLoader, defaultTexture[0]);
    const textureFront1 = useLoader(THREE.TextureLoader, textures[alt][0]);
    const textureBack1 = useLoader(THREE.TextureLoader, textures[alt][1]);
    const textureTop1 = useLoader(THREE.TextureLoader, textures[alt][2]);
    const textureBottom1 = useLoader(THREE.TextureLoader, textures[alt][3]);
    const textureSide1 = useLoader(THREE.TextureLoader, textures[alt][4]);
    const textureSide2 = useLoader(THREE.TextureLoader, textures[alt][5]);
    let textureArray = [textureFront1,textureBack1,textureTop1,
        textureBottom1,textureSide1,textureSide2];

    switch(orientation){
        case 1: 
            // Orient to right
            // initial: [FRONT,BACK,TOP,BOTTOM,LEFT,RIGHT] = [0,1,2,3,4,5]
            // should be: [LEFT,RIGHT,TOP,BOTTOM,BACK,FRONT] = [4,5,2,3,1,0]
            textureArray = [textureArray[4],textureArray[5],textureArray[2],textureArray[3],
            textureArray[1],textureArray[0]]
            break;
        case 2:
            // Orient 180
            // initial: [FRONT,BACK,TOP,BOTTOM,LEFT,RIGHT] = [0,1,2,3,4,5]
            // should be: [BACK,FRONT,TOP,BOTTOM,RIGHT,LEFT] = [1,0,2,3,5,4]
            textureArray = [textureArray[1],textureArray[0],textureArray[2],textureArray[3],
            textureArray[5],textureArray[4]]
            break;
        case 3:
            // Orient to left
            // initial: [FRONT,BACK,TOP,BOTTOM,LEFT,RIGHT] = [0,1,2,3,4,5]
            // should be: [RIGHT,LEFT,TOP,BOTTOM,FRONT,BACK] = [5,4,2,3,0,1]
            textureArray = [textureArray[5],textureArray[4],textureArray[2],textureArray[3],
            textureArray[0],textureArray[1]]
            break;
        default:
            break;
      }

    const actual_size = size.map(coord => coord - 0.00); // 0.01
    actual_size[1] = buildings_levels_codes[level]['height'];
    useFrame(() => {
        if(isPaused){
            return;
        }
        if(isPreBuild){
            setTimeout(() => {
                setPreBuild(false);
                if(mesh.current){
                    mesh.current.scale.y = 0;
                    mesh.current.position.y = elevationLevel;
                }
            }, 2000);
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
                    mesh.current.position.y = size[1]/2 + elevationLevel;
                }
            }
        }
    });
    
    return (
        <group dispose={null}>
        {!isPreBuild && buildingsShow && !sewageMode ?
                <a.mesh 
                    castShadow 
                    position={
                        [position[0]-mapSize[0]/2 - size[0]/2 + 1, position[1]/2,position[2]-mapSize[1]/2 - size[2]/2 + 1]
                    } 
                    ref={mesh} // ORDER: FRONT, BACK, TOP, BOTTOM, LEFT, RIGHT
                    onClick={(event) => clickHandlerBuilding(event, [initial_position[0],initial_position[2],type])}
                    onPointerOver={(event) => buildingHoverIn(event, [initial_position[0],initial_position[2],type])}
                    onPointerOut={(event) => buildingHoverOut(event)}>
                    <boxBufferGeometry attach='geometry' args={actual_size}/>
                    {textureArray.map((mat, i) => (
                        <meshPhongMaterial
                            key={i} 
                            opacity={1}
                            attachArray='material' 
                            color={texturesShow ? tile_mappings_zones[0] : tile_mappings_zones[type]}
                            map={texturesShow ? mat : defaultTextureLocal}
                        />
                    ))}
                </a.mesh>
        : null}
        {!isPreBuild && buildingsShow && !waterAvailability && !sewageMode ? 
            <Icon 
                mapSize={mapSize}
                height={actual_size[1] + 0.75 + elevationLevel}
                position={[position[0], 0 ,position[2]]}
                type={1}
                iconHoverIn={iconHoverIn}
                iconHoverOut={iconHoverOut}
            />
        : null }
        </group>
        )
}

export default Building;
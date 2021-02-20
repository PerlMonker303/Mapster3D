import React, {useState} from 'react';
import {useLoader} from "react-three-fiber";
import * as THREE from 'three';

import {tile_mappings_zones_codes, tile_mappings_zones, tile_mappings_textures_codes} from '../Mappings/MappingCodes';

// textures
import TextureGrass1 from '../assets/grass/Grass1.png';
import TextureRoad1 from '../assets/roads/Road1.png';
import TextureRoad2 from '../assets/roads/Road2.png';
import TextureRoad3 from '../assets/roads/Road3.png';
import TextureRoad4 from '../assets/roads/Road4.png';
import TextureRoad5 from '../assets/roads/Road5.png';
import TextureRoad6 from '../assets/roads/Road6.png';
import TextureRoad7 from '../assets/roads/Road7.png';
import TextureRoad8 from '../assets/roads/Road8.png';
import TextureRoad9 from '../assets/roads/Road9.png';
import TextureRoad10 from '../assets/roads/Road10.png';
import TextureRoad11 from '../assets/roads/Road11.png';
import TextureWater1 from '../assets/water/Water1.png';
import TextureShore1 from '../assets/shore/Shore1.png';
import TextureDirt1 from '../assets/dirt/Dirt1.png';
import TextureDirt2 from '../assets/dirt/Dirt2.png';
import TextureDirt3 from '../assets/dirt/Dirt3.png';

const Tile = ({
    type,
    position,
    mapSize,
    tileMapZones,
    tileMapTextures, 
    setTileMapTexture, 
    setTileMapZone, 
    setTileMapObject, 
    selected_option_type, 
    sewageMode, 
    waterAvailability, 
    elevationLevel, 
    elevationLevels, 
    maxElevationLevel, 
    minElevationLevel, 
    increaseElevationLevel, 
    decreaseElevationLevel,
    elevationOrientations}) => {
    const size = [1,1,0.01];
    const actual_position = position.map(pos => pos - 0.5);
    if(elevationLevels !== null){
        //console.log(elevationLevels[position[0] + mapSize[0] / 2 - 1]);
        const val1 = elevationLevels[position[0] + mapSize[0] / 2 - 1];
        if(val1 !== undefined){
            //console.log(elevationLevels[position[0] + mapSize[0] / 2 - 1][position[2] + mapSize[1] / 2] - 1);
            const val2 = elevationLevels[position[0] + mapSize[0] / 2 - 1][position[2] + mapSize[1] / 2 - 1];
            if(val2 !== undefined){
                //console.log("MOD");
                actual_position[1] = 0.001 + val2;
            }else{
                //console.log("NOPE");
            }
        }
        
    }else{
        actual_position[1] = 0.001;
    }
    
  
    const textureGrass1 = useLoader(THREE.TextureLoader, TextureGrass1);
    const textureRoad1 = useLoader(THREE.TextureLoader, TextureRoad1);
    const textureRoad2 = useLoader(THREE.TextureLoader, TextureRoad2);
    const textureRoad3 = useLoader(THREE.TextureLoader, TextureRoad3);
    const textureRoad4 = useLoader(THREE.TextureLoader, TextureRoad4);
    const textureRoad5 = useLoader(THREE.TextureLoader, TextureRoad5);
    const textureRoad6 = useLoader(THREE.TextureLoader, TextureRoad6);
    const textureRoad7 = useLoader(THREE.TextureLoader, TextureRoad7);
    const textureRoad8 = useLoader(THREE.TextureLoader, TextureRoad8);
    const textureRoad9 = useLoader(THREE.TextureLoader, TextureRoad9);
    const textureRoad10 = useLoader(THREE.TextureLoader, TextureRoad10);
    const textureRoad11 = useLoader(THREE.TextureLoader, TextureRoad11);
    const textureWater1 = useLoader(THREE.TextureLoader, TextureWater1);
    const textureShore1 = useLoader(THREE.TextureLoader, TextureShore1);
    const textureDirt1 = useLoader(THREE.TextureLoader, TextureDirt1);
    const textureDirt2 = useLoader(THREE.TextureLoader, TextureDirt2);
    const textureDirt3 = useLoader(THREE.TextureLoader, TextureDirt3);

    const tile_mappings_textures = {
        0: textureGrass1,
        1: textureRoad1,
        2: textureRoad2,
        3: textureRoad3,
        4: textureRoad4,
        5: textureRoad5,
        6: textureRoad6,
        7: textureRoad7,
        8: textureRoad8,
        9: textureRoad9,
        10: textureRoad10,
        11: textureRoad11,
        12: textureWater1,
        13: textureShore1,
        14: textureDirt1,
        15: textureDirt2,
        16: textureDirt3
    }

    let rows = tileMapZones.length;
    let cols = tileMapZones[0].length;
    let position_row = position[0] + Math.floor(rows/2)-1;
    let position_col = position[2] + Math.floor(cols/2)-1;

    const elevation_mappings_rotation = {
        0: [-Math.PI / 2, 0, 0],
        1: [ 0, 0, -Math.PI / 4],
        2: [ Math.PI / 4, 3.14, 3.14],
        3: [ 0, 0, Math.PI / 4],
        4: [-Math.PI / 4, 0, 0],
        5: [0, -Math.PI / 4, -0.26],
        6: [0, Math.PI / 4, 0.26],
        7: [0, Math.PI / 4, -0.24],
        8: [0, -Math.PI / 4, 0.26],
    }

    const elevation_mappings_position = {
        0: actual_position,
        1: [actual_position[0]-0.29,actual_position[1]+0.2,actual_position[2]],
        2: [actual_position[0],actual_position[1]+0.2,actual_position[2]-0.29],
        3: [actual_position[0]+0.29,actual_position[1]+0.2,actual_position[2]],
        4: [actual_position[0],actual_position[1]+0.2,actual_position[2]+0.29],
        5: [actual_position[0]+0.29,actual_position[1]-0.22,actual_position[2]+0.29],
        6: [actual_position[0]-0.29,actual_position[1]-0.22,actual_position[2]+0.29],
        7: [actual_position[0]+0.29,actual_position[1]-0.22,actual_position[2]-0.29],
        8: [actual_position[0]-0.29,actual_position[1]-0.22,actual_position[2]-0.29]
    }

    const elevation_mappings_size = {
        0: size,
        1: [0.01,size[0] + 1.25,size[1]],
        2: [size[0],size[1]+1.25,0.01],
        3: [0.01,size[0]+1.25,size[1]],
        4: [size[0],size[1]+1.25,0.01],
        5: [1.27,0],
        6: [1.27,0],
        7: [1.27,0],
        8: [1.27,0]
    }
  
    return (
        <group dispose={null}>
            {elevationOrientations[position_row][position_col] >= 0 && elevationOrientations[position_row][position_col] <= 4 ?
            <mesh onClick={(event) => { // left click
                event.stopPropagation();
                if(tile_mappings_zones_codes[type] && type !== 'buldoze'){
                    setTileMapZone([position_row, position_col], tile_mappings_zones_codes[type]);
                }else if (tile_mappings_textures_codes[type]){
                    setTileMapTexture([position_row, position_col], tile_mappings_textures_codes[type], tile_mappings_textures);
                }else if(selected_option_type === 'pipe' || selected_option_type === 'tree'){
                    setTileMapObject([position_row, position_col]);
                }else if(type === 'elevate'){
                    if(elevationLevels[position[0] + mapSize[0] / 2 - 1][position[2] + mapSize[1] / 2 - 1] < maxElevationLevel){
                        increaseElevationLevel([position_row, position_col]);
                    }
                }
            
            }} 
            receiveShadow 
            rotation={elevation_mappings_rotation[elevationOrientations[position_row][position_col]]} 
            position={elevation_mappings_position[elevationOrientations[position_row][position_col]]}
            onContextMenu={(event) => { // right click
                event.stopPropagation();
                if(tile_mappings_zones_codes[type]){
                    setTileMapZone([position_row, position_col], 0);
                }else if (tile_mappings_textures_codes[type]){
                    setTileMapTexture([position_row, position_col], 0);
                }else if(type === 'elevate'){
                    if(elevationLevels[position[0] + mapSize[0] / 2 - 1][position[2] + mapSize[1] / 2 - 1] > minElevationLevel){
                        decreaseElevationLevel([position_row, position_col]);
                    }
                }
            }}
            >
                <boxBufferGeometry attach='geometry' args={elevation_mappings_size[elevationOrientations[position_row][position_col]]}/>
                <meshStandardMaterial 
                    map={sewageMode && tileMapTextures[position_row][position_col] !== 12 &&  waterAvailability[position_row][position_col] === 1 ? textureDirt2 :
                        sewageMode && tileMapTextures[position_row][position_col] !== 12 ? textureDirt1 : tile_mappings_textures[tileMapTextures[position_row][position_col]]} 
                    attach='material'
                    color={tile_mappings_zones[tileMapZones[position_row][position_col]]}
                />
            </mesh>
            : 
            <mesh
                onClick={(event) => { // left click
                    event.stopPropagation();
                }}
                receiveShadow
                rotation={elevation_mappings_rotation[elevationOrientations[position_row][position_col]]} 
                position={elevation_mappings_position[elevationOrientations[position_row][position_col]]}
            >
                <octahedronGeometry 
                    attach="geometry"
                    args={elevation_mappings_size[elevationOrientations[position_row][position_col]]}
                />
                <meshStandardMaterial 
                    map={sewageMode && tileMapTextures[position_row][position_col] !== 12 &&  waterAvailability[position_row][position_col] === 1 ? textureDirt2 :
                        sewageMode && tileMapTextures[position_row][position_col] !== 12 ? textureDirt1 : tile_mappings_textures[tileMapTextures[position_row][position_col]]} 
                    attach='material'
                    color={tile_mappings_zones[tileMapZones[position_row][position_col]]}
                    side={THREE.DoubleSide}
                />
            </mesh>
            }
        </group>
        
    )
  }

export default Tile;
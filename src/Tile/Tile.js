import React from 'react';
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

const Tile = ({type, position, tileMapZones, tileMapTextures, setTileMapTexture, setTileMapZone}) => {
    const size = [1,1];
    const actual_position = position.map(pos => pos - 0.5);
    actual_position[1] = 0.001;
  
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
        13: textureShore1
    }

    let rows = tileMapZones.length;
    let cols = tileMapZones[0].length;
    let position_row = position[0] + Math.floor(rows/2)-1;
    let position_col = position[2] + Math.floor(cols/2)-1;
  
    return (
        <group>
            <mesh onClick={() => { // left click
                if(tile_mappings_zones_codes[type] && type !== 'buldoze'){
                    setTileMapZone([position_row, position_col], tile_mappings_zones_codes[type]);
                }else if (tile_mappings_textures_codes[type]){
                    setTileMapTexture([position_row, position_col], tile_mappings_textures_codes[type], tile_mappings_textures);
                }
            
            }} receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={actual_position}
            onContextMenu={() => { // right click
                if(tile_mappings_zones_codes[type]){
                    setTileMapZone([position_row, position_col], 0);
                }else if (tile_mappings_textures_codes[type]){
                    setTileMapTexture([position_row, position_col], 0);
                }
            }}
            >
                <planeBufferGeometry attach='geometry' args={size}/>
                <meshStandardMaterial 
                    map={tile_mappings_textures[tileMapTextures[position_row][position_col]]} 
                    attach='material'
                    color={tile_mappings_zones[tileMapZones[position_row][position_col]]}
                />
            </mesh>
        </group>
    )
  }

export default Tile;
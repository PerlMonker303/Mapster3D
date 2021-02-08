import React, {Suspense} from 'react';
import Grid from '../Grid/Grid';
import Tile from '../Tile/Tile';

const Ground = ({state, setTileMapTexture, setTileMapZone, position, size}) => {

    let [n, m] = size;
    let pairs = [];
    for(var i=-n/2+1;i<=n/2;i++){
      for(var j=-m/2+1;j<=m/2;j++){
        pairs.push([i,j]);
      }
    }
  
    return (
      <group>
        <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={position}>
          <planeBufferGeometry attach='geometry' args={size} />
          <shadowMaterial attach='material' opacity='0.3' />
          <meshStandardMaterial attach='material'/>
        </mesh>
        {state.gridShow ? <Grid size={size}/> : null}
        <Suspense fallback={null}>
        {
          pairs.map((pair, i) =>
            <Tile 
              type={state.selected_building_type} 
              key={pair} 
              position={[pair[0],1,pair[1]]} 
              tileMapZones={state.tileMapZones} 
              tileMapTextures={state.tileMapTextures} 
              setTileMapTexture={setTileMapTexture}
              setTileMapZone={setTileMapZone}
              coordinates={pair}/>
          )
        }
        </Suspense>
      </group>
    )
  }

export default Ground;
import React, {Suspense} from 'react';
import Grid from '../Grid/Grid';
import Tile from '../Tile/Tile';
import Pipe from './Pipes/Pipe';
import Tree from '../Nature/Tree/Tree';
import { tree_mappings } from '../Mappings/MappingNature';

const Ground = ({
    state,
    setTileMapTexture,
    setTileMapZone,
    setTileMapObject,
    position,
    size,
    removePipe,
    removeTree}) => {

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
              type={state.selected_option_type} 
              key={pair} 
              position={[pair[0],1,pair[1]]} 
              tileMapZones={state.tileMapZones} 
              tileMapTextures={state.tileMapTextures} 
              setTileMapTexture={setTileMapTexture}
              setTileMapZone={setTileMapZone}
              setTileMapObject={setTileMapObject}
              coordinates={pair}
              selected_option_type={state.selected_option_type}
              sewageMode={state.sewageMode}
              waterAvailability={state.waterAvailability}
              />
          )
        }
        {
          state.pipesKeysList.map((key, i) => {
            const pipe = state.pipesKeys[key];
            return (
              <Pipe 
                key={key}
                mapSize={state.mapSize}
                position={[pipe[0],1,pipe[1]]}
                size={[1,1,1]}
                tileMapObjects={state.tileMapObjects}
                sewageMode={state.sewageMode}
                removePipe={removePipe}
              />
            )
          }
          )
        }
        {!state.sewageMode ? 
          state.treesKeysList.map((key, i) => {
            const tree = state.treesKeys[key];
            return (
            <Tree 
              key={key}
              position={[tree[0],0,tree[1]]}
              mapSize={state.mapSize}
              type={tree_mappings[tree[2]]}
              removeTree={removeTree}
            />
            )
          }
          )
        : null }
        </Suspense>
      </group>
    )
  }

export default Ground;
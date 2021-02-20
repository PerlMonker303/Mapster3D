import React, {Suspense, useState, useEffect} from 'react';
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
    removeTree,
    increaseElevationLevel,
    decreaseElevationLevel}) => {

    const maxElevationLevel = 1;
    const minElevationLevel = 0;

    let [n, m] = size;
    let pairs = [];
    let indexes = [];
    for(var i=-n/2+1;i<=n/2;i++){
      for(var j=-m/2+1;j<=m/2;j++){
        pairs.push([i,j]);
        indexes.push([i + n/2, j + n/2]);
      }
    }

    const [elevationLevels, setElevationLevels] = useState(null);

    useEffect(() => {
      setElevationLevels(state.elevationLevels);
    }, state.elevationLevels)
  
    return (
      <group dispose={null}>
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
              mapSize={state.mapSize}
              tileMapZones={state.tileMapZones} 
              tileMapTextures={state.tileMapTextures} 
              setTileMapTexture={setTileMapTexture}
              setTileMapZone={setTileMapZone}
              setTileMapObject={setTileMapObject}
              coordinates={pair}
              selected_option_type={state.selected_option_type}
              sewageMode={state.sewageMode}
              waterAvailability={state.waterAvailability}
              elevationLevel={pairs === [] || pairs === null || elevationLevels === null ? 0 : elevationLevels[parseInt(pairs[0]) + state.mapSize[0] / 2][parseInt(pairs[1]) +  + state.mapSize[1] / 2]}
              elevationLevels={state.elevationLevels}
              maxElevationLevel={maxElevationLevel}
              minElevationLevel={minElevationLevel}
              increaseElevationLevel={increaseElevationLevel}
              decreaseElevationLevel={decreaseElevationLevel}
              elevationOrientations={state.elevationOrientations}
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
                elevationLevel={state.elevationLevels[pipe[0]][pipe[1]]}
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
              elevationLevel={state.elevationLevels[tree[0]][tree[1]]}
              selected_option_type={state.selected_option_type}
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
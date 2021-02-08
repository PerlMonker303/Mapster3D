import React, {useRef, useState, Component} from "react";
import {Canvas, useFrame} from "react-three-fiber";
import * as THREE from 'three';
import "./App.scss";
import HUD from './HUD/HUD';
import Ground from './Ground/Ground';
import Building from './Building/Building';

import {OrbitControls} from "@react-three/drei";
import {useSpring, a} from "react-spring/three";
import {tile_mappings_textures_codes} from './Mappings/MappingCodes';

// TO DO: 
// - save/load map
// - create a road in 3D - with sidewalk and everything
// - add moving rotating clouds
// - different building heights

// BUGS:
// - buildings are built multiple times
// - there was a bug when creating multiple roads and zones, then clicking build
// - tile has more priority than color


const SpinningMesh = ({position, size, color}) => {
  const mesh = useRef(null);
  useFrame(() => {mesh.current.rotation.x = mesh.current.rotation.y += 0.01});

  const [expand, setExpand] = useState(false);

  const props = useSpring({
    scale: expand ? [1.4,1.4,1.4] : [1,1,1]
  })

  return (
    <a.mesh onClick={() => setExpand(!expand)} scale={props.scale} castShadow position={position} ref={mesh}>
      <boxBufferGeometry attach='geometry' args={size} />
      <meshStandardMaterial attach='material' color={color}/>
    </a.mesh>
  )
}

class App extends Component {
  constructor(props) {
    super(props);
    const n = 30;
    const m = 30;
    this.state = {
      mapSize: [n,m],
      selected_building_type: 'none',
      tileMapTextures: Array(n).fill().map(()=>Array(m).fill(0)),
      tileMapZones: Array(n).fill().map(()=>Array(m).fill(0)),
      gridShow: false,
      buildingCoordinates: [],
      builtBuildings: Array(n).fill().map(()=>Array(m).fill(0)),
      isBuilding: false
    }
  }

  changeSelectedBuildingType = (newType) => {
    this.setState({selected_building_type: newType})
  }

  setTileMapTexture = ([x, y], value, tile_mappings_textures) => {
    // deny road placement on zones
    if(value > 0 && value <= 11){
      // adding a road
      if(this.state.tileMapZones[x][y] !== 0){
        // deny road placement
        return
      }
    }
    let newTileMapTextures = this.state.tileMapTextures;
    newTileMapTextures[x][y] = value;
    this.setState({tileMapTextures: newTileMapTextures})
    this.updateTexturesEnv([x, y], value, tile_mappings_textures);
  }

  setTileMapZone = ([x, y], value) => {
    if(this.state.tileMapTextures[x][y] > 0 && this.state.tileMapTextures[x][y] <= 11){
      // restriction of not zoning on a road
      return;
    }
    if(!this.neighborIsRoad([x,y])){
      // restriction of zoning near roads
      // NOT USED - we want buildings wider than 1xn
      //return;
    }
    let newTileMapZones = this.state.tileMapZones;
    newTileMapZones[x][y] = value;
    this.setState({tileMapZones: newTileMapZones})
    if(value === 0){
      // remove zone
      // remove from buildings
      let builtBuildings = [...this.state.builtBuildings];
      let buildingCoordinates = [...this.state.buildingCoordinates];
      builtBuildings[x][y] = 0;
      buildingCoordinates = buildingCoordinates.filter(coord => (coord[0] === x && coord[1] === y));
      this.setState({builtBuildings: builtBuildings, buildingCoordinates: buildingCoordinates});

    }
  }

  changeGridShow = () => {
    this.setState({gridShow: !this.state.gridShow});
  }

  neighborIsRoad = ([x,y]) => {
    let result = false;
    if(x > 0 && y > 0 && x < this.state.tileMapZones.length && y < this.state.tileMapZones[0].length){
      if(x > 0 && this.state.tileMapTextures[x-1][y] > 0 && this.state.tileMapTextures[x-1][y] <= 11){
        result = true;
      }
      else if(y > 0 && this.state.tileMapTextures[x][y-1] > 0 && this.state.tileMapTextures[x][y-1] <= 11){
        result = true;
      }
      else if(x < this.state.tileMapZones.length-1 && this.state.tileMapTextures[x+1][y] > 0 && this.state.tileMapTextures[x+1][y] <= 11){
        result = true;
      }
      else if(y < this.state.tileMapZones[0].length-1 && this.state.tileMapTextures[x][y+1] > 0 && this.state.tileMapTextures[x][y+1] <= 11){
        result = true;
      }
    }
    return result;
  }

  updateTexturesEnv = ([x, y], value, tile_mappings_textures, neighbour = false) => {
    let left = false;
    let right = false;
    let top = false;
    let bottom = false;
    // left
    if(x > 0 && this.state.tileMapTextures[x-1][y] > 0 && this.state.tileMapTextures[x-1][y] <= 11){
      left = true;
    }
    if(y > 0 && this.state.tileMapTextures[x][y-1] > 0 && this.state.tileMapTextures[x][y-1] <= 11){
      top = true;
    }
    if(x < this.state.tileMapZones.length-1 && this.state.tileMapTextures[x+1][y] > 0 && this.state.tileMapTextures[x+1][y] <= 11){
      right = true;
    }
    if(y < this.state.tileMapZones[0].length-1 && this.state.tileMapTextures[x][y+1] > 0 && this.state.tileMapTextures[x][y+1] <= 11){
      bottom = true;
    }

    // adding a road
    if(tile_mappings_textures_codes['road'] === value){
      let newValue = 1;
      // change current textures
      if(left && right && top && bottom){
        // 4 way - Road11
        newValue = 11;
      }else if (left && right && top){
        // 3 way - Road6
        newValue = 6;
      }else if(left && right && bottom){
        // 3 way - Road5
        newValue = 5;
      }else if(left && top && bottom){
        // 3 way - Road4
        newValue = 4;
      }else if(right && top && bottom){
        // 3 way - Road3
        newValue = 3;
      }else if(left && right){
        // 2 way - Road2
        newValue = 2;
      }else if(top && bottom){
        // 2 way - Road1
        newValue = 1;
      }else if(top && left){
        // 2 way - Road10
        newValue = 10;
      }else if(top && right){
        // 2 way - Road9
        newValue = 9;
      }else if(bottom && left){
        // 2 way - Road8
        newValue = 8;
      }else if(bottom && right){
        // 2 way - Road7
        newValue = 7;
      }else if(top || bottom){
        // 2 way - Road 1
        newValue = 1;
      }else if(left || right){
        // 2 way - Road 2
        newValue = 2;
      }
      if(left || right || top || bottom){
        let newTileMapTextures = this.state.tileMapTextures;
        newTileMapTextures[x][y] = newValue;
        this.setState({tileMapTextures: newTileMapTextures})
      }
    }else if(value === 0){
      // removing a road
      if(left) {
        this.updateTexturesEnv([x-1, y], 1, tile_mappings_textures, true);
      }
      if(right) {
        this.updateTexturesEnv([x+1, y], 1, tile_mappings_textures, true);
      }
      if(top) {
        this.updateTexturesEnv([x, y-1], 1, tile_mappings_textures, true);
      }
      if(bottom) {
        this.updateTexturesEnv([x, y+1], 1, tile_mappings_textures, true);
      }
    }
    // change neighbouring textures
    if(neighbour === false){
      if(left) {
        this.updateTexturesEnv([x-1, y], value, tile_mappings_textures, true);
      }
      if(right) {
        this.updateTexturesEnv([x+1, y], value, tile_mappings_textures, true);
      }
      if(top) {
        this.updateTexturesEnv([x, y-1], value, tile_mappings_textures, true);
      }
      if(bottom) {
        this.updateTexturesEnv([x, y+1], value, tile_mappings_textures, true);
      }
    }
  }

  startBuilding = () => {
    this.setState({isBuilding: true}, () => {
      console.log("[BUILDING COMMENCED]");
    });
    
    let currentBuildingCoordinates = this.getZonesCoordinates();
    let oldBuildingCoordinates = this.state.buildingCoordinates;
    let newBuildingCoordinates = currentBuildingCoordinates.filter(c => !oldBuildingCoordinates.includes(c));
    let allBuildingCoordinates = [...currentBuildingCoordinates,...oldBuildingCoordinates];
    let set = new Set(allBuildingCoordinates.map(JSON.stringify));
    allBuildingCoordinates = Array.from(set).map(JSON.parse);
    this.setState({buildingCoordinates: allBuildingCoordinates}, () => {
      //this.updateBuiltBuildings(newBuildingCoordinates, 1);
    });
    this.updateBuiltBuildings(newBuildingCoordinates, 1);

    this.setState({isBuilding: false}, () => {
      console.log("[BUILDING STOPPED]");
    });
  }

  getZonesCoordinates = () => {
    let buildingCoordinates = [];
    for(let i=0;i<this.state.tileMapZones.length;i++){
      for(let j=0;j<this.state.tileMapZones[0].length;j++){
        if(this.state.tileMapZones[i][j] !== 0){
          buildingCoordinates.push([i,j,this.state.tileMapZones[i][j]]);
        }
      }
    }

    return buildingCoordinates;
  }

  updateBuiltBuildings = (buildingCoordinates, value) => {
    let builtBuildings = [...this.state.builtBuildings];
    buildingCoordinates.map((pair) => {
      console.log("UPDATED TO ", value);
      builtBuildings[pair[0]][pair[2]] = value;
    });
    this.setState({builtBuildings: builtBuildings});
  }

  destroyBuilding = (buildingCoordinates) => {
    this.updateBuiltBuildings([buildingCoordinates], 0);
    let oldBuildingCoordinates = this.state.buildingCoordinates;
    const newBuildingCoordinates = oldBuildingCoordinates.filter(coords => !(buildingCoordinates[0] === coords[0] && buildingCoordinates[2] === coords[1]));
    this.setState({buildingCoordinates: newBuildingCoordinates});
  }
  
  render(){
  return (
    <>
      <HUD 
        changeGridShow={this.changeGridShow}
        changeSelectedBuildingType={this.changeSelectedBuildingType}
        startBuilding={this.startBuilding}
      />
      <Canvas shadowMap colorManagement camera={{position: [-5,12,10], fov: 60}}>
        <ambientLight intensity={0.3} />
        <directionalLight
          castShadow
          position={[0,20,0]}
          intensity={0.5}
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-far={50}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
        />
        <pointLight position={[-10,10,-20]} intensity={0.5}/>
        <pointLight position={[0,0,0]} intensity={1.5}/>

        <Ground 
          state={this.state} 
          setTileMapTexture={this.setTileMapTexture}
          setTileMapZone={this.setTileMapZone}
          position={[0,0,0]} 
          size={this.state.mapSize}/>


        <SpinningMesh position={[-2,12,-5]} color="pink" />
        <SpinningMesh position={[5,12,-2]} color="pink" />
        <SpinningMesh position={[-9,12,-4]} color="pink" />
        <SpinningMesh position={[3,11,2]} color="pink" />

        {this.state.buildingCoordinates.map((pair, i) => 
            <Building 
              key={i} 
              position={[pair[0],0,pair[1]]}
              size={[1,3,1]} 
              mapSize={this.state.mapSize}
              type={pair[2]}
              builtBuildings={this.state.builtBuildings}
              updateBuiltBuildings={this.updateBuiltBuildings}
              destroyBuilding={this.destroyBuilding}
              isBuilt={this.state.builtBuildings[pair[0]][pair[1]] === 1 ? true : false}
            />
          )
        }

        <OrbitControls 
          minDistance={10} 
          maxDistance={25} 
          maxPolarAngle={1.3}
          keyPanSpeed={1}
        />
      </Canvas>
    </>
  )
  }
}

export default App;

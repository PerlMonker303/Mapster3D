import React, {Component, Suspense} from "react";
import {Canvas} from "react-three-fiber";
import * as THREE from 'three';
import "./App.scss";
import HUD from './HUD/HUD';
import Ground from './Ground/Ground';
import Building from './Building/Building';
import Sky from './Sky/Sky.js';
import {saveFile} from './Management/Save';

import {OrbitControls} from "@react-three/drei";
import {tile_mappings_textures_codes} from './Mappings/MappingCodes';
import {buildings_levels_codes, buildings_textures_codes} from './Mappings/MappingBuildings';

// TO DO: 
// - add the concept of time
// - add economy
// - add more sprites (levels 3,4,5)
// - create a road in 3D - with sidewalk and everything

// BUGS:
// - load save and orient buildings
// - fix clouds
// - map size must be odd numbers
// - fix raytracing issue

class App extends Component {
  constructor(props) {
    super(props);
    const n = 30;
    const m = 30;
    const today = new Date();
    this.state = {
      mapSize: [n,m],
      selected_option_type: 'none',
      tileMapTextures: Array(n).fill().map(()=>Array(m).fill(0)),
      tileMapZones: Array(n).fill().map(()=>Array(m).fill(0)),
      tileMapObjects: Array(n).fill().map(()=>Array(m).fill(0)),
      gridShow: false,
      texturesShow: true,
      buildingsShow: true,
      buildingCoordinates: [],
      builtBuildings: Array(n).fill().map(()=>Array(m).fill(0)),
      buildingKeys: {},
      buildingKeysList: [],
      buildingKeysCurrent: 0,
      buildings: {},
      pipesCoordinates: [],
      loaded: false,
      canLoad: true,
      funds: 10000,
      sweageMode: false,
      date: {
        year: today.getFullYear(),
        month: today.getMonth() + 1,
        day: today.getDate()
      }
    }
  }

  incrementDate = () => {
    let currentYear = this.state.date.year;
    let currentMonth = this.state.date.month;
    let currentDay = this.state.date.day;
    
    currentDay += 1;
    if(currentDay === 30){
      currentDay = 1;
      currentMonth += 1;
      if(currentMonth === 12){
        currentMonth = 1;
        currentYear += 1;
      }
    }

    this.setState({date: {
      year: currentYear,
      month: currentMonth,
      day: currentDay
    }})
  }

  changeSelectedOptionType = (newType) => {
    this.setState({selected_option_type: newType})
    if(newType === 'pipe'){
      this.setState({sewageMode: true});
    }else if(this.state.sewageMode === true){
      this.setState({sewageMode: false});
    }
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
    else if(this.state.tileMapTextures[x][y] === 12){
      // restriction of not zoning on water
      return;
    }
    if(!this.neighborIsRoad([x,y])){
      // restriction of zoning near roads
      // NOT USED - we want buildings wider than 1xn
      //return;
    }
    if(this.state.builtBuildings[x][y] === 1){
      // restriction of not zoning over a building
      return;
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
    }else{
      // start building
      this.startBuilding([x,y,value]);
      this.setState({canLoad: false});
      setTimeout(() => {
          this.setState({canLoad: true});
      }, 5000);
    }
  }

  setTileMapObject = ([x,y], value = -1) => {
    let currentPipesCoordinates = this.state.pipesCoordinates;

    currentPipesCoordinates.push([x,y]);
    this.updateObjectsEnv([x,y],value,'pipe');

    this.setState({
      pipesCoordinates: currentPipesCoordinates
    });
  }

  changeGridShow = () => {
    this.setState({gridShow: !this.state.gridShow});
  }

  changeTexturesShow = () => {
    this.setState({texturesShow: !this.state.texturesShow});
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

  updateObjectsEnv = ([x, y], value, type, neighbour = false) => {
    let left = false;
    let right = false;
    let top = false;
    let bottom = false;
    // left
    if(x > 0 && this.state.tileMapObjects[x-1][y] > 0 && this.state.tileMapObjects[x-1][y] <= 11){
      left = true;
    }
    if(y > 0 && this.state.tileMapObjects[x][y-1] > 0 && this.state.tileMapObjects[x][y-1] <= 11){
      top = true;
    }
    if(x < this.state.tileMapObjects.length-1 && this.state.tileMapObjects[x+1][y] > 0 && this.state.tileMapObjects[x+1][y] <= 11){
      right = true;
    }
    if(y < this.state.tileMapObjects[0].length-1 && this.state.tileMapObjects[x][y+1] > 0 && this.state.tileMapObjects[x][y+1] <= 11){
      bottom = true;
    }
    
    if(type === 'pipe'){
      if(value === -1){
        // add pipe
        let newValue = 1;
        // change current textures
        if(left && right && top && bottom){
          // 4 way - Pipe 11
          newValue = 11;
        }else if (left && right && top){
          // 3 way - Pipe 8
          newValue = 8;
        }else if(left && right && bottom){
          // 3 way - Pipe 10
          newValue = 10;
        }else if(left && top && bottom){
          // 3 way - Pipe 9
          newValue = 9;
        }else if(right && top && bottom){
          // 3 way - Pipe 7
          newValue = 7;
        }else if(left && right){
          // corner - Pipe 2
          newValue = 2;
        }else if(top && bottom){
          // corner - Pipe 1
          newValue = 1;
        }else if(top && left){
          // corner - Pipe 6
          newValue = 6;
        }else if(top && right){
          // corner - Pipe 5
          newValue = 5;
        }else if(bottom && left){
          // 2 way - Pipe 4
          newValue = 4;
        }else if(bottom && right){
          // 2 way - Pipe 3
          newValue = 3;
        }else if(top || bottom){
          // 2 way - Pipe 1
          newValue = 1;
        }else if(left || right){
          // 2 way - Pipe 2
          newValue = 2;
        }
        let newTileMapObjects = this.state.tileMapObjects;
        newTileMapObjects[x][y] = newValue;
        this.setState({tileMapObjects: newTileMapObjects})

        // change neighbouring objects
      }else if(value === 0){
        // remove pipe
        let newTileMapObjects = this.state.tileMapObjects;
        newTileMapObjects[x][y] = 0;
        this.setState({tileMapObjects: newTileMapObjects})
        if(left) {
          this.updateObjectsEnv([x-1, y], -1, type, true);
        }
        if(right) {
          this.updateObjectsEnv([x+1, y], -1, type, true);
        }
        if(top) {
          this.updateObjectsEnv([x, y-1], -1, type, true);
        }
        if(bottom) {
          this.updateObjectsEnv([x, y+1], -1, type, true);
        }
      }

      // modify neighbours
      if(neighbour === false){
        if(left) {
          this.updateObjectsEnv([x-1, y], -1, type, true);
        }
        if(right) {
          this.updateObjectsEnv([x+1, y], -1, type, true);
        }
        if(top) {
          this.updateObjectsEnv([x, y-1], -1, type, true);
        }
        if(bottom) {
          this.updateObjectsEnv([x, y+1], -1, type, true);
        }
      }
    }
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
        // 4 way - Road 11
        newValue = 11;
      }else if (left && right && top){
        // 3 way - Road 6
        newValue = 6;
      }else if(left && right && bottom){
        // 3 way - Road 5
        newValue = 5;
      }else if(left && top && bottom){
        // 3 way - Road 4
        newValue = 4;
      }else if(right && top && bottom){
        // 3 way - Road 3
        newValue = 3;
      }else if(left && right){
        // 2 way - Road 2
        newValue = 2;
      }else if(top && bottom){
        // 2 way - Road 1
        newValue = 1;
      }else if(top && left){
        // 2 way - Road 10
        newValue = 10;
      }else if(top && right){
        // 2 way - Road 9
        newValue = 9;
      }else if(bottom && left){
        // 2 way - Road 8
        newValue = 8;
      }else if(bottom && right){
        // 2 way - Road 7
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
      this.changeOrientationOfNeighbouringBuildings([x,y],'add');
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
      this.changeOrientationOfNeighbouringBuildings([x,y],'remove');
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

  startBuilding = ([x,y,type]) => {
    let currentBuiltBuildings = this.state.builtBuildings;
    let currentBuildingCoordinates = this.state.buildingCoordinates;
    let currentBuildingKeys = this.state.buildingKeys;
    let currentBuildingKeysList = this.state.buildingKeysList;
    let currentBuildings = this.state.buildings;
    
    currentBuiltBuildings[x][y] = 1;
    currentBuildingCoordinates.push([x,y,type]);
    currentBuildingKeys[this.state.buildingKeysCurrent] = [x,y,type];
    currentBuildingKeysList.push(this.state.buildingKeysCurrent);
    currentBuildings[this.state.buildingKeysCurrent] = {
      'level': 1,
      'orientation': this.checkNearbyRoadDirection([x,y])
    };
    this.setState({
      builtBuildings: currentBuiltBuildings, 
      buildingCoordinates: currentBuildingCoordinates,
      buildingKeys: currentBuildingKeys,
      buildingKeysCurrent: this.state.buildingKeysCurrent + 1,
      buildingKeysList: currentBuildingKeysList,
      buildings: currentBuildings
    }, () => {
      
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
      //console.log("UPDATED TO ", value);
      //builtBuildings[pair[0]][pair[2]] = value;
    });
    this.setState({builtBuildings: builtBuildings});
  }

  getKeyForCoordinates = (coordinates) => {
    let currentBuildingKeys = this.state.buildingKeys; // dictionary
    const keys = Object.keys(currentBuildingKeys).map(key => parseInt(key));
    const thisKey = keys.find(key => (currentBuildingKeys[key][0] === coordinates[0] 
      && currentBuildingKeys[key][1] === coordinates[1]));

    return thisKey;
  }

  clickHandlerBuilding = (buildingCoordinates) => {
    const thisKey = this.getKeyForCoordinates(buildingCoordinates);

    if(this.state.selected_option_type === 'buldoze'){
      // destroy it
      let currentBuiltBuildings = this.state.builtBuildings;
      let currentBuildingKeys = this.state.buildingKeys; // dictionary
      let currentBuildingKeysList = this.state.buildingKeysList; // list
      let currentTileMapZones = this.state.tileMapZones; // zones

      if(currentBuiltBuildings[buildingCoordinates[0]][buildingCoordinates[1]] === 0){
        return;
      }

      currentBuiltBuildings[buildingCoordinates[0]][buildingCoordinates[1]] = 0;
      delete currentBuildingKeys[thisKey];
      currentBuildingKeysList = currentBuildingKeysList.filter(key => key !== thisKey);
      currentTileMapZones[buildingCoordinates[0]][buildingCoordinates[1]] = 0;

      this.setState({
        builtBuildings: currentBuiltBuildings,
        buildingKeys: currentBuildingKeys,
        buildingKeysList: currentBuildingKeysList,
        tileMapZones: currentTileMapZones
      });
    }else if(this.state.selected_option_type === 'upgrade'){
      // level up the building
      let currentBuildings = this.state.buildings;

      currentBuildings[thisKey] = {
        'level': currentBuildings[thisKey]['level'] < 5 ? currentBuildings[thisKey]['level'] + 1 : 5,
        'orientation': currentBuildings[thisKey]['orientation']
      };

      this.setState({
        buildings: currentBuildings
      });
    }else if(this.state.selected_option_type === 'downgrade'){
      // level down the building
      let currentBuildings = this.state.buildings;

      currentBuildings[thisKey] = {
        'level': currentBuildings[thisKey]['level'] > 1 ? currentBuildings[thisKey]['level'] - 1 : 1,
        'orientation': currentBuildings[thisKey]['orientation']
      };

      this.setState({
        buildings: currentBuildings
      });
    }
  }

  saveFileApp = () => {
    // pass the data you want to be persisstent
    const data = JSON.stringify(this.state);
    saveFile(data);
  }

  loadFileApp = () => {
    if(this.state.canLoad){
      const data = JSON.parse(localStorage.getItem("save"));
      if(data === null){
        console.log("Error: no saves could be found.");
        return;
      }
      this.setState(data);
      this.setState({loaded: true});
      data.buildingCoordinates.map(bc => {
        this.changeOrientationOfNeighbouringBuildings([bc],'add');
      })
      setTimeout(() => {
          this.setState({loaded: false});
      }, 1500);
    }else{
      console.log("Error: too early to load. Try again later.");
    }
  }

  checkNearbyRoadDirection = ([x,y]) => {
    let result = 0;
    if(x < this.state.tileMapZones.length-1 && this.state.tileMapTextures[x+1][y] > 0 && this.state.tileMapTextures[x+1][y] <= 11){
      result = 0; // in front of building
    }
    else if(y > 0 && this.state.tileMapTextures[x][y-1] > 0 && this.state.tileMapTextures[x][y-1] <= 11){
      result = 1; // right
    }
    else if(x > 0 && this.state.tileMapTextures[x-1][y] > 0 && this.state.tileMapTextures[x-1][y] <= 11){
      result = 2; // behind building
    }
    else if(y < this.state.tileMapZones[0].length-1 && this.state.tileMapTextures[x][y+1] > 0 && this.state.tileMapTextures[x][y+1] <= 11){
      result = 3; // left
    }
    return result;
  }

  changeOrientationOfNeighbouringBuildings = ([x,y], typeRoadOperation = null) => {
    let neighbours = [];
    if(x < this.state.tileMapZones.length-1 && this.state.tileMapZones[x+1][y] >= 1 && this.state.tileMapZones[x+1][y] <= 3){
      neighbours.push([x+1,y]);
    }
    if(y > 0 && this.state.tileMapZones[x][y-1] >= 1 && this.state.tileMapZones[x][y-1] <= 3){
      neighbours.push([x,y-1]);
    }
    if(x > 0 && this.state.tileMapZones[x-1][y] >= 1 && this.state.tileMapZones[x-1][y] <= 3){
      neighbours.push([x-1,y]);
    }
    if(y < this.state.tileMapZones[0].length-1 && this.state.tileMapZones[x][y+1] >= 1 && this.state.tileMapZones[x][y+1] <= 3){
      neighbours.push([x,y+1]);
    }
    neighbours.map(neighbour => {
      // update neighbours orientation
      const key = this.getKeyForCoordinates(neighbour);
      const orientation = this.checkNearbyRoadDirection(neighbour);
      let currentBuildings = this.state.buildings;
      if((typeRoadOperation === 'add' && orientation !== 0) || typeRoadOperation === 'remove'){
        currentBuildings[key] = {
          'level': currentBuildings[key]['level'],
          'orientation': orientation
        };
      }
      this.setState({buildings: currentBuildings});
    })
  }

  changeBuildingsShow = () => {
    this.setState({buildingsShow: !this.state.buildingsShow});
  }
  
  render(){
  return (
    <>
      <HUD 
          changeGridShow={this.changeGridShow}
          changeTexturesShow={this.changeTexturesShow}
          changeBuildingsShow={this.changeBuildingsShow}
          getBuildingsShow={() => this.state.buildingsShow}
          changeSelectedOptionType={this.changeSelectedOptionType}
          saveFile={this.saveFileApp}
          loadFile={this.loadFileApp}
          incrementDate={this.incrementDate}
          date={this.state.date}
        />
      <div className="CanvasWrapper">
      <Canvas shadowMap colorManagement camera={{position: [-5,12,10], fov: 60}}>
        <ambientLight intensity={0.15} />
        <directionalLight
          castShadow
          position={[0,20,0]}
          intensity={0}
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-far={50}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
        />
        
        <spotLight position={[16,10,16]} intensity={0.8}/>

        <Ground 
          state={this.state}
          setTileMapTexture={this.setTileMapTexture}
          setTileMapZone={this.setTileMapZone}
          setTileMapObject={this.setTileMapObject}
          position={[0,0,0]} 
          size={this.state.mapSize}/>

        {//<Sky mapSize={this.state.mapSize} levelBoundaries={[10,15]} cloudsCount={10}/>
        }

        <Suspense fallback={null}>
        {this.state.buildingKeysList.map((key, i) => 
        {
          const pair = this.state.buildingKeys[key];
          const level = this.state.buildings[key]['level'];
          const height = buildings_levels_codes[level]['height'];
          const orientation = this.state.buildings[key]['orientation'];
          if(pair){
            return(
              <Building 
                key={key}
                position={[pair[0],0,pair[1]]}
                size={[1,height,1]}
                mapSize={this.state.mapSize}
                type={pair[2]}
                clickHandlerBuilding={this.clickHandlerBuilding}
                level={this.state.buildings[key]['level']}
                loaded={this.state.loaded}
                texturesShow={this.state.texturesShow}
                textures={
                  buildings_textures_codes[pair[2]][level]
                }
                defaultTexture={
                  buildings_textures_codes[pair[2]][0]
                }
                orientation={orientation}
                buildingsShow={this.state.buildingsShow}
                sewageMode={this.state.sewageMode}
              />
            )
          }
          }
          )
        }
        </Suspense>

        <OrbitControls 
          minDistance={10} 
          maxDistance={30} 
          maxPolarAngle={1.3}
          keyPanSpeed={1}
        />
      </Canvas>
      </div>
    </>
  )
  }
}

export default App;

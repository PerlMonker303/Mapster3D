import React, {Component, Suspense} from 'react';
import {Canvas} from 'react-three-fiber';
import * as THREE from 'three';
import './App.scss';
import HUD from './HUD/HUD';
import Ground from './Ground/Ground';
import Building from './Building/Building';
import Sky from './Sky/Sky.js';
import {saveFile} from './Management/Save';

import {OrbitControls} from '@react-three/drei';
import {tile_mappings_textures_codes, tile_mappings_zones_codes_inverted} from './Mappings/MappingCodes';
import {buildings_levels_codes, buildings_textures_codes} from './Mappings/MappingBuildings';
import {prices_constructions, prices_expenses_and_revenues} from './Mappings/MappingPrices';
import {tree_mappings} from './Mappings/MappingNature';

// TO DO: 
// - update water av. when adding/removing water tiles
// - add map margins
// - add elevation
// - happines/needs for residential areas (commercial, jobs from industry)
// - show the needs through icons over buildings
// - add parks that improve happiness
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
    const m = 28;
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
      pipes: {},
      pipesKeys: {},
      pipesKeysList: [],
      pipesKeysCurrent: 0,
      waterAvailability: Array(n).fill().map(()=>Array(m).fill(0)),
      trees: {}, // [x, y] => type
      treesKeys: {},
      treesKeysList: [],
      treesKeysCurrent: 0,
      loaded: false,
      canLoad: true,
      funds: 2000,
      sweageMode: false,
      date: {
        year: today.getFullYear(),
        month: today.getMonth() + 1,
        day: today.getDate()
      },
      isPaused: false,
      currentBuildingSelected: null,
      errorCode: null, // string with error name - check MappingInformation.js
      population: 0,
      information: null,
      expenses: 0,
      revenues: 0,
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

  increaseFunds = (value) => {
    const currentFunds = this.state.funds;
    this.setState({funds: currentFunds + value});
  }

  decreaseFunds = (value) => {
    const currentFunds = this.state.funds;
    this.setState({funds: currentFunds - value});
  }

  canBuy = (price) => {
    if(this.state.funds >= price){
      return true;
    }
    return false;
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
        return;
      }
      if(this.state.trees[[x,y]]){
        // deny road placement over trees
        return;
      }
      if(!this.canBuy(prices_constructions['road'])){
        // not enough funds to buy road
        this.setState({errorCode: 'err_not_enough_funds'});
        return;
      }
      this.decreaseFunds(prices_constructions['road']);
    }
    else if(value === 12 || value === 13){
      // deny water/shore tiles over trees
      if(this.state.trees[[x,y]]){
        return;
      }
    }
    let newTileMapTextures = this.state.tileMapTextures;
    newTileMapTextures[x][y] = value;
    this.setState({tileMapTextures: newTileMapTextures})
    this.updateTexturesEnv([x, y], value, tile_mappings_textures);
  }

  setTileMapZone = ([x, y], value) => {
    if(value === 0){
      // restriction of right click
      return;
    }
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
    if(!this.canBuy(prices_constructions[tile_mappings_zones_codes_inverted[value]][1])){
      // restriction of not building if not enough funds are available
      this.setState({errorCode: 'err_not_enough_funds'})
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
    if(this.state.selected_option_type === 'pipe'){
      if(value === -1){ // why value === -1?
        let currentPipes = this.state.pipes;
        if(currentPipes[[x,y]] !== undefined){
          // restriction of placing pipes on existing pipes
          return;
        }
        if(!this.canBuy(prices_constructions['pipe'])){
          // not enough funds to buy pipe
          this.setState({errorCode: 'err_not_enough_funds'});
          return;
        }
        this.decreaseFunds(prices_constructions['pipe']);   

        let currentObjects = this.state.tileMapObjects;
        let currentPipesKeys = this.state.pipesKeys;
        let currentPipesKeysList = this.state.pipesKeysList;
        let currentPipesKeysCurrent = this.state.pipesKeysCurrent;

        // add pipe
        currentObjects[x][y] = 1;
        currentPipes[[x,y]] = 1;
        currentPipesKeys[currentPipesKeysCurrent] = [x,y];
        currentPipesKeysList.push(currentPipesKeysCurrent);
        currentPipesKeysCurrent += 1;
        this.updateObjectsEnv([x,y],value,'pipe');
        this.updateConnectedPipesToSource();

        this.setState({
            tileMapObjects: currentObjects,
            pipes: currentPipes,
            pipesKeys: currentPipesKeys,
            pipesKeysList: currentPipesKeysList,
            pipesKeysCurrent: currentPipesKeysCurrent,
        });
      }
    }else if(this.state.selected_option_type === 'tree'){
      if(value === -1){
        if(this.state.tileMapTextures[x][y] === 12 || this.state.tileMapTextures[x][y] === 13){
          // restriction of not placing trees on water/shore
          return;
        }
        let currentTrees = this.state.trees;
        if(currentTrees[[x,y]] !== undefined){
          // restriction of placing trees on existing trees
          return;
        }
        if(this.state.tileMapTextures[x][y] >= 1 && this.state.tileMapTextures[x][y] <= 11){
          // restriction of placing trees over roads
          return;
        }
        if(!this.canBuy(prices_constructions['tree'])){
          // not enough funds to buy tree
          this.setState({errorCode: 'err_not_enough_funds'});
          return;
        }
        this.decreaseFunds(prices_constructions['tree']);
      
        let currentTreesKeys = this.state.treesKeys;
        let currentTreesKeysList = this.state.treesKeysList;
        let currentTreesKeysCurrent = this.state.treesKeysCurrent;
        const random_type = Math.floor(Math.random() * Object.keys(tree_mappings).length + 1);

        // add tree
        currentTrees[[x,y]] = tree_mappings[random_type];
        currentTreesKeys[currentTreesKeysCurrent] = [x,y,random_type];
        currentTreesKeysList.push(currentTreesKeysCurrent);
        currentTreesKeysCurrent += 1;

        this.setState({
          trees: currentTrees,
          treesKeys: currentTreesKeys,
          treesKeysList: currentTreesKeysList,
          treesKeysCurrent: currentTreesKeysCurrent
        });
      }
    }
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
      else if(x < this.state.mapSize[0] - 1 && this.state.tileMapTextures[x+1][y] > 0 && this.state.tileMapTextures[x+1][y] <= 11){
        result = true;
      }
      else if(y < this.state.mapSize[1] - 1 && this.state.tileMapTextures[x][y+1] > 0 && this.state.tileMapTextures[x][y+1] <= 11){
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
    if(x < this.state.mapSize[0] - 1 && this.state.tileMapObjects[x+1][y] > 0 && this.state.tileMapObjects[x+1][y] <= 11){
      right = true;
    }
    if(y < this.state.mapSize[1] - 1 && this.state.tileMapObjects[x][y+1] > 0 && this.state.tileMapObjects[x][y+1] <= 11){
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
    if(x < this.state.mapSize[0] - 1 && this.state.tileMapTextures[x+1][y] > 0 && this.state.tileMapTextures[x+1][y] <= 11){
      right = true;
    }
    if(y < this.state.mapSize[1]-1 && this.state.tileMapTextures[x][y+1] > 0 && this.state.tileMapTextures[x][y+1] <= 11){
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
    let currentPopulation = this.state.population;
    let currentExpenses = this.state.expenses;
    let currentRevenues = this.state.revenues;
    
    currentBuiltBuildings[x][y] = 1;
    currentBuildingCoordinates.push([x,y,type]);
    currentBuildingKeys[this.state.buildingKeysCurrent] = [x,y,type];
    currentBuildingKeysList.push(this.state.buildingKeysCurrent);
    currentBuildings[this.state.buildingKeysCurrent] = {
      'type': type,
      'level': 1,
      'orientation': this.checkNearbyRoadDirection([x,y]),
      'price': prices_constructions[tile_mappings_zones_codes_inverted[type]][1],
      'residents': type === 1 ? buildings_levels_codes[1]['residents'] : 0
    };
    currentPopulation += (type === 1 ? buildings_levels_codes[1]['residents'] : 0);
    const delta = prices_expenses_and_revenues[tile_mappings_zones_codes_inverted[type]][1];
    if(delta > 0){
      currentRevenues += delta;
    }else{
      currentExpenses += delta;
    }

    this.setState({
      builtBuildings: currentBuiltBuildings, 
      buildingCoordinates: currentBuildingCoordinates,
      buildingKeys: currentBuildingKeys,
      buildingKeysCurrent: this.state.buildingKeysCurrent + 1,
      buildingKeysList: currentBuildingKeysList,
      buildings: currentBuildings,
      population: currentPopulation,
      expenses: currentExpenses,
      revenues: currentRevenues
    }, () => {
      // pay the price
      this.decreaseFunds(prices_constructions[tile_mappings_zones_codes_inverted[type]][1]);
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

  getKeyForCoordinates = ([x,y], type) => {
    let thisKey = null;
    if(type === 'building'){
      let currentBuildingKeys = this.state.buildingKeys; // dictionary
      const keys = Object.keys(currentBuildingKeys).map(key => parseInt(key));
      thisKey = keys.find(key => (currentBuildingKeys[key] !== undefined && currentBuildingKeys[key][0] === x 
        && currentBuildingKeys[key][1] === y));
    }else if(type === 'pipe'){
      let currentPipesKeys = this.state.pipesKeys; // dictionary
      const keys = Object.keys(currentPipesKeys).map(key => parseInt(key));
      thisKey = keys.find(key => (currentPipesKeys[key] !== undefined && currentPipesKeys[key][0] === x 
        && currentPipesKeys[key][1] === y));
    }else if(type === 'tree'){
      let currentTreesKeys = this.state.treesKeys; // dictionary
      const keys = Object.keys(currentTreesKeys).map(key => parseInt(key));
      thisKey = keys.find(key => (currentTreesKeys[key] !== undefined && currentTreesKeys[key][0] === x 
        && currentTreesKeys[key][1] === y));
    }

    return thisKey;
  }

  clickHandlerBuilding = (event, buildingCoordinates) => {
    event.stopPropagation();
    const thisKey = this.getKeyForCoordinates(buildingCoordinates, 'building');
    if(this.state.currentBuildingSelected !== null){
      this.setState({currentBuildingSelected: null});
    }
    if(this.state.selected_option_type === 'select'){
      //console.log(buildingCoordinates); // [0] [1]
      const building = this.state.buildings[thisKey];
      this.setState({currentBuildingSelected: building});
      
    }
    else if(this.state.selected_option_type === 'buldoze'){
      // destroy it
      let currentBuiltBuildings = this.state.builtBuildings;
      let currentBuildingKeys = this.state.buildingKeys; // dictionary
      let currentBuildingKeysList = this.state.buildingKeysList; // list
      let currentTileMapZones = this.state.tileMapZones; // zones
      const building = this.state.buildings[thisKey];
      let currentPopulation = this.state.population;
      let currentRevenues = this.state.revenues;
      let currentExpenses = this.state.expenses;

      currentPopulation -= building['residents'];
      const currentDelta = prices_expenses_and_revenues[tile_mappings_zones_codes_inverted[building['type']]][building['level']];
      
      if(currentDelta > 0){
        currentRevenues -= currentDelta;
      }else{
        currentExpenses -= currentDelta;
      }

      if(currentBuiltBuildings[buildingCoordinates[0]][buildingCoordinates[1]] === 0){
        return;
      }

      currentBuiltBuildings[buildingCoordinates[0]][buildingCoordinates[1]] = 0;
      //currentBuildingKeys[thisKey] = undefined;
      delete currentBuildingKeys[thisKey];
      currentBuildingKeysList = currentBuildingKeysList.filter(key => key !== thisKey);
      currentTileMapZones[buildingCoordinates[0]][buildingCoordinates[1]] = 0;

      this.setState({
        builtBuildings: currentBuiltBuildings,
        buildingKeys: currentBuildingKeys,
        buildingKeysList: currentBuildingKeysList,
        tileMapZones: currentTileMapZones,
        population: currentPopulation,
        revenues: currentRevenues,
        expenses: currentExpenses
      });

    }else if(this.state.selected_option_type === 'upgrade'){ 
      let currentBuildings = this.state.buildings;
      const currentLevel = currentBuildings[thisKey]['level'];
      let nextPrice = prices_constructions[tile_mappings_zones_codes_inverted[currentBuildings[thisKey]['type']]][currentLevel];

      let currentRevenues = this.state.revenues;
      let currentExpenses = this.state.expenses;
      let currentDelta = 0

      let nextPopulation = 0
      if(currentLevel < 5){
        nextPopulation = buildings_levels_codes[currentLevel + 1]['residents'] - buildings_levels_codes[currentLevel]['residents'];
        nextPrice = prices_constructions[tile_mappings_zones_codes_inverted[currentBuildings[thisKey]['type']]][currentLevel + 1]
        currentDelta = prices_expenses_and_revenues[tile_mappings_zones_codes_inverted[currentBuildings[thisKey]['type']]][currentLevel + 1];
      }

      if(currentDelta > 0){
        currentRevenues += currentDelta;
      }else{
        currentExpenses += currentDelta;
      }

      let currentPopulation = this.state.population;
      currentPopulation += nextPopulation;

      if(!this.canBuy(nextPrice)){
        // not enough funds to upgrade
        this.setState({errorCode: 'err_not_enough_funds'});
        return;
      }
      // level up the building

      currentBuildings[thisKey] = {
        'type': currentBuildings[thisKey]['type'],
        'level': currentBuildings[thisKey]['level'] < 5 ? currentBuildings[thisKey]['level'] + 1 : 5,
        'orientation': currentBuildings[thisKey]['orientation'],
        'price': nextPrice,
        'residents': nextPopulation
      };

      this.setState({
        buildings: currentBuildings,
        population: currentPopulation,
        revenues: currentRevenues,
        expenses: currentExpenses
      });
      this.buildingHoverIn(event, buildingCoordinates);
      this.decreaseFunds(nextPrice);
    }else if(this.state.selected_option_type === 'downgrade'){
      // level down the building
      let currentBuildings = this.state.buildings;
      const currentLevel = currentBuildings[thisKey]['level'];
      let nextPrice = prices_constructions[tile_mappings_zones_codes_inverted[currentBuildings[thisKey]['type']]][currentLevel];
      
      let currentRevenues = this.state.revenues;
      let currentExpenses = this.state.expenses;
      let currentDelta = 0;

      let nextPopulation = 0;
      if(currentLevel > 1){
        nextPopulation = buildings_levels_codes[currentLevel]['residents'] - buildings_levels_codes[currentLevel - 1]['residents']; // this level, not previous
        nextPrice = prices_constructions[tile_mappings_zones_codes_inverted[currentBuildings[thisKey]['type']]][currentLevel]
        currentDelta = prices_expenses_and_revenues[tile_mappings_zones_codes_inverted[currentBuildings[thisKey]['type']]][currentLevel];
      }

      if(currentDelta > 0){
        currentRevenues -= currentDelta;
      }else{
        currentExpenses -= currentDelta;
      }
      
      let currentPopulation = this.state.population;
      currentPopulation -= nextPopulation;

      currentBuildings[thisKey] = {
        'type': currentBuildings[thisKey]['type'],
        'level': currentBuildings[thisKey]['level'] > 1 ? currentBuildings[thisKey]['level'] - 1 : 1,
        'orientation': currentBuildings[thisKey]['orientation'],
        'price': nextPrice,
        'residents': nextPopulation
      };

      this.setState({
        buildings: currentBuildings,
        population: currentPopulation,
        revenues: currentRevenues,
        expenses: currentExpenses
      });
      this.buildingHoverIn(event, buildingCoordinates);
    }
  }

  saveFileApp = () => {
    // pass the data you want to be persisstent
    const data = JSON.stringify(this.state);
    const date = new Date();
    saveFile(data, date);
    this.setState({information: 'Saved. You may now exit the simulation'});
  }

  loadFileApp = () => {
    if(this.state.canLoad){
      const data = JSON.parse(localStorage.getItem("save"));
      const date = localStorage.getItem("save_date");
      if(data === null){
        this.setState({errorCode: 'err_load_no_save'});
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
      this.setState({information: 'Simulation loaded from ' + date});
    }else{
      this.setState({errorCode: 'err_load_too_early'});
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
      const key = this.getKeyForCoordinates(neighbour, 'building');
      const orientation = this.checkNearbyRoadDirection(neighbour);
      let currentBuildings = this.state.buildings;
      if((typeRoadOperation === 'add' && orientation !== 0) || typeRoadOperation === 'remove'){
        currentBuildings[key] = { 
          'type': currentBuildings[key]['type'],
          'level': currentBuildings[key]['level'],
          'orientation': orientation,
          'price': prices_constructions[tile_mappings_zones_codes_inverted[currentBuildings[key]['type']]][1],
          'residents': buildings_levels_codes[currentBuildings[key]['level']]['residents']
        };
      }
      this.setState({buildings: currentBuildings});
    })
  }

  changeBuildingsShow = () => {
    this.setState({buildingsShow: !this.state.buildingsShow});
  }

  disableCurrentBuildingSelected = () => {
    this.setState({currentBuildingSelected: null});
  }

  setIsPausedApp = (value) => {
    this.setState({isPaused: value});
  }

  disableErrorCode = () => {
    this.setState({errorCode: null});
  }

  buildingHoverIn = (event, buildingCoordinates) => {
    event.stopPropagation();
    const key = this.getKeyForCoordinates([buildingCoordinates[0],buildingCoordinates[1]], 'building');
    const building = this.state.buildings[key];
    const typeOfBuilding = tile_mappings_zones_codes_inverted[building.type];
    if(this.state.selected_option_type === 'upgrade'){
      const nextLevel = building.level + 1;
      const priceNextLevel = prices_constructions[typeOfBuilding][nextLevel];
      let infoText = 'Reached maximum level';
      if(building.level < 5){
        infoText = 'Upgrade ' + typeOfBuilding + ' building for ' + priceNextLevel + '$';
      }
      this.setState({information: infoText});
    }else if(this.state.selected_option_type === 'downgrade'){
      let infoText = 'Can not be downgraded';
      if(building.level > 1){
        infoText = 'Downgrade ' + typeOfBuilding + ' building';
      }
      this.setState({information: infoText});
    }
  }

  buildingHoverOut = (event) => {
    event.stopPropagation();
    this.setState({information: null});
    if(this.state.errorCode){
      this.disableErrorCode();
    }
  }

  cycleFinished = () => {
    const expenses = this.state.expenses;
    const revenues = this.state.revenues;
    let newFunds = this.state.funds + (revenues + expenses);
    this.setState({funds: newFunds});
  }

  removePipe = (event, [x,y]) => {
    event.stopPropagation();
    const thisKey = this.getKeyForCoordinates([x,y], 'pipe');

    let currentObjects = this.state.tileMapObjects;
    let currentPipes = this.state.pipes;
    let currentPipesKeys = this.state.pipesKeys;
    let currentPipesKeysList = this.state.pipesKeysList;

    currentObjects[x][y] = 0;
    //currentPipes[[x,y]] = undefined;
    delete currentPipes[[x,y]];
    currentPipesKeysList = currentPipesKeysList.filter(key => key !== thisKey);
    //currentPipesKeys[thisKey] = undefined;
    delete currentPipesKeys[thisKey];

    this.setState({
      tileMapObjects: currentObjects,
      pipes: currentPipes,
      pipesKeys: currentPipesKeys,
      pipesKeysList: currentPipesKeysList
    });

    this.updateObjectsEnv([x,y], 0, 'pipe');

    this.updateConnectedPipesToSource();
  }

  removeTree = (event, [x,y]) => {
    event.stopPropagation();
    const thisKey = this.getKeyForCoordinates([x,y], 'tree');

    let currentTrees = this.state.trees;
    let currentTreesKeys = this.state.treesKeys;
    let currentTreesKeysList = this.state.treesKeysList;

    //currentTrees[[x,y]] = undefined;
    delete currentTrees[[x,y]];
    currentTreesKeysList = currentTreesKeysList.filter(key => key !== thisKey);
    //currentTreesKeys[thisKey] = undefined;
    delete currentTreesKeys[thisKey];

    this.setState({
      trees: currentTrees,
      treesKeys: currentTreesKeys,
      treesKeysList: currentTreesKeysList
    });
  }

  setInformation = (info) => {
    this.setState({information: info});
  }

  updateWaterAvailability = (currentWaterAvailability, [x,y], value) => {
    if(value === 1){
      // added a pipe
      // change neighbouring tiles as well
      if(x > 0){
        currentWaterAvailability[x-1][y] = value;
      }
      if(y > 0){
        currentWaterAvailability[x][y-1] = value;
      }
      if(x < this.state.mapSize[0] - 1){
        currentWaterAvailability[x+1][y] = value;
      }
      if(y < this.state.mapSize[1] - 1){
        currentWaterAvailability[x][y+1] = value;
      }
      currentWaterAvailability[x][y] = value;
    }else if(value === 0){
      console.log(this.state.pipes);
      // removed a pipe
      let hasNeighbourPipe = false;
      if(x > 0){
        if(!this.state.pipes[[x-1,y]]){
          currentWaterAvailability[x-1][y] = value;
        }else{
          hasNeighbourPipe = true;
        }
      }
      if(y > 0){
        if(!this.state.pipes[[x,y-1]]){
          currentWaterAvailability[x][y-1] = value;
        }else{
          hasNeighbourPipe = true;
        }
      }
      if(x < this.state.mapSize[0] - 1){
        if(!this.state.pipes[[x+1,y]]){
          currentWaterAvailability[x+1][y] = value;
        }else{
          hasNeighbourPipe = true;
        }
      }
      if(y < this.state.mapSize[1] - 1){
        if(!this.state.pipes[[x,y+1]]){
          currentWaterAvailability[x][y+1] = value;
        }else{
          hasNeighbourPipe = true;
        }
      }
      
      if(!hasNeighbourPipe){ // no neighbour, so no water for this tile
        currentWaterAvailability[x][y] = value;
      }
    }

    return currentWaterAvailability;
  }

  updateConnectedPipesToSource = () => {
    // checks whether the sewage system is connected to a water source
    const pipesKeys = this.state.pipesKeys;
    const pipesKeysList = this.state.pipesKeysList;
    
    // check all neighbours of pipes if tile is water
    const connected = pipesKeysList.filter(key => pipesKeys[key] && this.checkNeighbourTileWater(pipesKeys[key]));
    // starting from these pipes, traverse the map and mark the water availability
    // reset water availability
    let updatedWaterAvailability = Array(this.state.mapSize[0]).fill().map(()=>Array(this.state.mapSize[0]).fill(0));
    
    // for each connected pipe, go to neighbours where water is not available
    // first obtain the neighbours who do not have water
    connected.map(key => {
      const coords = pipesKeys[key];
      updatedWaterAvailability = this.traversePipes(coords, updatedWaterAvailability);
    });

    this.setState({waterAvailability: updatedWaterAvailability});
  }

  traversePipes = ([x,y], waterAvailability) => {
    // check neighbours - if they are a pipe and have no water available => choose them
    let neighbours = [];
    if(x > 0 && waterAvailability[x-1][y] === 0 && this.state.pipes[[x-1,y]] === 1){
      neighbours.push([x-1,y]);
    }
    if(y > 0 && waterAvailability[x][y-1] === 0 && this.state.pipes[[x,y-1]]  === 1){
      neighbours.push([x,y-1]);
    }
    if(x < this.state.mapSize[0] - 1 && waterAvailability[x+1][y] === 0 && this.state.pipes[[x+1,y]]  === 1){
      neighbours.push([x+1,y]);
    }
    if(y < this.state.mapSize[1] - 1 && waterAvailability[x][y+1] === 0 && this.state.pipes[[x,y+1]]  === 1){
      neighbours.push([x,y+1]);
    }

    // update water av for current pipe + neighbours
    waterAvailability = this.updateWaterAvailability(waterAvailability, [x,y], 1);

    neighbours.map(coords => {
      waterAvailability = this.traversePipes(coords, waterAvailability);
    })

    return waterAvailability;
  }

  checkNeighbourTileWater = ([x,y]) => {
    let result = false;
    if(x > 0 && this.state.tileMapTextures[x-1][y] === 12){
      return true;
    }
    if(y > 0 && this.state.tileMapTextures[x][y-1] === 12){
      return true;
    }
    if(x < this.state.mapSize[0] - 1 && this.state.tileMapTextures[x+1][y] === 12){
      return true;
    }
    if(y < this.state.mapSize[1] - 1 && this.state.tileMapTextures[x][y+1] === 12){
      return true;
    }

    return result;
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
          funds={this.state.funds}
          revenues={this.state.revenues}
          expenses={this.state.expenses}
          date={this.state.date}
          isPaused={this.state.isPaused}
          setIsPausedApp={(value) => this.setIsPausedApp(value)}
          currentBuildingSelected={this.state.currentBuildingSelected}
          disableCurrentBuildingSelected={this.disableCurrentBuildingSelected}
          errorCode={this.state.errorCode}
          disableErrorCode={this.disableErrorCode}
          population={this.state.population}
          information={this.state.information}
          setInformation={this.setInformation}
          cycleFinished={this.cycleFinished}
        />
      <div className="CanvasWrapper">
      <Canvas className={this.state.isPaused ? 'isPaused' : null} shadowMap colorManagement camera={{position: [-5,12,10], fov: 60}}>
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
          size={this.state.mapSize}
          removePipe={this.removePipe}
          removeTree={this.removeTree}/>

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
                isPaused={this.state.isPaused}
                buildingHoverIn={this.buildingHoverIn}
                buildingHoverOut={this.buildingHoverOut}
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

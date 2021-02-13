import {prices_constructions} from './MappingPrices';


export const information_mappings_zones_codes = {
    'select': {
        title: 'Select',
        information: ''
    },
    'grid': {
        title: 'Grid',
        information: 'Switch the grid on/off'
    },
    'textures':{
        title: 'Textures',
        information: 'Switch the textures on/off'
    },
    'buildings_on': {
        title: 'Buildings',
        information: 'Hide buildings'
    },
    'buildings_off': {
        title: 'Buildings',
        information: 'Show buildings'
    },
    'road': {
        title: 'Road',
        information: 'Place two-lane roads (left-click to place, right-click to remove) \nPrice: ' + prices_constructions['road'] + '$'
    },
    'pipe': {
        title: 'Pipe',
        information: 'Place pipes to build a sewage system for your city \nPrice: ' + prices_constructions['pipe'] + '$'
    },
    'water': {
        title: 'Water',
        information: 'Place water tiles (left-click to place, right-click to remove)'
    },
    'shore': {
        title: 'Shore',
        information: 'Place shore tiles to contain the water (left-click to place, right-click to remove)'
    },
    'residential': {
        title: 'Residential area',
        information: 'Construct residential area buildings (houses, apartments,flats) \nPrice: ' + prices_constructions['residential'][1] + '$'
    },
    'commercial': {
        title: 'Commercial area',
        information: 'Construct commercial zones (shops) \nPrice: ' + prices_constructions['commercial'][1] + '$'
    },
    'industry': {
        title: 'Industry area',
        information: 'Construct industrial zones (factories, offices) \nPrice: ' +  + prices_constructions['industry'][1] + '$'
    },
    'upgrade': {
        title: 'Upgrade',
        information: 'Upgrade a building'
    },
    'downgrade': {
        title: 'Downgrade',
        information: 'Downgrade a building'
    },
    'buldoze': {
        title: 'Buldoze',
        information: 'Destroy constructed buildings'
    },
    'save': {
        title: 'Save',
        information: 'Save the city to the local storage'
    },
    'load': {
        title: 'Load',
        information: 'Load the city from the local storage'
    },
    'pause': {
        title: 'Pause',
        information: 'Pause the simulation'
    },
    'play': {
        title: 'Play',
        information: 'Play the simulation at the normal speed'
    },
    'fast1': {
        title: 'Fast 1',
        information: 'Increase the simulation speed x2'
    },
    'fast2': {
        title: 'Fast 2',
        information: 'Increase the simulation speed x4'
    },
    'err_not_enough_funds': {
        title: 'Not enough funds',
        information: 'The building you are trying to create is too expensive'
    }
}
import {prices_constructions, prices_expenses_and_revenues} from './MappingPrices';


export const information_mappings_zones_codes = {
    'select': {
        title: 'Select',
        information: 'Learn more about the buildings from the city'
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
    'tree': {
        title: 'Tree',
        information: 'Place trees of different sizes'
    },
    'elevate':{
        title: 'Elevate terrain',
        information: '(Experimental) Increase the terrain level'
    },
    'residential': {
        title: 'Residential area',
        information: 'Construct residential area buildings (houses, apartments,flats) \nPrice: ' + prices_constructions['residential'][1] + '$\nRevenues: ' + prices_expenses_and_revenues['residential'][1] + '$'
    },
    'commercial': {
        title: 'Commercial area',
        information: 'Construct commercial zones (shops) \nPrice: ' + prices_constructions['commercial'][1] + '$\nExpenses: ' + prices_expenses_and_revenues['commercial'][1] + '$'
    },
    'industry': {
        title: 'Industry area',
        information: 'Construct industrial zones (factories, offices, farms) \nPrice: ' +  + prices_constructions['industry'][1] + '$\nExpenses: ' + prices_expenses_and_revenues['industry'][1] + '$'
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
    'funds':{
        title: 'Funds',
        information: 'How much money you currently own'
    },
    'population':{
        title: 'Population',
        information: 'Current city population'
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
    'revenues': {
        title: 'Revenues',
        information: 'Generated by residential areas'
    },
    'expenses': {
        title: 'Expenses',
        information: 'Generated by commercial and industrial areas'
    },
    'err_not_enough_funds': {
        title: 'Not enough funds',
        information: 'The building you are trying to create is too expensive'
    },
    'err_load_too_early': {
        title: 'Loading cooldown',
        information: 'Please wait a few seconds before reloading a map'
    },
    'err_load_no_save': {
        title: 'Loading error',
        information: 'There are no saves to be loaded'
    }
}
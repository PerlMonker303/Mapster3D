import React from 'react';

import './HUD.scss';
import {save} from '../Management/Save';

const HUD = ({changeGridShow, changeSelectedBuildingType, startBuilding}) => {
    return (
        <div className='HUD'>
            <label className='HUD_button'>Menu</label>
            <label className='HUD_button' onClick={() => changeGridShow()}>Grid</label>
            <label className='HUD_button' onClick={() => changeSelectedBuildingType('road')}>Road</label>
            <label className='HUD_button' onClick={() => changeSelectedBuildingType('residential')}>Residential</label>
            <label className='HUD_button' onClick={() => changeSelectedBuildingType('commercial')}>Commercial</label>
            <label className='HUD_button' onClick={() => changeSelectedBuildingType('industry')}>Industry</label>
            <label className='HUD_button' onClick={() => startBuilding()}>Build</label>
            <label className='HUD_button' onClick={() => changeSelectedBuildingType('buldoze')}>Buldoze</label>
            <label className='HUD_button' onClick={() => save()}>Save</label>
            <label className='HUD_button' onClick={() => {}}>Load</label>
        </div>
    )
}

export default HUD;
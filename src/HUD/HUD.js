import React from 'react';

import './HUD.scss';

const HUD = ({changeGridShow, changeTexturesShow, changeSelectedOptionType, saveFile, loadFile}) => {
    return (
        <div className='HUD'>
            <label className='HUD_button' onClick={() => changeSelectedOptionType('menu')}>Menu</label>
            <label className='HUD_button' onClick={() => changeGridShow()}>Grid</label>
            <label className='HUD_button' onClick={() => changeTexturesShow()}>Textures</label>
            <label className='HUD_button' onClick={() => changeSelectedOptionType('road')}>Road</label>
            <label className='HUD_button' onClick={() => changeSelectedOptionType('residential')}>Residential</label>
            <label className='HUD_button' onClick={() => changeSelectedOptionType('commercial')}>Commercial</label>
            <label className='HUD_button' onClick={() => changeSelectedOptionType('industry')}>Industry</label>
            <label className='HUD_button' onClick={() => changeSelectedOptionType('buldoze')}>Buldoze</label>
            <label className='HUD_button' onClick={() => changeSelectedOptionType('upgrade')}>Upgrade</label>
            <label className='HUD_button' onClick={() => changeSelectedOptionType('downgrade')}>Downgrade</label>
            <label className='HUD_button' onClick={() => saveFile()}>Save</label>
            <label className='HUD_button' onClick={(event) => loadFile(event)}>Load</label>
        </div>
    )
}

export default HUD;
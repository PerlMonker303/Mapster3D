import React, {useState, useEffect, useRef} from 'react';

import icon_select from '../assets/icons/icon_select.png';
import icon_grid from '../assets/icons/icon_grid.png';
import icon_texture from '../assets/icons/icon_texture.png';
import icon_buildings_on from '../assets/icons/icon_buildings_on.png';
import icon_buildings_off from '../assets/icons/icon_buildings_off.png';
import icon_road from '../assets/icons/icon_road.png';
import icon_pipe from '../assets/icons/icon_pipe.png';
import icon_water from '../assets/icons/icon_water.png';
import icon_shore from '../assets/icons/icon_shore.png';
import icon_residential from '../assets/icons/icon_residential.png';
import icon_commercial from '../assets/icons/icon_commercial.png';
import icon_industry from '../assets/icons/icon_industry.png';
import icon_buldoze from '../assets/icons/icon_buldoze.png';
import icon_upgrade from '../assets/icons/icon_upgrade.png';
import icon_downgrade from '../assets/icons/icon_downgrade.png';
import icon_save from '../assets/icons/icon_save.png';
import icon_load from '../assets/icons/icon_load.png';
import icon_pause from '../assets/icons/icon_pause.png';
import icon_play from '../assets/icons/icon_play.png';
import icon_fast1 from '../assets/icons/icon_fast1.png';
import icon_fast2 from '../assets/icons/icon_fast2.png';

import {information_mappings_zones_codes} from '../Mappings/MappingInformation';
import {tile_mappings_zones_codes_inverted} from '../Mappings/MappingCodes';


import './HUD.scss';

const HUD = ({
    changeGridShow,
    changeTexturesShow,
    changeBuildingsShow,
    getBuildingsShow,
    changeSelectedOptionType,
    saveFile,
    loadFile,
    incrementDate,
    funds,
    date,
    isPaused,
    setIsPausedApp,
    currentBuildingSelected,
    disableCurrentBuildingSelected,
    errorCode,
    disableErrorCode,
    population}) => {
    
    const defaultTitle = 'Information area';
    const defaultInformation = 'Hover over icons to learn more';
    const [currentTitle, setCurrentTitle] = useState(defaultTitle);
    const [currentInformation, setCurrentInformation] = useState(defaultInformation);
    const [progress, setProgress] = useState(0);
    const [reload, setReload] = useState(true);
    const [paused, setPaused] = useState(isPaused);
    const [timelapseMode, setTimelapseMode] = useState(0); // 0, 1, 2
    //const [miliseconds, setMiliseconds] = useState(0);
    const timeLapseModes = {
        0: {
            incrementInterval: 2000
        },
        1: {
            incrementInterval: 1000
        },
        2: {
            incrementInterval: 500
        }
    }

    useEffect(() => {
        if(paused){
            return;
        }
        let interval = null;
        if (reload) {
          interval = setInterval(() => {
            if(!paused)
                setProgress(prog => prog + 10);
            if(progress >= 100){
                setProgress(0);
                incrementDate();
            }
          }, timeLapseModes[timelapseMode].incrementInterval);
        } else if (!reload && progress < 100) {
            clearInterval(interval);
            setProgress(0);
        }
        return () => clearInterval(interval);
    }, [reload, progress, paused]);

    
    const iconMouseEnter = (icon) => {
        if(currentBuildingSelected !== null){
            disableCurrentBuildingSelected();
        }
        if(errorCode !== null){
            disableErrorCode();
        }
        setCurrentTitle(information_mappings_zones_codes[icon].title);
        setCurrentInformation(information_mappings_zones_codes[icon].information);
    }

    const iconMouseLeave = (icon) => {
        if(currentBuildingSelected !== null){
            disableCurrentBuildingSelected();
        }
        if(errorCode !== null){
            disableErrorCode();
        }
        setCurrentTitle(defaultTitle);
        setCurrentInformation(defaultInformation);
    }

    const pause = () => {
        setPaused(true);
        setIsPausedApp(true);
    }

    const play = () => {
        setPaused(false);
        setIsPausedApp(false);
        setTimelapseMode(0);
    }

    const fast1 = () => {
        setPaused(false);
        setIsPausedApp(false);
        setTimelapseMode(1);
    }

    const fast2 = () => {
        setPaused(false);
        setIsPausedApp(false);
        setTimelapseMode(2);
    }

    return (
        <div className='HUD'>
            <section className='HUD_left'>
                <section className='HUD_section'>
                    <section className='HUD_button' 
                        onClick={() => changeSelectedOptionType('select')} 
                        onMouseEnter={() => iconMouseEnter('select')} 
                        onMouseLeave={() => iconMouseLeave('select')}
                    >
                        <img className='HUD_icon' src={icon_select} alt='icon_select'/>
                    </section>
                </section>
                <section className='HUD_section'>
                    <section className='HUD_button' onClick={() => changeGridShow()}
                        onMouseEnter={() => iconMouseEnter('grid')} 
                        onMouseLeave={() => iconMouseLeave('grid')}
                    >
                        <img className='HUD_icon' src={icon_grid} alt='icon_grid'/>
                    </section>
                    <section className='HUD_button' onClick={() => changeTexturesShow()}
                        onMouseEnter={() => iconMouseEnter('textures')} 
                        onMouseLeave={() => iconMouseLeave('textures')}
                    >
                        <img className='HUD_icon' src={icon_texture} alt='icon_texture'/>
                    </section>
                    <section className='HUD_button' onClick={() => {
                        changeBuildingsShow();
                        iconMouseEnter(!getBuildingsShow() ? 'buildings_on' : 'buildings_off')}}
                        onMouseEnter={() => iconMouseEnter(getBuildingsShow() ? 'buildings_on' : 'buildings_off')} 
                        onMouseLeave={() => iconMouseLeave(getBuildingsShow() ? 'buildings_on' : 'buildings_off')}
                    >
                        <img className='HUD_icon' src={getBuildingsShow() ? icon_buildings_on : icon_buildings_off} alt='icon_buildings_onoff'/>
                    </section>
                </section>
                <section className='HUD_section'>
                    <section className='HUD_button' onClick={() => changeSelectedOptionType('road')}
                        onMouseEnter={() => iconMouseEnter('road')} 
                        onMouseLeave={() => iconMouseLeave('road')}
                    >
                        <img className='HUD_icon' src={icon_road} alt='icon_road'/>
                    </section>
                    <section className='HUD_button' onClick={() => changeSelectedOptionType('pipe')}
                        onMouseEnter={() => iconMouseEnter('pipe')} 
                        onMouseLeave={() => iconMouseLeave('pipe')}
                    >
                        <img className='HUD_icon' src={icon_pipe} alt='icon_pipe'/>
                    </section>
                </section>
                <section className='HUD_section'>
                    <section className='HUD_button' onClick={() => changeSelectedOptionType('water')}
                        onMouseEnter={() => iconMouseEnter('water')} 
                        onMouseLeave={() => iconMouseLeave('water')}
                    >
                        <img className='HUD_icon' src={icon_water} alt='icon_water'/>
                    </section>
                    <section className='HUD_button' onClick={() => changeSelectedOptionType('shore')}
                        onMouseEnter={() => iconMouseEnter('shore')} 
                        onMouseLeave={() => iconMouseLeave('shore')}
                    >
                        <img className='HUD_icon' src={icon_shore} alt='icon_shore'/>
                    </section>
                </section>
                
                <section className='HUD_section'>
                    <section className='HUD_button' onClick={() => changeSelectedOptionType('residential')}
                        onMouseEnter={() => iconMouseEnter('residential')} 
                        onMouseLeave={() => iconMouseLeave('residential')}
                    >
                        <img className='HUD_icon' src={icon_residential} alt='icon_residential'/>
                    </section>
                    <section className='HUD_button' onClick={() => changeSelectedOptionType('commercial')}
                        onMouseEnter={() => iconMouseEnter('commercial')} 
                        onMouseLeave={() => iconMouseLeave('commercial')}
                    >
                        <img className='HUD_icon' src={icon_commercial} alt='icon_commercial'/>
                    </section>
                    <section className='HUD_button' onClick={() => changeSelectedOptionType('industry')}
                        onMouseEnter={() => iconMouseEnter('industry')} 
                        onMouseLeave={() => iconMouseLeave('industry')}
                    >
                        <img className='HUD_icon' src={icon_industry} alt='icon_industry'/>
                    </section>
                </section>
                
                <section className='HUD_section'>
                    <section className='HUD_button' onClick={() => changeSelectedOptionType('upgrade')}
                        onMouseEnter={() => iconMouseEnter('upgrade')} 
                        onMouseLeave={() => iconMouseLeave('upgrade')}
                    >
                        <img className='HUD_icon' src={icon_upgrade} alt='icon_upgrade'/>
                    </section>
                    <section className='HUD_button' onClick={() => changeSelectedOptionType('downgrade')}
                        onMouseEnter={() => iconMouseEnter('downgrade')} 
                        onMouseLeave={() => iconMouseLeave('downgrade')}
                    >
                        <img className='HUD_icon' src={icon_downgrade} alt='icon_downgrade'/>
                    </section>
                </section>    

                <section className='HUD_section'>
                    <section className='HUD_button' onClick={() => changeSelectedOptionType('buldoze')}
                        onMouseEnter={() => iconMouseEnter('buldoze')} 
                        onMouseLeave={() => iconMouseLeave('buldoze')}
                    >
                        <img className='HUD_icon' src={icon_buldoze} alt='icon_buldoze'/>
                    </section>
                </section>    

                <section className='HUD_section'>
                    <section className='HUD_button' onClick={() => saveFile()}
                        onMouseEnter={() => iconMouseEnter('save')} 
                        onMouseLeave={() => iconMouseLeave('save')}
                    >
                        <img className='HUD_icon' src={icon_save} alt='icon_save'/>
                    </section>
                    <section className='HUD_button' onClick={() => loadFile()}
                        onMouseEnter={() => iconMouseEnter('load')} 
                        onMouseLeave={() => iconMouseLeave('load')}
                    >
                        <img className='HUD_icon' src={icon_load} alt='icon_load'/>
                    </section>
                </section>

                <section className={errorCode ? 'HUD_footer HUD_information_error' : 'HUD_footer'}>
                    <label>{errorCode ? information_mappings_zones_codes[errorCode].title : 
                    currentBuildingSelected === null ? currentTitle : 'Building'}</label>

                    {errorCode ? (<p>{information_mappings_zones_codes[errorCode].information}</p>) :
                    currentBuildingSelected === null ? (<p>{currentInformation}</p>) : (
                            <div className='HUD_information'>
                                <label className='HUD_information_label'>{tile_mappings_zones_codes_inverted[currentBuildingSelected['type']].charAt(0).toUpperCase() + tile_mappings_zones_codes_inverted[currentBuildingSelected['type']].slice(1)}</label>
                                <label className='HUD_information_label'>Level: {currentBuildingSelected['level']}</label>
                                <label className='HUD_information_label'>Price: {currentBuildingSelected['price'].toString() + '$'}</label>
                                {tile_mappings_zones_codes_inverted[currentBuildingSelected['type']] === 'residential' ? <label className='HUD_information_label'>Population: {currentBuildingSelected['residents']}</label>: null}
                            </div>                        
                    )}
                </section>
            </section>

            <section className='HUD_top'>
                <section className='HUD_top_section'>
                    <label>Funds: </label>
                    <label>{funds}$</label>
                </section>
                <section className='HUD_top_section'>
                    <label>Population: </label>
                    <label>{population}</label>
                </section>
                <section className='HUD_top_section'>
                    <label>Date: </label>
                    <label>{date.day < 10 ? '0' : ''}{date.day}.{date.month < 10 ? '0' : ''}{date.month}.{date.year}</label>
                </section>
                <div className='HUD_loading_bar'>
                    <div style={{
                        'width': progress,
                        'height': '100%',
                        'backgroundColor': 'green',
                        'position': 'relative'
                    }
                    }>
                    </div>
                </div>
                <section className='HUD_top_section'>
                    <section className='HUD_button' onClick={() => pause()}
                        onMouseEnter={() => iconMouseEnter('pause')} 
                        onMouseLeave={() => iconMouseLeave('pause')}
                    >
                        <img className='HUD_top_button' src={icon_pause} alt={'icon_pause'}/>
                    </section>
                    <section className='HUD_button' onClick={() => play()}
                        onMouseEnter={() => iconMouseEnter('play')} 
                        onMouseLeave={() => iconMouseLeave('play')}
                    >
                        <img className='HUD_top_button' src={icon_play} alt={'icon_play'}/>
                    </section>
                    <section className='HUD_button' onClick={() => fast1()}
                        onMouseEnter={() => iconMouseEnter('fast1')} 
                        onMouseLeave={() => iconMouseLeave('fast1')}
                    >
                        <img className='HUD_top_button' src={icon_fast1} alt='icon_fast1'/>
                    </section>
                    <section className='HUD_button' onClick={() => fast2()}
                        onMouseEnter={() => iconMouseEnter('fast2')} 
                        onMouseLeave={() => iconMouseLeave('fast2')}
                    >
                        <img className='HUD_top_button' src={icon_fast2} alt='icon_fast2'/>
                    </section>
                </section>
            </section>
            
        </div>
    )
}

export default HUD;
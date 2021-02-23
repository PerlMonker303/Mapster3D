import React, {useState, useEffect, useRef} from 'react';
import { useMediaQuery } from 'react-responsive'

import icon_select from '../assets/icons/icon_select.png';
import icon_help from '../assets/icons/icon_help.png';
import icon_grid from '../assets/icons/icon_grid.png';
import icon_texture from '../assets/icons/icon_texture.png';
import icon_buildings_on from '../assets/icons/icon_buildings_on.png';
import icon_buildings_off from '../assets/icons/icon_buildings_off.png';
import icon_road from '../assets/icons/icon_road.png';
import icon_pipe from '../assets/icons/icon_pipe.png';
import icon_water from '../assets/icons/icon_water.png';
import icon_shore from '../assets/icons/icon_shore.png';
import icon_cloud from '../assets/icons/icon_cloud.png';
import icon_tree from '../assets/icons/icon_tree.png';
import icon_elevate from '../assets/icons/icon_elevate.png';
import icon_residential from '../assets/icons/icon_residential.png';
import icon_commercial from '../assets/icons/icon_commercial.png';
import icon_industry from '../assets/icons/icon_industry.png';
import icon_buldoze from '../assets/icons/icon_buldoze.png';
import icon_upgrade from '../assets/icons/icon_upgrade.png';
import icon_downgrade from '../assets/icons/icon_downgrade.png';
import icon_save from '../assets/icons/icon_save.png';
import icon_load from '../assets/icons/icon_load.png';
import icon_new from '../assets/icons/icon_new.png';
import icon_jobAvailability from '../assets/icons/icon_jobAvailability.png';
import icon_commercialAvailability from '../assets/icons/icon_commercialAvailability.png';
import icon_pause from '../assets/icons/icon_pause.png';
import icon_play from '../assets/icons/icon_play.png';
import icon_fast1 from '../assets/icons/icon_fast1.png';
import icon_fast2 from '../assets/icons/icon_fast2.png';

import {information_mappings_zones_codes} from '../Mappings/MappingInformation';
import {tile_mappings_zones_codes, tile_mappings_zones_codes_inverted, tile_mappings_zones} from '../Mappings/MappingCodes';
import {prices_expenses_and_revenues} from '../Mappings/MappingPrices';


import './HUD.scss';

const HUD = ({
    changeGridShow,
    changeTexturesShow,
    changeCloudsShow,
    changeBuildingsShow,
    getBuildingsShow,
    changeSelectedOptionType,
    saveFile,
    loadFile,
    newFile,
    incrementDate,
    funds,
    revenues,
    expenses,
    date,
    isPaused,
    setIsPausedApp,
    currentBuildingSelected,
    disableCurrentBuildingSelected,
    errorCode,
    disableErrorCode,
    population,
    informationTitle,
    setInformationTitle,
    information,
    setInformation,
    cycleFinished,
    setGlobalTimeLapseMode,
    changeJobAvailabilityShow,
    changeCommercialAvailabilityShow}) => {

    const isDesktopOrLaptop = useMediaQuery({
        query: '(min-device-width: 1250px)'
    });

    const isTabletOrMobileDevice = useMediaQuery({
        query: '(max-device-width: 1250px)'
    });

    const isPortrait = useMediaQuery({
        query: '(max-device-width: 800px)' 
    })
    
    const defaultTitle = information_mappings_zones_codes['default'].title;
    const defaultInformation = information_mappings_zones_codes['default'].information;
    const [currentTitle, setCurrentTitle] = useState(defaultTitle);
    const [currentInformation, setCurrentInformation] = useState(defaultInformation);
    const [progress, setProgress] = useState(0);
    const [reload, setReload] = useState(true);
    const [paused, setPaused] = useState(isPaused);
    const [timelapseMode, setTimelapseMode] = useState(1); // 1, 2, 3
    //const [miliseconds, setMiliseconds] = useState(0);
    const timeLapseModes = {
        1: {
            incrementInterval: 2000
        },
        2: {
            incrementInterval: 1000
        },
        3: {
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
                cycleFinished();
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
        setInformationTitle(null);
        setInformation(null);
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
        setTimelapseMode(1);
        setGlobalTimeLapseMode(1);
    }

    const fast1 = () => {
        setPaused(false);
        setIsPausedApp(false);
        setTimelapseMode(2);
        setGlobalTimeLapseMode(2);
    }

    const fast2 = () => {
        setPaused(false);
        setIsPausedApp(false);
        setTimelapseMode(3);
        setGlobalTimeLapseMode(3);
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
                    <section className='HUD_button' 
                        onClick={() => changeSelectedOptionType('help')} 
                        onMouseEnter={() => iconMouseEnter('help')} 
                        onMouseLeave={() => iconMouseLeave('help')}
                    >
                        <img className='HUD_icon' src={icon_help} alt='icon_help'/>
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
                    <section className='HUD_button' onClick={() => changeCloudsShow()}
                        onMouseEnter={() => iconMouseEnter('cloud')} 
                        onMouseLeave={() => iconMouseLeave('cloud')}
                    >
                        <img className='HUD_icon' src={icon_cloud} alt='icon_cloud'/>
                    </section>
                </section>

                <section className='HUD_section'>
                    <section className='HUD_button' onClick={() => changeSelectedOptionType('tree')}
                        onMouseEnter={() => iconMouseEnter('tree')} 
                        onMouseLeave={() => iconMouseLeave('tree')}
                    >
                        <img className='HUD_icon' src={icon_tree} alt='icon_tree'/>
                    </section>
                    <section className='HUD_button' onClick={() => changeSelectedOptionType('elevate')}
                        onMouseEnter={() => iconMouseEnter('elevate')} 
                        onMouseLeave={() => iconMouseLeave('elevate')}
                    >
                        <img className='HUD_icon' src={icon_elevate} alt='icon_elevate'/>
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
                    <section className='HUD_button' onClick={() => newFile()}
                        onMouseEnter={() => iconMouseEnter('new')} 
                        onMouseLeave={() => iconMouseLeave('new')}
                    >
                        <img className='HUD_icon' src={icon_new} alt='icon_new'/>
                    </section>
                </section>

                <section className='HUD_section'>
                    <section className='HUD_button' onClick={() => changeJobAvailabilityShow()}
                        onMouseEnter={() => iconMouseEnter('jobAvailability')} 
                        onMouseLeave={() => iconMouseLeave('jobAvailability')}
                    >
                        <img className='HUD_icon' src={icon_jobAvailability} alt='icon_jobAvailability'/>
                    </section>
                    <section className='HUD_button' onClick={() => changeCommercialAvailabilityShow()}
                        onMouseEnter={() => iconMouseEnter('commercialAvailability')} 
                        onMouseLeave={() => iconMouseLeave('commercialAvailability')}
                    >
                        <img className='HUD_icon' src={icon_commercialAvailability} alt='icon_commercialAvailability'/>
                    </section>
                </section>

                <section className={errorCode ? 'HUD_footer HUD_information_error' : 'HUD_footer'}>
                    <label>
                        {
                            errorCode ? information_mappings_zones_codes[errorCode].title : 
                            informationTitle ? informationTitle : 
                            currentBuildingSelected === null ? currentTitle : 'Building'
                        }
                    </label>

                    {information ? Array.isArray(information) ? (<ul className='HUD_information_ul'>{
                        information.map((info,key) => (
                            <li key={key}>{info}</li>
                        ))
                    }</ul>) : <h3>information</h3>
                    :
                    errorCode ? (<ul className='HUD_information_ul'>{
                        information_mappings_zones_codes[errorCode].information.map((info,key) => (
                            <li key={key}>{info}</li>
                        ))
                    }</ul>) :
                    currentBuildingSelected === null ? (<ul className='HUD_information_ul'>{
                        currentInformation.map((info,key) => (
                            <li key={key}>{info}</li>
                        ))
                        }</ul>) : (
                            <div className='HUD_information'>
                                <label className={'HUD_information_label_' + tile_mappings_zones_codes_inverted[currentBuildingSelected['type']]}
                            >{tile_mappings_zones_codes_inverted[currentBuildingSelected['type']].charAt(0).toUpperCase() + tile_mappings_zones_codes_inverted[currentBuildingSelected['type']].slice(1)}</label>
                                <label className='HUD_information_label'>Level: {currentBuildingSelected['level']}</label>
                                <label className='HUD_information_label'>Price: {currentBuildingSelected['price'].toString() + '$'}</label>
                                <label className='HUD_information_label'> {tile_mappings_zones_codes_inverted[currentBuildingSelected['type']] === 'residential' ? 'Revenues:' : 'Expenses:'} {prices_expenses_and_revenues[tile_mappings_zones_codes_inverted[currentBuildingSelected['type']]][currentBuildingSelected['level']]}$</label>
                                {tile_mappings_zones_codes_inverted[currentBuildingSelected['type']] === 'residential' ? <label className='HUD_information_label'>Population: {currentBuildingSelected['residents']}</label>: null}
                                {tile_mappings_zones_codes_inverted[currentBuildingSelected['type']] === 'industry' ? <label className='HUD_information_label'>Employment capacity: {currentBuildingSelected['residents']}</label>: null}
                                <label className='HUD_information_label'>Water: {currentBuildingSelected['hasWater'] ? 'Yes' : 'No'}</label>
                            </div>                        
                    )}
                </section>
            </section>

            <section className={isPortrait ? 'HUD_top_portrait' : isTabletOrMobileDevice  ? 'HUD_top_mobile' : 'HUD_top'}>
                <section className={'HUD_top_section_prolonged'}
                    onMouseEnter={() => iconMouseEnter('funds')} 
                    onMouseLeave={() => iconMouseLeave('funds')}
                >
                    <label>Funds: </label>
                    <label className={funds >= 0 ? null : 'HUD_negative_funds'}>{funds}$</label>
                    <label className={expenses + revenues >= 0 ? 'HUD_positive_funds' : 'HUD_negative_funds'}>
                        {(expenses + revenues >= 0) ? ' (+' + (expenses + revenues) + ')' : ' (' + (expenses + revenues) + ')'}
                    </label>
                </section>
                <section className='HUD_top_section'
                    onMouseEnter={() => iconMouseEnter('population')} 
                    onMouseLeave={() => iconMouseLeave('population')}
                >
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
                        'backgroundColor': 'rgb(106, 236, 245)',
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
                <section className='HUD_top_section'
                    onMouseEnter={() => iconMouseEnter('revenues')} 
                    onMouseLeave={() => iconMouseLeave('revenues')}
                >
                    <label>Revenues: </label>
                    <label className='HUD_positive_funds'>{'+' + revenues + '$'}</label>
                </section>
                <section className='HUD_top_section'
                    onMouseEnter={() => iconMouseEnter('expenses')} 
                    onMouseLeave={() => iconMouseLeave('expenses')}
                >
                    <label>Expenses: </label>
                    <label className='HUD_negative_funds'>{expenses  + '$'}</label>
                </section>

                <section className='HUD_top_section'>
                    <label><a className='HUD_top_a' rel='noreferrer' href="https://perlmonker303.github.io/Mapster3D/" target="_blank">Mapster v0.1</a></label>
                </section>
            </section>
            
        </div>
    )
}

export default HUD;
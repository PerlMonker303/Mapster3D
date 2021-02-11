import React, {useState} from 'react';

import icon_select from '../assets/icons/icon_select.png';
import icon_grid from '../assets/icons/icon_grid.png';
import icon_texture from '../assets/icons/icon_texture.png';
import icon_road from '../assets/icons/icon_road.png';
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

import {information_mappings_zones_codes} from '../Mappings/MappingInformation';


import './HUD.scss';

const HUD = ({changeGridShow, changeTexturesShow, changeSelectedOptionType, saveFile, loadFile, information}) => {
    const title = information.title;
    const text = information.text;
    const defaultTitle = 'Information area';
    const defaultInformation = '';
    const [currentTitle, setCurrentTitle] = useState(defaultTitle);
    const [currentInformation, setCurrentInformation] = useState(defaultInformation);
    

    const iconMouseEnter = (icon) => {
        setCurrentTitle(information_mappings_zones_codes[icon].title);
        setCurrentInformation(information_mappings_zones_codes[icon].information);
    }

    const iconMouseLeave = (icon) => {
        setCurrentTitle(defaultTitle);
        setCurrentInformation(defaultInformation);
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
                </section>
                <section className='HUD_section'>
                    <section className='HUD_button' onClick={() => changeSelectedOptionType('road')}
                        onMouseEnter={() => iconMouseEnter('road')} 
                        onMouseLeave={() => iconMouseLeave('road')}
                    >
                        <img className='HUD_icon' src={icon_road} alt='icon_road'/>
                    </section>
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

                <section className='HUD_footer'>
                    <label>{currentTitle}</label>
                    <p>{currentInformation}</p>
                </section>
            </section>

            <section className='HUD_top'>
                <section className='HUD_top_section'>
                    <label>Funds: </label>
                    <label>100000</label>
                </section>
            </section>
            
        </div>
    )
}

export default HUD;
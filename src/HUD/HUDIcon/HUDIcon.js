import React from 'react';

const HUDIcon = ({clickHandler, onMouseEnter, onMouseLeave, icon, icon_alt}) => {
    return (
        <section className='HUD_button' 
            onClick={(param) => clickHandler(param)} 
            onMouseEnter={(param) => onMouseEnter(param)} 
            onMouseLeave={(param) => onMouseLeave(param)}
        >
            <img className='HUD_icon' src={icon} alt={icon_alt}/>
        </section>
    )
}

export default HUDIcon;
import React from 'react';
import Cloud from './Cloud/Cloud';

const Sky = ({mapSize, levelBoundaries, cloudsCount}) => {

    const level = Math.random() * levelBoundaries[1] + levelBoundaries[0];
    let clouds = Array(cloudsCount).fill(0);
    const speed = (Math.random() * 5 - 1)/100 // 1-9 / 100 => 0.01-0.09
    return(
        <group>
            {
                clouds.map((cloud,i) => 
                    <Cloud key={i} mapSize={mapSize} level={level} color="pink" speed={speed}/>
                )
            }
        </group>
    )
}

export default Sky;
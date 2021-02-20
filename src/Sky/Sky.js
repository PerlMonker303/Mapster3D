import React, {useState} from 'react';
import Cloud from './Cloud/Cloud';

const Sky = ({state, levelBoundaries, speed}) => {

    return(
        <group dispose={null}>
            {
                state.cloudsKeysList.map((key,i) => {
                    const cloud = state.cloudsKeys[key];
                    return (
                        <Cloud
                            key={key}
                            mapSize={state.mapSize}
                            levelBoundaries={levelBoundaries}
                            color="pink"
                            speed={state.cloudsSpeed}
                            paused={state.isPaused}
                        />
                    )
                }
                )
            }
        </group>
    )
}

export default React.memo(Sky);
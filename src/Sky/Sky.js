import React, {useState} from 'react';
import Cloud from './Cloud/Cloud';

const Sky = ({state, levelBoundaries}) => {

    return(
        <group dispose={null}>
            { state.cloudsShow ? 
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
                : null
            }
        </group>
    )
}

export default React.memo(Sky);
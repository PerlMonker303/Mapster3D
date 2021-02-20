import React, {useRef, useState} from 'react';
import {useFrame} from "react-three-fiber";
import {a} from "react-spring/three";

const Cloud = ({mapSize, levelBoundaries, size, color, speed, paused}) => {
    const mesh = useRef(null);
    const [randX, setX] = useState(Math.floor(Math.random() * mapSize[0] - mapSize[0]));
    const [randY, setY] = useState(Math.floor(Math.random() * mapSize[1] - mapSize[1]));
    const [level, setLevel] = useState(Math.random() * levelBoundaries[1] + levelBoundaries[0]);
    
    const [scaleX, setScaleX] = useState(Math.random() * 2.5 + 1.6);
    const [scaleY, setScaleY] = useState(Math.random() * 2.5 + 1.6);
    const [scaleZ, setScaleZ] = useState(Math.random() * 0.9 + 0.4);

    useFrame(() => {
      if(!paused){
        if(mesh.current.position.x <= mapSize[0] && mesh.current.position.y <= mapSize[1]){
          mesh.current.position.x += speed;
          mesh.current.position.z += speed;
        }else{
          mesh.current.position.x = Math.floor(Math.random()*mapSize[0] - mapSize[0]);
          mesh.current.position.z = Math.floor(Math.random()*mapSize[1] - mapSize[1]);;
        }
      }
    });
  
    return (
      <a.mesh
        scale={[scaleX, scaleZ, scaleY]}
        castShadow
        position={[randX, level, randY]}
        ref={mesh}
      >
        <boxBufferGeometry attach='geometry' args={size} />
        <meshStandardMaterial attach='material' color={color} opacity={0.8} transparent />
      </a.mesh>
    )
  }

export default React.memo(Cloud);
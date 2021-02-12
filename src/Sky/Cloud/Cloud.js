import React, {useRef, useState} from 'react';
import {useFrame} from "react-three-fiber";
import {useSpring, a} from "react-spring/three";

const Cloud = ({mapSize, level, size, color, speed}) => {
    const mesh = useRef(null);
    useFrame(() => {
      if(mesh.current.position.x <= mapSize[0] && mesh.current.position.y <= mapSize[1]){
        mesh.current.position.x = mesh.current.position.z += speed
      }
    });
  
    const [expand, setExpand] = useState(false);
    const randx = Math.random()*mapSize[0] - mapSize[0];
    const randy = Math.random()*mapSize[1] - mapSize[1];
    const position = [randx,level,randy]
  
    const spring = useSpring({
      scale: expand ? [1.4,1.4,1.4] : [1,1,1]
    })
  
    return (
      <a.mesh onClick={() => setExpand(!expand)} scale={spring.scale} castShadow position={position} ref={mesh}>
        <boxBufferGeometry attach='geometry' args={size} />
        <meshStandardMaterial attach='material' color={color}/>
      </a.mesh>
    )
  }

export default Cloud;
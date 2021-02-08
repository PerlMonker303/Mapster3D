import React, {useState} from 'react';

const Grid = ({size}) => {
    let [n, m] = size;
    let values_n = [];
    for(var i=-n/2;i<=n/2;i++){
      values_n.push(i);
    }
    let values_m = [];
    for(var j=-m/2;j<=m/2;j++){
      values_m.push(j);
    }
  
    const [visible, setVisible] = useState(false);
  
    return (
      <group>
        {
          values_m.map((item, i) => 
          <mesh key={i} position={[0,0,item]}>
            <boxBufferGeometry attach='geometry' args={[n,0.01,0.01]} />
            <meshStandardMaterial attach='material' color='red'/>
          </mesh>
          )
        }
        {
          values_n.map((item, i) => 
          <mesh key={i} position={[item,0,0]}>
            <boxBufferGeometry attach='geometry' args={[0.01,0.01,m]} />
            <meshStandardMaterial attach='material' color='red'/>
          </mesh>
          )
        }
        
      </group>
    )
  }

export default Grid;
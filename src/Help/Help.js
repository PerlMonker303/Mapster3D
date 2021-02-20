import React from 'react';
import * as THREE from 'three';

const materialDefault = new THREE.MeshPhysicalMaterial({
    color: 0x00cc00,
    roughness: 0.8
})

const geometryDefault = new THREE.DodecahedronBufferGeometry(1)

const Help = ({}) => {
    return (
        <mesh material={materialDefault} geometry={geometryDefault}>
            
        </mesh>
    )
}

export default Help;
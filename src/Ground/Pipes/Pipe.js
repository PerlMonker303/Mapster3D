import React from 'react'
import {a} from "react-spring/three";

const Pipe = ({mapSize, position, size, tileMapObjects, sewageMode, removePipe}) => {

    const pipe_straight_1 = (
        <group onContextMenu={event => removePipe(event, [position[0],position[2]])}>
            <a.mesh castShadow position={
                [position[0]-mapSize[0]/2 - size[0]/2 + 1, 0.005 ,position[2]-mapSize[1]/2 - size[2]/2 + 1]
            } rotation={[-Math.PI / 2, 0, 0]}>
                <cylinderBufferGeometry attach='geometry' args={[0.2, 0.2, 1, 15, 1, false, 0, 6.3]}/>
                <meshStandardMaterial attach='material' color='grey'/>
            </a.mesh>
            <a.mesh castShadow position={
                [position[0]-mapSize[0]/2 - size[0]/2 + 1, 0.005 ,position[2]-mapSize[1]/2 - 0.02 + 1]
            } rotation={[-Math.PI / 2, 0, 0]}>
                <cylinderBufferGeometry attach='geometry' args={[0.22, 0.22, 0.05, 15, 1, false, 0, 6.3]}/>
                <meshStandardMaterial attach='material' color='black'/>
            </a.mesh>
            <a.mesh castShadow position={
                [position[0]-mapSize[0]/2 - size[0]/2 + 1, 0.005 ,position[2]-mapSize[1]/2 - 0.98 + 1]
            } rotation={[-Math.PI / 2, 0, 0]}>
                <cylinderBufferGeometry attach='geometry' args={[0.22, 0.22, 0.05, 15, 1, false, 0, 6.3]}/>
                <meshStandardMaterial attach='material' color='black'/>
            </a.mesh>
         </group>
    );

    const pipe_straight_2 = (
        <group onContextMenu={event => removePipe(event, [position[0],position[2]])}>
            <a.mesh castShadow position={
                [position[0]-mapSize[0]/2 - size[0]/2 + 1, 0.005 ,position[2]-mapSize[1]/2 - size[2]/2 + 1]
            } rotation={[-Math.PI / 2, 0, Math.PI/2]}>
                <cylinderBufferGeometry attach='geometry' args={[0.2, 0.2, 1, 15, 1, false, 0, 6.3]}/>
                <meshStandardMaterial attach='material' color='grey'/>
            </a.mesh>
            <a.mesh castShadow position={
                [position[0]-mapSize[0]/2 - 0.98 + 1, 0.005 ,position[2]-mapSize[1]/2 - size[2]/2 + 1]
            } rotation={[-Math.PI / 2, 0, Math.PI/2]}>
                <cylinderBufferGeometry attach='geometry' args={[0.22, 0.22, 0.05, 15, 1, false, 0, 6.3]}/>
                <meshStandardMaterial attach='material' color='black'/>
            </a.mesh>
            <a.mesh castShadow position={
                [position[0]-mapSize[0]/2 - 0.02 + 1, 0.005 ,position[2]-mapSize[1]/2 - size[2]/2 + 1]
            } rotation={[-Math.PI / 2, 0, Math.PI/2]}>
                <cylinderBufferGeometry attach='geometry' args={[0.22, 0.22, 0.05, 15, 1, false, 0, 6.3]}/>
                <meshStandardMaterial attach='material' color='black'/>
            </a.mesh>
        </group>
    );

    const pipe_corner_1 = (
        <group onContextMenu={event => removePipe(event, [position[0],position[2]])}>
            <a.mesh castShadow position={
                [position[0]-mapSize[0]/2 - 0.5 + 1, 0.005 ,position[2]-mapSize[1]/2 - 0.35 + 1]
            } rotation={[-Math.PI / 2, 0, 0]}>
                <cylinderBufferGeometry attach='geometry' args={[0.2, 0.2,0.7, 15, 1, false, 0, 6.3]}/>
                <meshStandardMaterial attach='material' color='grey'/>
            </a.mesh>
            <a.mesh castShadow position={
                [position[0]-mapSize[0]/2 - 0.35 + 1, 0.005 ,position[2]-mapSize[1]/2 - size[2]/2 + 1]
            } rotation={[-Math.PI / 2, 0, Math.PI/2]}>
                <cylinderBufferGeometry attach='geometry' args={[0.2, 0.2, 0.7, 15, 1, false, 0, 6.3]}/>
                <meshStandardMaterial attach='material' color='grey'/>
            </a.mesh>
            <a.mesh castShadow position={
                [position[0]-mapSize[0]/2 - size[0]/2 + 1, 0.005 ,position[2]-mapSize[1]/2 - 0.02 + 1]
            } rotation={[-Math.PI / 2, 0, 0]}>
                <cylinderBufferGeometry attach='geometry' args={[0.22, 0.22, 0.05, 15, 1, false, 0, 6.3]}/>
                <meshStandardMaterial attach='material' color='black'/>
            </a.mesh>
            <a.mesh castShadow position={
                [position[0]-mapSize[0]/2 - 0.02 + 1, 0.005 ,position[2]-mapSize[1]/2 - size[2]/2 + 1]
            } rotation={[-Math.PI / 2, 0, Math.PI/2]}>
                <cylinderBufferGeometry attach='geometry' args={[0.22, 0.22, 0.05, 15, 1, false, 0, 6.3]}/>
                <meshStandardMaterial attach='material' color='black'/>
            </a.mesh>
         </group>
    )

    const pipe_corner_2 = (
        <group onContextMenu={event => removePipe(event, [position[0],position[2]])}>
            <a.mesh castShadow position={
                [position[0]-mapSize[0]/2 - 0.5 + 1, 0.005 ,position[2]-mapSize[1]/2 - 0.35 + 1]
            } rotation={[-Math.PI / 2, 0, 0]}>
                <cylinderBufferGeometry attach='geometry' args={[0.2, 0.2,0.7, 15, 1, false, 0, 6.3]}/>
                <meshStandardMaterial attach='material' color='grey'/>
            </a.mesh>
            <a.mesh castShadow position={
                [position[0]-mapSize[0]/2 - 0.65 + 1, 0.005 ,position[2]-mapSize[1]/2 - size[2]/2 + 1]
            } rotation={[-Math.PI / 2, 0, Math.PI/2]}>
                <cylinderBufferGeometry attach='geometry' args={[0.2, 0.2, 0.7, 15, 1, false, 0, 6.3]}/>
                <meshStandardMaterial attach='material' color='grey'/>
            </a.mesh>
            <a.mesh castShadow position={
                [position[0]-mapSize[0]/2 - size[0]/2 + 1, 0.005 ,position[2]-mapSize[1]/2 - 0.02 + 1]
            } rotation={[-Math.PI / 2, 0, 0]}>
                <cylinderBufferGeometry attach='geometry' args={[0.22, 0.22, 0.05, 15, 1, false, 0, 6.3]}/>
                <meshStandardMaterial attach='material' color='black'/>
            </a.mesh>
            <a.mesh castShadow position={
                [position[0]-mapSize[0]/2 - 0.98 + 1, 0.005 ,position[2]-mapSize[1]/2 - size[2]/2 + 1]
            } rotation={[-Math.PI / 2, 0, Math.PI/2]}>
                <cylinderBufferGeometry attach='geometry' args={[0.22, 0.22, 0.05, 15, 1, false, 0, 6.3]}/>
                <meshStandardMaterial attach='material' color='black'/>
            </a.mesh>
         </group>
    )

    const pipe_corner_3 = (
        <group onContextMenu={event => removePipe(event, [position[0],position[2]])}>
            <a.mesh castShadow position={
                [position[0]-mapSize[0]/2 - 0.5 + 1, 0.005 ,position[2]-mapSize[1]/2 - 0.65 + 1]
            } rotation={[-Math.PI / 2, 0, 0]}>
                <cylinderBufferGeometry attach='geometry' args={[0.2, 0.2,0.7, 15, 1, false, 0, 6.3]}/>
                <meshStandardMaterial attach='material' color='grey'/>
            </a.mesh>
            <a.mesh castShadow position={
                [position[0]-mapSize[0]/2 - 0.35 + 1, 0.005 ,position[2]-mapSize[1]/2 - size[2]/2 + 1]
            } rotation={[-Math.PI / 2, 0, Math.PI/2]}>
                <cylinderBufferGeometry attach='geometry' args={[0.2, 0.2, 0.7, 15, 1, false, 0, 6.3]}/>
                <meshStandardMaterial attach='material' color='grey'/>
            </a.mesh>
            <a.mesh castShadow position={
                [position[0]-mapSize[0]/2 - size[0]/2 + 1, 0.005 ,position[2]-mapSize[1]/2 - 0.98 + 1]
            } rotation={[-Math.PI / 2, 0, 0]}>
                <cylinderBufferGeometry attach='geometry' args={[0.22, 0.22, 0.05, 15, 1, false, 0, 6.3]}/>
                <meshStandardMaterial attach='material' color='black'/>
            </a.mesh>
            <a.mesh castShadow position={
                [position[0]-mapSize[0]/2 - 0.02 + 1, 0.005 ,position[2]-mapSize[1]/2 - size[2]/2 + 1]
            } rotation={[-Math.PI / 2, 0, Math.PI/2]}>
                <cylinderBufferGeometry attach='geometry' args={[0.22, 0.22, 0.05, 15, 1, false, 0, 6.3]}/>
                <meshStandardMaterial attach='material' color='black'/>
            </a.mesh>
         </group>
    )

    const pipe_corner_4 = (
        <group onContextMenu={event => removePipe(event, [position[0],position[2]])}>
            <a.mesh castShadow position={
                [position[0]-mapSize[0]/2 - 0.5 + 1, 0.005 ,position[2]-mapSize[1]/2 - 0.65 + 1]
            } rotation={[-Math.PI / 2, 0, 0]}>
                <cylinderBufferGeometry attach='geometry' args={[0.2, 0.2,0.7, 15, 1, false, 0, 6.3]}/>
                <meshStandardMaterial attach='material' color='grey'/>
            </a.mesh>
            <a.mesh castShadow position={
                [position[0]-mapSize[0]/2 - 0.65 + 1, 0.005 ,position[2]-mapSize[1]/2 - size[2]/2 + 1]
            } rotation={[-Math.PI / 2, 0, Math.PI/2]}>
                <cylinderBufferGeometry attach='geometry' args={[0.2, 0.2, 0.7, 15, 1, false, 0, 6.3]}/>
                <meshStandardMaterial attach='material' color='grey'/>
            </a.mesh>
            <a.mesh castShadow position={
                [position[0]-mapSize[0]/2 - size[0]/2 + 1, 0.005 ,position[2]-mapSize[1]/2 - 0.98 + 1]
            } rotation={[-Math.PI / 2, 0, 0]}>
                <cylinderBufferGeometry attach='geometry' args={[0.22, 0.22, 0.05, 15, 1, false, 0, 6.3]}/>
                <meshStandardMaterial attach='material' color='black'/>
            </a.mesh>
            <a.mesh castShadow position={
                [position[0]-mapSize[0]/2 - 0.98 + 1, 0.005 ,position[2]-mapSize[1]/2 - size[2]/2 + 1]
            } rotation={[-Math.PI / 2, 0, Math.PI/2]}>
                <cylinderBufferGeometry attach='geometry' args={[0.22, 0.22, 0.05, 15, 1, false, 0, 6.3]}/>
                <meshStandardMaterial attach='material' color='black'/>
            </a.mesh>
         </group>
    )

    const pipe_threeway_1 = (
        <group onContextMenu={event => removePipe(event, [position[0],position[2]])}>
            <a.mesh castShadow position={
                [position[0]-mapSize[0]/2 - 0.5 + 1, 0.005 ,position[2]-mapSize[1]/2 - size[2]/2 + 1]
            } rotation={[-Math.PI / 2, 0, 0]}>
                <cylinderBufferGeometry attach='geometry' args={[0.2, 0.2, 1, 15, 1, false, 0, 6.3]}/>
                <meshStandardMaterial attach='material' color='grey'/>
            </a.mesh>
            <a.mesh castShadow position={
                [position[0]-mapSize[0]/2 - 1/4 + 1, 0.005 ,position[2]-mapSize[1]/2 - size[2]/2 + 1]
            } rotation={[-Math.PI / 2, 0, Math.PI/2]}>
                <cylinderBufferGeometry attach='geometry' args={[0.2, 0.2, 0.5, 15, 1, false, 0, 6.3]}/>
                <meshStandardMaterial attach='material' color='grey'/>
            </a.mesh>
            <a.mesh castShadow position={
                [position[0]-mapSize[0]/2 - size[0]/2 + 1, 0.005 ,position[2]-mapSize[1]/2 - 0.98 + 1]
            } rotation={[-Math.PI / 2, 0, 0]}>
                <cylinderBufferGeometry attach='geometry' args={[0.22, 0.22, 0.05, 15, 1, false, 0, 6.3]}/>
                <meshStandardMaterial attach='material' color='black'/>
            </a.mesh>
            <a.mesh castShadow position={
                [position[0]-mapSize[0]/2 - size[0]/2 + 1, 0.005 ,position[2]-mapSize[1]/2 - 0.02 + 1]
            } rotation={[-Math.PI / 2, 0, 0]}>
                <cylinderBufferGeometry attach='geometry' args={[0.22, 0.22, 0.05, 15, 1, false, 0, 6.3]}/>
                <meshStandardMaterial attach='material' color='black'/>
            </a.mesh>
            <a.mesh castShadow position={
                [position[0]-mapSize[0]/2 - 0.02 + 1, 0.005 ,position[2]-mapSize[1]/2 - size[2]/2 + 1]
            } rotation={[-Math.PI / 2, 0, Math.PI/2]}>
                <cylinderBufferGeometry attach='geometry' args={[0.22, 0.22, 0.05, 15, 1, false, 0, 6.3]}/>
                <meshStandardMaterial attach='material' color='black'/>
            </a.mesh>
         </group>
    );

    const pipe_threeway_2 = (
        <group onContextMenu={event => removePipe(event, [position[0],position[2]])}>
            <a.mesh castShadow position={
                [position[0]-mapSize[0]/2 - size[0]/2 + 1, 0.005 ,position[2]-mapSize[1]/2 - 3/4 + 1]
            } rotation={[-Math.PI / 2, 0, 0]}>
                <cylinderBufferGeometry attach='geometry' args={[0.2, 0.2, 0.5, 15, 1, false, 0, 6.3]}/>
                <meshStandardMaterial attach='material' color='grey'/>
            </a.mesh>
            <a.mesh castShadow position={
                [position[0]-mapSize[0]/2 - size[0]/2 + 1, 0.005 ,position[2]-mapSize[1]/2 - size[2]/2 + 1]
            } rotation={[-Math.PI / 2, 0, Math.PI/2]}>
                <cylinderBufferGeometry attach='geometry' args={[0.2, 0.2, 1, 15, 1, false, 0, 6.3]}/>
                <meshStandardMaterial attach='material' color='grey'/>
            </a.mesh>
            <a.mesh castShadow position={
                [position[0]-mapSize[0]/2 - size[0]/2 + 1, 0.005 ,position[2]-mapSize[1]/2 - 0.98 + 1]
            } rotation={[-Math.PI / 2, 0, 0]}>
                <cylinderBufferGeometry attach='geometry' args={[0.22, 0.22, 0.05, 15, 1, false, 0, 6.3]}/>
                <meshStandardMaterial attach='material' color='black'/>
            </a.mesh>
            <a.mesh castShadow position={
                [position[0]-mapSize[0]/2 - 0.98 + 1, 0.005 ,position[2]-mapSize[1]/2 - size[1]/2 + 1]
            } rotation={[-Math.PI / 2, 0, Math.PI/2]}>
                <cylinderBufferGeometry attach='geometry' args={[0.22, 0.22, 0.05, 15, 1, false, 0, 6.3]}/>
                <meshStandardMaterial attach='material' color='black'/>
            </a.mesh>
            <a.mesh castShadow position={
                [position[0]-mapSize[0]/2 - 0.02 + 1, 0.005 ,position[2]-mapSize[1]/2 - size[2]/2 + 1]
            } rotation={[-Math.PI / 2, 0, Math.PI/2]}>
                <cylinderBufferGeometry attach='geometry' args={[0.22, 0.22, 0.05, 15, 1, false, 0, 6.3]}/>
                <meshStandardMaterial attach='material' color='black'/>
            </a.mesh>
         </group>
    );

    const pipe_threeway_3 = (
        <group onContextMenu={event => removePipe(event, [position[0],position[2]])}>
            <a.mesh castShadow position={
                [position[0]-mapSize[0]/2 -size[0]/2 + 1, 0.005 ,position[2]-mapSize[1]/2 - size[2]/2 + 1]
            } rotation={[-Math.PI / 2, 0, 0]}>
                <cylinderBufferGeometry attach='geometry' args={[0.2, 0.2, 1, 15, 1, false, 0, 6.3]}/>
                <meshStandardMaterial attach='material' color='grey'/>
            </a.mesh>
            <a.mesh castShadow position={
                [position[0]-mapSize[0]/2 - 3/4 + 1, 0.005 ,position[2]-mapSize[1]/2 - size[2]/2 + 1]
            } rotation={[-Math.PI / 2, 0, Math.PI/2]}>
                <cylinderBufferGeometry attach='geometry' args={[0.2, 0.2, 0.5, 15, 1, false, 0, 6.3]}/>
                <meshStandardMaterial attach='material' color='grey'/>
            </a.mesh>
            <a.mesh castShadow position={
                [position[0]-mapSize[0]/2 - size[0]/2 + 1, 0.005 ,position[2]-mapSize[1]/2 - 0.98 + 1]
            } rotation={[-Math.PI / 2, 0, 0]}>
                <cylinderBufferGeometry attach='geometry' args={[0.22, 0.22, 0.05, 15, 1, false, 0, 6.3]}/>
                <meshStandardMaterial attach='material' color='black'/>
            </a.mesh>
            <a.mesh castShadow position={
                [position[0]-mapSize[0]/2 - size[0]/2 + 1, 0.005 ,position[2]-mapSize[1]/2 - 0.02 + 1]
            } rotation={[-Math.PI / 2, 0, 0]}>
                <cylinderBufferGeometry attach='geometry' args={[0.22, 0.22, 0.05, 15, 1, false, 0, 6.3]}/>
                <meshStandardMaterial attach='material' color='black'/>
            </a.mesh>
            <a.mesh castShadow position={
                [position[0]-mapSize[0]/2 - 0.98 + 1, 0.005 ,position[2]-mapSize[1]/2 - size[2]/2 + 1]
            } rotation={[-Math.PI / 2, 0, Math.PI/2]}>
                <cylinderBufferGeometry attach='geometry' args={[0.22, 0.22, 0.05, 15, 1, false, 0, 6.3]}/>
                <meshStandardMaterial attach='material' color='black'/>
            </a.mesh>
         </group>
    );

    const pipe_threeway_4 = (
        <group onContextMenu={event => removePipe(event, [position[0],position[2]])}>
            <a.mesh castShadow position={
                [position[0]-mapSize[0]/2 - size[0]/2 + 1, 0.005 ,position[2]-mapSize[1]/2 - 1/4 + 1]
            } rotation={[-Math.PI / 2, 0, 0]}>
                <cylinderBufferGeometry attach='geometry' args={[0.2, 0.2, 0.5, 15, 1, false, 0, 6.3]}/>
                <meshStandardMaterial attach='material' color='grey'/>
            </a.mesh>
            <a.mesh castShadow position={
                [position[0]-mapSize[0]/2 - size[0]/2 + 1, 0.005 ,position[2]-mapSize[1]/2 - size[2]/2 + 1]
            } rotation={[-Math.PI / 2, 0, Math.PI/2]}>
                <cylinderBufferGeometry attach='geometry' args={[0.2, 0.2, 1, 15, 1, false, 0, 6.3]}/>
                <meshStandardMaterial attach='material' color='grey'/>
            </a.mesh>
            <a.mesh castShadow position={
                [position[0]-mapSize[0]/2 - size[0]/2 + 1, 0.005 ,position[2]-mapSize[1]/2 - 0.02 + 1]
            } rotation={[-Math.PI / 2, 0, 0]}>
                <cylinderBufferGeometry attach='geometry' args={[0.22, 0.22, 0.05, 15, 1, false, 0, 6.3]}/>
                <meshStandardMaterial attach='material' color='black'/>
            </a.mesh>
            <a.mesh castShadow position={
                [position[0]-mapSize[0]/2 - 0.98 + 1, 0.005 ,position[2]-mapSize[1]/2 - size[1]/2 + 1]
            } rotation={[-Math.PI / 2, 0, Math.PI/2]}>
                <cylinderBufferGeometry attach='geometry' args={[0.22, 0.22, 0.05, 15, 1, false, 0, 6.3]}/>
                <meshStandardMaterial attach='material' color='black'/>
            </a.mesh>
            <a.mesh castShadow position={
                [position[0]-mapSize[0]/2 - 0.02 + 1, 0.005 ,position[2]-mapSize[1]/2 - size[2]/2 + 1]
            } rotation={[-Math.PI / 2, 0, Math.PI/2]}>
                <cylinderBufferGeometry attach='geometry' args={[0.22, 0.22, 0.05, 15, 1, false, 0, 6.3]}/>
                <meshStandardMaterial attach='material' color='black'/>
            </a.mesh>
         </group>
    );

    const pipe_intersection_4 = (
        <group onContextMenu={event => removePipe(event, [position[0],position[2]])}>
            <a.mesh castShadow position={
                [position[0]-mapSize[0]/2 - size[0]/2 + 1, 0.005 ,position[2]-mapSize[1]/2 - size[2]/2 + 1]
            } rotation={[-Math.PI / 2, 0, 0]}>
                <cylinderBufferGeometry attach='geometry' args={[0.2, 0.2, 1, 15, 1, false, 0, 6.3]}/>
                <meshStandardMaterial attach='material' color='grey'/>
            </a.mesh>
            <a.mesh castShadow position={
                [position[0]-mapSize[0]/2 - size[0]/2 + 1, 0.005 ,position[2]-mapSize[1]/2 - size[2]/2 + 1]
            } rotation={[-Math.PI / 2, 0, Math.PI/2]}>
                <cylinderBufferGeometry attach='geometry' args={[0.2, 0.2, 1, 15, 1, false, 0, 6.3]}/>
                <meshStandardMaterial attach='material' color='grey'/>
            </a.mesh>
            <a.mesh castShadow position={
                [position[0]-mapSize[0]/2 - size[0]/2 + 1, 0.005 ,position[2]-mapSize[1]/2 - 0.98 + 1]
            } rotation={[-Math.PI / 2, 0, 0]}>
                <cylinderBufferGeometry attach='geometry' args={[0.22, 0.22, 0.05, 15, 1, false, 0, 6.3]}/>
                <meshStandardMaterial attach='material' color='black'/>
            </a.mesh>
            <a.mesh castShadow position={
                [position[0]-mapSize[0]/2 - size[0]/2 + 1, 0.005 ,position[2]-mapSize[1]/2 - 0.02 + 1]
            } rotation={[-Math.PI / 2, 0, 0]}>
                <cylinderBufferGeometry attach='geometry' args={[0.22, 0.22, 0.05, 15, 1, false, 0, 6.3]}/>
                <meshStandardMaterial attach='material' color='black'/>
            </a.mesh>
            <a.mesh castShadow position={
                [position[0]-mapSize[0]/2 - 0.98 + 1, 0.005 ,position[2]-mapSize[1]/2 - size[1]/2 + 1]
            } rotation={[-Math.PI / 2, 0, Math.PI/2]}>
                <cylinderBufferGeometry attach='geometry' args={[0.22, 0.22, 0.05, 15, 1, false, 0, 6.3]}/>
                <meshStandardMaterial attach='material' color='black'/>
            </a.mesh>
            <a.mesh castShadow position={
                [position[0]-mapSize[0]/2 - 0.02 + 1, 0.005 ,position[2]-mapSize[1]/2 - size[2]/2 + 1]
            } rotation={[-Math.PI / 2, 0, Math.PI/2]}>
                <cylinderBufferGeometry attach='geometry' args={[0.22, 0.22, 0.05, 15, 1, false, 0, 6.3]}/>
                <meshStandardMaterial attach='material' color='black'/>
            </a.mesh>
         </group>
    );

    const pipeMappings = {
        '1': pipe_straight_1,
        '2': pipe_straight_2,
        '3': pipe_corner_1,
        '4': pipe_corner_2,
        '5': pipe_corner_3,
        '6': pipe_corner_4,
        '7': pipe_threeway_1,
        '8': pipe_threeway_2,
        '9': pipe_threeway_3,
        '10': pipe_threeway_4,
        '11': pipe_intersection_4,
    }

    const isPipe = tileMapObjects[position[0]][position[2]] !== 0;

    return (
        sewageMode && isPipe ? pipeMappings[tileMapObjects[position[0]][[position[2]]]]
        : null
    )
}

export default Pipe;
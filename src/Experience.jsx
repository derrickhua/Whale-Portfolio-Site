import { useThree, extend, useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { Physics } from '@react-three/rapier'
import { Perf } from 'r3f-perf'
import {Sky} from "@react-three/drei";

import PalmIsland from './models/PalmTreeIsland'
import CrabIsland from './models/CrabIsland'
import VolcanoIsland from './models/VolcanoIsland'
import Whale from './models/Whale'
import Sea from './Sea'
extend({ OrbitControls })

export default function Experience()
{
    const { camera, gl } = useThree()

    return <>
        <Perf position="top-left" />
        <orbitControls args={ [ camera, gl.domElement ] } />

        <directionalLight position={ [ 1, 2, 3 ] } intensity={ 1.5 } />
        <ambientLight intensity={ 0.5 } />


        <Physics debug={false}>
            <Sea />
            <PalmIsland />
            <CrabIsland />
            <VolcanoIsland />
            <Whale />            
        </Physics>
        <Sky />
    </>
}
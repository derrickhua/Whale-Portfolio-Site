import {Html } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from 'three'

export default function Information({whale}) {
    let palm = useRef()
    let crab = useRef()
    let volc = useRef()
    let palmPos = new THREE.Vector3(-2, -0.1, 10)
    let crabPos = new THREE.Vector3(2, -0.5,0)
    let volcPos = new THREE.Vector3(0, 0, -15)

    useFrame((state, delta)=> {
        if (whale && palm && crab && volc) {
            const whalePos = whale.current.translation()
            
            if (whalePos.x - palmPos.x < 0.021 && whalePos.z - palmPos.z < 1.5) {
                palm.current.classList.add('active')
            } else {
                palm.current.classList.remove('active')
            }

            if (whalePos.x - crabPos.x >= 0.05 && whalePos.z - crabPos.z < 1.5) {
                crab.current.classList.add('active')
            } else {
                crab.current.classList.remove('active')
            }

            if (whalePos.x - volcPos.x < 0.05 && whalePos.z - volcPos.z < 3) {
                volc.current.classList.add('active')
            } else {
                volc.current.classList.remove('active')
            }

            // console.log(whalePos)
        }
        // position={[-2, -0.1, 10]}
        // palm.current.classList.add('active)



    })
    return <>
        <Html
            transform
            wrapperClass='htmlPalm'
            distanceFactor={1.17}
            position={[-2, 2, 10]}
            scale={2}
            ref={palm}
        >
            <img src="./white.JPG"/>
        </Html>
        <Html
            transform
            wrapperClass='htmlCrab'
            distanceFactor={1.17}
            position={[2.15, 2,0]}
            scale={2}
            ref={crab}
            visible={false}
        >
            <img src="./white.JPG"/>
        </Html>
        <Html
            transform
            wrapperClass='htmlVolc'
            distanceFactor={1.17}
            position={[0, 2, -15]}
            scale={2}
            ref={volc}
        >
            <img src="./white.JPG"/>
        </Html>
        
    </>
}
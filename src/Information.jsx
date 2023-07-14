import {Html, Text3D, Float, Image } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import * as THREE from 'three'

export default function Information({whale, setCameraPos}) {
    let palm = useRef()
    let crab = useRef()
    let volc = useRef()
    let links = useRef()
    let socialLinks = useRef()
    let palmPos = new THREE.Vector3(-2, -0.1, 10)
    let crabPos = new THREE.Vector3(2, -0.5,0)
    let volcPos = new THREE.Vector3(0, 0, -15)
    
    const [smoothCameraPosition] = useState(()=> new THREE.Vector3(10, 10, 10))
    const [smoothCameraTarget] = useState(()=> new THREE.Vector3())

    const infoCam = () => {
        setCameraPos([5, 0.25, 0.6])
    }

    const whaleCam = () => {
        setCameraPos([2.25, 0.2, 0.15])
    }

    const projOne = () => {
        window.open('https://ta-o.herokuapp.com/', '_blank').focus()
    }

    const projTwo = () => {
        window.open('https://audiofyapp.herokuapp.com/','_blank').focus()
    }

    const githubLink = () => {
        window.open('https://github.com/derrickhua','_blank').focus()
    }

    const linkedInLink = () => {
        window.open('https://www.linkedin.com/in/derrick-paul-zamora-hua/','_blank').focus()
    }

    const igLink = () => {
        window.open('https://www.instagram.com/d.rcht/','_blank').focus()
    }
    
    useFrame((state, delta)=> {
        if (whale && palm && crab && volc) {
            const whalePos = whale.current.translation()
            
            if (whalePos.x - palmPos.x < 0.5 &&  whalePos.x - palmPos.x > -0.5 && whalePos.z - palmPos.z < 2) {
                palm.current.classList.add('active')
                infoCam()
            } else {
                palm.current.classList.remove('active')
            }

            if (whalePos.x - crabPos.x < 0.9 && whalePos.x - crabPos.x > -0.3 && whalePos.z - crabPos.z < 2) {
                crab.current.classList.add('active')
                infoCam()
            } else {
                crab.current.classList.remove('active')
            }

            if (whalePos.x - volcPos.x < 0.2 &&  whalePos.x - volcPos.x > -0.2 &&whalePos.z - volcPos.z < 3) {
                volc.current.classList.add('active')
                links.current.visible = true

                infoCam()
            } else {
                volc.current.classList.remove('active')
                links.current.visible = false
            }

            // console.log(whalePos, crabPos)
            // if all of them don't have active, return to whale cam 
            if (!palm.current.classList.contains('active') 
            && !crab.current.classList.contains('active') 
            && !volc.current.classList.contains('active')) {
                whaleCam()
            }
            // console.log(links)
        /**
         * Camera Changes when Close to Island
         */

    
        }
    })
    return <>
        <Html
            transform
            wrapperClass='htmlPalm'
            distanceFactor={1.17}
            position={[-2, 2, 10]}
            scale={1}
            ref={palm}
        >
            <img src="./introcardFinal.png"/>
        </Html>
        <Html
            transform
            wrapperClass='htmlCrab'
            distanceFactor={1.17}
            position={[2.25, 2,0]}
            scale={1}
            ref={crab}
            visible={false}
        >
            <img src="./skillBoard.png"/>
        </Html>
        <Html
            transform
            wrapperClass='htmlVolc'
            distanceFactor={1.17}
            position={[0.1, 2, -15]}
            scale={1.25}
            ref={volc}
        >
            <img src="./finalCard.png"/>            
        </Html>
        <group
            ref={links}
            visible={false}
        >
            <Float
              speed={1} 
              rotationIntensity={0.01} 
              floatIntensity={0.1} 
              floatingRange={[0, 0]} 
            >
                <Text3D
                    position={[1.75, 3, -15]}
                    scale={0.1}
                    font="./Lobster_Regular.json"
                >
                    {`Project\n Links`}
                    <meshStandardMaterial color="white" />

                </Text3D>
                <Text3D
                    position={[2.5, 3, -15]}
                    scale={0.1}
                    font="./Lobster_Regular.json"
                >
                    {`Social\n Links`}
                    <meshStandardMaterial color="lightblue" />

                </Text3D>
                <Text3D
                    position={[1.75, 2.15, -15]}
                    scale={0.5}
                    font="./Lobster_Regular.json"
                    onClick={projOne}
                >
                    {`>`}
                    <meshStandardMaterial color="white" />

                </Text3D>
                <Text3D
                    position={[1.75, 1.75, -15]}
                    scale={0.5}
                    font="./Lobster_Regular.json"
                    onClick={projTwo}
                >
                    {`>`}
                    <meshStandardMaterial color="white" />
                </Text3D>       

                <Text3D
                    position={[-.335, 0.15, -9.5]}
                    scale={0.05}
                    font="./Lobster_Regular.json"
                >
                    THANK YOU FOR COMING!
                    <meshStandardMaterial color="white" />
                </Text3D>     
                <Image 
                url='./githubLogo.png'
                position={[2.65, 2.4, -15]}
                transparent 
                scale={0.3}
                onClick={githubLink}
                />
                <Image 
                url='./LinkedInLogo.png'
                position={[2.65, 2, -15]}
                transparent 
                scale={0.3}
                onClick={linkedInLink}
                />
                <Image 
                url='./igLogo.png'
                position={[2.65, 1.6, -15]}
                transparent 
                scale={0.3}
                onClick={igLink}
                />
          
            </Float>
     

        </group>

        
    </>
}
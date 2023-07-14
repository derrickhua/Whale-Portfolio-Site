import { RigidBody, useRapier } from "@react-three/rapier";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { useGLTF, useTexture, useKeyboardControls, Html } from "@react-three/drei";
import * as THREE from 'three'

import Information from '../Information.jsx'
export default function Whale() {
   
    // Importing Whale Model
    const whale = useGLTF("./Whale.glb")
    const whaleTexture = useTexture("./Whale.jpg")
    whaleTexture.colorSpace = THREE.SRGBColorSpace
    whaleTexture.flipY = false
    whale.materials[""].map = whaleTexture

    // Assigning Physics and Controls
    const whaleBody = useRef()
    const [subscribeKeys, getKeys] = useKeyboardControls()
    const {rapier, world} = useRapier()
    const rapierWorld = world

    // Camera
    const [smoothCameraPosition] = useState(()=> new THREE.Vector3(10, 10, 10))
    const [smoothCameraTarget] = useState(()=> new THREE.Vector3())
    const [cameraPos, setCameraPos] = useState([2.25, 0.2, 0.15])


    useFrame((state, delta) =>{
        /**
         * Whale Keyboard Input and Movement
         */
        const {forward, backward, leftward, rightward} = getKeys()

        const impulse= {x:0, y:0, z:0}
        const impulseStrength = 1 * delta

        const torque= {x:0, y:0, z:0}
        const torqueStrength = 0.75 * delta
        if(forward){
            impulse.z -= impulseStrength
            torque.x -= torqueStrength * 0.25
        } 
        if (backward) {
            impulse.z += impulseStrength
            torque.x += torqueStrength * 0.25
        } 
        if (leftward) {
            impulse.x -= impulseStrength
        } 
        if (rightward) {
            impulse.x += impulseStrength
        } 

        whaleBody.current.applyImpulse(impulse)
        whaleBody.current.applyTorqueImpulse(torque)
        /**
         * Camera
         */
        const whalePosition = whaleBody.current.translation()

        const cameraPosition = new THREE.Vector3()
        cameraPosition.copy(whalePosition)
        cameraPosition.z += cameraPos[0]
        cameraPosition.y += cameraPos[1]

        const cameraTarget = new THREE.Vector3()
        cameraTarget.copy(whalePosition)
        cameraTarget.y += cameraPos[2]

        smoothCameraPosition.lerp(cameraPosition, 5 * delta)
        smoothCameraTarget.lerp(cameraTarget, 5 * delta)

        state.camera.position.copy(smoothCameraPosition)
        state.camera.lookAt(smoothCameraTarget)
    })

    const reset = () => {
        whaleBody.current.setTranslation({x:0, y: 0, z: 20})
        whaleBody.current.setLinvel({x:0, y: 0, z: 0})
        whaleBody.current.setAngvel({x:0, y: 0, z: 0})
    }

    return <>
        
        <RigidBody 
            colliders="cuboid" 
            position={[0, 0, 20]}
            restitution={0.2} 
            friction={0.2}
            linearDamping={0.5}
            angularDamping={0.5}
            ref={whaleBody}
            canSleep={false} 
        >
            <primitive object={whale.scene} scale={0.25} />
        </RigidBody>
        <Information whale={whaleBody} setCameraPos={setCameraPos}/>
    </>
}

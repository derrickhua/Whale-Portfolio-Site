import { useGLTF, useTexture } from "@react-three/drei";
import { useEffect } from "react";
import * as THREE from 'three'

export default function Whale() {
    const whale = useGLTF("./Whale.glb")
    console.log(whale)
    const whaleTexture = useTexture("./Whale.jpg")
    whaleTexture.colorSpace = THREE.SRGBColorSpace
    whaleTexture.flipY = false
    whale.materials[""].map = whaleTexture
    return <>
        <primitive object={whale.scene} scale={0.25} position={[0, 0, 20]}/>
    </>
}

import { useGLTF, useTexture } from "@react-three/drei";
import { useEffect } from "react";
import * as THREE from 'three'


export default function PalmIsland() {
    const island = useGLTF("./PalmTreeIsland.glb")
    const islandTexture = useTexture("./PalmIsland.jpg")
    islandTexture.colorSpace = THREE.SRGBColorSpace
    islandTexture.flipY = false
    island.materials[""].map = islandTexture
    return <>
        <primitive object={island.scene} scale={0.15} position={[-2, -0.1,0]}/>
    </>
}
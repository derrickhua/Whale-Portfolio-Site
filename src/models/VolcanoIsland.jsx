import { useGLTF, useTexture } from "@react-three/drei";
import { useEffect } from "react";
import * as THREE from 'three'


export default function VolcanoIsland() {
    const island = useGLTF("./VolcanoIsland.glb")
    const islandTexture = useTexture("./volcanoBaked.jpg")
    islandTexture.colorSpace = THREE.SRGBColorSpace
    islandTexture.flipY = false
    island.materials[""].map = islandTexture
    island.materials[""].metalnessMap = islandTexture

    console.log(island)
    return <>
        <primitive object={island.scene} scale={1} position={[0, 0, -15]}/>
    </>
}
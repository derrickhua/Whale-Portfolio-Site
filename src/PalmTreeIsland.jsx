import { useGLTF, useTexture } from "@react-three/drei";
import { useEffect } from "react";


export default function PalmIsland() {
    const island = useGLTF("./palmTreeIsland1.glb")
    console.log(island)
    const islandTexture = useTexture("./PalmIsland1.jpg")
    islandTexture.flipY = false
    island.materials[""].map = islandTexture
    return <>
        <primitive object={island.scene} scale={0.15} position={[-1.5, -0.1,0]}/>
    </>
}
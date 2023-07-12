import { useGLTF, useTexture } from "@react-three/drei";
import { CuboidCollider, RigidBody } from "@react-three/rapier";
import { useEffect } from "react";
import * as THREE from 'three'

export default function CrabIsland() {
    const island = useGLTF("./CrabIsland.glb")
    const islandTexture = useTexture("./CrabIsland.jpg")
    islandTexture.colorSpace = THREE.SRGBColorSpace
    islandTexture.flipY = false
    island.materials['Crabby'].map = islandTexture
    island.materials['Sandy'].map = islandTexture

    return <>
        <primitive object={island.scene} scale={0.2} position={[2, -0.5,0]}/>
        <CuboidCollider position={[2.25, -0.5,0]} args={[0.5, 1, 1]}/>
    </>
}

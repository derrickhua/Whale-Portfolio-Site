import { extend, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useMemo, useRef } from 'react'
import vertexShader from './shaders/waterShaders/vertexShader'
import fragmentShader from './shaders/waterShaders/fragmentShader'
import { RigidBody } from '@react-three/rapier'
export default function Sea() {
    const actualSea = useRef()
    const uniforms = useMemo(
        () => ({
            uTime: { value: 0 },
        
            uBigWavesElevation: { value: 0.1 },
            uBigWavesFrequency: { value: new THREE.Vector2(0.975, 1.5) },
            uBigWavesSpeed: { value: 0.75 },
    
            uSmallWavesElevation: { value: 0.04 },
            uSmallWavesFrequency: { value: 5 },
            uSmallWavesSpeed: { value: 0.2 },
            uSmallIterations: { value: 4 },
    
            uDepthColor: { value: new THREE.Color('#186691') },
            uSurfaceColor: { value: new THREE.Color('#9bd8ff') },
            uColorOffset: { value: 0.08 },
            uColorMultiplier: { value: 5 }
        }),
        []
    )

    useFrame((state, delta)=> {
        const {clock} = state;
        actualSea.current.material.uniforms.uTime.value = clock.getElapsedTime()
    })

    return <>
        <mesh rotation-x={-Math.PI / 2} ref={actualSea}>
            <planeGeometry args={[10, 50, 256, 1024]}/>
            <shaderMaterial
                fragmentShader={fragmentShader}
                vertexShader={vertexShader}
                uniforms={uniforms}
            />
        </mesh>
        <RigidBody type="fixed" 
        restitution={2} 
        friction={0} 
        position={[0, 0, 0]}
        >

            <mesh rotation-y={-Math.PI / 2} position={[5, 1, 0]}> 
                <planeGeometry args={[50, 1.5]}/>
                <meshBasicMaterial opacity={0} transparent/>
            </mesh>
            <mesh rotation-y={-Math.PI / 2} position={[-5, 1, 0]}> 
                <planeGeometry args={[50, 1.5]}/>
                <meshBasicMaterial opacity={0} transparent/>
            </mesh>
            <mesh position={[0, 1, -25]}>
                <planeGeometry args={[11, 1.5]}/>
                <meshBasicMaterial opacity={0} transparent/>
            </mesh>
            <mesh position={[0, 1, 23]}>
                <planeGeometry args={[11, 1.5]}/>
                <meshBasicMaterial opacity={0} transparent/>
            </mesh>
        </RigidBody>
        <RigidBody type="fixed" 
            restitution={1} 
            friction={0} 
            position={[0, 0, 0]}>
            <mesh rotation-x={-Math.PI / 2} position={[0, -0.2, 0]}>
                <planeGeometry args={[10, 50]}/>
                <meshBasicMaterial opacity={0} transparent/>
            </mesh>
        </RigidBody>

    </>
}
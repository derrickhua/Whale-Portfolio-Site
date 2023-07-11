import './style.css'
import ReactDOM from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import Experience from './Experience.jsx'
import * as THREE from 'three'
import { KeyboardControls } from '@react-three/drei'

const root = ReactDOM.createRoot(document.querySelector('#root'))

root.render(
    <KeyboardControls
        map={[
            {name:'forward', keys:['ArrowUp', 'KeyW']},
            {name:'backward', keys:['ArrowDown', 'KeyS']},
            {name:'leftward', keys:['ArrowLeft', 'KeyA']},
            {name:'rightward', keys:['ArrowRight', 'KeyD']},
        ]}
    >
        <Canvas
            gl={ {
                antialias: true,
                toneMapping: THREE.ACESFilmicToneMapping,
                // outputColorSpace: THREE.SRGBColorSpace
            } }
            camera={ {
                fov: 45,
                near: 0.1,
                far: 200,
                position: [ 0, 2, 10 ]
            } }
        >
            <Experience />
        </Canvas>        
    </KeyboardControls>

)
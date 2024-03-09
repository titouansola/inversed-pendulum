import { KeyboardControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Physics } from '@react-three/rapier'
import { useAtom } from 'jotai'
import { useMemo } from 'react'
import { gravityAtom } from '../utils/atoms.js'
import { WORLD_OFFSET } from '../utils/constants.js'
import { Interface } from '../Interface/Interface.jsx'
import { Pendulum } from './Pendulum.jsx'
import { Track } from './Track.jsx'

export function Experience() {
    const map = useMemo(() => [
        { name: 'left', keys: ['ArrowLeft', 'KeyA'] },
        { name: 'right', keys: ['ArrowRight', 'KeyD'] },
        { name: 'reset', keys: ['Space'] },
        { name: 'option', keys: ['Escape'] }
    ], []);
    const [gravity] = useAtom(gravityAtom);
    //
    return <KeyboardControls map={map}>
        <Canvas camera={{ position: [0, 3, 15] }}>
            <Physics gravity={[0, -gravity, 0]}>
                <group position-y={WORLD_OFFSET}>
                    <Pendulum />
                    <Track />
                </group>
            </Physics>
        </Canvas>
        <Interface />
    </KeyboardControls>;
}

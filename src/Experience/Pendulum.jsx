import { useKeyboardControls, useTexture } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { BallCollider, CylinderCollider, RigidBody } from '@react-three/rapier'
import { useAtom } from 'jotai'
import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { forceAtom, optionAtom, runningAtom } from '../utils/atoms.js'
import {
    BASE_PENDULUM_LENGTH,
    basePendulumGeometry,
    TOP_BALL_RAD,
    topBallGeometry,
    TREE_LENGTH,
    TREE_RAD,
    treeGeometry, WORLD_OFFSET
} from '../utils/constants.js'

export function Pendulum() {
    const ref = useRef(null);
    const [force] = useAtom(forceAtom);
    const [option] = useAtom(optionAtom);
    const [running, setRunning] = useAtom(runningAtom);
    const [started, setStarted] = useState(false);
    const left = useKeyboardControls(c => c.left);
    const right = useKeyboardControls(c => c.right);
    const [sub] = useKeyboardControls();
    //
    const resetPendulum = () => {
        const rigidBody = ref.current;
        rigidBody.setLinvel({ x: 0, y: 0, z: 0 });
        rigidBody.setAngvel({ x: 0, y: 0, z: 0 });
        rigidBody.setRotation({ x: 0, y: 0, z: 0, w: 1 });
        rigidBody.setTranslation({ x: 0, y: WORLD_OFFSET + 0.5, z: 0 });
    };
    //
    const textures = useTexture({
        bumpMap: 'textures/pendulum/bump.png',
        map: 'textures/pendulum/map.png',
        metalnessMap: 'textures/pendulum/metalness.png',
        normalMap: 'textures/pendulum/normal.png',
        roughnessMap: 'textures/pendulum/roughness.png',
    });
    const material = new THREE.MeshStandardMaterial(textures);
    //
    useEffect(() => {
        return sub(
            c => c.reset,
            (reset) => {
                if (ref.current && reset) {
                    setStarted(true);
                    resetPendulum();
                    const randomStart = 0.1 * (Math.random() > 0.5 ? 1 : -1);
                    ref.current.applyImpulseAtPoint(
                        { x: randomStart, y: 0, z: 0 },
                        { x: 0, y: WORLD_OFFSET + BASE_PENDULUM_LENGTH + TREE_LENGTH + TOP_BALL_RAD, z: 0 },
                        true
                    );
                }
            }
        )
    }, []);
    //
    useFrame(() => {
        const rigidBody = ref.current;
        if (!rigidBody || option) return;
        const rotation = rigidBody.rotation();
        const translation = rigidBody.translation();
        if (!running) {
            if (!started) resetPendulum();
            return;
        }
        rigidBody.setRotation({ ...rotation, x: 0, y: 0 });
        rigidBody.setTranslation({ ...translation, z: 0 });
        //
        if (Math.abs(rotation.z) > 0.6) {
            setRunning(false);
        } else if (left) {
            rigidBody.applyImpulseAtPoint(
                { x: -force, y: 0, z: 0 },
                { x: 0, y: WORLD_OFFSET + BASE_PENDULUM_LENGTH / 2, z: 0 },
                true
            );
        } else if (right) {
            rigidBody.applyImpulseAtPoint(
                { x: force, y: 0, z: 0 },
                { x: 0, y: WORLD_OFFSET + BASE_PENDULUM_LENGTH / 2, z: 0 },
                true
            );
        }
    });
    //
    return <RigidBody ref={ref} position-y={0.5} colliders={false} canSleep={false} friction={0.5}>
        <CylinderCollider args={[BASE_PENDULUM_LENGTH / 2, BASE_PENDULUM_LENGTH / 2]} rotation={[Math.PI / 2, 0, 0]}>
            <mesh geometry={basePendulumGeometry} material={material} castShadow={true} />
        </CylinderCollider>
        <CylinderCollider args={[TREE_LENGTH / 2, TREE_RAD]} position={[0, BASE_PENDULUM_LENGTH / 2 + TREE_LENGTH / 2, 0]}>
            <mesh geometry={treeGeometry} material={material} castShadow={true} />
        </CylinderCollider>
        <BallCollider args={[TOP_BALL_RAD]} position={[0, BASE_PENDULUM_LENGTH / 2 + TREE_LENGTH + TOP_BALL_RAD / 2, 0]}>
            <mesh geometry={topBallGeometry} material={material} castShadow={true} />
        </BallCollider>
    </RigidBody>
}

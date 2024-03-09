import { useKeyboardControls } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { BallCollider, CylinderCollider, RigidBody } from '@react-three/rapier'
import { useAtom } from 'jotai'
import { useEffect, useRef } from 'react'
import { forceAtom, optionAtom, runningAtom } from '../utils/atoms.js'
import {
    BASE_PENDULUM_LENGTH,
    basePendulumGeometry,
    pink,
    red,
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
    const left = useKeyboardControls(c => c.left);
    const right = useKeyboardControls(c => c.right);
    const [sub] = useKeyboardControls();
    //
    useEffect(() => {
        return sub(
            c => c.reset,
            (reset) => {
                const rigidBody = ref.current;
                if (!rigidBody || !reset) return;
                //
                rigidBody.setLinvel({ x: 0, y: 0, z: 0 });
                rigidBody.setAngvel({ x: 0, y: 0, z: 0 });
                rigidBody.setRotation({ x: 0, y: 0, z: 0.01 * (Math.random() > 0.5 ? 1 : -1), w: 1 }, true);
                rigidBody.setTranslation({ x: 0, y: WORLD_OFFSET + 0.5, z: 0 }, true);
            }
        )
    }, []);
    //
    useFrame(() => {
        const rigidBody = ref.current;
        if (!rigidBody || option || !running) return;
        //
        const rotation = rigidBody.rotation();
        const translation = rigidBody.translation();
        rigidBody.setRotation({ ...rotation, x: 0, y: 0 });
        rigidBody.setTranslation({ ...translation, z: 0 });
        //
        if (Math.abs(rotation.z) > 0.61) {
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
            <mesh geometry={basePendulumGeometry} material={red} />
        </CylinderCollider>
        <CylinderCollider args={[TREE_LENGTH / 2, TREE_RAD]} position={[0, BASE_PENDULUM_LENGTH / 2 + TREE_LENGTH / 2, 0]}>
            <mesh geometry={treeGeometry} material={pink} />
        </CylinderCollider>
        <BallCollider args={[TOP_BALL_RAD]} position={[0, BASE_PENDULUM_LENGTH / 2 + TREE_LENGTH + TOP_BALL_RAD / 2, 0]}>
            <mesh geometry={topBallGeometry} material={red} />
        </BallCollider>
    </RigidBody>
}

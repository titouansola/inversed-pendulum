import { useTexture } from '@react-three/drei'
import { RigidBody } from '@react-three/rapier'
import * as THREE from 'three'
import {
    TRACK_LENGTH,
    TRACK_LOCK_WIDTH,
    TRACK_WALL_WIDTH,
    TRACK_WIDTH,
    trackEndGeometry,
    trackFloorGeometry,
    trackLengthWallGeometry,
    trackLockGeometry
} from '../utils/constants.js'

export function Track() {
    const texture = useTexture({
        bumpMap: 'textures/track/bump.jpg',
        map: 'textures/track/map.jpg',
        normalMap: 'textures/track/normal.png',
    });
    const material = new THREE.MeshStandardMaterial(texture);
    //
    return <>
        <RigidBody type={'fixed'} friction={0.5}>
            {/*FLOOR*/}
            <mesh
                geometry={trackFloorGeometry}
                material={material}
            />
            {/*LENGTH*/}
            <mesh
                geometry={trackLengthWallGeometry}
                material={material}
                position={[0, (TRACK_WIDTH + TRACK_WALL_WIDTH) / 2, (TRACK_WIDTH + TRACK_WALL_WIDTH) / 2]}
                receiveShadow={true}
            />
            <mesh
                geometry={trackLengthWallGeometry}
                material={material}
                position={[0, (TRACK_WIDTH + TRACK_WALL_WIDTH) / 2, -(TRACK_WIDTH + TRACK_WALL_WIDTH) / 2]}
                receiveShadow={true}
            />
            {/*END*/}
            <mesh
                geometry={trackEndGeometry}
                material={material}
                position={[(TRACK_LENGTH + TRACK_WALL_WIDTH) / 2, TRACK_WIDTH / 4 - TRACK_WALL_WIDTH / 2, (TRACK_WIDTH - TRACK_LOCK_WIDTH) / 2]}
                receiveShadow={true}
            />
            <mesh
                geometry={trackEndGeometry}
                material={material}
                position={[(TRACK_LENGTH + TRACK_WALL_WIDTH) / 2, TRACK_WIDTH / 4 - TRACK_WALL_WIDTH / 2, -(TRACK_WIDTH - TRACK_LOCK_WIDTH) / 2]}
                receiveShadow={true}
            />
            <mesh
                geometry={trackEndGeometry}
                material={material}
                position={[-(TRACK_LENGTH + TRACK_WALL_WIDTH) / 2, TRACK_WIDTH / 4 - TRACK_WALL_WIDTH / 2, (TRACK_WIDTH - TRACK_LOCK_WIDTH) / 2]}
                receiveShadow={true}
            />
            <mesh
                geometry={trackEndGeometry}
                material={material}
                position={[-(TRACK_LENGTH + TRACK_WALL_WIDTH) / 2, TRACK_WIDTH / 4 - TRACK_WALL_WIDTH / 2, -(TRACK_WIDTH - TRACK_LOCK_WIDTH) / 2]}
                receiveShadow={true}
            />
            {/*LOCKER*/}
            <mesh
                geometry={trackLockGeometry}
                material={material}
                position={[0, TRACK_WIDTH + TRACK_WALL_WIDTH, (TRACK_WIDTH - TRACK_LOCK_WIDTH) / 2]}
                receiveShadow={true}
            />
            <mesh
                geometry={trackLockGeometry}
                material={material}
                position={[0, TRACK_WIDTH + TRACK_WALL_WIDTH, -(TRACK_WIDTH - TRACK_LOCK_WIDTH) / 2]}
                receiveShadow={true}
            />
        </RigidBody>
    </>
}

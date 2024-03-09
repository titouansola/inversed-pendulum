import { RigidBody } from '@react-three/rapier'
import {
    grey1,
    grey2,
    grey3,
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
    return <>
        <RigidBody type={'fixed'} friction={0.5}>
            {/*FLOOR*/}
            <mesh geometry={trackFloorGeometry} material={grey1} />
            {/*LENGTH*/}
            <mesh geometry={trackLengthWallGeometry} material={grey2} position={[0, (TRACK_WIDTH + TRACK_WALL_WIDTH) / 2, (TRACK_WIDTH + TRACK_WALL_WIDTH) / 2]} />
            <mesh geometry={trackLengthWallGeometry} material={grey2} position={[0, (TRACK_WIDTH + TRACK_WALL_WIDTH) / 2, -(TRACK_WIDTH + TRACK_WALL_WIDTH) / 2]} />
            {/*END*/}
            <mesh geometry={trackEndGeometry} material={grey3} position={[(TRACK_LENGTH + TRACK_WALL_WIDTH) / 2, TRACK_WIDTH / 4 - TRACK_WALL_WIDTH / 2, 0]} />
            <mesh geometry={trackEndGeometry} material={grey3} position={[-(TRACK_LENGTH + TRACK_WALL_WIDTH) / 2, TRACK_WIDTH / 4 - TRACK_WALL_WIDTH / 2, 0]} />
            {/*LOCKER*/}
            <mesh geometry={trackLockGeometry} material={grey1} position={[0, TRACK_WIDTH + TRACK_WALL_WIDTH, (TRACK_WIDTH - TRACK_LOCK_WIDTH) / 2]} />
            <mesh geometry={trackLockGeometry} material={grey1} position={[0, TRACK_WIDTH + TRACK_WALL_WIDTH, -(TRACK_WIDTH - TRACK_LOCK_WIDTH) / 2]} />
        </RigidBody>
    </>
}

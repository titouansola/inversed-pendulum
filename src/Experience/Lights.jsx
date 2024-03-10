import { useMemo } from 'react'

export function Lights() {
    const shadowCameraProps = useMemo(() => ({
        attach: 'shadow-camera',
        near: 2,
        far: 14,
        top: 0.25,
        bottom: -7.75,
        right: 9,
        left: -9,
    }), []);
    //
    return <>
        <ambientLight intensity={0.2} />
        <directionalLight position={[-3, 3, 4]} intensity={5} castShadow={true}>
            <orthographicCamera {...shadowCameraProps} />
        </directionalLight>
        <directionalLight position={[3, 3, -4]} intensity={2.5} castShadow={true}>
            <orthographicCamera {...shadowCameraProps} />
        </directionalLight>
    </>;
}

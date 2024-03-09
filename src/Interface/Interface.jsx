import { useKeyboardControls } from '@react-three/drei'
import { useAtom } from 'jotai'
import { useEffect } from 'react'
import { optionAtom } from '../utils/atoms.js'
import { Instructions } from './Instructions.jsx'
import { OptionModal } from './OptionModal.jsx'
import { Timer } from './Timer.jsx'

import  './interface.css'

export function Interface() {
    const [, setOption] = useAtom(optionAtom);
    const [sub] = useKeyboardControls();
    //
    useEffect(() => {
        return sub(
            c => c.option,
            optionPressed => {
                if (optionPressed) {
                    setOption(o => !o);
                    document.activeElement.blur();
                }
            });
    }, []);
    //
    return <>
        <Timer />
        <Instructions />
        <OptionModal />
    </>;
}

import { useAtom } from 'jotai'
import clsx from 'clsx'
import { forceAtom, gravityAtom, optionAtom } from '../utils/atoms.js'

export function OptionModal() {
    const [force, setForce] = useAtom(forceAtom);
    const [gravity, setGravity] = useAtom(gravityAtom);
    //
    const [option, setOption] = useAtom(optionAtom);
    const close = () => setOption(false);
    //
    return <div className={clsx('option-modal-container', option && 'show')}>
        <div className={'option-modal'}>
            <h2>Options</h2>
            <div className="option-modal-body">
                <div className={'option-field'}>
                    <label htmlFor="force-slider">Force : <b>{force}</b></label>
                    <input
                        id={'force-slider'}
                        type="range"
                        min={0.1}
                        max={1.5}
                        step={0.01}
                        value={force}
                        onChange={e => setForce(+e.target.value)}
                    />
                </div>
                <div className={'option-field'}>
                    <label htmlFor="gravity-slider">Gravity : <b>{gravity}</b></label>
                    <input
                        id={'gravity-slider'}
                        type="range"
                        min={1}
                        max={20}
                        step={0.01}
                        value={gravity}
                        onChange={e => setGravity(+e.target.value)}
                    />
                </div>
            </div>
            <div className="option-modal-footer">
                <button onClick={close}>Confirm</button>
            </div>
        </div>
    </div>
}

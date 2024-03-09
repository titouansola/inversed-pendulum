import { useKeyboardControls } from '@react-three/drei'
import {useAtom} from "jotai";
import { useEffect, useState } from 'react'
import { runningAtom, startTimeAtom } from '../utils/atoms.js'

export function Timer() {
  const [startTime, setStartTime] = useAtom(startTimeAtom);
  const [running, setRunning] = useAtom(runningAtom);
  const [currentTime, setCurrentTime] = useState(0);
  const [sub] = useKeyboardControls();
  const timer = (currentTime / 1000).toFixed(1);
  //
  useEffect(() => {
    return sub(
        c => c.reset,
        (reset) => {
          if (!!reset) {
            setStartTime(Date.now());
            setRunning(true);
          }
        }
    )
  }, []);
  //
  useEffect(() => {
    if (running) {
      const interval = setInterval(() => setCurrentTime(Date.now() - startTime), 100);
      return () => clearInterval(interval);
    }
  }, [startTime, running]);
  //
  return <div className={'timer'}>{timer}</div>
}

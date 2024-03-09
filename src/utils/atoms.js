import { atom } from 'jotai'

// Core
export const runningAtom = atom(false);
export const startTimeAtom = atom(0);
export const optionAtom = atom(false);
// Options
export const forceAtom = atom(0.6);
export const gravityAtom = atom(9.81);

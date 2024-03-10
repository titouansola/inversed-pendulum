import * as THREE from 'three'

export const WORLD_OFFSET = -5;
//
export const TRACK_LENGTH = 20;
export const TRACK_WIDTH = 1;
export const TRACK_WALL_WIDTH = 0.1;
export const TRACK_PIT_SIZE = 0.15;
export const TRACK_LOCK_WIDTH = TRACK_WIDTH / 2 - TRACK_PIT_SIZE;
//
export const BASE_PENDULUM_LENGTH = TRACK_WIDTH - 0.001;
export const TOP_BALL_RAD = BASE_PENDULUM_LENGTH * 3 / 4;
export const TREE_RAD = TRACK_PIT_SIZE - 0.001;
export const TREE_LENGTH = 5;
//
export const trackFloorGeometry = new THREE.BoxGeometry(TRACK_LENGTH, TRACK_WALL_WIDTH, TRACK_WIDTH);
export const trackLengthWallGeometry = new THREE.BoxGeometry(TRACK_LENGTH + TRACK_WALL_WIDTH * 2, TRACK_WIDTH + TRACK_WALL_WIDTH * 2, TRACK_WALL_WIDTH);
export const trackEndGeometry = new THREE.BoxGeometry(TRACK_WALL_WIDTH, TRACK_WIDTH / 2, TRACK_LOCK_WIDTH);
export const trackLockGeometry = new THREE.BoxGeometry(TRACK_LENGTH + TRACK_WALL_WIDTH, TRACK_WALL_WIDTH, TRACK_LOCK_WIDTH);
//
export const basePendulumGeometry = new THREE.CylinderGeometry(BASE_PENDULUM_LENGTH / 2, BASE_PENDULUM_LENGTH / 2, BASE_PENDULUM_LENGTH);
export const topBallGeometry = new THREE.SphereGeometry(TOP_BALL_RAD);
export const treeGeometry = new THREE.CylinderGeometry(TREE_RAD, TREE_RAD, TREE_LENGTH);

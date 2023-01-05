import { writable } from 'svelte/store';

export const darkMode = writable(false);
export const errorMessage = writable('');
export const loading = writable(true);
export const loginStatus = writable(false);

export const weightRecordId = writable('');

export const deadlift = writable(0.0);
export const squat = writable(0.0);
export const benchpress = writable(0.0);
export const overheadpress = writable(0.0);

export const countdown = writable(120);
export const countdownReset = writable(120);

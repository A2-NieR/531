import { writable } from 'svelte/store';

export const toastError = writable('');
export const toastSuccess = writable('');
export const toastWarning = writable('');

export const deadlift = writable(0.0);
export const squat = writable(0.0);
export const benchpress = writable(0.0);
export const overheadpress = writable(0.0);

export const currentWeek = writable(1);
export const currentDay = writable(1);

export const countdown = writable(120);
export const countdownReset = writable(120);

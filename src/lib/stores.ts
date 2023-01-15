import { writable } from 'svelte/store';

export const toastError = writable('');
export const toastSuccess = writable('');
export const toastWarning = writable('');

export const countdown = writable(120);
export const countdownReset = writable(120);

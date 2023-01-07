import { calculateWeights } from '$lib/utils';
import type { Actions, PageServerLoad } from './$types';

export const load = (async ({ parent }) => {
	const parentData = await parent();
	let workout;
	if (parentData.cycle && parentData.day && parentData.weights) {
		workout = calculateWeights(parentData.cycle, parentData.day, parentData.weights);
	}

	return { workout: workout };
}) satisfies PageServerLoad;

export const actions: Actions = {
	finishworkout: async ({ locals, request }) => {
		const data = await request.formData();
		const cycle = parseInt(data.get('cycle')?.toString() ?? '0');
		const week = parseInt(data.get('week')?.toString() ?? '0');
		const day = parseInt(data.get('day')?.toString() ?? '0');
		const deadlift = parseFloat(data.get('deadlift')?.toString() ?? '0');
		const squats = parseFloat(data.get('squats')?.toString() ?? '0');
		const benchpress = parseFloat(data.get('benchpress')?.toString() ?? '0');
		const overheadpress = parseFloat(data.get('overheadpress')?.toString() ?? '0');

		const workoutData = {
			id: `w${week}+d${day}+c${cycle}`.padEnd(15, '+'),
			cycle: cycle,
			week: week,
			day: day,
			deadlift: deadlift,
			squat: squats,
			benchpress: benchpress,
			overheadpress: overheadpress,
			done: true
		};

		//TODO: Timeout & feedback when offline
		try {
			await locals.pb.collection('weeks').create(workoutData);
		} catch (err) {
			console.error(err);
		}
	}
};

import { calculateWeights, increaseWeights } from '$lib/utils';
import type { Actions, PageServerLoad } from './$types';
import type { ClientResponseError } from 'pocketbase';
import { error, fail } from '@sveltejs/kit';

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

			if (workoutData.cycle === 3) {
				const currentWeights = {
					deadlift: workoutData.deadlift,
					squat: workoutData.squat,
					benchpress: workoutData.benchpress,
					overheadpress: workoutData.overheadpress
				};
				const increasedWeights = increaseWeights(currentWeights);
				await locals.pb.collection('weights').update(locals.weightRecordId, increasedWeights);
			}
		} catch (err) {
			if ((err as ClientResponseError).data?.code === 400) {
				return fail(400, { message: (err as ClientResponseError).data.message });
			} else if ((err as ClientResponseError).data?.code === 403) {
				return error(403, (err as ClientResponseError).data.message);
			} else {
				return error(400, err as Error);
			}
		}
	}
};

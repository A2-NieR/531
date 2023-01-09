import { increaseWeights } from '$lib/utils';
import type { LayoutServerLoad } from './$types';

export const load = (async ({ locals }) => {
	if (locals.user) {
		//TODO: Error handling
		const weightList = await locals.pb.collection('weights').getList(1);
		const maxWeights = await locals.pb.collection('weights').getOne(weightList.items[0].id);

		let currentWeights = structuredClone(maxWeights);
		let currentWeek: number;
		let currentDay: number;
		let currentCycle: number;

		const weekList = await locals.pb.collection('weeks').getFullList(undefined, {
			sort: '-created'
		});

		if (weekList.length === 0) {
			currentWeek = 1;
			currentDay = 1;
			currentCycle = 1;
		} else {
			const lastItem = await locals.pb.collection('weeks').getList(1, 1, { sort: '-created' });
			const lastWorkout = lastItem.items[0];

			if (lastWorkout.cycle === 3) {
				currentWeek = lastWorkout.week + 1;
				currentDay = 1;
				currentCycle = 1;
				currentWeights = increaseWeights(currentWeights);
			} else {
				currentWeek = lastWorkout.week;
				currentDay = lastWorkout.day + 1;
				currentCycle = lastWorkout.cycle + 1;
			}
		}

		return {
			user: locals.user,
			week: currentWeek,
			day: currentDay,
			cycle: currentCycle,
			weights: currentWeights,
			weightRecordId: locals.weightRecordId
		};
	}

	return { user: undefined };
}) satisfies LayoutServerLoad;

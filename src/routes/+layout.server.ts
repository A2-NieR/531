import type { LayoutServerLoad } from './$types';

export const load = (async ({ locals }) => {
	if (locals.user) {
		//TODO: Error handling
		const weightList = await locals.pb.collection('weights').getList(1);
		const maxWeights = await locals.pb.collection('weights').getOne(weightList.items[0].id);
		const weekList = await locals.pb.collection('weeks').getFullList(undefined, {
			sort: '-created'
		});

		let currentWeek = 1;
		let currentDay = 1;
		let currentCycle = 1;

		//TODO: Update numbers & weights
		if (weekList.length !== 0) {
			currentWeek = weekList.at(-1)?.week;
			currentDay = weekList.at(-1)?.day;
			currentCycle = weekList.at(-1)?.cycle;
		}

		return {
			user: locals.user,
			week: currentWeek,
			day: currentDay,
			cycle: currentCycle,
			weights: structuredClone(maxWeights),
			weightRecordId: locals.weightRecordId
		};
	}

	return { user: undefined };
}) satisfies LayoutServerLoad;

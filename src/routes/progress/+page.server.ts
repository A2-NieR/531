import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	try {
		const weekList = await locals.pb.collection('weeks').getFullList(undefined, {
			sort: '-created'
		});

		const deadliftData = weekList
			.filter((record) => record.deadlift !== 0)
			.map((record) => {
				return {
					group: 'Deadlift',
					value: record.deadlift,
					date: record.updated
				};
			});
		const squatData = weekList
			.filter((record) => record.squat !== 0)
			.map((record) => {
				return {
					group: 'Squat',
					value: record.squat,
					date: record.updated
				};
			});
		const benchpressData = weekList
			.filter((record) => record.benchpress !== 0)
			.map((record) => {
				return {
					group: 'Benchpress',
					value: record.benchpress,
					date: record.updated
				};
			});
		const overheadpressData = weekList
			.filter((record) => record.overheadpress !== 0)
			.map((record) => {
				return {
					group: 'Overheadpress',
					value: record.overheadpress,
					date: record.updated
				};
			});

		const chartData = deadliftData
			.concat(squatData)
			.concat(benchpressData)
			.concat(overheadpressData);
		return {
			chartData: chartData
		};
	} catch (err) {
		console.error(err);
	}
	return { chartData: [] };
};

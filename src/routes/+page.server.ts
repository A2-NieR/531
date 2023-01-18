import { calculateWeights, increaseWeights } from '$lib/utils';
import type { Actions, PageServerLoad } from './$types';
import type { ClientResponseError } from 'pocketbase';
import { error, fail } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ locals, parent }) => {
	const { weightRecordId } = await parent();
	let cycle: number;
	let day: number;
	let week: number;

	try {
		if (weightRecordId) {
			const maxWeights = structuredClone(
				await locals.pb.collection('weights').getOne(weightRecordId)
			);
			const weekList = await locals.pb.collection('weeks').getFullList(undefined, {
				sort: '-created'
			});

			if (weekList.length === 0) {
				cycle = 1;
				day = 1;
				week = 1;
			} else {
				const lastWorkoutRecord = structuredClone(
					await locals.pb.collection('weeks').getList(1, 1, { sort: '-created' })
				);
				const lastWorkout = lastWorkoutRecord.items[0];
				cycle = lastWorkout.cycle;
				day = lastWorkout.day;
				week = lastWorkout.week;

				if (lastWorkout.day === 3 && lastWorkout.cycle !== 3) {
					week = lastWorkout.week + 1;
					day = 1;
					cycle = lastWorkout.cycle + 1;
				} else if (lastWorkout.day === 3 && lastWorkout.cycle === 3) {
					week = lastWorkout.week + 1;
					day = 1;
					cycle = 1;
				} else {
					day = lastWorkout.day + 1;
				}
			}

			const workout = calculateWeights(cycle, day, {
				deadlift: maxWeights.deadlift,
				squat: maxWeights.squat,
				benchpress: maxWeights.benchpress,
				overheadpress: maxWeights.overheadpress
			});

			return { cycle: cycle, day: day, week: week, workout: workout };
		}
		return { cycle: undefined, day: undefined, week: undefined, workout: undefined };
	} catch (err) {
		console.error(err);
		return { error: err as Error };
	}
};

export const actions: Actions = {
	finishWorkout: async ({ locals, request }) => {
		const data = await request.formData();
		const cycle = parseInt(data.get('cycle') as string);
		const week = parseInt(data.get('week') as string);
		const day = parseInt(data.get('day') as string);
		const deadlift = parseFloat(data.get('deadlifts') as string);
		const squats = parseFloat(data.get('squats') as string);
		const benchpress = parseFloat(data.get('benchpress') as string);
		const overheadpress = parseFloat(data.get('overheadpress') as string);

		const workoutData = {
			id: `w${week}-d${day}-c${cycle}`.padEnd(15, '-'),
			cycle: cycle,
			day: day,
			week: week,
			deadlift: deadlift,
			squat: squats,
			benchpress: benchpress,
			overheadpress: overheadpress,
			done: true
		};

		//TODO: Timeout when offline
		try {
			await locals.pb.collection('weeks').create(workoutData);

			if (workoutData.cycle === 3 && workoutData.week % 3 === 0 && workoutData.day === 3) {
				const weightList = await locals.pb.collection('weights').getList(1);
				const currentWeights = structuredClone(
					await locals.pb.collection('weights').getOne(weightList.items[0].id)
				);
				const increasedWeights = increaseWeights({
					deadlift: currentWeights.deadlift,
					squat: currentWeights.squat,
					benchpress: currentWeights.benchpress,
					overheadpress: currentWeights.overheadpress
				});
				await locals.pb.collection('weights').update(weightList.items[0].id, increasedWeights);
			}

			return { success: true };
		} catch (err) {
			console.error(err);
			if ((err as ClientResponseError).data?.code === 400) {
				return fail(400, { message: (err as ClientResponseError).data.message });
			} else if ((err as ClientResponseError).data?.code === 403) {
				return error(403, (err as ClientResponseError).data.message);
			} else {
				return error(400, err as App.Error);
			}
		}
	}
};

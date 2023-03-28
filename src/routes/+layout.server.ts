export const load = async ({ locals }) => {
	if (locals.user) {
		let weightRecordId;
		try {
			const weightList = await locals.pb.collection('weights').getFullList(undefined, {
				sort: '-created'
			});

			if (weightList.length === 0) {
				const newWeightRecord = await locals.pb
					.collection('weights')
					.create({ deadlift: 1, squat: 1, benchpress: 1, overheadpress: 1 });
				weightRecordId = newWeightRecord.id;
			} else {
				const weightList = await locals.pb.collection('weights').getList(1);
				weightRecordId = weightList.items[0].id;
			}
			return {
				user: locals.user,
				weightRecordId: weightRecordId
			};
		} catch (err) {
			console.error(err);
			return { error: err as Error };
		}
	}
};

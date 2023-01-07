import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
	logout: ({ locals }) => {
		locals.pb.authStore.clear();
		locals.user = undefined;
		throw redirect(303, '/login');
	},
	updateweights: async ({ locals, request }) => {
		const data = await request.formData();
		const deadlift = data.get('deadlift')?.toString();
		const squat = data.get('squat')?.toString();
		const benchpress = data.get('benchpress')?.toString();
		const overheadpress = data.get('overheadpress')?.toString();

		//TODO: Timeout & feedback when offline
		try {
			await locals.pb.collection('weights').update(locals.weightRecordId, {
				deadlift: deadlift,
				squat: squat,
				benchpress: benchpress,
				overheadpress: overheadpress
			});
		} catch (err) {
			console.error(err);
		}
	}
};

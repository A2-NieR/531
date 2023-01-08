import { error, fail, redirect } from '@sveltejs/kit';
import type { ClientResponseError } from 'pocketbase';
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
			return { success: true };
		} catch (err) {
			if ((err as ClientResponseError).data?.code === 400) {
				return fail(400, { message: (err as ClientResponseError).data.message });
			} else if ((err as ClientResponseError).data?.code === 403) {
				return error(403, (err as ClientResponseError).data.message);
			} else if ((err as ClientResponseError).data?.code === 404) {
				return error(404, (err as ClientResponseError).data.message);
			} else {
				return error(400, err as Error);
			}
		}
	}
};

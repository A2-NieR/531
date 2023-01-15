import { error, fail, redirect } from '@sveltejs/kit';
import type { ClientResponseError } from 'pocketbase';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals, parent }) => {
	const { weightRecordId } = await parent();

	try {
		if (weightRecordId) {
			const maxWeights = structuredClone(
				await locals.pb.collection('weights').getOne(weightRecordId)
			);

			return { weights: maxWeights };
		}
		return { weights: undefined };
	} catch (err) {
		console.error(err);
	}
};

export const actions: Actions = {
	logout: ({ locals }) => {
		locals.pb.authStore.clear();
		locals.user = null;
		throw redirect(303, '/login');
	},
	updateWeights: async ({ locals, request }) => {
		const formData = await request.formData();
		const updatedWeights = {
			deadlift: parseFloat(formData.get('deadlift') as string),
			squat: parseFloat(formData.get('squat') as string),
			benchpress: parseFloat(formData.get('benchpress') as string),
			overheadpress: parseFloat(formData.get('overheadpress') as string)
		};

		//TODO: Timeout when offline
		try {
			const weightList = await locals.pb.collection('weights').getList(1);
			await locals.pb.collection('weights').update(weightList.items[0].id, updatedWeights);

			return {
				success: true
			};
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

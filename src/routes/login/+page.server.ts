import { error, fail, redirect } from '@sveltejs/kit';
import type { ClientResponseError } from 'pocketbase';
import type { Actions } from './$types';

export const actions: Actions = {
	default: async ({ locals, request }) => {
		const data = await request.formData();
		const email = data.get('email')?.toString();
		const password = data.get('password')?.toString();

		if (email && password) {
			//TODO: Timeout & feedback when offline
			try {
				await locals.pb.admins.authWithPassword(email, password);
			} catch (err) {
				if ((err as ClientResponseError).data?.code === 400) {
					return fail(400, { message: (err as ClientResponseError).data.message });
				} else {
					return error(400, err as Error);
				}
			}
			throw redirect(303, '/');
		}
	}
};

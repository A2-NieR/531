import { error, fail, redirect } from '@sveltejs/kit';
import type { ClientResponseError } from 'pocketbase';

export const actions = {
	login: async ({ locals, request }) => {
		const data = await request.formData();
		const email = data.get('email') as string;
		const password = data.get('password') as string;

		if (email && password) {
			//TODO: Timeout when offline
			try {
				await locals.pb.admins.authWithPassword(email, password);
			} catch (err) {
				if ((err as ClientResponseError).data?.code === 400) {
					return fail(400, { message: (err as ClientResponseError).data.message });
				} else {
					return error(400, err as App.Error);
				}
			}
			throw redirect(303, '/');
		}
	}
};

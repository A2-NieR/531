import { error, redirect } from '@sveltejs/kit';
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
				console.error(err);
				throw error(500, 'Something went wrong');
			}
		}
		throw redirect(303, '/');
	}
};

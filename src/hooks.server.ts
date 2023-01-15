import { redirect, type Handle } from '@sveltejs/kit';
import PocketBase from 'pocketbase';
import { PUBLIC_BACKEND_URL } from '$env/static/public';

export const handle: Handle = async ({ event, resolve }) => {
	const pb = new PocketBase(PUBLIC_BACKEND_URL);
	event.locals.pb = pb;
	event.locals.pb.authStore.loadFromCookie(event.request.headers.get('cookie') || '');

	try {
		event.locals.pb.authStore.isValid && (await event.locals.pb.admins.authRefresh());

		if (event.locals.pb.authStore.isValid) {
			event.locals.user = structuredClone(event.locals.pb.authStore.model);
		} else if (!event.url.pathname.startsWith('/login')) {
			event.locals.pb.authStore.clear();
			event.locals.user = null;
			//! without pathname check this will cause infinite redirects
			throw redirect(303, '/login');
		}
	} catch (err) {
		console.error(err);
		event.locals.pb.authStore.clear();
		event.locals.user = null;

		if (!event.url.pathname.startsWith('/login')) {
			throw redirect(303, '/login');
		}
	}

	const response = await resolve(event);
	//TODO: secure: true
	response.headers.set(
		'set-cookie',
		event.locals.pb.authStore.exportToCookie({ httpOnly: true, secure: false })
	);

	return response;
};

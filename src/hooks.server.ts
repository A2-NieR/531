import { redirect, type Handle, type HandleServerError } from '@sveltejs/kit';
import PocketBase from 'pocketbase';
import * as Sentry from '@sentry/node';
import { PUBLIC_BACKEND_URL } from '$env/static/public';
import { SENTRY_DSN } from '$env/static/private';

export const handle: Handle = async ({ event, resolve }) => {
	event.locals.pb = new PocketBase(PUBLIC_BACKEND_URL);
	event.locals.pb.authStore.loadFromCookie(event.request.headers.get('cookie') || '');

	event.locals.pb.authStore.isValid && (await event.locals.pb.admins.authRefresh());

	if (event.locals.pb.authStore.isValid) {
		event.locals.user = structuredClone(event.locals.pb.authStore.model);
	} else if (!event.url.pathname.startsWith('/login')) {
		event.locals.pb.authStore.clear();
		event.locals.user = null;
		//! without pathname check this will cause infinite redirects
		throw redirect(303, '/login');
	}

	const response = await resolve(event);
	response.headers.set(
		'set-cookie',
		event.locals.pb.authStore.exportToCookie({ httpOnly: true, secure: true })
	);

	return response;
};

Sentry.init({ dsn: SENTRY_DSN, tracesSampleRate: 0.5 });

export const handleError: HandleServerError = ({ error, event }) => {
	Sentry.captureException(error, { tags: { url: event.url.pathname } });

	return {
		code: (error as App.Error).code ?? 'UNKNOWN',
		message: (error as App.Error).message ?? 'Something is not right ☹'
	};
};

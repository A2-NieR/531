import { sveltekit } from '@sveltejs/kit/vite';
import type { UserConfig } from 'vite';
import { SvelteKitPWA } from '@vite-pwa/sveltekit';

const config: UserConfig = {
	plugins: [
		sveltekit(),
		SvelteKitPWA({
			registerType: 'autoUpdate',
			includeAssets: ['favicon.ico', 'apple-touch-icon.png'],
			filename: 'service-worker.js',
			manifest: {
				name: '5/3/1',
				short_name: '531',
				description: '5/3/1 Workout Companion App',
				theme_color: '#ffffff',
				icons: [
					{
						src: '/android-chrome-192x192.png',
						sizes: '192x192',
						type: 'image/png'
					},
					{
						src: '/android-chrome-512x512.png',
						sizes: '512x512',
						type: 'image/png'
					},
					{
						src: '/android-chrome-512x512.png',
						sizes: '512x512',
						type: 'image/png',
						purpose: 'any maskable'
					}
				]
			},
			useCredentials: true,
			workbox: {
				navigateFallback: '/assistance'
			},
			kit: {},
			devOptions: {
				enabled: true,
				navigateFallback: '/'
			}
		})
	],
	ssr: {
		noExternal: process.env.NODE_ENV === 'production' ? ['@carbon/charts', 'carbon-components'] : []
	},
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
};

export default config;

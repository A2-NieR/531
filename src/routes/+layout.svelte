<script lang="ts">
	import { onMount } from 'svelte';
	import { pwaInfo } from 'virtual:pwa-info';
	import { navigating } from '$app/stores';
	import { toastError, toastSuccess, toastWarning } from '$lib/stores';

	import Header from '$lib/components/Header.svelte';
	import { Loading, ToastNotification } from 'carbon-components-svelte';
	import 'carbon-components-svelte/css/all.css';
	import './styles.css';

	export let data;
	const updateIntervalInMS = 24 * 60 * 60 * 1000;

	onMount(async () => {
		if (pwaInfo) {
			const { registerSW } = await import('virtual:pwa-register');
			registerSW({
				immediate: true,
				onRegistered(r) {
					r &&
						setInterval(() => {
							console.log('Checking for sw update');
							r.update();
						}, updateIntervalInMS);
					console.log(`SW Registered: ${r}`);
				},
				onRegisterError(error) {
					console.log('SW registration error', error);
				}
			});
		}
	});

	$: webManifest = pwaInfo ? pwaInfo.webManifest.linkTag : '';
</script>

<svelte:head>
	{@html webManifest}
</svelte:head>

<div class="app">
	{#if $navigating !== null}
		<Loading />
	{:else}
		<Header loginStatus={data.user !== undefined} />
		<main>
			<slot />
			<div class="toaster">
				{#if $toastSuccess.length > 0}
					<ToastNotification fullWidth lowContrast kind="success" subtitle={$toastSuccess} />
				{/if}
				{#if $toastWarning.length > 0}
					<ToastNotification fullWidth lowContrast kind="warning" subtitle={$toastWarning} />
				{/if}
				{#if $toastError.length > 0}
					<ToastNotification
						fullWidth
						lowContrast
						kind="error"
						title="Error"
						subtitle={$toastError}
					/>
				{/if}
			</div>
		</main>
	{/if}
</div>

<style>
	.toaster {
		position: absolute;
		max-width: 100%;
		bottom: 3rem;
		right: 1rem;
		left: 1rem;
	}
</style>

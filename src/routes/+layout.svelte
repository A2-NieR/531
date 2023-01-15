<script lang="ts">
	import { beforeUpdate, onMount, type ComponentType } from 'svelte';
	import { pwaInfo } from 'virtual:pwa-info';
	import { browser } from '$app/environment';
	import { navigating } from '$app/stores';
	import { toastError, toastSuccess, toastWarning } from '$lib/stores';

	import Header from '$lib/components/Header.svelte';
	import { Loading, ToastNotification } from 'carbon-components-svelte';
	import 'carbon-components-svelte/css/all.css';
	import './styles.css';

	import type { LayoutData } from './$types';
	export let data: LayoutData;

	//TODO: Seamless theme switching
	beforeUpdate(() => {
		if (browser) {
			window.matchMedia('(prefers-color-scheme: light)').matches
				? document.documentElement.setAttribute('theme', 'white')
				: document.documentElement.setAttribute('theme', 'g90');
		}
	});

	let ReloadPrompt: ComponentType;
	onMount(async () => {
		pwaInfo && (ReloadPrompt = (await import('$lib/components/ReloadPrompt.svelte')).default);
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

				{#if ReloadPrompt}
					<svelte:component this={ReloadPrompt} />
				{/if}
			</div>
		</main>
	{/if}
</div>

<style>
	.toaster {
		position: absolute;
		max-width: 100%;
		top: 4rem;
		right: 1rem;
		left: 1rem;
	}
</style>

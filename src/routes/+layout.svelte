<script lang="ts">
	import { beforeUpdate, onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { navigating } from '$app/stores';
	import {
		benchpress,
		deadlift,
		overheadpress,
		squat,
		toastError,
		toastSuccess,
		toastWarning
	} from '$lib/stores';

	import Header from '$lib/components/Header.svelte';
	import { Loading, ToastNotification } from 'carbon-components-svelte';
	import 'carbon-components-svelte/css/all.css';
	import './styles.css';

	import type { LayoutData } from './$types';
	export let data: LayoutData;

	beforeUpdate(() => {
		if (browser) {
			window.matchMedia('(prefers-color-scheme: light)').matches
				? document.documentElement.setAttribute('theme', 'white')
				: document.documentElement.setAttribute('theme', 'g90');
		}
	});

	onMount(async () => {
		if (data.user) {
			const { deadlift, squat, benchpress, overheadpress } = data.weights;
			$deadlift = deadlift;
			$squat = squat;
			$benchpress = benchpress;
			$overheadpress = overheadpress;
		}
	});
</script>

<div class="app">
	{#if $navigating !== null}
		<Loading />
	{:else}
		<Header loginStatus={data.user !== undefined} />
		<main>
			<slot />
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
		</main>
	{/if}
</div>

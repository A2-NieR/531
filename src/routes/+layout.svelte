<script lang="ts">
	import { beforeUpdate, onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { navigating } from '$app/stores';
	import { benchpress, deadlift, errorMessage, overheadpress, squat } from '$lib/stores';

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
		if (data) {
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
			{#if $errorMessage.length > 0}
				<ToastNotification fullWidth kind="error" title="Error" subtitle={$errorMessage} />
			{/if}
		</main>
	{/if}
</div>

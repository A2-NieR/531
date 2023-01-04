<script>
	import { beforeUpdate, onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import {
		loading,
		loginStatus,
		darkMode,
		weightRecordId,
		deadlift,
		squat,
		benchpress,
		overheadpress
	} from '$lib/stores';
	import { getOneRepMax, weightList } from '$lib/pb';
	import Header from '$components/Header.svelte';
	import { Loading } from 'carbon-components-svelte';

	import 'carbon-components-svelte/css/all.css';
	import './styles.css';

	beforeUpdate(() => {
		localStorage.getItem('pocketbase_auth') ? ($loginStatus = true) : ($loginStatus = false);

		window.matchMedia('(prefers-color-scheme: light)').matches
			? darkMode.set(false)
			: darkMode.set(true);

		$darkMode === false
			? document.documentElement.setAttribute('theme', 'white')
			: document.documentElement.setAttribute('theme', 'g90');
	});

	onMount(async () => {
		if ($loginStatus) {
			$loading = false;
			const list = await weightList();
			$weightRecordId = list.items[0].id;
			const result = await getOneRepMax($weightRecordId);

			$deadlift = result.deadlift;
			$squat = result.squat;
			$benchpress = result.benchpress;
			$overheadpress = result.overheadpress;
		} else {
			$loading = false;
			goto('/login');
		}
	});
</script>

<div class="app">
	<Header />

	<main>
		{#if $loading}
			<Loading />
		{:else}
			<slot />
		{/if}
	</main>
</div>

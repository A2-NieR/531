<script lang="ts">
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
		overheadpress,
		errorMessage
	} from '$lib/stores';
	import pb from '$lib/pb';

	import Header from '$components/Header.svelte';
	import { Loading, ToastNotification } from 'carbon-components-svelte';
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
			try {
				$loading = false;
				const list = await pb.collection('weights').getList(1);
				$weightRecordId = list.items[0].id;
				const result = await pb.collection('weights').getOne($weightRecordId);

				$deadlift = result.deadlift;
				$squat = result.squat;
				$benchpress = result.benchpress;
				$overheadpress = result.overheadpress;
			} catch (err: unknown) {
				$errorMessage = (err as Error).message;
				setTimeout(() => {
					$errorMessage = '';
				}, 3000);
			}
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

		{#if $errorMessage.length > 0}
			<ToastNotification fullWidth kind="error" title="Error" subtitle={$errorMessage} />
		{/if}
	</main>
</div>

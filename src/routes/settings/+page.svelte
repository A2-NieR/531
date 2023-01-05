<script lang="ts">
	import { goto } from '$app/navigation';
	import pb from '$lib/pb';
	import {
		deadlift,
		squat,
		benchpress,
		overheadpress,
		countdown,
		countdownReset,
		loginStatus,
		weightRecordId,
		errorMessage
	} from '$lib/stores';
	import { displayTimer } from '$lib/helpers';

	import {
		Button,
		DataTable,
		Modal,
		Slider,
		TextInput,
		ToastNotification
	} from 'carbon-components-svelte';
	import Settings from 'carbon-icons-svelte/lib/Settings.svelte';
	import Edit from 'carbon-icons-svelte/lib/Edit.svelte';

	let open = false;
	let currentLift = '';
	let currentWeight = 0;
	let modalHeading = '';
	let modalContent = '';

	let headers = [
		{ key: 'lift', value: 'Lift' },
		{ key: 'orm', value: '1 RM' },
		{ key: 'edit', value: '' }
	];

	let rows = [
		{ id: 'dl', lift: 'Deadlift', orm: '', edit: 'edit' },
		{ id: 'sq', lift: 'Squat', orm: '', edit: 'edit' },
		{ id: 'bp', lift: 'Benchpress', orm: '', edit: 'edit' },
		{ id: 'oh', lift: 'Overheadpress', orm: '', edit: 'edit' }
	];

	const editWeight = (rowId: string) => {
		switch (rowId) {
			case 'dl':
				currentLift = 'Deadlift';
				modalHeading = `Set ${currentLift}`;
				modalContent = `Set the 1 Rep Max for ${currentLift}.`;
				open = true;
				break;
			case 'sq':
				currentLift = 'Squat';
				modalHeading = `Set ${currentLift}`;
				modalContent = `Set the 1 Rep Max for ${currentLift}.`;
				open = true;
				break;
			case 'bp':
				currentLift = 'Benchpress';
				modalHeading = `Set ${currentLift}`;
				modalContent = `Set the 1 Rep Max for ${currentLift}.`;
				open = true;
				break;
			case 'oh':
				currentLift = 'Overheadpress';
				modalHeading = `Set ${currentLift}`;
				modalContent = `Set the 1 Rep Max for ${currentLift}.`;
				open = true;
				break;
		}
	};

	const saveWeight = async (lift: string) => {
		switch (lift) {
			case 'Deadlift':
				$deadlift = currentWeight;
				break;
			case 'Squat':
				$squat = currentWeight;
				break;
			case 'Benchpress':
				$benchpress = currentWeight;
				break;
			case 'Overheadpress':
				$overheadpress = currentWeight;
				break;
		}

		try {
			await pb.collection('weights').update($weightRecordId, {
				deadlift: $deadlift,
				squat: $squat,
				benchpress: $benchpress,
				overheadpress: $overheadpress
			});
			open = false;
		} catch (err: unknown) {
			$errorMessage = (err as Error).message;
			setTimeout(() => {
				$errorMessage = '';
			}, 3000);
		}
	};

	const submitLogout = () => {
		pb.authStore.clear();
		$loginStatus = false;
		goto('/login');
	};
</script>

<div class="heading">
	<div class="heading-title">
		<Settings size={32} class="heading-icon" />
		<h2>Settings</h2>
	</div>
</div>

<Modal
	class="pointer-event modal"
	bind:open
	{modalHeading}
	primaryButtonText="Confirm"
	secondaryButtonText="Cancel"
	on:click:button--primary={() => saveWeight(currentLift)}
	on:click:button--secondary={() => (open = false)}
	><p class="modal-content">{modalContent}</p>
	<TextInput size="xl" type="number" bind:value={currentWeight} />
</Modal>

<DataTable zebra {headers} {rows}>
	<svelte:fragment slot="cell" let:row let:cell>
		{#if cell.key === 'orm' && row.id === 'dl'}
			<strong>{$deadlift} kg</strong>
		{:else if cell.key === 'orm' && row.id === 'sq'}
			<strong>{$squat} kg</strong>
		{:else if cell.key === 'orm' && row.id === 'bp'}
			<strong>{$benchpress} kg</strong>
		{:else if cell.key === 'orm' && row.id === 'oh'}
			<strong>{$overheadpress} kg</strong>
		{/if}
		{#if cell.key === 'edit' && cell.value === 'edit'}
			<Button class="pointer-event" kind="ghost" icon={Edit} on:click={() => editWeight(row.id)} />
		{:else}
			{cell.value}
		{/if}
	</svelte:fragment>
</DataTable>

<Slider
	class="pointer-event"
	labelText="Timer"
	min={60}
	max={180}
	maxLabel="180s"
	bind:value={$countdown}
	step={15}
	hideTextInput
	fullWidth
/>

<div class="timer-form">
	<Button class="pointer-event" on:click={() => ($countdownReset = $countdown)}>Set Timer</Button>
	<TextInput disabled placeholder={displayTimer($countdownReset)} size="xl" />
</div>

<div class="logout-btn">
	<Button class="pointer-event" kind="danger-tertiary" on:click={submitLogout}>Logout</Button>
</div>

{#if $errorMessage.length > 0}
	<ToastNotification fullWidth kind="error" title="Error" subtitle={$errorMessage} />
{/if}

<style>
	.timer-form {
		margin: 0 2rem 6rem;
		display: grid;
		grid-template-columns: 2fr 1fr;
		gap: 1rem;
	}

	.modal-content {
		margin: 1rem 0 2rem;
	}
	.logout-btn {
		width: 100%;
		display: flex;
		justify-content: center;
	}
</style>

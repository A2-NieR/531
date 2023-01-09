<script lang="ts">
	import { enhance, type SubmitFunction } from '$app/forms';
	import {
		benchpress,
		countdown,
		countdownReset,
		deadlift,
		overheadpress,
		squat,
		toastError,
		toastSuccess,
		toastWarning
	} from '$lib/stores';
	import { displayTimer } from '$lib/utils';

	import {
		Button,
		ButtonSet,
		DataTable,
		Modal,
		Slider,
		TextInput,
		ToastNotification
	} from 'carbon-components-svelte';
	import Settings from 'carbon-icons-svelte/lib/Settings.svelte';
	import Edit from 'carbon-icons-svelte/lib/Edit.svelte';

	let open = false;
	let modalHeading = 'Update Weights';
	let modalContent = 'Edit and save the 1 Rep Max Weights and save them to the Database.';

	let headers = [
		{ key: 'lift', value: 'Lift' },
		{ key: 'orm', value: '1 RM' }
	];

	let rows = [
		{ id: 'dl', lift: 'Deadlift', orm: '' },
		{ id: 'sq', lift: 'Squat', orm: '' },
		{ id: 'bp', lift: 'Benchpress', orm: '' },
		{ id: 'oh', lift: 'Overheadpress', orm: '' }
	];

	const updateWeights: SubmitFunction =
		() =>
		async ({ result }) => {
			if (result.type === 'success') {
				open = false;
				$toastSuccess = 'Successfully updated weights.';
				setTimeout(() => {
					$toastSuccess = '';
				}, 3000);
			} else if (result.type === 'failure') {
				$toastWarning = result.data?.message;
				setTimeout(() => {
					$toastWarning = '';
				}, 3000);
			} else if (result.type === 'error') {
				$toastError = result.error.message;
				setTimeout(() => {
					$toastError = '';
				}, 3000);
			}
		};
</script>

<div class="heading">
	<div class="heading-title">
		<Settings size={32} class="heading-icon" />
		<h2>Settings</h2>
	</div>
</div>

<Modal class="modal" bind:open {modalHeading} passiveModal
	><p class="modal-content">{modalContent}</p>
	<form class="modal-form" method="POST" action="?/updateweights" use:enhance={updateWeights}>
		<div class="input-group">
			<TextInput
				size="xl"
				type="number"
				labelText="Deadlift"
				name="deadlift"
				bind:value={$deadlift}
			/>
			<TextInput size="xl" type="number" labelText="Squat" name="squat" bind:value={$squat} />
			<TextInput
				size="xl"
				type="number"
				labelText="Benchpress"
				name="benchpress"
				bind:value={$benchpress}
			/>
			<TextInput
				size="xl"
				type="number"
				labelText="Overhead Press"
				name="overheadpress"
				bind:value={$overheadpress}
			/>
		</div>
		<ButtonSet>
			<Button kind="secondary" on:click={() => (open = false)}>Cancel</Button>
			<Button formaction="?/updateweights" type="submit">Confirm</Button>
		</ButtonSet>
	</form>
</Modal>

<DataTable zebra {headers} {rows}>
	<svelte:fragment slot="cell" let:row let:cell>
		{#if cell.key === 'orm' && row.id === 'dl'}
			{$deadlift} kg
		{:else if cell.key === 'orm' && row.id === 'sq'}
			{$squat} kg
		{:else if cell.key === 'orm' && row.id === 'bp'}
			{$benchpress} kg
		{:else if cell.key === 'orm' && row.id === 'oh'}
			{$overheadpress} kg
		{:else}
			{cell.value}
		{/if}
	</svelte:fragment>
</DataTable>

<div class="btn-center-container">
	<Button kind="tertiary" icon={Edit} on:click={() => (open = true)}>Edit Weights</Button>
</div>

<div class="slider-container">
	<Slider
		labelText="Timer"
		min={60}
		max={180}
		maxLabel="180s"
		bind:value={$countdown}
		step={15}
		hideTextInput
		fullWidth
	/>
</div>

<div class="timer-form">
	<Button on:click={() => ($countdownReset = $countdown)}>Set Timer</Button>
	<TextInput disabled placeholder={displayTimer($countdownReset)} size="xl" />
</div>

<form class="btn-center-container" method="POST" action="?/logout">
	<Button kind="danger-tertiary" type="submit">Logout</Button>
</form>

<style>
	.slider-container {
		margin-bottom: 2rem;
	}
	.timer-form {
		margin: 0 2rem 6rem;
		display: grid;
		grid-template-columns: 2fr 1fr;
		gap: 1rem;
	}

	.modal-content {
		margin: 1rem 0 2rem;
	}
</style>

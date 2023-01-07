<script lang="ts">
	import { enhance } from '$app/forms';
	import {
		benchpress,
		countdown,
		countdownReset,
		deadlift,
		errorMessage,
		overheadpress,
		squat
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
</script>

<div class="heading">
	<div class="heading-title">
		<Settings size={32} class="heading-icon" />
		<h2>Settings</h2>
	</div>
</div>

<Modal class="modal" bind:open {modalHeading} passiveModal
	><p class="modal-content">{modalContent}</p>
	<form
		class="modal-form"
		method="POST"
		action="?/weights"
		use:enhance={() =>
			async ({ result }) => {
				if (result.type === 'success') {
					open = false;
				}
			}}
	>
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
			<strong>{$deadlift} kg</strong>
		{:else if cell.key === 'orm' && row.id === 'sq'}
			<strong>{$squat} kg</strong>
		{:else if cell.key === 'orm' && row.id === 'bp'}
			<strong>{$benchpress} kg</strong>
		{:else if cell.key === 'orm' && row.id === 'oh'}
			<strong>{$overheadpress} kg</strong>
		{:else}
			{cell.value}
		{/if}
	</svelte:fragment>
</DataTable>

<div class="btn-edit-container">
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

<form class="logout-btn" method="POST" action="?/logout">
	<Button kind="danger-tertiary" type="submit" formaction="?/register">Logout</Button>
</form>

{#if $errorMessage.length > 0}
	<ToastNotification fullWidth kind="error" title="Error" subtitle={$errorMessage} />
{/if}

<style>
	.btn-edit-container {
		display: flex;
		justify-content: center;
		margin: 0 auto 1rem;
	}
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
	.logout-btn {
		width: 100%;
		display: flex;
		justify-content: center;
	}
</style>

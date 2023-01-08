<script lang="ts">
	import { onMount } from 'svelte';
	import { enhance } from '$app/forms';
	import type { PageData } from './$types';

	import { Button, ButtonSet, DataTable, Modal, Tab } from 'carbon-components-svelte';
	import Calendar from 'carbon-icons-svelte/lib/Calendar.svelte';
	import Checkmark from 'carbon-icons-svelte/lib/Checkmark.svelte';
	import { toastError, toastSuccess, toastWarning } from '$lib/stores';

	export let data: PageData;

	let counter: string;
	let open = false;
	let titleOne: string | undefined;
	let titleTwo: string | undefined;
	let headers = [
		{ key: 'weight', value: 'Weight' },
		{ key: 'reps', value: 'Reps' }
	];
	let rowsOne: { id: string; weight: number | undefined; reps: string | number | undefined }[] = [];
	let rowsTwo: { id: string; weight: number | undefined; reps: string | number | undefined }[] = [];

	onMount(() => {
		if (data) {
			counter = `Week: ${data.week} Day: ${data.day}`;

			titleOne = data.workout?.mainLiftOne.lift;
			rowsOne = [
				{
					id: '1-1',
					weight: data.workout?.mainLiftOne.firstSet.weight,
					reps: data.workout?.mainLiftOne.firstSet.reps
				},
				{
					id: '1-2',
					weight: data.workout?.mainLiftOne.secondSet.weight,
					reps: data.workout?.mainLiftOne.secondSet.reps
				},
				{
					id: '1-3',
					weight: data.workout?.mainLiftOne.thirdSet.weight,
					reps: `${data.workout?.mainLiftOne.thirdSet.reps} +`
				},
				{
					id: '1-4',
					weight: data.workout?.mainLiftOne.lastSet.weight,
					reps: `${data.workout?.mainLiftOne.lastSet.reps} x 5`
				}
			];

			titleTwo = data.workout?.mainLiftTwo.lift;
			rowsTwo = [
				{
					id: '2-1',
					weight: data.workout?.mainLiftTwo.firstSet.weight,
					reps: data.workout?.mainLiftTwo.firstSet.reps
				},
				{
					id: '2-2',
					weight: data.workout?.mainLiftTwo.secondSet.weight,
					reps: data.workout?.mainLiftTwo.secondSet.reps
				},
				{
					id: '2-3',
					weight: data.workout?.mainLiftTwo.thirdSet.weight,
					reps: `${data.workout?.mainLiftTwo.thirdSet.reps} +`
				},
				{
					id: '2-4',
					weight: data.workout?.mainLiftTwo.lastSet.weight,
					reps: `${data.workout?.mainLiftTwo.lastSet.reps} x 5`
				}
			];
		}
	});
</script>

<Modal class="modal" bind:open modalHeading="Finish Workout" passiveModal
	><p class="modal-content">Finish Workout and submit to Database?</p>
	<form
		class="modal-form"
		method="POST"
		action="?/finishworkout"
		use:enhance={() =>
			async ({ result }) => {
				if (result.type === 'success') {
					open = false;
					$toastSuccess = 'Successfully saved to Database';
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
			}}
	>
		<input type="hidden" name="cycle" value={data.cycle} />
		<input type="hidden" name="week" value={data.week} />
		<input type="hidden" name="day" value={data.day} />
		<input
			type="hidden"
			name={data.workout?.mainLiftOne.lift.toLowerCase()}
			value={data.workout?.mainLiftOne.thirdSet.weight}
		/>
		<input
			type="hidden"
			name={data.workout?.mainLiftTwo.lift.toLowerCase()}
			value={data.workout?.mainLiftOne.thirdSet.weight}
		/>

		<ButtonSet>
			<Button kind="secondary" on:click={() => (open = false)}>Cancel</Button>
			<Button type="submit">Confirm</Button>
		</ButtonSet>
	</form>
</Modal>

<div class="heading">
	<div class="heading-title">
		<Calendar size={32} class="heading-icon" />
		<h2>Routine</h2>
	</div>
	{#if counter}
		{counter}
	{/if}
</div>

<DataTable zebra title={titleOne} {headers} rows={rowsOne} size="medium" />
<DataTable zebra title={titleTwo} {headers} rows={rowsTwo} size="medium" />

<div class="btn-center-container">
	<Button icon={Checkmark} on:click={() => (open = true)}>Finish</Button>
</div>

<style>
	.modal-form {
		justify-content: flex-end;
	}
</style>

<script lang="ts">
	import { onMount } from 'svelte';
	import { enhance, type SubmitFunction } from '$app/forms';
	import { toastError, toastSuccess, toastWarning } from '$lib/stores';
	import type { PageData } from './$types';

	import { Button, ButtonSet, DataTable, Modal, Tag, TextInput } from 'carbon-components-svelte';
	import Calendar from 'carbon-icons-svelte/lib/Calendar.svelte';
	import Checkmark from 'carbon-icons-svelte/lib/Checkmark.svelte';

	export let data: PageData;

	let open = false;
	let headers = [
		{ key: 'weight', value: 'Weight' },
		{ key: 'reps', value: 'Reps' }
	];

	$: rowsOne = [
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
	$: rowsTwo = [
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

	onMount(() => {
		if (data.error) {
			$toastError = data.error.message;
			setTimeout(() => {
				$toastError = '';
			}, 3000);
		}
	});

	const submitWorkout: SubmitFunction = () => {
		return async ({ result, update }) => {
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
			update({ reset: false });
		};
	};
</script>

<Modal class="modal" bind:open modalHeading="Finish Workout" passiveModal
	><p class="modal-content">Finish Workout and submit to Database?</p>
	<form class="modal-form" method="POST" action="?/finishWorkout" use:enhance={submitWorkout}>
		<div class="input-group">
			<TextInput readonly name="cycle" labelText="Cycle" value={data.cycle} />
			<TextInput readonly name="day" labelText="Day" value={data.day} />
			<TextInput readonly name="week" labelText="Week" value={data.week} />

			<TextInput
				readonly
				name={data.workout?.mainLiftOne.lift.toLowerCase()}
				labelText={data.workout?.mainLiftOne.lift}
				value={data.workout?.mainLiftOne.thirdSet.weight}
			/>
			<TextInput
				readonly
				name={data.workout?.mainLiftTwo.lift.toLowerCase()}
				labelText={data.workout?.mainLiftTwo.lift}
				value={data.workout?.mainLiftTwo.thirdSet.weight}
			/>
		</div>

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
	<Tag type="blue">{`W ${data.week} D ${data.day} C ${data.cycle}`}</Tag>
</div>

<DataTable zebra title={data.workout?.mainLiftOne.lift} {headers} rows={rowsOne} size="medium" />
<DataTable zebra title={data.workout?.mainLiftTwo.lift} {headers} rows={rowsTwo} size="medium" />

<div class="btn-center-container">
	<Button icon={Checkmark} on:click={() => (open = true)}>Finish</Button>
</div>

<style>
	.modal-content {
		margin: 1rem 0 2rem;
	}
</style>

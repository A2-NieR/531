<script>
	import {
		StructuredList,
		StructuredListHead,
		StructuredListRow,
		StructuredListCell,
		StructuredListBody,
		Tag
	} from 'carbon-components-svelte';
	import TaskAdd from 'carbon-icons-svelte/lib/TaskAdd.svelte';
</script>

<div class="heading">
	<div class="heading-title">
		<TaskAdd size={32} class="heading-icon" />
		<h2>Assistance</h2>
	</div>
</div>

<div class="list-heading">
	<h5>Warmup</h5>
	<Tag type="blue">2-3 Sets - 10-15 Reps</Tag>
</div>

<StructuredList condensed>
	<StructuredListBody>
		<StructuredListRow>
			<StructuredListCell>Box Jumps</StructuredListCell>
		</StructuredListRow>
		<StructuredListRow>
			<StructuredListCell>Broad Jumps</StructuredListCell>
		</StructuredListRow>
		<StructuredListRow>
			<StructuredListCell>Medicine Ball Throws</StructuredListCell>
		</StructuredListRow>
	</StructuredListBody>
</StructuredList>

<div class="list-heading">
	<h5>Assistance Work</h5>
	<Tag type="blue">50-100 Reps total</Tag>
</div>

<StructuredList condensed>
	<StructuredListHead>
		<StructuredListRow head>
			<StructuredListCell head>Push</StructuredListCell>
			<StructuredListCell head>Pull</StructuredListCell>
		</StructuredListRow>
	</StructuredListHead>
	<StructuredListBody>
		<StructuredListRow>
			<StructuredListCell>Dips</StructuredListCell>
			<StructuredListCell>Chinups</StructuredListCell>
		</StructuredListRow>
		<StructuredListRow>
			<StructuredListCell>Pushups</StructuredListCell>
			<StructuredListCell>Pullups</StructuredListCell>
		</StructuredListRow>
		<StructuredListRow>
			<StructuredListCell>Flat DB Bench</StructuredListCell>
			<StructuredListCell>Inverted Rows</StructuredListCell>
		</StructuredListRow>
		<StructuredListRow>
			<StructuredListCell>Incline DB Bench</StructuredListCell>
			<StructuredListCell>DB Rows</StructuredListCell>
		</StructuredListRow>
		<StructuredListRow>
			<StructuredListCell>DB OHP</StructuredListCell>
			<StructuredListCell>Cable Rows</StructuredListCell>
		</StructuredListRow>
		<StructuredListRow>
			<StructuredListCell>Tricep Extension</StructuredListCell>
			<StructuredListCell>Machine Rows</StructuredListCell>
		</StructuredListRow>
		<StructuredListRow>
			<StructuredListCell>Tricep Pushdown</StructuredListCell>
			<StructuredListCell>Face Pulls</StructuredListCell>
		</StructuredListRow>
		<StructuredListRow>
			<StructuredListCell />
			<StructuredListCell>Band Pull-Aparts</StructuredListCell>
		</StructuredListRow>
		<StructuredListRow>
			<StructuredListCell />
			<StructuredListCell>Lat Pulldowns</StructuredListCell>
		</StructuredListRow>
		<StructuredListRow>
			<StructuredListCell />
			<StructuredListCell>Curls</StructuredListCell>
		</StructuredListRow>
	</StructuredListBody>
</StructuredList>

<StructuredList condensed>
	<StructuredListHead>
		<StructuredListRow head>
			<StructuredListCell head>Single Leg/Core</StructuredListCell>
		</StructuredListRow>
	</StructuredListHead>
	<StructuredListBody>
		<StructuredListRow>
			<StructuredListCell>Any Ab / Core Exercise</StructuredListCell>
		</StructuredListRow>
		<StructuredListRow>
			<StructuredListCell>Back Raises</StructuredListCell>
		</StructuredListRow>
		<StructuredListRow>
			<StructuredListCell>Reverse Hypers</StructuredListCell>
		</StructuredListRow>
		<StructuredListRow>
			<StructuredListCell>Lunges</StructuredListCell>
		</StructuredListRow>
		<StructuredListRow>
			<StructuredListCell>Step Ups</StructuredListCell>
		</StructuredListRow>
		<StructuredListRow>
			<StructuredListCell>Bulgarian Split Squats</StructuredListCell>
		</StructuredListRow>
		<StructuredListRow>
			<StructuredListCell>KB Snatches</StructuredListCell>
		</StructuredListRow>
		<StructuredListRow>
			<StructuredListCell>KB Swings</StructuredListCell>
		</StructuredListRow>
	</StructuredListBody>
</StructuredList>

<style>
	.list-heading {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 1rem;
	}
</style>

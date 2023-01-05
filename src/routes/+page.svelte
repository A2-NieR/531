<script lang="ts">
	import { DataTable } from 'carbon-components-svelte';
	import Calendar from 'carbon-icons-svelte/lib/Calendar.svelte';

	let headers = [
		{ key: 'weight', value: 'Weight' },
		{ key: 'reps', value: 'Reps' }
	];
</script>

<div class="heading">
	<div class="heading-title">
		<Calendar size={32} class="heading-icon" />
		<h2>Routine</h2>
	</div>
</div>

<DataTable zebra {headers} />

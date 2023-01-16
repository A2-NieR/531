<script lang="ts">
	import { onMount } from 'svelte';
	import { LineChart } from '@carbon/charts-svelte';
	import { toastError } from '$lib/stores';
	import ChartLine from 'carbon-icons-svelte/lib/ChartLine.svelte';
	import type { PageServerData } from './$types';
	import type { LineChartOptions, ScaleTypes } from '@carbon/charts/interfaces';
	import '@carbon/styles/css/styles.css';
	import '@carbon/charts/styles.css';

	export let data: PageServerData;

	//TODO: Select year/month

	onMount(() => {
		if (data.error) {
			$toastError = data.error.message;
			setTimeout(() => {
				$toastError = '';
			}, 3000);
		}
	});

	const options: LineChartOptions = {
		axes: {
			bottom: {
				mapsTo: 'date',
				scaleType: 'time' as ScaleTypes
			},
			left: {
				mapsTo: 'value',
				title: 'KG',
				scaleType: 'linear' as ScaleTypes
			}
		},
		color: {
			scale: {
				Deadlift: '#009d9a',
				Squat: '#da1e28',
				Benchpress: '#0f62fe',
				Overheadpress: '#6929c4'
			}
		},
		height: '75dvh'
	};
</script>

<div class="heading">
	<div class="heading-title">
		<ChartLine size={32} class="heading-icon" />
		<h2>Progress</h2>
	</div>
</div>

<div class="chart-container">
	{#if data.chartData && data.chartData.length > 0}
		<LineChart data={data.chartData} {options} />
	{/if}
</div>

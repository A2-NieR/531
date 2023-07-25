<script lang="ts">
	import { Button } from 'carbon-components-svelte';
	import { WifiOff } from 'carbon-icons-svelte';
</script>

<div class="heading">
	<div class="heading-title">
		<WifiOff size={32} class="heading-icon" />
		<h2>Currently offline</h2>
	</div>
</div>
<div class="offline-container">
	<Button type="submit" on:click={() => window.location.replace('/')}>Try again</Button>
</div>

<style>
	.offline-container {
		align-items: center;
		display: flex;
		height: 80%;
		justify-content: center;
	}
</style>

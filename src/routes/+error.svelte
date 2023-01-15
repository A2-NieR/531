<script>
	import { page } from '$app/stores';
</script>

<div class="error">
	<h1>{$page.status}</h1>
	<h2>{$page.error?.message}</h2>
	<h4>
		<a href="##" on:click={() => history.back()}>Go Back</a>
	</h4>
</div>

<style>
	.error {
		padding-top: 5rem;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	h2 {
		margin-bottom: 2rem;
	}
</style>

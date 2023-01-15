<script lang="ts">
	import { applyAction, enhance, type SubmitFunction } from '$app/forms';
	import { toastError, toastWarning } from '$lib/stores';
	import { FluidForm, TextInput, PasswordInput, Button } from 'carbon-components-svelte';

	const submitLogin: SubmitFunction = () => {
		return async ({ result }) => {
			if (result.type === 'redirect') {
				await applyAction(result);
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
	};
</script>

<div class="heading">
	<div class="heading-title">
		<h2>Login</h2>
	</div>
</div>

<FluidForm>
	<form method="POST" use:enhance={submitLogin}>
		<TextInput name="email" labelText="Username" required />
		<PasswordInput name="password" type="password" labelText="Password" required />
		<Button type="submit">Login</Button>
	</form>
</FluidForm>

<style>
	.heading {
		margin: 2rem 0;
	}
</style>

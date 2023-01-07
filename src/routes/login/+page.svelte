<script lang="ts">
	import { errorMessage } from '$lib/stores';
	import {
		FluidForm,
		TextInput,
		PasswordInput,
		Button,
		ToastNotification
	} from 'carbon-components-svelte';
</script>

<h2>Login</h2>

<FluidForm method="POST">
	<TextInput name="email" labelText="Username" required />
	<PasswordInput name="password" type="password" labelText="Password" required />
	<Button type="submit">Login</Button>
</FluidForm>

{#if $errorMessage.length > 0}
	<ToastNotification fullWidth kind="error" title="Error" subtitle={$errorMessage} />
{/if}

<style>
	h2 {
		margin-bottom: 2rem;
	}
</style>

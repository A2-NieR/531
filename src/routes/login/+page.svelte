<script lang="ts">
	import { goto } from '$app/navigation';
	import pb from '$lib/pb';
	import { errorMessage, loginStatus } from '$lib/stores';
	import {
		FluidForm,
		TextInput,
		PasswordInput,
		Button,
		ToastNotification
	} from 'carbon-components-svelte';

	let username: string;
	let password: string;

	const submitLogin = async (e: { preventDefault: () => void }) => {
		e.preventDefault();
		try {
			await pb.admins.authWithPassword(username, password);
			$loginStatus = pb.authStore.isValid;
			if ($loginStatus) {
				goto('/');
			}
		} catch (err: unknown) {
			$errorMessage = (err as Error).message;
			setTimeout(() => {
				$errorMessage = '';
			}, 3000);
		}
	};
</script>

<h2>Login</h2>

<FluidForm on:submit={submitLogin}>
	<TextInput bind:value={username} labelText="Username" required />
	<PasswordInput bind:value={password} type="password" labelText="Password" required />
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

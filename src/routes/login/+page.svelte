<script lang="ts">
	import { goto } from '$app/navigation';
	import pb from '$lib/pb';
	import { loginStatus } from '$lib/stores';
	import { FluidForm, TextInput, PasswordInput, Button } from 'carbon-components-svelte';

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
		} catch (error) {
			console.error(error);
		}
	};
</script>

<h2>Login</h2>

<FluidForm on:submit={submitLogin}>
	<TextInput bind:value={username} labelText="Username" required />
	<PasswordInput bind:value={password} type="password" labelText="Password" required />
	<Button type="submit">Login</Button>
</FluidForm>

<style>
	h2 {
		margin-bottom: 2rem;
	}
</style>

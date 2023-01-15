<script lang="ts">
	import { useRegisterSW } from 'virtual:pwa-register/svelte';
	import { Button, ToastNotification } from 'carbon-components-svelte';

	const { needRefresh, updateServiceWorker, offlineReady } = useRegisterSW({
		onRegistered(r: unknown) {
			// uncomment following code if you want check for updates
			// r && setInterval(() => {
			//    console.log('Checking for sw update')
			//    r.update()
			// }, 20000 /* 20s for testing purposes */)
			console.log(`SW Registered: ${r}`);
		},
		onRegisterError(error: unknown) {
			console.error('SW registration error', error);
		}
	});
	const close = () => {
		offlineReady.set(false);
		needRefresh.set(false);
	};
	$: toast = $offlineReady || $needRefresh;
</script>

{#if toast}
	<ToastNotification class="toast-updater" fullWidth lowContrast kind="info" on:close={close}>
		<strong slot="title">Updater </strong>
		<div slot="subtitle">
			{#if $offlineReady}App ready to work offline{:else}A new version is available. Tap on the
				reload button to update.{/if}
		</div>

		{#if $needRefresh}
			<Button on:click={() => updateServiceWorker(true)}>Reload</Button>
		{/if}
	</ToastNotification>
{/if}

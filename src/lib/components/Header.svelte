<script lang="ts">
	import { countdown, countdownReset } from '$lib/stores';
	import { displayTimer } from '$lib/utils';

	import {
		Header,
		HeaderGlobalAction,
		HeaderNav,
		HeaderNavItem,
		HeaderUtilities,
		SideNav,
		SideNavDivider,
		SideNavItems,
		SideNavLink,
		SkipToContent
	} from 'carbon-components-svelte';
	import Calendar from 'carbon-icons-svelte/lib/Calendar.svelte';
	import ChartLine from 'carbon-icons-svelte/lib/ChartLine.svelte';
	import Settings from 'carbon-icons-svelte/lib/Settings.svelte';
	import Play from 'carbon-icons-svelte/lib/Play.svelte';
	import Pause from 'carbon-icons-svelte/lib/Pause.svelte';
	import Reset from 'carbon-icons-svelte/lib/Reset.svelte';

	export let loginStatus: boolean;

	let isSideNavOpen = false;
	const closeSidebar = () => (isSideNavOpen = false);

	let intervalId: NodeJS.Timer;

	const startTimer = () => $countdown--;
	const startCountdown = () => (intervalId = setInterval(startTimer, 1000));
	const pauseCountdown = () => {
		if (intervalId) {
			clearInterval(intervalId);
		}
	};
	const resetCountdown = () => {
		if (intervalId) {
			clearInterval(intervalId);
		}
		$countdown = $countdownReset;
	};
</script>

{#if !loginStatus}
	<Header platformName="5/3/1" />
{:else}
	<Header platformName={displayTimer($countdown)} bind:isSideNavOpen>
		<svelte:fragment slot="skip-to-content">
			<SkipToContent />
		</svelte:fragment>

		<HeaderNav>
			<HeaderNavItem href="/" text="Routine" />
			<HeaderNavItem href="/progress" text="Progress" />
			<HeaderNavItem href="/settings" text="Settings" />
		</HeaderNav>

		<SideNav bind:isOpen={isSideNavOpen}>
			<SideNavItems>
				<SideNavLink href="/" text="Routine" icon={Calendar} on:click={closeSidebar} />
				<SideNavDivider />
				<SideNavLink href="/progress" text="Progress" icon={ChartLine} on:click={closeSidebar} />
				<SideNavDivider />
				<SideNavLink href="/settings" text="Settings" icon={Settings} on:click={closeSidebar} />
			</SideNavItems>
		</SideNav>

		<HeaderUtilities>
			<HeaderGlobalAction aria-label="Start" icon={Play} on:click={startCountdown} />
			<HeaderGlobalAction aria-label="Pause" icon={Pause} on:click={pauseCountdown} />
			<HeaderGlobalAction aria-label="Reset" icon={Reset} on:click={resetCountdown} />
		</HeaderUtilities>
	</Header>
{/if}

<script lang="ts">
  import { displayTimer, countdown, countdownReset } from '$lib/stores';
  import {
    Header,
    HeaderGlobalAction,
    HeaderUtilities,
    SideNav,
    SideNavItems,
    SideNavLink,
    SkipToContent
  } from 'carbon-components-svelte';

  import Home from 'carbon-icons-svelte/lib/Home.svelte';
  import Calendar from 'carbon-icons-svelte/lib/Calendar.svelte';
  import ChartLine from 'carbon-icons-svelte/lib/ChartLine.svelte';
  import Settings from 'carbon-icons-svelte/lib/Settings.svelte';

  import Play from 'carbon-icons-svelte/lib/Play.svelte';
  import Pause from 'carbon-icons-svelte/lib/Pause.svelte';
  import Reset from 'carbon-icons-svelte/lib/Reset.svelte';

  let isSideNavOpen = false;

  const closeSidebar = () => (isSideNavOpen = false);

  let intervalId: string | number | NodeJS.Timer;

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

<Header platformName={displayTimer($countdown)} bind:isSideNavOpen>
  <svelte:fragment slot="skip-to-content">
    <SkipToContent />
  </svelte:fragment>

  <HeaderUtilities>
    <HeaderGlobalAction
      aria-label="Start"
      icon={Play}
      on:click={startCountdown}
    />
    <HeaderGlobalAction
      aria-label="Pause"
      icon={Pause}
      on:click={pauseCountdown}
    />
    <HeaderGlobalAction
      aria-label="Reset"
      icon={Reset}
      on:click={resetCountdown}
    />
  </HeaderUtilities>
</Header>

<SideNav bind:isOpen={isSideNavOpen}>
  <SideNavItems>
    <SideNavLink text="Home" href="/" on:click={closeSidebar} icon={Home} />
    <SideNavLink
      text="Routine"
      href="#/routine"
      on:click={closeSidebar}
      icon={Calendar}
    />
    <SideNavLink
      text="Progress"
      href="#/progress"
      on:click={closeSidebar}
      icon={ChartLine}
    />
    <SideNavLink
      text="Settings"
      href="#/settings"
      on:click={closeSidebar}
      icon={Settings}
    />
  </SideNavItems>
</SideNav>

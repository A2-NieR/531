<script lang="ts">
  import { displayTimer, countdown, countdownReset } from '$lib/stores';
  import {
    Header,
    HeaderGlobalAction,
    HeaderUtilities,
    SkipToContent
  } from 'carbon-components-svelte';

  import Play from 'carbon-icons-svelte/lib/Play.svelte';
  import Pause from 'carbon-icons-svelte/lib/Pause.svelte';
  import Reset from 'carbon-icons-svelte/lib/Reset.svelte';

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

<Header platformName={displayTimer($countdown)}>
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

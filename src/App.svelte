<script lang="ts">
  import { beforeUpdate, onMount } from 'svelte';
  import { Swipe, SwipeItem } from 'svelte-swipe';
  import {
    darkMode,
    loginStatus,
    deadlift,
    squat,
    benchpress,
    overheadpress,
    weightRecordId
  } from '$lib/stores';
  import { getOneRepMax, weightList } from '$lib/pb';
  import Header from '$components/Header.svelte';

  import 'carbon-components-svelte/css/all.css';

  import Routine from '$pages/Routine.svelte';
  import Progress from '$pages/Progress.svelte';
  import Settings from '$pages/Settings.svelte';
  import Login from '$pages/Login.svelte';

  beforeUpdate(() => {
    localStorage.getItem('pocketbase_auth')
      ? ($loginStatus = true)
      : ($loginStatus = false);

    window.matchMedia('(prefers-color-scheme: light)').matches
      ? darkMode.set(false)
      : darkMode.set(true);

    $darkMode === false
      ? document.documentElement.setAttribute('theme', 'white')
      : document.documentElement.setAttribute('theme', 'g90');
  });

  onMount(async () => {
    if ($loginStatus) {
      const list = await weightList();
      $weightRecordId = list.items[0].id;
      const result = await getOneRepMax($weightRecordId);

      $deadlift = result.deadlift;
      $squat = result.squat;
      $benchpress = result.benchpress;
      $overheadpress = result.overheadpress;
    }
  });

  const swipeConfig = {
    autoplay: false,
    delay: 1000,
    showIndicators: true,
    transitionDuration: 500,
    defaultIndex: 0
  };
</script>

<Header />

{#if !$loginStatus}
  <main>
    <div class="login-container">
      <Login />
    </div>
  </main>
{:else}
  <main>
    <div class="swipe-holder">
      <Swipe {...swipeConfig}>
        <SwipeItem>
          <div class="page">
            <Routine />
          </div>
        </SwipeItem>
        <SwipeItem>
          <div class="page">
            <Progress />
          </div>
        </SwipeItem>
        <SwipeItem>
          <div class="page">
            <Settings />
          </div>
        </SwipeItem>
      </Swipe>
    </div>
  </main>
{/if}

<style>
  main {
    height: 100%;
    width: 100%;
  }
  .swipe-holder {
    height: 100%;
  }
  .login-container {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .page {
    height: 100%;
    padding: 5rem 2rem 1rem;
  }
</style>

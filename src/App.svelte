<script lang="ts">
  import { beforeUpdate } from 'svelte';
  import { Swipe, SwipeItem } from 'svelte-swipe';
  import { darkMode } from '$lib/stores';
  import Header from '$components/Header.svelte';

  import 'carbon-components-svelte/css/all.css';

  import Routine from '$pages/Routine.svelte';
  import Progress from '$pages/Progress.svelte';
  import Settings from '$pages/Settings.svelte';

  beforeUpdate(() => {
    window.matchMedia('(prefers-color-scheme: light)').matches
      ? darkMode.set(false)
      : darkMode.set(true);

    $darkMode === false
      ? document.documentElement.setAttribute('theme', 'white')
      : document.documentElement.setAttribute('theme', 'g90');
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

<style>
  main {
    height: 100%;
    width: 100%;
  }
  .swipe-holder {
    height: 100%;
  }
  .page {
    height: 100%;
    padding: 5rem 2rem 1rem;
  }
</style>

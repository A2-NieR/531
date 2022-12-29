<script lang="ts">
  import { beforeUpdate } from 'svelte';
  import Router from 'svelte-spa-router';
  import { darkMode } from '$lib/stores';
  import Header from '$components/Header.svelte';
  import 'carbon-components-svelte/css/all.css';

  import Home from '$routes/Home.svelte';
  import Routine from '$routes/Routine.svelte';
  import Progress from '$routes/Progress.svelte';
  import Settings from '$routes/Settings.svelte';
  import NotFound from '$routes/NotFound.svelte';

  beforeUpdate(() => {
    $darkMode === false
      ? document.documentElement.setAttribute('theme', 'white')
      : document.documentElement.setAttribute('theme', 'g90');
  });

  const routes = {
    '/': Home,
    '/routine': Routine,
    '/progress': Progress,
    '/settings': Settings,
    '*': NotFound
  };
</script>

<Header />

<main>
  <Router {routes} />
</main>

<style>
</style>

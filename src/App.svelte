<script lang="ts">
  import Router from 'svelte-spa-router';
  import Header from './components/Header.svelte';

  import Home from './routes/Home.svelte';
  import Routine from './routes/Routine.svelte';
  import Progress from './routes/Progress.svelte';
  import Settings from './routes/Settings.svelte';
  import NotFound from './routes/NotFound.svelte';

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

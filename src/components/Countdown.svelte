<script lang="ts">
  import { onMount } from 'svelte';
  let countdown = 120;
  let timer;

  $: {
    if (countdown === 0) {
      if (timer) {
        clearInterval(timer);
        timer = null;
      }
    }
  }

  onMount(() => {
    timer = setInterval(() => {
      countdown -= 1;
    }, 1000);
  });
</script>

<div>{countdown}</div>

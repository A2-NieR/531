<script lang="ts">
  import {
    deadlifts,
    squats,
    benchpress,
    overheadpress,
    countdown,
    countdownReset,
    displayTimer
  } from '$lib/stores';
  import {
    Button,
    DataTable,
    Modal,
    Slider,
    TextInput
  } from 'carbon-components-svelte';
  import Edit from 'carbon-icons-svelte/lib/Edit.svelte';
  import Timer from 'carbon-icons-svelte/lib/Timer.svelte';

  let headers = [
    { key: 'exercise', value: 'Exercise' },
    { key: 'orm', value: '1 RM' },
    { key: 'edit', value: '' }
  ];

  let rows = [
    { id: 'dl', exercise: 'Deadlifts', orm: '', edit: 'edit' },
    { id: 'sq', exercise: 'Squats', orm: '', edit: 'edit' },
    { id: 'bp', exercise: 'Benchpress', orm: '', edit: 'edit' },
    { id: 'oh', exercise: 'Overheadpress', orm: '', edit: 'edit' }
  ];

  const editWeight = (rowId: string) => {
    switch (rowId) {
      case 'dl':
        currentExercise = 'Deadlifts';
        modalHeading = `Set ${currentExercise}`;
        modalContent = `Set the 1 Rep Max for ${currentExercise}.`;
        open = true;
        break;
      case 'sq':
        currentExercise = 'Squats';
        modalHeading = `Set ${currentExercise}`;
        modalContent = `Set the 1 Rep Max for ${currentExercise}.`;
        open = true;
        break;
      case 'bp':
        currentExercise = 'Benchpress';
        modalHeading = `Set ${currentExercise}`;
        modalContent = `Set the 1 Rep Max for ${currentExercise}.`;
        open = true;
        break;
      case 'oh':
        currentExercise = 'Overheadpress';
        modalHeading = `Set ${currentExercise}`;
        modalContent = `Set the 1 Rep Max for ${currentExercise}.`;
        open = true;
        break;
    }
  };

  const saveWeight = (exercise: string) => {
    switch (exercise) {
      case 'Deadlifts':
        $deadlifts = currentWeight;
        break;
      case 'Squats':
        $squats = currentWeight;
        break;
      case 'Benchpress':
        $benchpress = currentWeight;
        break;
      case 'Overheadpress':
        $overheadpress = currentWeight;
        break;
    }
    open = false;
  };

  let open = false;
  let currentExercise = '';
  let currentWeight = 0;
  let modalHeading = '';
  let modalContent = '';
</script>

<h3>Settings</h3>

<Modal
  bind:open
  {modalHeading}
  primaryButtonText="Confirm"
  secondaryButtonText="Cancel"
  on:click:button--primary={() => saveWeight(currentExercise)}
  on:click:button--secondary={() => (open = false)}
  ><p class="modal-content">{modalContent}</p>
  <TextInput size="xl" type="number" bind:value={currentWeight} />
</Modal>

<DataTable zebra {headers} {rows}>
  <svelte:fragment slot="cell" let:row let:cell>
    {#if cell.key === 'orm' && row.id === 'dl'}
      <strong>{$deadlifts} kg</strong>
    {:else if cell.key === 'orm' && row.id === 'sq'}
      <strong>{$squats} kg</strong>
    {:else if cell.key === 'orm' && row.id === 'bp'}
      <strong>{$benchpress} kg</strong>
    {:else if cell.key === 'orm' && row.id === 'oh'}
      <strong>{$overheadpress} kg</strong>
    {/if}
    {#if cell.key === 'edit' && cell.value === 'edit'}
      <Button kind="ghost" icon={Edit} on:click={() => editWeight(row.id)} />
    {:else}
      {cell.value}
    {/if}
  </svelte:fragment>
</DataTable>

<Slider
  labelText="Timer"
  min={60}
  max={180}
  maxLabel="180s"
  bind:value={$countdown}
  step={15}
  hideTextInput
  fullWidth
/>

<div class="timer-form">
  <Button icon={Timer} on:click={() => ($countdownReset = $countdown)}
    >Set Timer</Button
  >
  <TextInput disabled placeholder={displayTimer($countdownReset)} size="xl" />
</div>

<style>
  h3 {
    margin-bottom: 2rem;
  }
  .timer-form {
    margin: 0 2rem;
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 1rem;
  }
  .modal-content {
    margin: 1rem 0 2rem;
  }
</style>

<script lang="ts">
  import pb, { updateOneRepMax } from '$lib/pb';
  import {
    deadlift,
    squat,
    benchpress,
    overheadpress,
    countdown,
    countdownReset,
    displayTimer,
    loginStatus,
    weightRecordId
  } from '$lib/stores';
  import {
    Button,
    DataTable,
    Modal,
    Slider,
    TextInput
  } from 'carbon-components-svelte';

  import Settings from 'carbon-icons-svelte/lib/Settings.svelte';
  import Renew from 'carbon-icons-svelte/lib/Renew.svelte';
  import Edit from 'carbon-icons-svelte/lib/Edit.svelte';

  const reload = () => location.reload();

  let headers = [
    { key: 'exercise', value: 'Exercise' },
    { key: 'orm', value: '1 RM' },
    { key: 'edit', value: '' }
  ];

  let rows = [
    { id: 'dl', exercise: 'Deadlift', orm: '', edit: 'edit' },
    { id: 'sq', exercise: 'Squat', orm: '', edit: 'edit' },
    { id: 'bp', exercise: 'Benchpress', orm: '', edit: 'edit' },
    { id: 'oh', exercise: 'Overheadpress', orm: '', edit: 'edit' }
  ];

  const editWeight = (rowId: string) => {
    switch (rowId) {
      case 'dl':
        currentExercise = 'Deadlift';
        modalHeading = `Set ${currentExercise}`;
        modalContent = `Set the 1 Rep Max for ${currentExercise}.`;
        open = true;
        break;
      case 'sq':
        currentExercise = 'Squat';
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

  const saveWeight = async (exercise: string) => {
    switch (exercise) {
      case 'Deadlift':
        $deadlift = currentWeight;
        break;
      case 'Squat':
        $squat = currentWeight;
        break;
      case 'Benchpress':
        $benchpress = currentWeight;
        break;
      case 'Overheadpress':
        $overheadpress = currentWeight;
        break;
    }
    await updateOneRepMax($weightRecordId, {
      deadlift: $deadlift,
      squat: $squat,
      benchpress: $benchpress,
      overheadpress: $overheadpress
    });
    open = false;
  };

  const submitLogout = () => {
    pb.authStore.clear();

    $loginStatus = false;
  };

  let open = false;
  let currentExercise = '';
  let currentWeight = 0;
  let modalHeading = '';
  let modalContent = '';
</script>

<div class="heading">
  <div class="heading-title">
    <Settings size={32} class="heading-icon" />
    <h2>Settings</h2>
  </div>
  <Button
    class="pointer-event"
    kind="tertiary"
    icon={Renew}
    on:click={reload}
  />
</div>

<Modal
  class="pointer-event modal"
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
      <strong>{$deadlift} kg</strong>
    {:else if cell.key === 'orm' && row.id === 'sq'}
      <strong>{$squat} kg</strong>
    {:else if cell.key === 'orm' && row.id === 'bp'}
      <strong>{$benchpress} kg</strong>
    {:else if cell.key === 'orm' && row.id === 'oh'}
      <strong>{$overheadpress} kg</strong>
    {/if}
    {#if cell.key === 'edit' && cell.value === 'edit'}
      <Button
        class="pointer-event"
        kind="ghost"
        icon={Edit}
        on:click={() => editWeight(row.id)}
      />
    {:else}
      {cell.value}
    {/if}
  </svelte:fragment>
</DataTable>

<Slider
  class="pointer-event"
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
  <Button class="pointer-event" on:click={() => ($countdownReset = $countdown)}
    >Set Timer</Button
  >
  <TextInput disabled placeholder={displayTimer($countdownReset)} size="xl" />
</div>

<div class="logout-btn">
  <Button class="pointer-event" kind="danger-tertiary" on:click={submitLogout}
    >Logout</Button
  >
</div>

<style>
  .timer-form {
    margin: 0 2rem 6rem;
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 1rem;
  }

  .modal-content {
    margin: 1rem 0 2rem;
  }
  .logout-btn {
    width: 100%;
    display: flex;
    justify-content: center;
  }
</style>

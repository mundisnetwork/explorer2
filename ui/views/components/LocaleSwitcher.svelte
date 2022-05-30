<script>
  import { createEventDispatcher } from 'svelte';
  export let value = 'en';
  const dispatch = createEventDispatcher();
  function switchLocale(event) {
    event.preventDefault();
    dispatch('locale-changed', event.target.value);
  }
</script>

<div class="choose-locale important-mr-2">
  <div class="select">
    <!-- svelte-ignore a11y-no-onchange -->
    <select value="{value}" on:change="{switchLocale}">
      <option value="en">English</option>
      <option value="fr">French</option>
      <option value="nl">Dutch</option>
      <option value="ro">Romanian</option>
    </select>
  </div>
</div>

<style>
  .choose-locale {
    display: flex;
    justify-content: center;
  }
  .select {
    margin-top: 5px;
  }
</style>

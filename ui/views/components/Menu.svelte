<script>
  import { _, setupI18n, locale } from '../../i18n';
  import { onDestroy } from 'svelte';
  import { Button } from 'carbon-components-svelte';
  import WatsonHealthRotate_360 from 'carbon-icons-svelte/lib/WatsonHealthRotate_360.svelte';
  import LocaleSwitcher from './LocaleSwitcher.svelte';

  onDestroy(() => {

  });

  function handleClickRefresh() {
    location.reload();
  }
</script>

<nav class="right-0 absolute text-gray-500 uppercase text-bold block flex">
  <Button
    class="float-right important-mr-2"
    size="small"
    kind="primary"
    iconDescription="{$_('menu.refresh')}"
    icon="{WatsonHealthRotate_360}"
    on:click="{handleClickRefresh}"
  />
  <LocaleSwitcher value="{$locale}" on:locale-changed="{(e) => setupI18n({ withLocale: e.detail })}" />
</nav>

<style>
</style>

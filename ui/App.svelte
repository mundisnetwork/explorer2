<script context="module">
  import { waitLocale } from 'svelte-i18n';
  import { Loading } from 'carbon-components-svelte';

  export async function preload() {
    return waitLocale();
  }
</script>

<script>
  import { InlineNotification, NotificationButton, Header, Content } from 'carbon-components-svelte';
  import Close from 'carbon-icons-svelte/lib/Close.svelte';
  import { _, isLocaleLoaded, dir } from './i18n';
  import { Router, Route, Link } from 'svelte-navigator';
  import Sidebar from './views/components/Sidebar.svelte';
  import Menu from './views/components/Menu.svelte';
  import { watchResize } from 'svelte-watch-resize';
  import { onMount } from 'svelte';

  import { routes } from './routes';
  import { user, title, errors } from './stores';

  export let url = '';

  let isSideNavOpen = false;

  function createAnnouncement(route, path) {
    const viewName = route.meta.name;
    $title.page = viewName;
    const { pathname } = path;
    $title.path = pathname;
    return `Navigated to the ${viewName} view at ${pathname}`;
  }

  function closeNotification(event, error) {
    event.returnValue = false;
    event.cancelBubble = true;
    for (var i = 0; i < $errors.length; i++) {
      if ($errors[i].ts === error.ts) {
        $errors.splice(i, 1);
        $errors = $errors;
        break;
      }
    }

    return false;
  }

  let resizeTimeout;
  let company = 'Mundis Network Explorer -';

  function handleHeaderResize(node) {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(resizeHeader.bind(null, node.clientWidth), 500);
  }

  function resizeHeader(clientWidth) {
    company = clientWidth > 450 ? 'Mundis Network Explorer -' : clientWidth > 350 ? 'MNE -' : '';
  }

  // async function getUserDetails() {
  //   var url = `/api/session/`;
  //   const res = await fetch(url);
  //   const data = await res.json();

  //   if (res.ok) {
  //     $user = data;
  //   } else {
  //     $errors[$errors.length] = { title: 'Session Error:', message: res.body };
  //     // throw new Error(data);
  //   }
  // }

  onMount(async () => {
    // await getUserDetails();
  });

  $: {
    document.dir = $dir;
  }
</script>

<div class="absolute bottom-0 right-0" style="z-index: 9999;">
  {#each $errors as error}
    <InlineNotification
      kind="{error.kind ? error.kind : 'error'}"
      title="{error.title}"
      subtitle="{error.message}"
      hideCloseButton="{true}"
      timeout="{5000}"
    >
      <div slot="actions">
        <NotificationButton
          class="flex items-center justify-center w-12 h-12 border-0 p-0 cursor-pointer"
          title="Closes notification"
          on:click="{(event) => closeNotification(event, error)}"
          icon="{Close}"
        />
      </div>
    </InlineNotification>
  {/each}
</div>

{#if $isLocaleLoaded}
  <div use:watchResize="{handleHeaderResize}" style="width: 100vw; height: 100vh;">
    <Router url="{url}" a11y="{{ createAnnouncement }}">
      <Header bind:company platformName="{$title.page}" persistentHamburgerMenu="{true}" bind:isSideNavOpen>
        <Menu />
        <Sidebar bind:open="{isSideNavOpen}" routes="{routes}" />
      </Header>
      <Content style="padding: 0;">
        <slot>
          {#each routes as route}
            <Route path="{route.path}" meta="{{ name: $_(`menu.${route.menu_key}`) }}" primary="{true}">
              {#if route.isError}
                <svelte:component this="{route.component}" error="{route.isError}" />
              {:else}
                <svelte:component this="{route.component}" />
              {/if}
            </Route>
          {/each}
        </slot>
      </Content>
    </Router>
  </div>
{:else}
  <Loading />
{/if}

<style global lang="postcss">
  @tailwind base;
  @tailwind components;
  @tailwind utilities;

  @layer utilities {
    @layer responsive {
      .bx--header {
        background-color: #090e33!important;
        border-bottom: 0!important;
      }
      .route-link {
        background-color: #fff;
      }
      .route-link:hover {
        background-color: #e5e5e5;
      }
      .bx--content {
        padding: 0;
      }
      .bx--accordion > li > div {
        padding: 1rem;
      }
      .bx--accordion > li > div > .bx--text-input-wrapper--inline > div:nth-child(1) {
        padding-top: 1rem;
      }
      .explorer-parent {
        height: calc(100vh - 48px);
        margin-top: 0;
      }

      .explorer-parent-sm {
        height: calc(100vh - 48px);
        margin-top: 0;
      }
    }
  }

  :global(body) {
    padding: 0;
  }
</style>

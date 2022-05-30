<script>
  import { _ } from "../../i18n";
  import { title, user } from "../../stores";
  import { Link } from "svelte-navigator";
  import MdCloudDownload from "svelte-icons/md/MdCloudDownload.svelte";
  import { ImageLoader, OutboundLink } from "carbon-components-svelte";
  import FaUserAstronaut from "svelte-icons/fa/FaUserAstronaut.svelte";

  export let open = false;
  export let routes;

  let deferredInstallPrompt = null;
  let hideInstallMenuItem = false;

  // Add event listener for beforeinstallprompt event
  window.addEventListener("beforeinstallprompt", saveBeforeInstallPromptEvent);

  /**
   * Event handler for beforeinstallprompt event.
   *   Saves the event & shows install button.
   *
   * @param {Event} evt
   */
  function saveBeforeInstallPromptEvent(evt) {
    // Add code to save event & show the install button.
    deferredInstallPrompt = evt;
    hideInstallMenuItem = false;
  }

  // Add event listener for appinstalled event
  window.addEventListener("appinstalled", logAppInstalled);

  /**
   * Event handler for appinstalled event.
   *   Log the installation to analytics or save the event somehow.
   *
   * @param {Event} evt
   */
  function logAppInstalled(evt) {
    // Add code to log the event
    console.log("App was installed.", evt);
  }

  function handleClose() {
    open = false;
  }

  function handleInstallApp() {
    // Add code show install prompt & hide the install button.
    deferredInstallPrompt.prompt();
    // Hide the install button, it can't be called twice.
    hideInstallMenuItem = true;
    // Log user response to prompt.
    deferredInstallPrompt.userChoice.then((choice) => {
      if (choice.outcome === "accepted") {
        console.log("User accepted the A2HS prompt", choice);
      } else {
        console.log("User dismissed the A2HS prompt", choice);
      }
      deferredInstallPrompt = null;
    });
  }

  if (!window.matchMedia("(display-mode: browser)")) {
    hideInstallMenuItem = false;
  } else {
    hideInstallMenuItem = true;
  }

  title.subscribe((value) => {
    if (value.path && value.path.length > 0) {
      var menuItems = document.getElementsByClassName("menu-item");
      for (var menuItem of menuItems) {
        menuItem.classList.remove("bg-gray-200");
      }
      document
        .getElementById(value.path.replaceAll("/", "MENUID"))
        .classList.add("bg-gray-200");
    }
  });
</script>

<aside
  class="top-12 z-10 absolute w-64 h-full bg-white border-r-2 shadow-lg"
  class:open
  style="overflow-y: auto;"
>
  <nav class="py-0 px-0 text-xl">
    <!-- <div style="height: 200px; background: #090e33; margin-right: auto; margin-left: auto; margin-bottom: 10px;">
      <ImageLoader
        src="/images/logo_a122de19.svg"
        style="width: 200px; margin-right: auto; margin-left: auto; margin-bottom: 10px; padding-top: 35px;"
      />
    </div> -->
    <!-- <div
      id="userInfo"
      style="width: auto; margin-right: auto; margin-left: auto; margin-bottom: 0; height: 46px; line-height: 46px; white-space: nowrap; text-transform: uppercase;"
      class="menu-item text-gray-900 py-1 px-1"
    >
      <div class="icon float-left clear-both mr-2 mt-2 ml-2">
        <FaUserAstronaut />
      </div>
      <OutboundLink
        href="{$user.iss}/account"
        style="font-weight: 700; color: #141414; text-decoration: underline;"
        >{$user.preferred_username}</OutboundLink
      >
    </div> -->
    {#each routes as route}
      {#if !route.not_menu}
        {#if route.admin}
          {#if $user.resource_access && $user.realm_access.roles.includes("Administrators")}
            {#if route.href}
              <div
                id={route.menu_key}
                class="menu-item text-gray-900 py-1 px-1"
              >
                <div class="icon float-left clear-both mr-2 mt-2 ml-2">
                  <svelte:component this={route.icon} />
                </div>
                <a
                  target="_blank"
                  class="block text-gray-900 text-sm leading-10 tracking-wide font-semibold antialiased"
                  href={route.href}
                  on:click={handleClose}
                >
                  {$_(`menu.${route.menu_key}`)}
                </a>
              </div>
            {:else}
              <div
                id={route.path.replaceAll("/", "MENUID")}
                class="menu-item text-gray-900 py-1 px-1"
              >
                <div class="icon float-left clear-both mr-2 mt-2 ml-2">
                  <svelte:component this={route.icon} />
                </div>
                <Link
                  class="block text-gray-900 text-sm leading-10 tracking-wide font-semibold antialiased"
                  to={route.path}
                  on:click={handleClose}
                >
                  {$_(`menu.${route.menu_key}`)}
                </Link>
              </div>
            {/if}
          {/if}
        {:else}
          <div
            id={route.path.replaceAll("/", "MENUID")}
            class="menu-item text-gray-900 py-1 px-1"
          >
            <div class="icon float-left clear-both mr-2 mt-2 ml-2">
              <svelte:component this={route.icon} />
            </div>
            <Link
              class="block text-gray-900 text-sm leading-10 tracking-wide font-semibold antialiased"
              to={route.path}
              on:click={handleClose}
            >
              {$_(`menu.${route.menu_key}`)}
            </Link>
          </div>
        {/if}
      {/if}
    {/each}
    <div
      class="menu-item text-gray-900 mt-1 mb-1 px-1"
      hidden={hideInstallMenuItem}
    >
      <div class="icon float-left clear-both mr-2 mt-2 ml-2">
        <MdCloudDownload />
      </div>
      <Link
        class="block text-gray-900 text-sm leading-10 tracking-wide font-semibold antialiased"
        to=""
        on:click={handleInstallApp}
      >
        {$_(`menu.install`)}
      </Link>
    </div>
  </nav>
</aside>

<style>
  aside {
    left: -16rem;
    transition: left 0.3s ease-in-out;
    height: calc(100vh - 3rem);
  }

  .open {
    left: 0;
  }

  .icon {
    width: 24px;
    height: 24px;
  }

  .menu-item {
    height: 46px;
    line-height: 46px;
    white-space: nowrap;
  }

  .menu-item:hover {
    --tw-bg-opacity: 1;
    background-color: rgba(229, 231, 235, var(--tw-bg-opacity));
  }
</style>

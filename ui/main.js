import "carbon-components-svelte/css/all.css";
import App from "./App.svelte";

const app = new App({
  target: document.body,
  props: {
    url: "/",
  },
  // hydrate: true
});

let theme = "g100"; // "white" | "g10" | "g80" | "g90" | "g100"

$: document.documentElement.setAttribute("theme", theme);

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/service-worker.js")
    .then(function (registration) {
      // for (let registration of registrations) {
      //   registration.update()
      // }
      registration.update();
      // console.log('registration done')
      if (registration.installing) {
        // window.location.reload()
        // console.log('A new service worker is installing')
        registration.installing.addEventListener(
          "statechange",
          function (event) {
            // console.log(`A new service worker is ${event.target.state}, inform the user`)
            if (event.target.state === "installed") {
              // A new service worker is available, inform the user
              window.location.reload();
              // console.log('A new service worker is available, inform the user')
            }
          }
        );
      }
    });
}

let lock;

async function requestWakeLock() {
  if ("wakeLock" in navigator && "request" in navigator.wakeLock) {
    if (lock) {
      lock.release();
      // return
    }

    try {
      lock = await navigator.wakeLock.request("screen");
      // label.textContent = 'Acquired'
      console.log(`"screen" lock acquired.`);

      lock.addEventListener("release", () => {
        // label.textContent = 'Released'
        console.log(`"screen" lock released.`);
        lock = null;
      });
    } catch (e) {
      // label.textContent = `${e.name}: ${e.message}`
      console.log(`Caught ${e.name} acquiring "screen" lock: ${e.message}`);
    }
  }
}

requestWakeLock();

async function handleVisibilityChange() {
  if (document.visibilityState === "visible") {
    await requestWakeLock();
  }
}

document.addEventListener("visibilitychange", handleVisibilityChange);

export default app;

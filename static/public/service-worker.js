"use strict";
const cacheName = "sia-cache-v1";

// import workbox
importScripts("scripts/workbox-sw.js");
// the following line will be replaced by workbox-cli
// workbox.precaching.precacheAndRoute([])

workbox.setConfig({
  debug: false,
});

const { routing, strategies, cacheableResponse } = workbox;

// implements staleWhileRevalidate to all routes
routing.registerRoute(
  // Match all navigation requests, except those for URLs whose
  // path starts with '/admin/'
  ({ request, url }) =>
    request.mode === "navigate" && !url.pathname.startsWith("/api/"),

  // new strategies.CacheFirst({
  //   cacheName: cacheName,
  // }),

  new strategies.StaleWhileRevalidate({ cacheName })
  // new strategies.NetworkOnly({}),

  // new strategies.NetworkFirst({
  //   networkTimeoutSeconds: 30,
  //   cacheName: cacheName,
  //   plugins: [
  //     new cacheableResponse.CacheableResponsePlugin({
  //       statuses: [0, 200],
  //     }),
  //   ],
  // }),
);

// self.addEventListener('install', () => {
//   // self.skipWaiting() //tells service worker to skip installing and activate it
//   console.log('sw-installed')
// })

// removes all caches not named <cacheName>
const invalidateOldCache = async () => {
  const keys = await caches.keys();
  const isOldCache = (key) => key !== cacheName;
  const oldKeys = keys.filter(isOldCache);

  return Promise.all(oldKeys.map((key) => caches.delete(key)));
};

// runs invalidateOldCache on activation
self.addEventListener("activate", (e) => e.waitUntil(invalidateOldCache()));

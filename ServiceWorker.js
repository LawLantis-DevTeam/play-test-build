const cacheName = "LawlantisDevTeam-Lawlantis-0.1.0";
const contentToCache = [
    "Build/de4c39fd18686187208b47d8c67d98cf.loader.js",
    "Build/5abc13a973568f463c6d3a3a5100e0bf.framework.js.unityweb",
    "Build/606096bbcd83638e5b96856acd11bc02.data.unityweb",
    "Build/3aeda1814a383a09083397b806e46b80.wasm.unityweb",
    "TemplateData/style.css"

];

self.addEventListener('install', function (e) {
    console.log('[Service Worker] Install');
    
    e.waitUntil((async function () {
      const cache = await caches.open(cacheName);
      console.log('[Service Worker] Caching all: app shell and content');
      await cache.addAll(contentToCache);
    })());
});

self.addEventListener('fetch', function (e) {
    e.respondWith((async function () {
      let response = await caches.match(e.request);
      console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
      if (response) { return response; }

      response = await fetch(e.request);
      const cache = await caches.open(cacheName);
      console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
      cache.put(e.request, response.clone());
      return response;
    })());
});

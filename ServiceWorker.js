const cacheName = "LawlantisDevTeam-Lawlantis-0.1.0";
const contentToCache = [
    "Build/cbff6ba52c7c40386dd9a0d6f5202cd3.loader.js",
    "Build/5abc13a973568f463c6d3a3a5100e0bf.framework.js.unityweb",
    "Build/f3b1e1e03149c067c88e30e303f2dbfc.data.unityweb",
    "Build/a4fe672d8c62cfad7edc4304c6e2eb0e.wasm.unityweb",
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

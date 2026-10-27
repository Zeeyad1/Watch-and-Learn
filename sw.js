/* Turkish Practice service worker — v51
 * Static app shell and bundled quiz banks are cached for offline use.
 * Navigation is network-first; bundled assets are cache-first with network fallback.
 */
const CACHE_PREFIX = 'turkish-practice-v51';
const SHELL_CACHE = `${CACHE_PREFIX}-shell`;
const DATA_CACHE = `${CACHE_PREFIX}-data`;
const SHELL_FILES = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icon-192.png',
  './icon-512.png',
  './docs/QUESTION_FILE_FORMAT.md',
  './examples/example_video_questions.json',
  './examples/example_captions.srt'
];
const DATA_FILES = [
  './quiz-banks/index.json',
  './quiz-banks/turkish_a1_easy_quiz_bank_50.csv',
  './quiz-banks/turkish_a2_b1_quiz_bank_140.csv',
  './quiz-banks/turkish_hard_a2_easy_b1_teaching_bank_72.csv',
  './quiz-banks/turkish_advanced_common_nouns_300.csv',
  './quiz-banks/turkish_b1_everyday_life_comprehension_200.csv'
];

self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const results = await Promise.all([
      [SHELL_CACHE, SHELL_FILES],
      [DATA_CACHE, DATA_FILES]
    ].map(async ([cacheName, files]) => {
      const cache = await caches.open(cacheName);
      return Promise.all(files.map(async path => {
        try {
          const url = new URL(path, self.registration.scope);
          const response = await fetch(url, { cache: 'reload' });
          if (response.ok && response.type !== 'opaque') await cache.put(url, response);
        } catch (error) {
          // An unavailable optional file should not prevent the app shell from installing.
        }
      }));
    }));
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(key => key.startsWith('turkish-practice-') && !key.startsWith(CACHE_PREFIX)).map(key => caches.delete(key)));
    await self.clients.claim();
  })());
});

self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') self.skipWaiting();
});

self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  const appScope = new URL(self.registration.scope);
  if (!url.pathname.startsWith(appScope.pathname)) return;

  const isNavigation = request.mode === 'navigate';
  const isQuizData = /\/quiz-banks\//.test(url.pathname);
  const cacheName = isQuizData ? DATA_CACHE : SHELL_CACHE;

  if (isNavigation) {
    event.respondWith((async () => {
      try {
        const response = await fetch(request);
        if (response && response.ok) {
          const cache = await caches.open(SHELL_CACHE);
          await cache.put(new URL('./index.html', self.registration.scope), response.clone());
        }
        return response;
      } catch (error) {
        const cache = await caches.open(SHELL_CACHE);
        return (await cache.match(request)) || (await cache.match(new URL('./index.html', self.registration.scope))) || Response.error();
      }
    })());
    return;
  }

  event.respondWith((async () => {
    const cache = await caches.open(cacheName);
    const cached = await cache.match(request, { ignoreSearch: true });
    if (cached) {
      // Refresh in the background so updated banks can replace cached versions.
      event.waitUntil(fetch(request).then(response => {
        if (response && response.ok && response.type !== 'opaque') return cache.put(request, response.clone());
      }).catch(() => {}));
      return cached;
    }
    try {
      const response = await fetch(request);
      if (response && response.ok && response.type !== 'opaque') await cache.put(request, response.clone());
      return response;
    } catch (error) {
      return Response.error();
    }
  })());
});

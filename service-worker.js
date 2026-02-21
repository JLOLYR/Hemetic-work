const CACHE_NAME = 'hermetic-app-cache-v1';
const urlsToCache = [
  '/Hemetic-work/', // Esto cachea el index.html
  'https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&family=Lato:wght@300;400;700&display=swap'
];

// Instalar el Service Worker y cachear los archivos principales
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache abierto');
        return cache.addAll(urlsToCache);
      })
  );
});

// Interceptar peticiones y servir desde el caché si es posible
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Si está en caché, lo devuelve. Si no, lo busca en la red.
        return response || fetch(event.request);
      }
    )
  );
});

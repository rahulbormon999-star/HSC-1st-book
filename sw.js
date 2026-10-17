const CACHE_NAME = 'car-app-v1';
const urlsToCache = [
  './car.html'
  // যদি কোনো CSS, JS বা ছবি থাকে, তবে সেগুলো এখানে যোগ করতে পারেন
];

// ইনস্টল ইভেন্ট
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// ফেচ ইভেন্ট (অফলাইন সাপোর্ট)
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});

// অ্যাক্টিভেট ইভেন্ট
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

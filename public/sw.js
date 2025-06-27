// A minimal placeholder Service Worker. Remove or extend as needed.

self.addEventListener('install', () => {
  // Activate the new service worker as soon as it's finished installing.
  self.skipWaiting()
})

self.addEventListener('activate', (event) => {
  // Claim uncontrolled clients immediately so the service worker starts controlling them.
  event.waitUntil(self.clients.claim())
  console.log('Service Worker activated.')
})
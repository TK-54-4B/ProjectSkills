self.addEventListener('install', event => {
    console.log('service worker installed')
})

// activate event
self.addEventListener('activate', event => {
    console.log('service worker activated');
  });
  
// fetch event
self.addEventListener('fetch', event => {
    //console.log('fetch event', event);
  });
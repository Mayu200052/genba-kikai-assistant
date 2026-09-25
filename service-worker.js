// Keep this application's cache separate from other apps on the same origin.
const PREFIX='genba-kikai:'+new URL(self.registration.scope).pathname+':';
const CACHE=PREFIX+'v108';
const ASSETS=['./','./index.html','./manifest.webmanifest','./icon-192.png','./icon-512.png'];
self.addEventListener('install',event=>{
  event.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting()));
});
self.addEventListener('activate',event=>{
  event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith(PREFIX)&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));
});
self.addEventListener('fetch',event=>{
  if(event.request.method!=='GET'||new URL(event.request.url).origin!==self.location.origin)return;
  if(event.request.mode==='navigate'){
    event.respondWith(fetch(event.request).then(async response=>{
      if(response.ok){try{const c=await caches.open(CACHE);await c.put('./index.html',response.clone())}catch(e){}}
      return response;
    }).catch(async()=>{const c=await caches.open(CACHE);return await c.match('./index.html')||Response.error()}));
    return;
  }
  event.respondWith(caches.open(CACHE).then(async c=>{
    const cached=await c.match(event.request);if(cached)return cached;
    const response=await fetch(event.request);
    if(response.ok){try{await c.put(event.request,response.clone())}catch(e){}}
    return response;
  }));
});

const C='paylittle-v1';
self.addEventListener('install',e=>self.skipWaiting());
self.addEventListener('activate',e=>e.waitUntil(clients.claim()));
// Pages : réseau d'abord, copie en mémoire si pas de connexion. Les données Firebase ne sont jamais mises en cache.
self.addEventListener('fetch',e=>{
  const r=e.request,u=new URL(r.url);
  if(r.method!=='GET'||u.origin!==location.origin)return;
  e.respondWith(fetch(r).then(res=>{const c=res.clone();caches.open(C).then(x=>x.put(r,c)).catch(()=>{});return res}).catch(()=>caches.match(r)));
});

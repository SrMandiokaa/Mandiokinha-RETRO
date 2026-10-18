const V='mr-v1',SHELL=['./','./index.html','./manifest.webmanifest','./icon-180.png','./icon-192.png','./icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(SHELL)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{
  const r=e.request,u=new URL(r.url);
  if(r.method!=='GET')return;
  const mesmo=u.origin===location.origin;
  if(!mesmo&&u.hostname!=='cdn.emulatorjs.org')return;
  const guardar=res=>{if(res.ok||res.type==='opaque'){const c=res.clone();caches.open(V).then(x=>x.put(r,c))}return res};
  if(mesmo){e.respondWith(fetch(r).then(guardar).catch(()=>caches.match(r,{ignoreSearch:true})));}
  else{e.respondWith(caches.match(r).then(h=>h||fetch(r).then(guardar)));}
});

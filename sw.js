importScripts('js/registro.js', 'content/indice.js');   // traz a lista de arquivos de conteúdo (Escola.curso.arquivos)
const V='escola-dev-v5';
const BASE=['./','index.html','manifest.json','icon-180.png','icon-192.png','icon-512.png','css/app.css','js/registro.js','js/motor.js','js/armazenamento.js','js/ui-base.js','js/ui-curso.js','js/ui-atividade.js','js/ui-extras.js','js/app.js','content/glossario.js','content/legado.js','content/indice.js'];
const FILES=BASE.concat(self.Escola.curso.arquivos||[]);
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(FILES)));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(n=>n!==V).map(n=>caches.delete(n)))));self.clients.claim()});
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;e.respondWith(caches.match(e.request).then(r=>{const net=fetch(e.request).then(res=>{if(res.ok&&new URL(e.request.url).origin===location.origin){const cp=res.clone();caches.open(V).then(c=>c.put(e.request,cp))}return res}).catch(()=>r);return r||net}))});

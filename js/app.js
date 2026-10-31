/* Inicialização: carrega os arquivos de conteúdo listados em content/indice.js e abre a escola. */
(async function () {
  const carregar = src => new Promise(ok => {
    const s = document.createElement('script'); s.src = src; s.onload = () => ok(null); s.onerror = () => ok(src); document.head.appendChild(s);
  });
  UI.falhas = (await Promise.all((Escola.curso.arquivos || []).map(carregar))).filter(Boolean);
  UI.applyTheme();
  try { history.replaceState({ v: 'home', p: {} }, ''); } catch (e) {}
  UI.render();
  UI.persist().then(() => { if (UI.U.v === 'mais') UI.render(); });
  if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
    let recarregou = false;   // havia uma versão antiga no aparelho: quando a nova assumir, salva e recarrega uma vez
    navigator.serviceWorker.addEventListener('controllerchange', () => { if (recarregou) return; recarregou = true; try { UI.salvar(); } catch (e) {} location.reload(); });
  }
  if ('serviceWorker' in navigator) window.addEventListener('load', () => navigator.serviceWorker.register('sw.js').catch(() => {}));
  if (document.readyState === 'complete' && 'serviceWorker' in navigator) navigator.serviceWorker.register('sw.js').catch(() => {});
})();

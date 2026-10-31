/* Base da interface: estado do aluno, rotas, ações, relógio de estudo e utilitários. */
(function () {
  const reg = Escola, M = EscolaMotor, Arm = EscolaArm;
  const UI = window.UI = { telas: {}, AC: {}, pos: {}, U: { v: 'home', p: {} } };
  const U = UI.U;

  UI.esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const esc = UI.esc;

  /* ---- estado ---- */
  const ini = Arm.carregar();
  UI.S = ini.S; UI.avisoCarga = ini.aviso;
  if (ini.migrou) Arm.salvar(UI.S);          // grava já no esquema novo (a cópia do antigo foi guardada pelo carregar)
  UI.salvar = () => { if (UI.timer) { clearTimeout(UI.timer); UI.timer = null; } return Arm.salvar(UI.S); };
  UI.salvarLogo = () => { if (UI.timer) clearTimeout(UI.timer); UI.timer = setTimeout(UI.salvar, 400); };
  UI.trocarEstado = novo => { Object.keys(UI.S).forEach(k => delete UI.S[k]); Object.assign(UI.S, novo); UI.salvar(); };
  window.addEventListener('pagehide', () => { if (UI.timer) UI.salvar(); });
  document.addEventListener('visibilitychange', () => { if (document.hidden && UI.timer) UI.salvar(); });

  /* ---- utilitários ---- */
  UI.copiar = async txt => {
    try { await navigator.clipboard.writeText(txt); return true; } catch (e) {}
    const ta = document.createElement('textarea'); ta.value = txt; ta.style.cssText = 'position:fixed;opacity:0;top:0';
    document.body.appendChild(ta); ta.select(); ta.setSelectionRange(0, txt.length);
    let ok = false; try { ok = document.execCommand('copy'); } catch (e) {} ta.remove(); return ok;
  };
  UI.baixar = (nome, texto, tipo) => {
    const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([texto], { type: tipo || 'text/plain;charset=utf-8' }));
    a.download = nome; document.body.appendChild(a); a.click(); setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 1000);
  };
  UI.data = ts => new Date(ts).toLocaleString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  UI.sem = s => String(s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
  UI.nota = M.fmt;
  UI.msg = (id, texto) => { const e = document.getElementById(id); if (e) e.textContent = texto; };
  UI.calc = () => M.calcular(reg, UI.S);

  /* ---- navegação ---- */
  const NAV = [['home', '🏠', 'Início'], ['curso', '🗺️', 'Curso'], ['busca', '🔎', 'Buscar'], ['gls', '📚', 'Termos'], ['duv', '💭', 'Dúvidas'], ['bol', '📊', 'Boletim'], ['mais', '⚙️', 'Mais']];
  const SECAO = { aula: 'curso', mod: 'curso', tarefa: 'curso', ativ: 'curso', rev: 'gls', leg: 'mais', conq: 'home' };
  UI.nav = () => {
    const ativo = SECAO[U.v] || U.v;
    document.getElementById('nav').innerHTML = NAV.map(n => '<button data-a="nav" data-i="' + n[0] + '" class="' + (ativo === n[0] ? 'on' : '') + '" aria-label="' + n[2] + '"' + (ativo === n[0] ? ' aria-current="page"' : '') + '><span aria-hidden="true">' + n[1] + '</span>' + n[2] + '</button>').join('');
  };
  UI.render = () => {
    UI.nav();
    const f = UI.telas[U.v] || UI.telas.home;
    document.getElementById('app').innerHTML = f(U.p || {});
    if (UI.pos[U.v]) UI.pos[U.v](U.p || {});
    UI.leitura();
  };
  UI.ir = (v, p, semHist) => {
    U.v = v; U.p = p || {};
    if (!semHist) { try { history.pushState({ v, p: U.p }, ''); } catch (e) {} }
    UI.render(); window.scrollTo(0, 0);
    const app = document.getElementById('app'); app.setAttribute('tabindex', '-1'); app.focus({ preventScroll: true });
  };
  window.addEventListener('popstate', e => { const st = e.state || { v: 'home', p: {} }; U.v = st.v; U.p = st.p || {}; UI.render(); });

  // barra de progresso de leitura (só existe dentro de uma aula)
  UI.leitura = () => {
    const barra = document.getElementById('leitura-i'); if (!barra) return;
    const alt = document.documentElement.scrollHeight - window.innerHeight;
    barra.style.width = (alt > 0 ? Math.min(100, 100 * window.scrollY / alt) : 100) + '%';
  };
  window.addEventListener('scroll', UI.leitura, { passive: true });

  /* ---- ações: qualquer elemento com data-a="nome" data-i="valor" ---- */
  document.addEventListener('click', e => {
    const b = e.target.closest('[data-a]'); if (!b || b.disabled) return;
    const f = UI.AC[b.dataset.a]; if (!f) return;
    const r = f(b.dataset.i, b, e);
    if (r === false) return;           // a ação cuidou de tudo
    if (r !== 'nav') UI.render();
  });
  document.addEventListener('input', e => { const t = e.target; if (t.dataset && t.dataset.in && UI.IN[t.dataset.in]) UI.IN[t.dataset.in](t.dataset.i, t, e); });
  document.addEventListener('change', e => { const t = e.target; if (t.dataset && t.dataset.ch && UI.IN[t.dataset.ch]) { const r = UI.IN[t.dataset.ch](t.dataset.i, t, e); if (r !== false) UI.render(); } });
  UI.IN = {};
  UI.AC.nav = i => { UI.ir(i, {}); return 'nav'; };

  /* ---- relógio de estudo (meta diária e sequência) ---- */
  const key = d => d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
  const tk = () => key(new Date());
  const D = () => UI.S.days || (UI.S.days = {});
  const mins = k => Math.round((D()[k] || 0) / 60);
  UI.streak = () => { let n = 0; const d = new Date(); for (let i = 0; i < 400; i++) { const k = key(d); if ((D()[k] || 0) >= 600) n++; else if (n > 0 || k !== tk()) break; d.setDate(d.getDate() - 1); } return n; };
  UI.semana = () => { let t = 0; const d = new Date(); for (let i = 0; i < 7; i++) { t += D()[key(d)] || 0; d.setDate(d.getDate() - 1); } return Math.round(t / 60); };
  UI.meta = () => { const m = mins(tk()), g = UI.S.goal || 60;
    return '<div class="row sp"><b>Hoje: ' + m + ' de ' + g + ' min</b><span class="pill ' + (m >= g ? 'o' : '') + '">' + UI.streak() + ' dias seguidos</span></div><div class="bar" style="margin-top:10px"><i style="width:' + Math.min(100, 100 * m / g) + '%"></i></div><p class="mu" style="margin:8px 0">Esta semana: ' + UI.semana() + ' min. O tempo conta com esta página aberta e visível, e serve só para criar hábito: o avanço no curso depende do que você domina. Dia com 10 min ou mais mantém a sequência.</p><div class="row"><span class="mu">Meta diária:</span>' + [30, 60, 120].map(x => '<button class="btn s ' + (g === x ? '' : 'g') + '" data-a="meta" data-i="' + x + '">' + x + ' min</button>').join('') + '</div>'; };
  UI.AC.meta = i => { UI.S.goal = +i; UI.salvar(); };
  setInterval(() => { if (document.hidden) return; D()[tk()] = (D()[tk()] || 0) + 15; UI.salvarLogo(); const e = document.getElementById('meta'); if (e) e.innerHTML = UI.meta(); }, 15000);

  UI.applyTheme = () => { if (UI.S.theme) document.documentElement.setAttribute('data-theme', UI.S.theme); else document.documentElement.removeAttribute('data-theme'); };
})();

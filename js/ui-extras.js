/* Termos e cartões, busca, caderno de dúvidas, boletim, backup (Mais) e material anterior. */
(function () {
  const reg = Escola, M = EscolaMotor, Arm = EscolaArm, UI = window.UI, S = UI.S, esc = UI.esc, T = UI.telas, AC = UI.AC;

  /* =================== TERMOS E CARTÕES =================== */
  let GQ = '', FC = null;
  const glist = () => {
    const q = UI.sem(GQ.trim());
    const r = reg.G.filter(g => !q || UI.sem(g[0]).includes(q) || UI.sem(g[1]).includes(q));
    return r.length ? r.map(g => '<div class="card"><b>' + esc(g[0]) + '</b><p class="mu" style="margin:4px 0 0;font-size:15px">' + esc(g[1]) + '</p></div>').join('') : '<p class="mu">Nenhum termo encontrado.</p>';
  };
  T.gls = () => {
    if (FC) {
      const dk = reg.G.filter(g => ((S.fc || {})[g[0]] || 0) < 3);
      if (!dk.length) return '<h1>Revisão</h1><div class="card"><p>Você dominou todos os termos. Muito bem.</p><button class="btn" data-a="fcend">Voltar</button></div>';
      const g = dk[FC.k % dk.length];
      return '<h1>Revisão com cartões</h1><p class="mu">' + dk.length + ' termos na fila. Acerte 3 vezes para um termo sair.</p><div class="card" style="min-height:140px"><b style="font-size:20px">' + esc(g[0]) + '</b>' + (FC.s ? '<p class="read">' + esc(g[1]) + '</p>' : '') + '</div>' +
        (FC.s ? '<div class="row"><button class="btn" data-a="fcok" data-i="' + esc(g[0]) + '">Acertei</button><button class="btn g" data-a="fcno" data-i="' + esc(g[0]) + '">Errei</button></div>' : '<button class="btn" data-a="fcshow">Mostrar definição</button>') +
        '<p><button class="btn g s" data-a="fcend">Sair da revisão</button></p>';
    }
    const n = M.filaRevisao(reg, S).length;
    return '<h1>Termos</h1><p class="mu">Dicionário fixo, com busca e revisão. Sempre aberto.</p><div class="row" style="margin-bottom:10px"><button class="btn s" data-a="fcstart">Revisar termos com cartões</button><button class="btn s g" data-a="nav" data-i="rev">Fila de revisão de questões (' + n + ')</button></div><input id="gq" type="search" placeholder="Buscar termo" aria-label="Buscar termo" value="' + esc(GQ) + '"><div id="gl">' + glist() + '</div>';
  };
  AC.fcstart = () => { FC = { k: 0, s: false }; };
  AC.fcshow = () => { FC.s = true; };
  AC.fcok = i => { S.fc = S.fc || {}; S.fc[i] = (S.fc[i] || 0) + 1; UI.salvar(); FC.s = false; FC.k++; };
  AC.fcno = i => { S.fc = S.fc || {}; S.fc[i] = 0; UI.salvar(); FC.s = false; FC.k++; };
  AC.fcend = () => { FC = null; };
  document.addEventListener('input', e => { if (e.target.id === 'gq') { GQ = e.target.value; document.getElementById('gl').innerHTML = glist(); } });
  UI.irTermo = nome => { GQ = nome; FC = null; UI.ir('gls', {}); };

  /* =================== BUSCA =================== */
  const limpa = h => String(h).replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  const trecho = (texto, q) => {
    const i = UI.sem(texto).indexOf(q); if (i < 0) return '';
    const a = Math.max(0, i - 50), b = Math.min(texto.length, i + q.length + 70);
    const x = esc(texto.slice(a, i)) + '<mark>' + esc(texto.slice(i, i + q.length)) + '</mark>' + esc(texto.slice(i + q.length, b));
    return (a > 0 ? '…' : '') + x + (b < texto.length ? '…' : '');
  };
  UI.buscar = bruto => {
    const q = UI.sem(bruto.trim()); if (q.length < 2) return null;
    const out = { aulas: [], termos: [], notas: [] };
    Object.values(reg.aulas).forEach(a => {
      const corpo = a.partes.filter(p => p.html).map(p => limpa(p.html)).join(' ') + ' ' + a.resumo.join(' ') + ' ' + a.objetivos.join(' ');
      if (UI.sem(a.titulo).includes(q)) out.aulas.push({ a: 'aula:' + a.id, t: a.titulo, s: '' });
      else if (UI.sem(corpo).includes(q)) out.aulas.push({ a: 'aula:' + a.id, t: a.titulo, s: trecho(corpo, q) });
    });
    L.forEach(l => { const corpo = limpa(l.b); if (UI.sem(l.t).includes(q) || UI.sem(corpo).includes(q)) out.aulas.push({ a: 'leg:' + l.id, t: l.t + ' (material anterior)', s: trecho(corpo, q) }); });
    reg.G.forEach(g => { if (UI.sem(g[0]).includes(q) || UI.sem(g[1]).includes(q)) out.termos.push({ a: 'termo:' + g[0], t: g[0], s: trecho(g[1], q) }); });
    Object.keys(S.anot).forEach(id => { const tx = S.anot[id] || ''; if (UI.sem(tx).includes(q) && reg.aulas[id]) out.notas.push({ a: 'aula:' + id, t: 'Anotação em “' + reg.aulas[id].titulo + '”', s: trecho(tx, q) }); });
    Object.keys(S.tasks || {}).forEach(id => { const tx = S.tasks[id].n || ''; const t = T_LEG.find(x => x.id === id); if (UI.sem(tx).includes(q)) out.notas.push({ a: 'leg:', t: 'Anotação na tarefa anterior' + (t ? ' “' + t.t + '”' : ''), s: trecho(tx, q) }); });
    S.duv.forEach(d => { const tx = d.q + ' ' + (d.resp || ''); if (UI.sem(tx).includes(q)) out.notas.push({ a: 'duv:' + d.id, t: 'Caderno de dúvidas', s: trecho(tx, q) }); });
    return out;
  };
  const T_LEG = T_LEGADO;
  const grupo = (titulo, lista) => lista.length ? '<h2>' + titulo + ' <span class="mu">(' + lista.length + ')</span></h2>' + lista.slice(0, 12).map(r => '<button class="card item" data-a="bres" data-i="' + esc(r.a) + '"><b>' + esc(r.t) + '</b>' + (r.s ? '<div class="snip">' + r.s + '</div>' : '') + '</button>').join('') : '';
  const resultadosBusca = () => {
    const r = UI.buscar(UI.bq || ''); if (!r) return '<p class="mu">Digite ao menos 2 letras.</p>';
    const h = grupo('Aulas', r.aulas) + grupo('Glossário', r.termos) + grupo('Anotações e dúvidas', r.notas);
    return h || '<p class="mu">Nada encontrado.</p>';
  };
  UI.bq = '';
  T.busca = () => '<h1>Buscar</h1><p class="mu">Procura nas aulas, no glossário e nas suas anotações. Funciona sem internet.</p><input id="bq" type="search" placeholder="O que você quer achar?" aria-label="Buscar" value="' + esc(UI.bq) + '"><div id="br">' + resultadosBusca() + '</div>';
  document.addEventListener('input', e => { if (e.target.id === 'bq') { UI.bq = e.target.value; document.getElementById('br').innerHTML = resultadosBusca(); } });
  AC.bres = i => {
    const k = i.indexOf(':'), tipo = i.slice(0, k), v = i.slice(k + 1);
    if (tipo === 'aula') UI.ir('aula', { id: v });
    else if (tipo === 'termo') UI.irTermo(v);
    else if (tipo === 'duv') UI.ir('duv', {});
    else { if (v) { OPL = v; UI.legTab = 'apo'; } UI.ir('leg', {}); }
    return 'nav';
  };

  /* =================== CADERNO DE DÚVIDAS =================== */
  UI.duvF = 'todas'; UI.duvRascunho = ''; UI.duvTag = 'curso';
  T.duv = () => {
    const lista = S.duv.filter(d => UI.duvF === 'todas' || (UI.duvF === 'abertas' ? d.status !== 'respondida' : d.status === 'respondida')).slice().reverse();
    let h = '<h1>Caderno de dúvidas</h1><p class="mu">Anote qualquer pergunta, ligada ou não ao curso. Curiosidade também vale: é matéria complementar. Sempre aberto.</p>';
    h += '<div class="card"><textarea id="dq" data-in="dq" aria-label="Sua dúvida" placeholder="Escreva sua pergunta...">' + esc(UI.duvRascunho) + '</textarea><div class="row" style="margin-top:8px"><select data-ch="dtag" style="width:auto" aria-label="Tipo"><option value="curso" ' + (UI.duvTag === 'curso' ? 'selected' : '') + '>Ligada ao curso</option><option value="curiosidade" ' + (UI.duvTag === 'curiosidade' ? 'selected' : '') + '>Curiosidade</option></select><button class="btn s" data-a="dadd">Anotar</button></div></div>';
    h += '<div class="seg">' + ['todas', 'abertas', 'respondidas'].map(f => '<button class="btn s ' + (UI.duvF === f ? '' : 'g') + '" data-a="dfil" data-i="' + f + '">' + f[0].toUpperCase() + f.slice(1) + '</button>').join('') + '</div>';
    if (!lista.length) h += '<p class="mu">Nenhuma dúvida aqui ainda.</p>';
    lista.forEach(d => {
      const resp = d.status === 'respondida';
      h += '<div class="card"><div class="row"><span class="pill ' + (resp ? 'ok' : 'w') + '">' + (resp ? 'Respondida' : 'Aberta') + '</span><span class="pill g">' + (d.tag === 'curso' ? 'Ligada ao curso' : 'Curiosidade') + '</span><span class="cnt">' + UI.data(d.ts) + '</span></div><p style="white-space:pre-wrap">' + esc(d.q) + '</p>' +
        '<label class="mu" for="dr_' + d.id + '">Resposta ou anotação</label><textarea id="dr_' + d.id + '" data-in="dresp" data-i="' + d.id + '" placeholder="Cole aqui o que aprendeu">' + esc(d.resp || '') + '</textarea>' +
        '<div class="row" style="margin-top:8px"><button class="btn s g" data-a="dcopy" data-i="' + d.id + '">Copiar para o Professor</button><button class="btn s g" data-a="dst" data-i="' + d.id + '">' + (resp ? 'Reabrir' : 'Marcar como respondida') + '</button><button class="btn s g" data-a="ddel" data-i="' + d.id + '">Apagar</button></div><span class="cnt" id="dm_' + d.id + '"></span></div>';
    });
    return h;
  };
  UI.IN.dq = (i, el) => { UI.duvRascunho = el.value; };
  UI.IN.dtag = (i, el) => { UI.duvTag = el.value; return false; };
  UI.IN.dresp = (id, el) => { const d = S.duv.find(x => String(x.id) === id); if (d) { d.resp = el.value; UI.salvarLogo(); } };
  AC.dfil = i => { UI.duvF = i; };
  AC.dadd = () => { const q = UI.duvRascunho.trim(); if (!q) return false; S.duv.push({ id: Date.now(), q, tag: UI.duvTag, status: 'aberta', resp: '', ts: Date.now() }); UI.duvRascunho = ''; UI.salvar(); };
  AC.dst = i => { const d = S.duv.find(x => String(x.id) === i); d.status = d.status === 'respondida' ? 'aberta' : 'respondida'; UI.salvar(); };
  AC.ddel = i => { if (!confirm('Apagar esta dúvida?')) return false; S.duv = S.duv.filter(x => String(x.id) !== i); UI.salvar(); };
  AC.dcopy = async i => {
    const d = S.duv.find(x => String(x.id) === i);
    const ok = await UI.copiar('Professor, tenho uma ' + (d.tag === 'curiosidade' ? 'curiosidade' : 'dúvida sobre o curso') + ':\n\n' + d.q + '\n\nExplique como se eu fosse iniciante, com analogias e exemplos dos meus projetos.');
    UI.msg('dm_' + i, ok ? 'Copiado. Cole na conversa com o Professor.' : 'Não consegui copiar. Selecione o texto e copie manualmente.'); return false;
  };

  /* =================== BOLETIM =================== */
  const linhaNota = (rotulo, id) => {
    const t = M.tentativas(S, id), b = M.melhorNota(S, id), em = S.em[id];
    return '<div class="row sp" style="padding:6px 0;border-top:1px solid var(--ln)"><span>' + esc(rotulo) + '<span class="mu"> · ' + t.length + (t.length === 1 ? ' tentativa' : ' tentativas') + (em ? ' · uma em andamento' : '') + '</span></span>' +
      (b == null ? '<span class="pill g">sem nota</span>' : '<span class="pill ' + (M.aprovada(b) ? 'ok' : 'w') + '">' + UI.nota(b) + (M.aprovada(b) ? ' aprovado' : ' abaixo de 7,0') + '</span>') + '</div>';
  };
  T.bol = () => {
    const c = UI.calc();
    let h = '<h1>Boletim</h1><p class="mu">Notas, tentativas e média por módulo. Vale a melhor tentativa de cada atividade. Sempre aberto.</p>';
    const mods = c.modulos.filter(m => m.itens.length);
    if (!mods.length) h += '<div class="card"><p>Ainda não há módulos com conteúdo.</p></div>';
    mods.forEach(m => {
      const mod = reg.modulo(m.id), media = M.mediaModulo(reg, S, mod), sit = m.estado === 'concluido' ? ['Aprovado', 'ok'] : m.estado === 'bloqueado' ? ['Bloqueado', 'w'] : ['Cursando', ''];
      h += '<div class="card"><div class="row sp"><b>' + esc(m.titulo) + '</b><span class="pill ' + sit[1] + '">' + sit[0] + '</span></div><p style="margin:6px 0"><b>Média do módulo: ' + UI.nota(media.media) + '</b>' + (media.media != null && !media.completa ? ' <span class="mu">(parcial: faltam notas)</span>' : '') + '<span class="mu"> · prova 50%, trabalho 30%, testes 20%</span></p>';
      h += '<div class="mu" style="margin-top:8px">Tarefas</div>';
      m.itens.filter(i => i.k === 'aula').forEach(i => { const a = reg.aulas[i.id], p = M.tarefaProgresso(a, S), ac = (a.tarefa.obj || []).filter(q => S.resp[q.id] === q.a).length;
        h += '<div class="row sp" style="padding:6px 0;border-top:1px solid var(--ln)"><span>' + esc(a.titulo) + '</span><span class="mu">' + p.feitas + '/' + p.total + ' respondidas · ' + ac + '/' + a.tarefa.obj.length + ' objetivas certas</span></div>'; });
      h += '<div class="mu" style="margin-top:10px">Testes, trabalho e prova</div>';
      m.itens.filter(i => i.k !== 'aula').forEach(i => { h += linhaNota((i.k === 'teste' ? 'Teste de bloco' : i.k === 'trabalho' ? 'Trabalho do módulo' : 'Prova do módulo'), i.id); });
      h += '</div>';
    });
    if (S.best) h += '<div class="card"><b>Material anterior</b><p class="mu" style="margin:4px 0 0">Melhor resultado na prova anterior: ' + S.best + '/' + Q.length + '.</p></div>';
    return h;
  };

  /* =================== MAIS: aparência, backup, caderno, armazenamento =================== */
  UI.persist = async () => {
    try { if (navigator.storage && navigator.storage.persist) { UI.persistido = (await navigator.storage.persisted()) || (await navigator.storage.persist()); } else UI.persistido = null; } catch (e) { UI.persistido = null; }
    try { if (navigator.storage && navigator.storage.estimate) UI.cota = await navigator.storage.estimate(); } catch (e) {}
  };
  UI.msgMais = '';
  T.mais = () => {
    const dias = Arm.diasSemBackup(S), kb = Math.round(Arm.tamanho(S) / 1024);
    const p = UI.persistido;
    return '<h1>Mais</h1><div class="card"><b>Aparência</b><div class="row" style="margin-top:8px"><button class="btn s g" data-a="tema" data-i="">Automático</button><button class="btn s g" data-a="tema" data-i="light">Claro</button><button class="btn s g" data-a="tema" data-i="dark">Escuro</button></div></div>' +
      '<div class="card"><b>Backup</b><p class="mu">Seu progresso, respostas, anotações e notas ficam só neste aparelho. ' + (S.bk ? 'Último backup: ' + UI.data(S.bk) + ' (' + dias + ' dias).' : 'Você ainda não fez backup.') + ' Faça um a cada semana e antes de limpar dados do navegador.</p><div class="row"><button class="btn s" data-a="bkbaixar">Baixar backup (.json)</button><label class="btn s g" style="display:inline-flex;align-items:center;cursor:pointer">Importar de arquivo<input type="file" accept=".json,application/json" data-ch="bkarq" style="display:none"></label></div>' +
      '<details style="margin-top:10px"><summary class="mu">Backup por texto (copiar e colar, para levar a outro aparelho)</summary><textarea id="io" aria-label="Texto do backup" placeholder="Toque em Gerar para copiar, ou cole aqui um backup e toque em Importar"></textarea><div class="row" style="margin-top:8px"><button class="btn s" data-a="bkgerar">Gerar e copiar</button><button class="btn s g" data-a="bktexto">Importar do texto</button></div></details><p class="mu" id="bkmsg" role="status">' + esc(UI.msgMais) + '</p></div>' +
      '<div class="card"><b>Caderno</b><p class="mu">Baixa suas anotações das aulas, o caderno de dúvidas e as notas das tarefas anteriores num arquivo de texto legível (.md).</p><button class="btn s" data-a="cadbaixar">Exportar caderno (.md)</button></div>' +
      '<div class="card"><b>Armazenamento</b><p class="mu">Seus dados ocupam cerca de ' + kb + ' KB' + (UI.cota && UI.cota.quota ? ' de ' + Math.round(UI.cota.quota / 1048576) + ' MB disponíveis' : '') + '. Armazenamento persistente: <b>' + (p === true ? 'concedido (o navegador não apaga sozinho)' : p === false ? 'não concedido (o navegador pode apagar dados se faltar espaço)' : 'não disponível neste navegador') + '</b>.</p>' +
      (Arm.apertado(S) ? '<div class="aviso">Seus dados estão ficando grandes para este tipo de armazenamento. Faça um backup agora.</div>' : '') + (p === true ? '' : '<button class="btn s g" data-a="persist">Pedir armazenamento persistente</button>') + '</div>' +
      '<div class="card"><b>Material anterior</b><p class="mu">Lições, tarefas, prova e trilha da primeira versão da escola.</p><button class="btn s g" data-a="nav" data-i="leg">Abrir</button></div>' +
      '<div class="card"><b>Apagar tudo</b><p class="mu">Remove progresso, respostas e anotações deste aparelho. Faça backup antes.</p><button class="btn s g" data-a="reset">Apagar progresso</button></div>';
  };
  AC.tema = i => { S.theme = i; UI.salvar(); UI.applyTheme(); };
  AC.bkbaixar = () => { UI.baixar('escola-dev-backup-' + new Date().toISOString().slice(0, 10) + '.json', Arm.exportar(S), 'application/json'); S.bk = Date.now(); UI.salvar(); UI.msgMais = 'Backup baixado. Guarde o arquivo num lugar seguro (iCloud Drive, por exemplo).'; };
  AC.bkgerar = async () => { const t = Arm.exportar(S); document.getElementById('io').value = t; S.bk = Date.now(); UI.salvar(); UI.msgMais = (await UI.copiar(t)) ? 'Backup copiado. Cole no outro aparelho e toque em Importar do texto.' : 'Não consegui copiar sozinho: selecione o texto da caixa e copie.'; UI.msg('bkmsg', UI.msgMais); return false; };
  function importar(texto) {
    const r = Arm.importar(texto); if (!r.ok) { UI.msgMais = r.erro; return false; }
    if (!confirm('Importar este backup vai SUBSTITUIR o progresso deste aparelho. Uma cópia do progresso atual será guardada antes. Continuar?')) return false;
    try { localStorage.setItem(Arm.CHAVE_ANTES_IMPORTAR, JSON.stringify(S)); } catch (e) {}
    UI.trocarEstado(r.S); UI.applyTheme(); UI.msgMais = 'Backup importado.'; return true;
  }
  AC.bktexto = () => { importar(document.getElementById('io').value); };
  UI.IN.bkarq = (i, el) => {
    const f = el.files && el.files[0]; if (!f) return false;
    const fr = new FileReader(); fr.onload = () => { importar(String(fr.result)); UI.render(); }; fr.onerror = () => { UI.msgMais = 'Não consegui ler o arquivo.'; UI.render(); }; fr.readAsText(f); return false;
  };
  AC.cadbaixar = () => { UI.baixar('meu-caderno-escola-dev.md', Arm.cadernoMd(reg, S, { T: T_LEG }), 'text/markdown;charset=utf-8'); UI.msgMais = 'Caderno exportado.'; };
  AC.persist = async () => { await UI.persist(); UI.render(); return false; };
  AC.reset = () => {
    if (!confirm('Apagar todo o progresso deste aparelho? Isso não pode ser desfeito.')) return false;
    [Arm.CHAVE, Arm.CHAVE_V1, Arm.CHAVE_ANTES_IMPORTAR].forEach(k => { try { localStorage.removeItem(k); } catch (e) {} });
    UI.trocarEstado(Arm.padrao()); UI.applyTheme(); UI.msgMais = 'Progresso apagado.';
  };

  /* =================== MATERIAL ANTERIOR (primeira versão) =================== */
  UI.pctLegado = () => { const n = L.filter(l => S.done[l.id]).length + T_LEG.filter(t => (S.tasks[t.id] || { s: 0 }).s > 0).length + P.filter(p => S.done[p.id]).length; return Math.round(100 * n / (L.length + T_LEG.length + P.length)); };
  UI.legTab = 'apo'; let OPL = null, AQ = '', LQ = null; const ST = ['A fazer', 'Feita', 'Revisada no chat'];
  const alist = () => {
    const q = UI.sem(AQ.trim()); let h = '', cur = '';
    L.filter(l => !q || UI.sem(l.t + ' ' + limpa(l.b)).includes(q)).forEach(l => {
      if (l.m !== cur) { cur = l.m; const a = L.filter(x => x.m === cur); h += '<h2>' + esc(cur) + ' <span class="mu">(' + a.filter(x => S.done[x.id]).length + '/' + a.length + ')</span></h2>'; }
      h += '<button class="card item" data-a="lopen" data-i="' + l.id + '"><div class="row sp"><b>' + esc(l.t) + '</b><span class="pill ' + (S.done[l.id] ? 'o' : '') + '">' + (S.done[l.id] ? 'Concluída' : l.min + ' min') + '</span></div></button>';
    });
    return h || '<p class="mu">Nada encontrado.</p>';
  };
  const lApo = () => {
    if (OPL) { const k = L.findIndex(x => x.id === OPL), l = L[k], pv = L[k - 1], nx = L[k + 1];
      return '<button class="btn g s" data-a="lclose">Voltar à lista</button><h1 style="margin-top:14px">' + l.t + '</h1><p class="mu">' + l.m + ', lição ' + (k + 1) + ' de ' + L.length + ', cerca de ' + l.min + ' min</p><div class="read">' + l.b + '</div><div class="row" style="margin-top:16px"><button class="btn" data-a="ldone" data-i="' + l.id + '">' + (S.done[l.id] ? 'Concluída (desfazer)' : 'Marcar como concluída') + '</button></div><div class="row sp" style="margin-top:14px">' + (pv ? '<button class="btn g s" data-a="lopen" data-i="' + pv.id + '">Anterior</button>' : '<span></span>') + (nx ? '<button class="btn g s" data-a="lopen" data-i="' + nx.id + '">Próxima</button>' : '') + '</div>'; }
    return '<input id="laq" type="search" placeholder="Buscar nas lições" aria-label="Buscar nas lições" value="' + esc(AQ) + '"><div id="al">' + alist() + '</div>';
  };
  const lTar = () => '<p class="mu">Avance o status, anote, e use “Copiar para o chat” para enviar a tarefa e receber a correção.</p>' + T_LEG.map(t => { const s = S.tasks[t.id] || { s: 0, n: '' };
    return '<div class="card"><div class="row" style="flex-wrap:nowrap"><div class="chk">' + (s.s > 0 ? '✓' : '') + '</div><b>' + t.t + '</b></div><p class="mu">' + t.d + '</p><div class="row"><button class="btn s ' + (s.s ? '' : 'g') + '" data-a="ltask" data-i="' + t.id + '">' + ST[s.s] + '</button><button class="btn s g" data-a="ltcopy" data-i="' + t.id + '">Copiar para o chat</button></div><textarea data-in="ltn" data-i="' + t.id + '" aria-label="Anotações" placeholder="O que você viu, sentiu ou não entendeu?">' + esc(s.n || '') + '</textarea><p class="mu" id="c_' + t.id + '"></p></div>'; }).join('');
  const lPro = () => {
    if (!LQ) return '<p class="mu">Seis perguntas sobre o que você estudou na primeira versão.</p><div class="card"><p>Melhor resultado: <b>' + S.best + '/' + Q.length + '</b></p><button class="btn" data-a="lqstart">Começar prova</button></div>';
    if (LQ.i >= Q.length) return '<div class="card"><p style="font-size:28px;margin:0"><b>' + LQ.sc + '/' + Q.length + '</b></p><p class="mu">' + (LQ.sc === Q.length ? 'Perfeito. Pode avançar.' : 'Releia as lições dos erros e tente de novo.') + '</p><button class="btn" data-a="lqstart">Refazer</button></div>';
    const q = Q[LQ.i];
    return '<h2>Pergunta ' + (LQ.i + 1) + ' de ' + Q.length + '</h2><p><b>' + q.q + '</b></p>' + q.o.map((o, k) => '<button class="opt ' + (LQ.r !== null ? (k === q.a ? 'ok' : (k === LQ.r ? 'no' : '')) : '') + '" data-a="lqans" data-i="' + k + '" ' + (LQ.r !== null ? 'disabled' : '') + '>' + o + '</button>').join('') + (LQ.r !== null ? '<div class="card"><b>' + (LQ.r === q.a ? 'Certo.' : 'Quase.') + '</b> ' + q.e + '</div><button class="btn" data-a="lqnext">' + (LQ.i + 1 < Q.length ? 'Próxima' : 'Ver resultado') + '</button>' : '');
  };
  const lTri = () => '<p class="mu">Seis fases. Marque cada uma quando atingir o marco, de verdade.</p><ul class="trail">' + P.map(p => '<li class="' + (S.done[p.id] ? 'on' : '') + '"><b>' + p.t + '</b><div class="mu">' + p.m + '</div><button class="btn s g" style="margin-top:6px" data-a="lph" data-i="' + p.id + '">' + (S.done[p.id] ? 'Atingido (desfazer)' : 'Marcar como atingido') + '</button></li>').join('') + '</ul>';
  T.leg = () => '<h1>Material anterior</h1><p class="mu">A primeira versão da escola. Continua aqui até o Módulo 0.0 novo entrar. Seu progresso foi mantido.</p><div class="seg">' + [['apo', 'Apostila'], ['tar', 'Tarefas'], ['pro', 'Prova'], ['tri', 'Trilha']].map(x => '<button class="btn s ' + (UI.legTab === x[0] ? '' : 'g') + '" data-a="ltab" data-i="' + x[0] + '">' + x[1] + '</button>').join('') + '</div>' + ({ apo: lApo, tar: lTar, pro: lPro, tri: lTri }[UI.legTab])();
  AC.ltab = i => { UI.legTab = i; OPL = null; LQ = null; };
  AC.lopen = i => { OPL = i; window.scrollTo(0, 0); };
  AC.lclose = () => { OPL = null; };
  AC.ldone = i => { S.done[i] = !S.done[i]; UI.salvar(); };
  AC.lph = i => { S.done[i] = !S.done[i]; UI.salvar(); };
  AC.ltask = i => { const t = S.tasks[i] || { s: 0, n: '' }; t.s = (t.s + 1) % 3; S.tasks[i] = t; UI.salvar(); };
  AC.ltcopy = async i => { const t = T_LEG.find(x => x.id === i), s = S.tasks[i] || { s: 0, n: '' }; const ok = await UI.copiar('Tarefa: ' + t.t + '\nStatus: ' + ST[s.s] + '\nMinhas anotações:\n' + (s.n || '(sem anotações)') + '\n\nPode revisar e me dizer o que entendi certo e o que preciso corrigir?'); UI.msg('c_' + i, ok ? 'Copiado. Cole no chat com o Claude.' : 'Não consegui copiar. Selecione suas anotações e copie manualmente.'); return false; };
  UI.IN.ltn = (i, el) => { const t = S.tasks[i] || { s: 0, n: '' }; t.n = el.value; S.tasks[i] = t; UI.salvarLogo(); };
  AC.lqstart = () => { LQ = { i: 0, sc: 0, r: null }; };
  AC.lqans = i => { const k = +i; LQ.r = k; if (k === Q[LQ.i].a) LQ.sc++; };
  AC.lqnext = () => { LQ.i++; LQ.r = null; if (LQ.i >= Q.length && LQ.sc > S.best) { S.best = LQ.sc; UI.salvar(); } };
  document.addEventListener('input', e => { if (e.target.id === 'laq') { AQ = e.target.value; document.getElementById('al').innerHTML = alist(); } });
})();

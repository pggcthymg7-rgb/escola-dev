/* Telas do curso: início (painel), mapa do curso, módulo e leitor de aula. */
(function () {
  const reg = Escola, M = EscolaMotor, Arm = EscolaArm, UI = window.UI, S = UI.S, esc = UI.esc, T = UI.telas, AC = UI.AC;
  const ICONE = { bloqueado: '🔒', disponivel: '○', andamento: '◐', concluido: '✓', construcao: '🛠' };
  const ROTULO = { bloqueado: 'Bloqueado', disponivel: 'Disponível', andamento: 'Em andamento', concluido: 'Concluído', construcao: 'Em construção' };
  const ICONE_MOD = { demo: '🧪', m00: '🧭', m01: '💻', m02: '⚡', m03: '🎨', m04: '🛰️', m05: '🗄️', m06: '🌳', m07: '🚀', m08: '🛡️', m09: '🔬', m10: '🤖' };
  const PREFIXO = { aula: 'Aula', teste: 'Teste de bloco', trabalho: 'Trabalho do módulo', prova: 'Prova do módulo' };

  UI.est = estado => '<span class="est ' + estado + '" aria-hidden="true">' + ICONE[estado] + '</span>';
  UI.pill = estado => '<span class="pill ' + (estado === 'concluido' ? 'ok' : estado === 'andamento' || estado === 'disponivel' ? '' : estado === 'bloqueado' ? 'w' : 'g') + '">' + ROTULO[estado] + '</span>';
  UI.tituloItem = it => it.k === 'aula' ? (reg.aulas[it.id] || {}).titulo : ((reg.atividades[it.id] || {}).titulo || PREFIXO[it.k]);
  UI.faltas = lista => lista && lista.length ? '<ul class="falta">' + lista.map(f => '<li>' + esc(f) + '</li>').join('') + '</ul>' : '';
  UI.abrir = (k, id) => k === 'aula' ? UI.ir('aula', { id }) : UI.ir('ativ', { id });
  AC.abrir = i => { const [k, id] = i.split(':'); UI.abrir(k, id); return 'nav'; };

  function subtitulo(it) {
    if (it.k === 'aula') {
      const a = reg.aulas[it.id], p = M.tarefaProgresso(a, S);
      return a.min + ' min · ' + (M.aulaLida(a, S) ? 'lida' : 'não lida') + ' · tarefa ' + p.feitas + '/' + p.total;
    }
    const n = M.tentativas(S, it.id).length, b = M.melhorNota(S, it.id);
    return (S.em && S.em[it.id] ? 'Tentativa em andamento · ' : '') + (n ? 'melhor nota ' + UI.nota(b) + ' · ' + n + (n === 1 ? ' tentativa' : ' tentativas') : 'nenhuma tentativa ainda');
  }
  function linhaItem(it) {
    const tit = UI.tituloItem(it);
    const nome = it.k === 'aula' ? 'Aula: ' + tit : PREFIXO[it.k];
    const sub = it.k === 'aula' ? subtitulo(it) : tit + ' · ' + subtitulo(it);
    const corpo = '<span>' + UI.est(it.estado) + '</span><span style="flex:1"><b>' + esc(nome) + '</b><span class="mu">' + esc(sub) + '</span>' + UI.faltas(it.falta) + '</span>' + (it.estado === 'bloqueado' ? '' : UI.pill(it.estado));
    return it.estado === 'bloqueado' ? '<div class="it bloqueado" aria-label="Bloqueado">' + corpo + '</div>'
      : '<button class="it ' + it.estado + '" data-a="abrir" data-i="' + it.k + ':' + it.id + '">' + corpo + '</button>';
  }

  /* ---------- início ---------- */
  T.home = () => {
    const c = UI.calc(), prog = M.progressoCurso(reg, S), fila = M.filaRevisao(reg, S).length;
    let h = '<h1>Escola Dev</h1><p class="mu">Sua jornada para virar um vibe coder consciente.</p>' + (UI.heroi ? UI.heroi() : '');
    if (UI.avisoCarga) h += '<div class="aviso" role="alert">' + esc(UI.avisoCarga) + '</div>';
    if (Arm.falhou) h += '<div class="aviso" role="alert"><b>Não consegui salvar.</b> O armazenamento deste navegador está cheio ou bloqueado. Faça um backup agora em Mais.</div>';
    if (Arm.precisaBackup(S)) h += '<div class="aviso"><b>Hora de fazer backup.</b> Faz ' + Arm.diasSemBackup(S) + ' dias desde o último. Seu progresso fica só neste aparelho. <button class="btn s" data-a="nav" data-i="mais">Ir para Backup</button></div>';
    if ((UI.falhas || []).length) h += '<div class="aviso" role="alert"><b>Alguns arquivos de conteúdo não carregaram</b> (sem internet e fora do cache?): ' + esc(UI.falhas.join(', ')) + '. Abra a escola com internet uma vez.</div>';
    h += '<div class="card" id="meta">' + UI.meta() + '</div>';
    const p = c.proximo || c.proximoDemo;
    if (p) {
      const demo = !c.proximo;
      h += '<div class="card destaque"><span class="pill w">Próximo passo' + (demo ? ' (demonstração)' : '') + '</span><h3>' + esc(PREFIXO[p.k] + (p.k === 'aula' ? ': ' + UI.tituloItem(p) : '')) + '</h3><p class="mu">' + esc(subtitulo(p)) + '</p><button class="btn s" data-a="abrir" data-i="' + p.k + ':' + p.id + '">' + (p.estado === 'andamento' ? 'Continuar' : 'Começar') + '</button></div>';
    }
    const reais = c.modulos.filter(m => !m.demo);
    const atual = reais.find(m => m.itens.length && m.estado !== 'concluido');
    h += '<div class="card"><div class="row sp"><b>Progresso do curso</b><span class="pill">' + prog.pct + '%</span></div><div class="bar" style="margin-top:10px"><i style="width:' + prog.pct + '%"></i></div>';
    if (!prog.total) h += '<p class="mu" style="margin:8px 0 0">O conteúdo dos módulos ainda está sendo construído (Marco 2). Enquanto isso, teste o motor no módulo de demonstração e estude o material anterior.</p>';
    else { h += '<p class="mu" style="margin:8px 0 0">' + prog.feitos + ' de ' + prog.total + ' itens concluídos.</p>';
      if (atual) h += '<div style="margin-top:10px"><div class="row sp"><span>' + esc(atual.titulo) + '</span><span class="mu">' + atual.concluidos + '/' + atual.itens.length + '</span></div><div class="bar"><i style="width:' + (100 * atual.concluidos / atual.itens.length) + '%"></i></div></div>'; }
    h += '</div>';
    if (fila) h += '<div class="card"><span class="pill w">Revisão</span><h3>' + fila + (fila === 1 ? ' questão errada na fila' : ' questões erradas na fila') + '</h3><button class="btn s" data-a="nav" data-i="rev">Revisar agora</button></div>';
    const legPct = UI.pctLegado ? UI.pctLegado() : 0;
    h += '<div class="card"><b>Material anterior</b><p class="mu">Lições, tarefas e prova da primeira versão da escola. Seu progresso nelas foi mantido (' + legPct + '%).</p><button class="btn s g" data-a="nav" data-i="leg">Abrir material anterior</button></div>';
    h += '<p class="versao">Escola Dev, versão ' + esc(reg.VERSAO) + '</p>';
    return h;
  };
  UI.AC.nav = i => { UI.ir(i, {}); return 'nav'; };

  /* ---------- mapa do curso ---------- */
  T.curso = () => {
    const c = UI.calc();
    let h = '<h1>Mapa do curso</h1><p class="mu">Cada ilha abre quando você domina a anterior. Ilhas com cadeado dizem o que falta.</p>';
    const parada = m => '<div class="parada ' + m.estado + '"><span class="marco" aria-hidden="true">' + (m.estado === 'concluido' ? '🏁' : m.estado === 'bloqueado' ? '🔒' : m.estado === 'construcao' ? '🛠️' : (ICONE_MOD[m.id] || '📘')) + '</span>' + card(m) + '</div>';
    const card = m => {
      const mod = reg.modulo(m.id), pronto = m.itens.length > 0;
      const conteudo = '<div class="row sp"><b>' + esc(m.titulo) + '</b>' + UI.pill(m.estado) + '</div>' +
        (pronto ? '<div class="bar" style="margin:8px 0"><i style="width:' + (100 * m.concluidos / m.itens.length) + '%"></i></div><div class="mu">' + m.concluidos + ' de ' + m.itens.length + ' itens concluídos</div>' + (m.estado === 'bloqueado' ? UI.faltas(m.falta) : '')
          : '<div class="mu">Previsto: ' + (mod.metaAulas || '?') + ' aulas. Trabalho: ' + esc(mod.trabalhoPrevisto || '') + '</div>');
      if (m.demo) return '<button class="card item" data-a="modulo" data-i="' + m.id + '">' + conteudo + '<p class="mu" style="margin:8px 0 0">' + esc(mod.descricao || '') + '</p></button>';
      return pronto ? '<button class="card item" data-a="modulo" data-i="' + m.id + '">' + conteudo + '</button>' : '<div class="card">' + conteudo + '</div>';
    };
    const demo = c.modulos.find(m => m.demo);
    if (demo) h += '<h2>Teste o motor</h2><div class="mapa">' + parada(demo) + '</div>';
    h += '<h2>A trilha</h2><div class="mapa">' + c.modulos.filter(m => !m.demo).map(parada).join('') + '<div class="parada fim"><span class="marco" aria-hidden="true">🚀</span><div class="card"><b>Vibe coder consciente</b><div class="mu">O fim da trilha: você entende, define, pede, confere e audita o que constrói.</div></div></div></div>';
    h += '<h2>Material anterior</h2><button class="card item" data-a="nav" data-i="leg"><b>Lições, tarefas e prova da primeira versão</b><div class="mu">Continuam abertas até o Módulo 0.0 novo entrar.</div></button>';
    return h;
  };
  AC.modulo = i => { UI.ir('mod', { id: i }); return 'nav'; };

  /* ---------- módulo ---------- */
  T.mod = ({ id }) => {
    const c = UI.calc(), m = c.modulos.find(x => x.id === id), mod = reg.modulo(id);
    if (!m || !m.itens.length) return '<button class="btn g s" data-a="nav" data-i="curso">Voltar ao curso</button><p>Este módulo ainda não tem conteúdo.</p>';
    let h = '<button class="btn g s" data-a="nav" data-i="curso">Voltar ao curso</button><h1 style="margin-top:14px">' + esc(m.titulo) + '</h1><div class="row"><span class="pill ' + (m.estado === 'concluido' ? 'ok' : '') + '">' + ROTULO[m.estado] + '</span><span class="mu">' + m.concluidos + ' de ' + m.itens.length + ' itens concluídos</span></div>';
    if (m.demo) h += '<div class="aviso">' + esc(mod.descricao) + '</div>';
    if (m.estado === 'bloqueado') h += '<div class="aviso">' + UI.faltas(m.falta) + '</div>';
    let blocoAtual = null, n = 0;
    m.itens.forEach(it => {
      if (it.bloco && it.bloco !== blocoAtual) { blocoAtual = it.bloco; n++; h += '<h2>Bloco ' + n + '</h2>'; }
      if (!it.bloco && blocoAtual !== '') { blocoAtual = ''; h += '<h2>Fechamento do módulo</h2>'; }
      h += linhaItem(it);
    });
    return h;
  };

  /* ---------- leitor de aula ---------- */
  function vizinhas(a) {
    const mod = reg.modulo(a.modulo), seq = M.sequencia(reg, mod).filter(i => i.k === 'aula'), k = seq.findIndex(i => i.id === a.id);
    return { k, total: seq.length, ant: seq[k - 1], prox: seq[k + 1] };
  }
  function secaoReferencias(a) {
    if (!(a.referencias || []).length) return '<p class="mu">Esta aula de demonstração não tem referências.</p>';
    return a.referencias.map(r => '<div class="card"><b>' + esc(r.titulo) + '</b><div class="mu">' + esc(r.autor) + ', ' + esc(r.ano) + ' · ' + esc(r.tipo) + ' · ' + esc(r.idioma) + '</div><p style="margin:6px 0"><b>O que ler:</b> ' + esc(r.ler) + '</p><div class="row"><a href="' + esc(r.link) + '" target="_blank" rel="noopener noreferrer">Abrir link</a><span class="pill w">requer internet</span>' + (r.naoVerificado ? '<span class="pill w">[não verificado]</span>' : '<span class="cnt">verificado em ' + esc(r.verificado) + '</span>') + '</div></div>').join('');
  }
  function secaoAprofundar(a) {
    if (!(a.aprofundar || []).length) return '';
    return '<h2 id="aprofundar">Para aprofundar <span class="pill g">opcional</span> <span class="pill w">requer internet</span></h2><p class="mu">Não conta para o progresso e não libera nada.</p>' +
      a.aprofundar.map(r => '<div class="card"><b>' + esc(r.titulo) + '</b><div class="mu">' + esc(r.autor) + ' · ' + esc(r.duracao) + ' · ' + esc(r.idioma) + '</div><p style="margin:6px 0">' + esc(r.porque) + '</p><a href="' + esc(r.link) + '" target="_blank" rel="noopener noreferrer">Abrir</a></div>').join('');
  }
  T.aula = ({ id }) => {
    const a = reg.aulas[id]; if (!a) return '<button class="btn g s" data-a="nav" data-i="curso">Voltar</button><p>Aula não encontrada.</p>';
    const st = UI.calc().itens[id];
    const voltar = '<button class="btn g s" data-a="modulo" data-i="' + a.modulo + '">Voltar ao módulo</button>';
    if (st && st.estado === 'bloqueado') return voltar + '<h1 style="margin-top:14px">🔒 ' + esc(a.titulo) + '</h1><div class="aviso"><b>Esta aula ainda está bloqueada.</b>' + UI.faltas(st.falta) + '</div>';
    const v = vizinhas(a), p = M.tarefaProgresso(a, S), lida = M.aulaLida(a, S);
    const indice = [['objetivos', 'Objetivos']].concat(a.partes.map(x => ['parte-' + x.n, x.n + '. ' + x.titulo]), [['resumo', 'Resumo'], ['referencias', 'Referências'], ['tarefa', 'Tarefa da aula']]);
    let h = '<div class="leitura" aria-hidden="true"><i id="leitura-i"></i></div>' + voltar +
      '<h1 style="margin-top:14px">' + esc(a.titulo) + '</h1><p class="mu">Aula ' + (v.k + 1) + ' de ' + v.total + ' · cerca de ' + a.min + ' min · ' + (lida ? 'lida' : 'não lida') + ' · tarefa ' + p.feitas + '/' + p.total + '</p>' +
      '<details class="card ind"><summary>Índice da aula</summary>' + indice.map(x => '<button data-a="ancora" data-i="' + x[0] + '">' + esc(x[1]) + '</button>').join('') + '</details>' +
      '<div class="obj-box" id="objetivos"><b>Ao final você será capaz de:</b><ul>' + a.objetivos.map(o => '<li>' + esc(o) + '</li>').join('') + '</ul></div><div class="read">';
    a.partes.forEach(x => {
      h += '<h2 id="parte-' + x.n + '">' + x.n + '. ' + esc(x.titulo) + '</h2>';
      if (x.n === 10) h += x.termos.length ? '<ul>' + x.termos.map(t => { const g = reg.G.find(y => y[0] === t); return '<li><b>' + esc(t) + ':</b> ' + esc(g ? g[1] : '') + '</li>'; }).join('') + '</ul><p class="mu">Estes termos já estão no glossário.</p>' : '<p class="mu">Esta aula de demonstração não soma termos novos.</p>';
      else h += x.html;
    });
    h += '</div><h2 id="resumo">Resumo</h2><ul>' + a.resumo.map(r => '<li>' + esc(r) + '</li>').join('') + '</ul><h2 id="referencias">Referências</h2>' + secaoReferencias(a) + secaoAprofundar(a);
    h += '<h2 id="tarefa">Tarefa da aula</h2><div class="card"><div class="row sp"><b>' + (M.tarefaCompleta(a, S) ? 'Tarefa 100% respondida ✓' : p.feitas + ' de ' + p.total + ' respondidas') + '</b></div><div class="bar" style="margin:8px 0"><i style="width:' + (p.total ? 100 * p.feitas / p.total : 0) + '%"></i></div><button class="btn s" data-a="tarefa" data-i="' + a.id + '">' + (p.feitas ? 'Continuar a tarefa' : 'Abrir a tarefa') + '</button></div>';
    h += '<h2>Minhas anotações desta aula</h2><textarea data-in="anot" data-i="' + a.id + '" placeholder="Anote o que entendeu e o que ficou em dúvida. Salva sozinho." aria-label="Anotações da aula">' + esc(S.anot[a.id] || '') + '</textarea>';
    h += '<div class="card" style="margin-top:16px"><button class="btn" data-a="lida" data-i="' + a.id + '">' + (lida ? 'Aula lida ✓ (desfazer)' : 'Marcar como lida') + '</button><p class="mu" style="margin:8px 0 0">A próxima aula abre quando esta estiver lida e a tarefa 100% respondida.</p></div>';
    const prox = v.prox && UI.calc().itens[v.prox.id];
    h += '<div class="row sp" style="margin-top:14px">' + (v.ant ? '<button class="btn g s" data-a="abrir" data-i="aula:' + v.ant.id + '">Anterior</button>' : '<span></span>') + (v.prox ? (prox && prox.estado !== 'bloqueado' ? '<button class="btn g s" data-a="abrir" data-i="aula:' + v.prox.id + '">Próxima</button>' : '<span class="mu">🔒 Próxima aula bloqueada</span>') : '') + '</div>';
    if (prox && prox.estado === 'bloqueado') h += UI.faltas(prox.falta);
    const mod = UI.calc().modulos.find(m => m.id === a.modulo), ult = !v.prox;
    if (ult) { const prox2 = mod.itens.find(i => i.k !== 'aula' && i.estado !== 'concluido'); if (prox2) h += '<p class="mu">Depois desta aula: ' + esc(PREFIXO[prox2.k]) + '.</p>'; }
    return h;
  };
  AC.ancora = i => { const e = document.getElementById(i); if (e) e.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' }); const d = document.querySelector('details.ind'); if (d) d.open = false; return false; };
  AC.lida = i => { if (S.lidas[i]) delete S.lidas[i]; else S.lidas[i] = Date.now(); UI.salvar(); };
  AC.tarefa = i => { UI.ir('tarefa', { id: i }); return 'nav'; };
  UI.IN.anot = (i, el) => { S.anot[i] = el.value; UI.salvarLogo(); };
})();

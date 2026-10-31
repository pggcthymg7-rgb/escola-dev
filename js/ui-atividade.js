/* Tarefas da aula, testes de bloco, trabalhos, provas, dissertativas e fila de revisão. */
(function () {
  const reg = Escola, M = EscolaMotor, UI = window.UI, S = UI.S, esc = UI.esc, T = UI.telas, AC = UI.AC;
  const TIPO = { teste: 'Teste de bloco', trabalho: 'Trabalho do módulo', prova: 'Prova do módulo' };
  const letra = k => String.fromCharCode(65 + k);
  UI.mostrar = {};   // respostas-modelo abertas na tarefa (só na tela, não é salvo)

  UI.achaDis = id => {
    for (const a of Object.values(reg.aulas)) {
      const t = a.tarefa || {};
      for (const q of (t.dis || [])) if (q.id === id) return q;
      for (const q of ((t.pratica || {}).perguntas || [])) if (q.id === id) return q;
    }
    for (const v of Object.values(reg.atividades)) for (const q of (v.dis || [])) if (q.id === id) return q;
    return null;
  };
  // Texto pronto para colar na conversa com o Professor.
  UI.textoRevisao = (q, resposta, marcados) => {
    let t = 'Professor, peço sua correção desta resposta.\n\nQuestão: ' + q.q + '\n\nMinha resposta:\n' + (resposta || '(sem resposta)') + '\n';
    if (q.modelo) t += '\nResposta-modelo:\n' + q.modelo + '\n\nCritérios:\n' + q.criterios.map((c, i) => (i + 1) + '. ' + c).join('\n') + '\n';
    if (marcados) t += '\nCritérios que marquei como cumpridos: ' + (q.criterios.map((c, i) => marcados[i] ? i + 1 : null).filter(Boolean).join(', ') || 'nenhum') + '\n';
    return t + '\nDiga o que acertei, o que faltou e por quê.';
  };
  const bloqueio = (titulo, falta, volta) => '<button class="btn g s" data-a="nav" data-i="curso">Voltar ao curso</button><h1 style="margin-top:14px">🔒 ' + esc(titulo) + '</h1><div class="aviso"><b>Ainda está bloqueado.</b>' + UI.faltas(falta) + '</div>';
  const contador = (n, min) => '<span class="cnt ' + (n >= min ? 'ok' : '') + '">' + n + ' de ' + min + ' caracteres mínimos' + (n >= min ? ' ✓' : '') + '</span>';
  const opcoes = (q, sel, travado, ativo) => q.o.map((o, k) => {
    const cls = travado ? (k === q.a ? 'ok' : k === sel ? 'no' : '') : (k === sel ? 'sel' : '');
    return '<button class="opt ' + cls + '" data-a="' + ativo.acao + '" data-i="' + ativo.base + '|' + k + '" ' + (travado ? 'disabled' : '') + ' aria-pressed="' + (k === sel) + '"><b>' + letra(k) + '.</b> ' + esc(o) + '</button>';
  }).join('');

  /* =================== TAREFA DA AULA =================== */
  function progTarefa(a) {
    const p = M.tarefaProgresso(a, S);
    return '<div class="row sp"><b>' + (p.feitas === p.total ? 'Tarefa 100% respondida ✓' : p.feitas + ' de ' + p.total + ' respondidas') + '</b></div><div class="bar" style="margin-top:8px"><i style="width:' + (100 * p.feitas / p.total) + '%"></i></div>';
  }
  function dissertativaTarefa(q, n, modeloOk) {
    const r = S.resp[q.id] || '', ok = r.trim().length >= q.min, aberto = UI.mostrar[q.id];
    let h = '<div class="q"><p><b>' + n + '. ' + esc(q.q) + '</b></p><textarea data-in="tdis" data-i="' + q.id + '" aria-label="Sua resposta" placeholder="Escreva com suas palavras. Salva sozinho.">' + esc(r) + '</textarea><div class="row sp"><span id="cnt_' + q.id + '">' + contador(r.trim().length, q.min) + '</span>';
    if (modeloOk) h += '<button class="btn s g" id="cmp_' + q.id + '" data-a="tmodelo" data-i="' + q.id + '" ' + (ok ? '' : 'hidden') + '>' + (aberto ? 'Esconder a resposta-modelo' : 'Comparar com a resposta-modelo') + '</button>';
    h += '</div>';
    if (modeloOk && aberto && ok) h += '<div class="modelo"><b>Resposta-modelo</b><p>' + esc(q.modelo) + '</p><b>Critérios para comparar</b><ul>' + q.criterios.map(c => '<li>' + esc(c) + '</li>').join('') + '</ul><p class="mu" style="margin:0">Na tarefa não há nota: use isto para se corrigir.</p><button class="btn s g" style="margin-top:8px" data-a="prev" data-i="r|' + q.id + '">Pedir revisão ao Professor</button><span class="cnt" id="rev_' + q.id + '"></span></div>';
    return h + '</div>';
  }
  T.tarefa = ({ id }) => {
    const a = reg.aulas[id]; if (!a) return '<p>Aula não encontrada.</p>';
    const st = UI.calc().itens[id]; if (st && st.estado === 'bloqueado') return bloqueio('Tarefa: ' + a.titulo, st.falta);
    const t = a.tarefa, pr = t.pratica;
    let n = 0, h = '<button class="btn g s" data-a="abrir" data-i="aula:' + a.id + '">Voltar à aula</button><h1 style="margin-top:14px">Tarefa: ' + esc(a.titulo) + '</h1><p class="mu">Responda tudo, na página. Salva sozinho. Sem nota: os erros alimentam a Revisão.</p><div class="card" id="tprog">' + progTarefa(a) + '</div>';
    if ((t.obj || []).length) h += '<h2>Questões objetivas</h2>';
    (t.obj || []).forEach(q => {
      n++; const sel = S.resp[q.id], feito = Number.isInteger(sel);
      h += '<div class="q"><p><b>' + n + '. ' + esc(q.q) + '</b></p>' + opcoes(q, sel, feito, { acao: 'tobj', base: q.id }) +
        (feito ? '<div class="card"><b>' + (sel === q.a ? 'Certo.' : 'Não foi essa.') + '</b> ' + esc(q.e) + '</div>' : '') + '</div>';
    });
    if ((t.dis || []).length) h += '<h2>Questões dissertativas</h2>';
    (t.dis || []).forEach(q => { n++; h += dissertativaTarefa(q, n, true); });
    if (pr) { h += '<h2>Exercício prático</h2><div class="card"><p>' + pr.instrucao + '</p></div>'; pr.perguntas.forEach(q => { n++; h += dissertativaTarefa(q, n, false); }); }
    const completa = M.tarefaCompleta(a, S), lida = M.aulaLida(a, S);
    h += '<div id="tfim">' + fimTarefa(a, completa, lida) + '</div>';
    return h;
  };
  function fimTarefa(a, completa, lida) {
    if (!completa) return '';
    const mod = reg.modulo(a.modulo), seq = M.sequencia(reg, mod).filter(i => i.k === 'aula'), k = seq.findIndex(i => i.id === a.id), prox = seq[k + 1];
    let h = '<div class="card"><b>Tarefa completa ✓</b>';
    if (!lida) h += '<p class="mu">Falta marcar a aula como lida para liberar a próxima.</p><button class="btn s" data-a="abrir" data-i="aula:' + a.id + '">Ir para a aula</button>';
    else if (prox) h += '<p class="mu">Aula concluída. A próxima está liberada.</p><button class="btn s" data-a="abrir" data-i="aula:' + prox.id + '">Próxima aula</button>';
    else h += '<p class="mu">Aula concluída. Veja o próximo passo no módulo.</p><button class="btn s" data-a="modulo" data-i="' + a.modulo + '">Ver o módulo</button>';
    return h + '</div>';
  }
  AC.tobj = (i, el) => {
    const [qid, k] = i.split('|'); if (Number.isInteger(S.resp[qid])) return false;
    S.resp[qid] = +k; const q = reg.questao(qid); if (q && +k !== q.a) M.registrarErro(S, qid, q.aula); UI.salvar();
  };
  AC.tmodelo = i => { UI.mostrar[i] = !UI.mostrar[i]; };
  UI.IN.tdis = (qid, el) => {
    S.resp[qid] = el.value; UI.salvarLogo();
    const q = UI.achaDis(qid), n = el.value.trim().length;
    const c = document.getElementById('cnt_' + qid); if (c) c.innerHTML = contador(n, q.min);
    const b = document.getElementById('cmp_' + qid); if (b) b.hidden = n < q.min;
    const aula = Object.values(reg.aulas).find(a => M.itensTarefa(a).some(x => x.q.id === qid)); if (!aula) return;
    document.getElementById('tprog').innerHTML = progTarefa(aula);
    document.getElementById('tfim').innerHTML = fimTarefa(aula, M.tarefaCompleta(aula, S), M.aulaLida(aula, S));
  };
  AC.prev = async (i, el) => {
    const [src, ...resto] = i.split('|'); let q, resp, marc, alvo;
    if (src === 'r') { q = UI.achaDis(resto[0]); resp = S.resp[q.id]; alvo = 'rev_' + q.id; }
    else if (src === 'e') { q = UI.achaDis(resto[1]); const d = S.em[resto[0]].d[q.id]; resp = d.txt; marc = d.av ? d.crit : null; alvo = 'rev_' + q.id; }
    else { q = UI.achaDis(resto[2]); const d = S.tent[resto[0]][+resto[1]].dis.find(x => x.id === q.id); resp = d.txt; marc = d.crit; alvo = 'rev_' + q.id; }
    const ok = await UI.copiar(UI.textoRevisao(q, resp, marc));
    UI.msg(alvo, ok ? ' Copiado. Cole na conversa com o Professor.' : ' Não consegui copiar. Selecione o texto e copie manualmente.');
    return false;
  };

  /* =================== TESTE, TRABALHO E PROVA =================== */
  const aulaTit = id => (reg.aulas[id] || {}).titulo || id;
  T.ativ = ({ id, res }) => {
    const atv = reg.atividades[id]; if (!atv) return '<p>Atividade não encontrada.</p>';
    const st = UI.calc().itens[id]; if (st && st.estado === 'bloqueado') return bloqueio(TIPO[atv.tipo], st.falta);
    if (res != null && S.tent[id] && S.tent[id][res]) return resultado(atv, res);
    if (S.em[id]) return andamento(atv, S.em[id]);
    return intro(atv);
  };
  function intro(atv) {
    const n = M.sorteio(atv), tent = M.tentativas(S, atv.id), melhor = M.melhorNota(S, atv.id);
    let h = '<button class="btn g s" data-a="modulo" data-i="' + atv.modulo + '">Voltar ao módulo</button><h1 style="margin-top:14px">' + esc(TIPO[atv.tipo]) + '</h1><p class="mu">' + esc(atv.titulo) + '</p>';
    h += '<div class="card"><ul style="margin:0;padding-left:1.2em"><li>' + (atv.tipo === 'trabalho' ? n.dis + ' perguntas de entrega, avaliadas pelos critérios.' : n.obj + ' objetivas e ' + n.dis + (n.dis === 1 ? ' dissertativa' : ' dissertativas') + ', sorteadas de um banco.') + '</li><li>Nota mínima para aprovar: <b>7,0</b>.</li><li>Sem limite de tentativas. Cada tentativa sorteia questões diferentes.</li><li>' + (atv.tipo === 'trabalho' ? 'A nota é a média das perguntas.' : 'Objetivas valem 60% e dissertativas 40%.') + '</li><li>Tudo salva sozinho; você pode parar e continuar depois.</li></ul></div>';
    if (atv.tipo === 'trabalho') h += '<h2>Roteiro</h2><ol>' + atv.roteiro.map(r => '<li>' + r + '</li>').join('') + '</ol>';
    if (melhor != null) h += '<div class="card"><div class="row sp"><b>Melhor nota: ' + UI.nota(melhor) + '</b><span class="pill ' + (M.aprovada(melhor) ? 'ok' : 'w') + '">' + (M.aprovada(melhor) ? 'Aprovado' : 'Ainda não aprovado') + '</span></div></div>';
    if (tent.length) h += '<h2>Tentativas</h2>' + tent.map((t, k) => '<button class="card item" data-a="res" data-i="' + atv.id + '|' + k + '"><div class="row sp"><span><b>Tentativa ' + (k + 1) + '</b> · ' + UI.data(t.ts) + '</span><span class="pill ' + (M.aprovada(t.nota) ? 'ok' : 'w') + '">' + UI.nota(t.nota) + '</span></div></button>').reverse().join('');
    h += '<p style="margin-top:14px"><button class="btn" data-a="iniciar" data-i="' + atv.id + '">' + (tent.length ? 'Nova tentativa' : 'Começar') + '</button></p>';
    return h;
  }
  AC.iniciar = i => { S.em[i] = M.novaTentativa(reg.atividades[i], S); UI.salvar(); UI.U.p = { id: i }; window.scrollTo(0, 0); };
  AC.res = i => { const [id, k] = i.split('|'); UI.ir('ativ', { id, res: +k }); return 'nav'; };
  AC.descartar = i => { if (confirm('Descartar esta tentativa? As respostas dela serão perdidas.')) { delete S.em[i]; UI.salvar(); } else return false; };

  function andamento(atv, em) {
    const objs = em.obj.map(id => atv.obj.find(q => q.id === id)), diss = em.dis.map(id => atv.dis.find(q => q.id === id));
    const nOk = em.obj.filter(id => Number.isInteger(em.r[id])).length, dOk = em.dis.filter(id => em.d[id] && em.d[id].env && em.d[id].av).length;
    let n = 0, h = '<button class="btn g s" data-a="modulo" data-i="' + atv.modulo + '">Voltar ao módulo</button><h1 style="margin-top:14px">' + esc(TIPO[atv.tipo]) + ': tentativa em andamento</h1>' +
      '<div class="card"><b>' + nOk + ' de ' + objs.length + ' objetivas · ' + dOk + ' de ' + diss.length + ' dissertativas concluídas</b><div class="bar" style="margin-top:8px"><i style="width:' + (100 * (nOk + dOk) / Math.max(1, objs.length + diss.length)) + '%"></i></div><p class="mu" style="margin:8px 0 0">O gabarito aparece depois de concluir. Você pode trocar as objetivas até concluir.</p></div>';
    if (atv.tipo === 'trabalho') h += '<h2>Roteiro</h2><ol>' + atv.roteiro.map(r => '<li>' + r + '</li>').join('') + '</ol>';
    if (objs.length) h += '<h2>Questões objetivas</h2>';
    objs.forEach(q => { n++; h += '<div class="q"><p><b>' + n + '. ' + esc(q.q) + '</b></p>' + opcoes(q, em.r[q.id], false, { acao: 'eobj', base: atv.id + '|' + q.id }) + '</div>'; });
    if (diss.length) h += '<h2>' + (atv.tipo === 'trabalho' ? 'Perguntas de entrega' : 'Questões dissertativas') + '</h2>';
    diss.forEach(q => {
      n++; const d = em.d[q.id] || { txt: '', env: false, av: false, crit: [] };
      h += '<div class="q"><p><b>' + n + '. ' + esc(q.q) + '</b></p>';
      if (!d.env) h += '<textarea data-in="edis" data-i="' + atv.id + '|' + q.id + '" aria-label="Sua resposta" placeholder="Escreva com suas palavras. Salva sozinho.">' + esc(d.txt) + '</textarea><div class="row sp"><span id="cnt_' + q.id + '">' + contador(d.txt.trim().length, q.min) + '</span><button class="btn s" id="env_' + q.id + '" data-a="eenv" data-i="' + atv.id + '|' + q.id + '" ' + (d.txt.trim().length >= q.min ? '' : 'disabled') + '>Enviar resposta</button></div><p class="mu">Depois de enviar, a resposta não pode ser editada.</p>';
      else {
        h += '<div class="modelo"><b>Sua resposta (enviada)</b><p style="white-space:pre-wrap;margin:6px 0 0">' + esc(d.txt) + '</p></div><div class="modelo"><b>Resposta-modelo</b><p style="margin:6px 0 0">' + esc(q.modelo) + '</p></div>' +
          '<p><b>' + (d.av ? 'Critérios que você cumpriu' : 'Marque os critérios que sua resposta cumpriu') + '</b></p>' +
          q.criterios.map((c, k) => '<label class="crit"><input type="checkbox" data-ch="ecrit" data-i="' + atv.id + '|' + q.id + '|' + k + '" ' + ((d.crit || [])[k] ? 'checked' : '') + ' ' + (d.av ? 'disabled' : '') + '><span>' + esc(c) + '</span></label>').join('');
        if (!d.av) h += '<button class="btn s" data-a="eav" data-i="' + atv.id + '|' + q.id + '">Confirmar autoavaliação</button>';
        else h += '<p class="cnt ok">Autoavaliação confirmada: ' + UI.nota(M.notaDisQuestao(q.criterios.map((_, k) => !!d.crit[k]))) + ' de 10.</p>';
        h += ' <button class="btn s g" data-a="prev" data-i="e|' + atv.id + '|' + q.id + '">Pedir revisão ao Professor</button><span class="cnt" id="rev_' + q.id + '"></span>';
      }
      h += '</div>';
    });
    h += '<div class="card" style="margin-top:18px"><button class="btn" data-a="concluir" data-i="' + atv.id + '" ' + (M.prontaParaFinalizar(em) ? '' : 'disabled') + '>Concluir tentativa</button>' + (M.prontaParaFinalizar(em) ? '' : '<p class="mu" style="margin:8px 0 0">Para concluir: marque todas as objetivas e envie e autoavalie todas as dissertativas.</p>') + '<p style="margin:10px 0 0"><button class="btn s g" data-a="descartar" data-i="' + atv.id + '">Descartar tentativa</button></p></div>';
    return h;
  }
  AC.eobj = i => { const [id, qid, k] = i.split('|'); S.em[id].r[qid] = +k; UI.salvar(); };
  UI.IN.edis = (i, el) => {
    const [id, qid] = i.split('|'), em = S.em[id], q = reg.atividades[id].dis.find(x => x.id === qid);
    em.d[qid] = em.d[qid] || { txt: '', env: false, av: false, crit: [] }; em.d[qid].txt = el.value; UI.salvarLogo();
    const n = el.value.trim().length; document.getElementById('cnt_' + qid).innerHTML = contador(n, q.min); document.getElementById('env_' + qid).disabled = n < q.min;
  };
  AC.eenv = i => { const [id, qid] = i.split('|'), d = S.em[id].d[qid]; if (!d || d.txt.trim().length < reg.atividades[id].dis.find(x => x.id === qid).min) return false; d.env = true; d.crit = []; UI.salvar(); };
  UI.IN.ecrit = (i, el) => { const [id, qid, k] = i.split('|'); S.em[id].d[qid].crit[+k] = el.checked; UI.salvar(); return false; };
  AC.eav = i => { const [id, qid] = i.split('|'); S.em[id].d[qid].av = true; UI.salvar(); };
  AC.concluir = i => {
    const atv = reg.atividades[i], em = S.em[i]; if (!em || !M.prontaParaFinalizar(em)) return false;
    const f = M.finalizar(reg, atv, em); f.obj.forEach(o => { if (!o.ok) M.registrarErro(S, o.id, (atv.obj.find(q => q.id === o.id) || {}).aula); });
    S.tent[i] = S.tent[i] || []; S.tent[i].push(f); delete S.em[i]; UI.salvar();
    UI.ir('ativ', { id: i, res: S.tent[i].length - 1 }); return 'nav';
  };

  function resultado(atv, idx) {
    const t = S.tent[atv.id][idx], aprov = M.aprovada(t.nota);
    let h = '<button class="btn g s" data-a="abrir" data-i="' + (atv.tipo ? atv.tipo : '') + ':' + atv.id + '">Voltar às tentativas</button><h1 style="margin-top:14px">' + esc(TIPO[atv.tipo]) + ': tentativa ' + (idx + 1) + '</h1><p class="mu">' + UI.data(t.ts) + '</p>';
    h += '<div class="card"><div class="nota ' + (aprov ? 'ok' : 'no') + '">' + UI.nota(t.nota) + '</div><p style="margin:6px 0 0"><b>' + (aprov ? 'Aprovado' : 'Ainda não aprovado') + '</b> · nota mínima 7,0' + (t.notaObj != null ? ' · objetivas ' + UI.nota(t.notaObj) : '') + (t.notaDis != null ? ' · dissertativas ' + UI.nota(t.notaDis) : '') + '</p></div>';
    const erros = t.obj.filter(o => !o.ok), aulas = [...new Set(erros.map(o => (atv.obj.find(q => q.id === o.id) || {}).aula).filter(Boolean))];
    if (aulas.length) h += '<div class="aviso"><b>Releia antes de refazer:</b><ul>' + aulas.map(a => '<li><button class="btn g s" data-a="abrir" data-i="aula:' + a + '">' + esc(aulaTit(a)) + '</button></li>').join('') + '</ul></div>';
    h += '<h2>Gabarito comentado</h2>'; let n = 0;
    t.obj.forEach(o => {
      const q = atv.obj.find(x => x.id === o.id); n++;
      h += '<div class="q"><p><b>' + n + '. ' + esc(q.q) + '</b></p>' + q.o.map((tx, k) => '<div class="opt ' + (k === q.a ? 'ok' : k === o.sel ? 'no' : '') + '" style="cursor:default"><b>' + letra(k) + '.</b> ' + esc(tx) + (k === q.a ? ' ✓' : k === o.sel ? ' (sua resposta)' : '') + '</div>').join('') +
        '<div class="card"><b>' + (o.ok ? 'Você acertou.' : 'Você errou.') + '</b> ' + esc(q.e) + '<div style="margin-top:6px"><button class="btn s g" data-a="abrir" data-i="aula:' + q.aula + '">Aula de origem: ' + esc(aulaTit(q.aula)) + '</button></div></div></div>';
    });
    t.dis.forEach(d => {
      const q = atv.dis.find(x => x.id === d.id); n++;
      h += '<div class="q"><p><b>' + n + '. ' + esc(q.q) + '</b></p><div class="modelo"><b>Sua resposta</b><p style="white-space:pre-wrap;margin:6px 0 0">' + esc(d.txt) + '</p></div><div class="modelo"><b>Resposta-modelo</b><p style="margin:6px 0 0">' + esc(q.modelo) + '</p></div><ul>' + q.criterios.map((c, k) => '<li>' + (d.crit[k] ? '✓ ' : '✗ ') + esc(c) + '</li>').join('') + '</ul><p class="mu">Nota desta questão: ' + UI.nota(d.nota) + '</p><button class="btn s g" data-a="prev" data-i="t|' + atv.id + '|' + idx + '|' + q.id + '">Pedir revisão ao Professor</button><span class="cnt" id="rev_' + q.id + '"></span>' + (q.aula ? ' <button class="btn s g" data-a="abrir" data-i="aula:' + q.aula + '">Aula de origem</button>' : '') + '</div>';
    });
    h += '<p style="margin-top:16px"><button class="btn" data-a="iniciar" data-i="' + atv.id + '">Nova tentativa</button> <button class="btn g" data-a="modulo" data-i="' + atv.modulo + '">Voltar ao módulo</button></p>';
    return h;
  }
  /* =================== FILA DE REVISÃO =================== */
  UI.rev = { sel: null, qid: null };
  T.rev = () => {
    const fila = M.filaRevisao(reg, S);
    let h = '<button class="btn g s" data-a="nav" data-i="gls">Voltar a Termos</button><h1 style="margin-top:14px">Fila de revisão</h1>';
    if (!fila.length && !UI.rev.qid) return h + '<div class="card"><p>Nenhuma questão na fila. Quando você errar uma objetiva, ela aparece aqui para treinar.</p></div>';
    const q = UI.rev.qid ? reg.questao(UI.rev.qid) : fila[0], sel = UI.rev.sel, feito = sel != null;
    h += '<p class="mu">' + fila.length + ' na fila. Acertou, sai da fila. Errou, continua.</p><p><b>' + esc(q.q) + '</b></p>' + opcoes(q, sel, feito, { acao: 'rvr', base: q.id });
    if (feito) h += '<div class="card"><b>' + (sel === q.a ? 'Certo. Saiu da fila.' : 'Não foi essa. Continua na fila.') + '</b> ' + esc(q.e) + (q.aula ? '<div style="margin-top:6px"><button class="btn s g" data-a="abrir" data-i="aula:' + q.aula + '">Reler: ' + esc(aulaTit(q.aula)) + '</button></div>' : '') + '</div><button class="btn" data-a="rvn">Próxima</button>';
    return h;
  };
  AC.rvr = i => { const [qid, k] = i.split('|'); if (UI.rev.sel != null) return false; UI.rev.sel = +k; UI.rev.qid = qid; const q = reg.questao(qid); M.resultadoRevisao(S, qid, +k === q.a); UI.salvar(); };
  AC.rvn = () => { UI.rev.sel = null; UI.rev.qid = null; };
})();

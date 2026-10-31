/* Motor da escola: regras de liberação, notas, sorteio e fila de revisão.
   Funções puras (sem tela): recebem o registro do conteúdo (reg) e o estado do aluno (S). */
(function (raiz) {
  const M = {};
  M.NOTA_MIN = 7;
  M.PESO_OBJ = 0.6;   // objetivas valem 60% e dissertativas 40% (testes e provas)
  M.PESO_DIS = 0.4;
  M.PESO_MEDIA = { prova: 0.5, trabalho: 0.3, testes: 0.2 };
  M.PADRAO = { teste: { obj: 10, dis: 1 }, prova: { obj: 20, dis: 4 }, trabalho: { obj: 0, dis: Infinity } };

  M.arred1 = n => Math.round(n * 10) / 10;
  M.aprovada = nota => nota != null && M.arred1(nota) >= M.NOTA_MIN;
  M.fmt = n => n == null ? '—' : M.arred1(n).toFixed(1).replace('.', ',');

  const tem = (S, k) => (S[k] || {});

  /* ---------- tarefa da aula ---------- */
  M.itensTarefa = aula => {
    const t = aula.tarefa || {};
    return [].concat((t.obj || []).map(q => ({ tipo: 'obj', q })),
      (t.dis || []).map(q => ({ tipo: 'dis', q })),
      ((t.pratica || {}).perguntas || []).map(q => ({ tipo: 'dis', q })));
  };
  M.itemRespondido = (item, S) => {
    const r = tem(S, 'resp')[item.q.id];
    if (item.tipo === 'obj') return Number.isInteger(r);
    return typeof r === 'string' && r.trim().length >= (item.q.min || 1);
  };
  M.tarefaProgresso = (aula, S) => {
    const it = M.itensTarefa(aula);
    return { feitas: it.filter(i => M.itemRespondido(i, S)).length, total: it.length };
  };
  M.tarefaCompleta = (aula, S) => { const p = M.tarefaProgresso(aula, S); return p.total > 0 && p.feitas === p.total; };
  M.aulaLida = (aula, S) => !!tem(S, 'lidas')[aula.id];
  M.aulaConcluida = (aula, S) => M.aulaLida(aula, S) && M.tarefaCompleta(aula, S);
  M.aulaIniciada = (aula, S) => M.aulaLida(aula, S) || M.tarefaProgresso(aula, S).feitas > 0;

  /* ---------- notas ---------- */
  M.tentativas = (S, id) => tem(S, 'tent')[id] || [];
  M.melhorNota = (S, id) => { const t = M.tentativas(S, id); return t.length ? Math.max(...t.map(x => x.nota)) : null; };
  M.notaObj = res => res.length ? 10 * res.filter(r => r.ok).length / res.length : null;
  M.notaDisQuestao = crit => crit.length ? 10 * crit.filter(Boolean).length / crit.length : 0;
  M.notaDis = lista => lista.length ? lista.reduce((s, c) => s + M.notaDisQuestao(c), 0) / lista.length : null;
  M.notaAtividade = (tipo, notaObj, notaDis) => {
    if (notaObj == null && notaDis == null) return null;
    if (notaObj == null) return notaDis;
    if (notaDis == null) return notaObj;
    return notaObj * M.PESO_OBJ + notaDis * M.PESO_DIS;
  };

  /* ---------- sorteio ---------- */
  M.sorteio = atv => {
    const p = M.PADRAO[atv.tipo] || { obj: 0, dis: 0 };
    const s = atv.sorteio || {};
    return { obj: s.obj != null ? s.obj : Math.min(p.obj, (atv.obj || []).length),
             dis: s.dis != null ? s.dis : Math.min(p.dis, (atv.dis || []).length) };
  };
  // Escolhe n itens do banco, dando preferência aos que o aluno ainda não viu (ou viu há mais tempo).
  M.sortear = (banco, n, vistos, rng) => {
    rng = rng || Math.random;
    const ult = {}; (vistos || []).forEach((id, i) => { ult[id] = i; });
    const emb = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(rng() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
    const novos = emb(banco.filter(q => !(q.id in ult)));
    const velhos = emb(banco.filter(q => q.id in ult)).sort((a, b) => ult[a.id] - ult[b.id]);
    return emb(novos.concat(velhos).slice(0, n));
  };
  M.idsVistos = (S, atvId) => {
    const out = [];
    M.tentativas(S, atvId).forEach(t => { (t.obj || []).forEach(o => out.push(o.id)); (t.dis || []).forEach(d => out.push(d.id)); });
    return out;
  };
  M.novaTentativa = (atv, S, rng) => {
    const n = M.sorteio(atv), vistos = M.idsVistos(S, atv.id);
    const obj = M.sortear(atv.obj || [], n.obj, vistos, rng), dis = M.sortear(atv.dis || [], n.dis, vistos, rng);
    return { ts: Date.now(), obj: obj.map(q => q.id), dis: dis.map(q => q.id), r: {}, d: {} };
  };
  // em.r[id] = índice marcado; em.d[id] = { txt, env, av, crit:[bool] }
  M.prontaParaFinalizar = (em) =>
    em.obj.every(id => Number.isInteger(em.r[id])) &&
    em.dis.every(id => em.d[id] && em.d[id].env && em.d[id].av);
  M.finalizar = (reg, atv, em) => {
    const objs = em.obj.map(id => { const q = (atv.obj || []).find(x => x.id === id); return { id, sel: em.r[id], ok: em.r[id] === q.a }; });
    const dis = em.dis.map(id => { const q = (atv.dis || []).find(x => x.id === id); const d = em.d[id];
      const crit = q.criterios.map((_, i) => !!(d.crit || [])[i]); return { id, txt: d.txt, crit, nota: M.notaDisQuestao(crit) }; });
    const nObj = M.notaObj(objs), nDis = dis.length ? M.notaDis(dis.map(d => d.crit)) : null;
    return { ts: Date.now(), nota: M.notaAtividade(atv.tipo, nObj, nDis), notaObj: nObj, notaDis: nDis, obj: objs, dis };
  };

  /* ---------- fila de revisão ---------- */
  M.registrarErro = (S, q, aula) => {
    S.erros = S.erros || {}; const e = S.erros[q] || { n: 0 };
    S.erros[q] = { n: e.n + 1, ultimo: Date.now(), aula: aula || e.aula || null };
  };
  M.resultadoRevisao = (S, id, ok) => { if (ok && S.erros) delete S.erros[id]; else if (!ok) M.registrarErro(S, id); };
  M.filaRevisao = (reg, S) => Object.keys(S.erros || {}).map(id => reg.questao(id)).filter(Boolean);

  /* ---------- liberação ---------- */
  M.sequencia = (reg, mod) => {
    const out = [];
    (mod.blocos || []).forEach(b => { b.aulas.forEach(id => out.push({ k: 'aula', id, bloco: b.id })); if (b.teste) out.push({ k: 'teste', id: b.teste, bloco: b.id }); });
    if (mod.trabalho) out.push({ k: 'trabalho', id: mod.trabalho });
    if (mod.prova) out.push({ k: 'prova', id: mod.prova });
    return out;
  };
  const concluido = (reg, S, it) => it.k === 'aula' ? M.aulaConcluida(reg.aulas[it.id], S) : M.aprovada(M.melhorNota(S, it.id));
  const iniciado = (reg, S, it) => it.k === 'aula' ? M.aulaIniciada(reg.aulas[it.id], S)
    : !!(tem(S, 'em')[it.id] || M.tentativas(S, it.id).length);
  M.titulo = (reg, it) => it.k === 'aula' ? (reg.aulas[it.id] || {}).titulo : ((reg.atividades[it.id] || {}).titulo || it.id);

  // Calcula o estado de tudo: módulos e itens (bloqueado, disponivel, andamento, concluido, construcao).
  M.calcular = (reg, S) => {
    const res = { modulos: [], itens: {}, proximo: null };
    let anteriorOk = true, anteriorTitulo = null;
    for (const mod of reg.curso.modulos) {
      const seq = M.sequencia(reg, mod);
      const m = { id: mod.id, titulo: mod.titulo, demo: !!mod.demo, itens: [], estado: 'construcao', falta: [] };
      res.modulos.push(m);
      if (!seq.length) { if (!mod.demo) { anteriorOk = false; anteriorTitulo = mod.titulo; } continue; }
      const livre = !!mod.demo || anteriorOk;
      if (!livre) m.falta.push('Aprove a prova do módulo anterior (' + anteriorTitulo + ').');
      const aulas = seq.filter(i => i.k === 'aula');
      for (const it of seq) {
        const x = { k: it.k, id: it.id, bloco: it.bloco, estado: 'bloqueado', falta: [] };
        const ok = concluido(reg, S, it);
        if (it.k === 'aula') {
          const j = aulas.indexOf(it);
          if (!livre) x.falta.push('Módulo anterior ainda não aprovado.');
          else if (j > 0 && !concluido(reg, S, aulas[j - 1])) x.falta.push('Conclua antes a aula “' + M.titulo(reg, aulas[j - 1]) + '” (leitura marcada e tarefa 100% respondida).');
        } else if (it.k === 'teste') {
          if (!livre) x.falta.push('Módulo anterior ainda não aprovado.');
          const b = (mod.blocos || []).find(bb => bb.id === it.bloco);
          b.aulas.filter(id => !M.aulaConcluida(reg.aulas[id], S)).forEach(id => x.falta.push('Conclua a aula “' + reg.aulas[id].titulo + '”.'));
        } else if (it.k === 'trabalho') {
          if (!livre) x.falta.push('Módulo anterior ainda não aprovado.');
          seq.filter(i => i.k === 'aula' && !M.aulaConcluida(reg.aulas[i.id], S)).forEach(i => x.falta.push('Conclua a aula “' + M.titulo(reg, i) + '”.'));
          seq.filter(i => i.k === 'teste' && !concluido(reg, S, i)).forEach(i => x.falta.push('Seja aprovado (nota 7,0 ou mais) em “' + M.titulo(reg, i) + '”.'));
        } else if (it.k === 'prova') {
          if (!livre) x.falta.push('Módulo anterior ainda não aprovado.');
          const tr = seq.find(i => i.k === 'trabalho');
          if (tr && !concluido(reg, S, tr)) x.falta.push('Seja aprovado (nota 7,0 ou mais) no trabalho do módulo.');
        }
        if (ok) x.estado = 'concluido';
        else if (!x.falta.length) x.estado = iniciado(reg, S, it) ? 'andamento' : 'disponivel';
        else x.estado = 'bloqueado';
        m.itens.push(x); res.itens[it.id] = x;
        if (!mod.demo && !res.proximo && (x.estado === 'disponivel' || x.estado === 'andamento')) res.proximo = Object.assign({ modulo: mod.id }, x);
        if (mod.demo && !res.proximoDemo && (x.estado === 'disponivel' || x.estado === 'andamento')) res.proximoDemo = Object.assign({ modulo: mod.id }, x);
      }
      const todos = m.itens.every(i => i.estado === 'concluido');
      m.estado = todos ? 'concluido' : !livre ? 'bloqueado' : m.itens.some(i => i.estado !== 'disponivel' && i.estado !== 'bloqueado') ? 'andamento' : 'disponivel';
      m.concluidos = m.itens.filter(i => i.estado === 'concluido').length;
      if (!mod.demo) { anteriorOk = todos; anteriorTitulo = mod.titulo; }
    }
    return res;
  };
  M.progressoCurso = (reg, S) => {
    const c = M.calcular(reg, S); let tot = 0, ok = 0;
    c.modulos.filter(m => !m.demo).forEach(m => { tot += m.itens.length; ok += m.concluidos || 0; });
    return { feitos: ok, total: tot, pct: tot ? Math.round(100 * ok / tot) : 0 };
  };

  /* ---------- boletim ---------- */
  M.mediaModulo = (reg, S, mod) => {
    const seq = M.sequencia(reg, mod);
    const nota = it => M.melhorNota(S, it.id);
    const testes = seq.filter(i => i.k === 'teste').map(nota);
    const tr = seq.find(i => i.k === 'trabalho'), pr = seq.find(i => i.k === 'prova');
    const partes = [];
    if (pr && nota(pr) != null) partes.push([M.PESO_MEDIA.prova, nota(pr)]);
    if (tr && nota(tr) != null) partes.push([M.PESO_MEDIA.trabalho, nota(tr)]);
    if (testes.length && testes.every(n => n != null)) partes.push([M.PESO_MEDIA.testes, testes.reduce((a, b) => a + b, 0) / testes.length]);
    const peso = partes.reduce((s, p) => s + p[0], 0);
    const completa = !!pr && !!tr && partes.length === 3;
    return { media: peso ? partes.reduce((s, p) => s + p[0] * p[1], 0) / peso : null, completa };
  };

  if (typeof module !== 'undefined' && module.exports) module.exports = M; else raiz.EscolaMotor = M;
})(typeof self !== 'undefined' ? self : this);

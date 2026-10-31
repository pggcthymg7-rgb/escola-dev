/* Armazenamento do progresso: carregar, salvar, migrar (esquema v2), backup e caderno em Markdown.
   Nenhum dado sai do aparelho. A parte lógica roda também no Node (testes). */
(function (raiz) {
  const A = {};
  A.CHAVE = 'escoladev';
  A.CHAVE_V1 = 'escoladev_v1_backup';       // cópia do progresso antigo, guardada antes de migrar
  A.CHAVE_ANTES_IMPORTAR = 'escoladev_antes_importar';
  A.VERSAO = 2;
  A.LIMITE_BYTES = 3500000;                  // acima disso o localStorage (cerca de 5 MB) começa a ficar apertado
  A.DIAS_LEMBRETE = 7;

  A.padrao = () => ({ v: A.VERSAO, done: {}, tasks: {}, best: 0, theme: '', goal: 60, days: {}, fc: {},
    lidas: {}, resp: {}, tent: {}, em: {}, erros: {}, anot: {}, duv: [], bk: 0, ini: Date.now() });

  // Migra qualquer versão anterior para a atual. Só acrescenta campos: nada do que já existe é apagado.
  A.migrar = obj => {
    if (!obj || typeof obj !== 'object' || Array.isArray(obj)) return A.padrao();
    const S = Object.assign(A.padrao(), obj);
    ['done', 'tasks', 'days', 'fc', 'lidas', 'resp', 'tent', 'em', 'erros', 'anot'].forEach(k => { if (!S[k] || typeof S[k] !== 'object' || Array.isArray(S[k])) S[k] = {}; });
    if (!Array.isArray(S.duv)) S.duv = [];
    S.v = A.VERSAO;
    return S;
  };

  A.carregar = ls => {
    ls = ls || raiz.localStorage;
    let bruto = null, aviso = '';
    try { bruto = ls.getItem(A.CHAVE); } catch (e) { aviso = 'Este navegador não deixou ler o armazenamento. O progresso não será salvo.'; }
    let obj = null;
    if (bruto) { try { obj = JSON.parse(bruto); } catch (e) { aviso = 'O progresso salvo estava ilegível e foi guardado à parte.'; try { ls.setItem(A.CHAVE + '_ilegivel', bruto); } catch (x) {} } }
    if (obj && (obj.v || 1) < A.VERSAO) {
      try { if (!ls.getItem(A.CHAVE_V1)) ls.setItem(A.CHAVE_V1, bruto); } catch (e) {}
    }
    if (obj && obj.v > A.VERSAO) aviso = 'Este progresso foi salvo por uma versão mais nova da escola. Atualize o app.';
    return { S: A.migrar(obj), aviso, migrou: !!obj && (obj.v || 1) < A.VERSAO };
  };
  A.salvar = (S, ls) => {
    ls = ls || raiz.localStorage;
    try { ls.setItem(A.CHAVE, JSON.stringify(S)); A.falhou = false; return true; } catch (e) { A.falhou = true; return false; }
  };
  A.tamanho = S => JSON.stringify(S).length;
  A.apertado = S => A.tamanho(S) > A.LIMITE_BYTES;

  /* ---------- backup ---------- */
  A.exportar = S => JSON.stringify({ formato: 'escola-dev-backup', v: A.VERSAO, geradoEm: new Date().toISOString(), dados: S }, null, 1);
  // Aceita o arquivo de backup novo e também o texto copiado pela versão antiga do app.
  A.importar = texto => {
    let d;
    try { d = JSON.parse(texto); } catch (e) { return { ok: false, erro: 'O arquivo não é um backup válido (não consegui ler o texto).' }; }
    if (d && d.formato === 'escola-dev-backup') {
      if (d.v > A.VERSAO) return { ok: false, erro: 'Este backup foi criado por uma versão mais nova da escola.' };
      d = d.dados;
    }
    if (!d || typeof d !== 'object' || Array.isArray(d) || !(d.done || d.tasks || d.resp || d.lidas)) return { ok: false, erro: 'O arquivo não parece ser um backup da Escola Dev.' };
    return { ok: true, S: A.migrar(d) };
  };
  A.diasSemBackup = (S, agora) => {
    const ref = S.bk || S.ini || agora; return Math.floor(((agora || Date.now()) - ref) / 86400000);
  };
  A.precisaBackup = (S, agora) => A.diasSemBackup(S, agora) >= A.DIAS_LEMBRETE && A.temDados(S);
  A.temDados = S => Object.keys(S.lidas).length + Object.keys(S.resp).length + Object.keys(S.tent).length + Object.keys(S.anot).length + S.duv.length +
    Object.keys(S.done).filter(k => S.done[k]).length + Object.keys(S.tasks).length > 0;

  /* ---------- caderno em Markdown ---------- */
  A.cadernoMd = (reg, S, legado) => {
    const L = [];
    L.push('# Meu caderno da Escola Dev', '', 'Gerado em ' + new Date().toLocaleDateString('pt-BR') + '.', '');
    const an = Object.keys(S.anot).filter(id => (S.anot[id] || '').trim());
    L.push('## Anotações das aulas', '');
    if (!an.length) L.push('(nenhuma)', '');
    an.forEach(id => { const a = reg.aulas[id]; L.push('### ' + (a ? a.titulo : id), '', S.anot[id].trim(), ''); });
    L.push('## Caderno de dúvidas e curiosidades', '');
    if (!S.duv.length) L.push('(nenhuma)', '');
    S.duv.forEach(d => { L.push('### ' + d.q.split('\n')[0], '', '- Tipo: ' + (d.tag === 'curso' ? 'ligada ao curso' : 'curiosidade'), '- Situação: ' + (d.status === 'respondida' ? 'respondida' : 'aberta'));
      if (d.q.includes('\n')) L.push('', d.q.split('\n').slice(1).join('\n'));
      if ((d.resp || '').trim()) L.push('', '**Resposta:**', '', d.resp.trim()); L.push(''); });
    const tn = Object.keys(S.tasks || {}).filter(id => (S.tasks[id].n || '').trim());
    if (tn.length) { L.push('## Anotações das tarefas anteriores', ''); tn.forEach(id => { const t = ((legado && legado.T) || []).find(x => x.id === id); L.push('### ' + (t ? t.t : id), '', S.tasks[id].n.trim(), ''); }); }
    return L.join('\n');
  };

  if (typeof module !== 'undefined' && module.exports) module.exports = A; else raiz.EscolaArm = A;
})(typeof self !== 'undefined' ? self : this);

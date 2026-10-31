#!/usr/bin/env node
/* Validador do conteúdo. Rodar: node tools/validar-conteudo.js
   Falha (código 1) quando: falta alguma das 10 partes da aula, há menos questões que o mínimo,
   uma referência não tem os campos exigidos, há ids duplicados ou o índice do gabarito é inválido.
   Regras completas em ESPECIFICACAO.md e docs/ESQUEMA-CONTEUDO.md. */
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const LIM = {
  objetivos: [3, 5], resumo: [1, 7], referencias: [2, 5], tarefaObj: [5, 8], tarefaDis: [2, 3], criterios: [3, 5],
  aulasModulo: [7, 14], aulasBloco: [3, 4], palavras: [1500, 3000]
};
const REDUZIDO = { referencias: [0, 5], tarefaObj: [2, 8], tarefaDis: [1, 3] };      // módulo de demonstração
const PADRAO = { teste: { obj: 10, dis: 1 }, prova: { obj: 20, dis: 4 } };
const CAMPOS_REF = ['autor', 'titulo', 'ano', 'tipo', 'idioma', 'link', 'ler'];
const CAMPOS_APROF = ['titulo', 'autor', 'duracao', 'idioma', 'porque', 'link'];
const nv = s => typeof s === 'string' && s.trim().length > 0;
const entre = (n, [a, b]) => n >= a && n <= b;

function validarRegistro(reg, opc = {}) {
  const erros = [], avisos = [];
  const E = (onde, msg) => erros.push(onde + ': ' + msg);
  const W = (onde, msg) => avisos.push(onde + ': ' + msg);
  reg.erros.forEach(e => E('registro', e));
  const ids = new Map();
  const unico = (id, onde) => { if (!nv(id)) { E(onde, 'id ausente'); return; } if (ids.has(id)) E(onde, 'id duplicado “' + id + '” (também em ' + ids.get(id) + ')'); else ids.set(id, onde); };
  const termos = new Set(reg.G.map(g => g[0]));
  const modulos = {}; reg.curso.modulos.forEach(m => { if (modulos[m.id]) E('índice', 'módulo duplicado ' + m.id); modulos[m.id] = m; });

  // glossário
  const nomes = new Set();
  reg.G.forEach(g => { if (!Array.isArray(g) || g.length !== 2 || !nv(g[0]) || !nv(g[1])) E('glossário', 'entrada inválida ' + JSON.stringify(g)); else { if (nomes.has(g[0])) E('glossário', 'termo duplicado “' + g[0] + '”'); nomes.add(g[0]); } });

  function questaoObj(q, onde, aula, exigeAula) {
    unico(q.id, onde);
    const o = onde + ' ' + q.id;
    if (!nv(q.q)) E(o, 'enunciado vazio');
    if (!Array.isArray(q.o) || q.o.length !== 4 || !q.o.every(nv)) E(o, 'precisa de exatamente 4 alternativas preenchidas');
    else if (new Set(q.o).size !== 4) E(o, 'alternativas repetidas');
    if (!Number.isInteger(q.a) || q.a < 0 || q.a > 3) E(o, 'índice do gabarito inválido (' + q.a + ')');
    if (!nv(q.e)) E(o, 'falta a explicação do porquê da correta');
    const a = reg.aulas[q.aula || (aula && aula.id)];
    if (exigeAula && !q.aula) E(o, 'falta o campo aula (aula de origem)');
    if (q.aula && !reg.aulas[q.aula]) E(o, 'aula de origem inexistente: ' + q.aula);
    if (a) { if (!Number.isInteger(q.obj) || q.obj < 0 || q.obj >= (a.objetivos || []).length) E(o, 'campo obj deve apontar para um objetivo da aula (0 a ' + ((a.objetivos || []).length - 1) + ')'); }
    else if (exigeAula || q.aula) { /* já reportado */ } else if (!Number.isInteger(q.obj)) E(o, 'falta o campo obj (objetivo ligado)');
  }
  function questaoDis(q, onde, exigeAula) {
    unico(q.id, onde);
    const o = onde + ' ' + q.id;
    if (!nv(q.q)) E(o, 'enunciado vazio');
    if (!Number.isInteger(q.min) || q.min < 1) E(o, 'min (mínimo de caracteres) deve ser um inteiro positivo');
    if (!nv(q.modelo)) E(o, 'falta a resposta-modelo');
    if (!Array.isArray(q.criterios) || !q.criterios.every(nv) || !entre(q.criterios.length, LIM.criterios)) E(o, 'precisa de 3 a 5 critérios preenchidos');
    if (exigeAula && !q.aula) E(o, 'falta o campo aula'); if (q.aula && !reg.aulas[q.aula]) E(o, 'aula inexistente: ' + q.aula);
  }
  function posicoes(lista, onde) {
    if (lista.length < 4) return;
    const cont = [0, 0, 0, 0]; lista.forEach(q => { if (q.a >= 0 && q.a <= 3) cont[q.a]++; });
    if (Math.max(...cont) === lista.length) E(onde, 'todas as respostas corretas estão na mesma posição');
    else if (lista.length >= 8 && Math.max(...cont) / lista.length > 0.5) W(onde, 'mais da metade das corretas está na mesma posição (' + cont.join('/') + ')');
  }

  // aulas
  const aulaNoIndice = new Set();
  reg.curso.modulos.forEach(m => (m.blocos || []).forEach(b => b.aulas.forEach(id => aulaNoIndice.add(id))));
  for (const a of Object.values(reg.aulas)) {
    const onde = 'aula ' + a.id;
    unico(a.id, onde);
    const mod = modulos[a.modulo]; const red = mod && mod.demo;
    if (!mod) E(onde, 'módulo inexistente: ' + a.modulo);
    if (!aulaNoIndice.has(a.id)) E(onde, 'aula não consta em nenhum bloco do content/indice.js');
    if (!nv(a.titulo)) E(onde, 'falta título'); if (!(a.min > 0)) E(onde, 'falta min (minutos)');
    if (!Array.isArray(a.objetivos) || !a.objetivos.every(nv) || !entre(a.objetivos.length, LIM.objetivos)) E(onde, 'objetivos: precisa de 3 a 5 frases');
    if (!Array.isArray(a.partes) || a.partes.length !== 10) E(onde, 'texto: precisa das 10 partes (tem ' + (a.partes ? a.partes.length : 0) + ')');
    else {
      a.partes.forEach((p, i) => {
        if (p.n !== i + 1) E(onde, 'parte ' + (i + 1) + ' fora de ordem (n=' + p.n + ')');
        if (!nv(p.titulo)) E(onde, 'parte ' + (i + 1) + ' sem título');
        if (i < 9 && !nv(p.html)) E(onde, 'parte ' + (i + 1) + ' (“' + p.titulo + '”) está vazia');
      });
      const p10 = a.partes[9];
      if (!Array.isArray(p10.termos)) E(onde, 'parte 10 precisa da lista termos');
      else {
        if (!red && p10.termos.length < 1) E(onde, 'parte 10: a aula precisa somar ao menos 1 termo ao glossário');
        p10.termos.forEach(t => { if (!termos.has(t)) E(onde, 'parte 10: termo “' + t + '” não existe no glossário'); });
      }
      if (!red) {
        const pal = a.partes.slice(0, 9).map(p => (p.html || '').replace(/<[^>]+>/g, ' ')).join(' ').split(/\s+/).filter(Boolean).length;
        if (!entre(pal, LIM.palavras)) W(onde, pal + ' palavras (referência: 1.500 a 3.000)');
      }
    }
    if (!Array.isArray(a.resumo) || !a.resumo.every(nv) || !entre(a.resumo.length, LIM.resumo)) E(onde, 'resumo: de 1 a 7 linhas');
    // referências
    const lr = red ? REDUZIDO.referencias : LIM.referencias;
    if (!Array.isArray(a.referencias) || !entre(a.referencias.length, lr)) E(onde, 'referências: precisa de ' + lr[0] + ' a ' + lr[1]);
    else a.referencias.forEach((r, i) => {
      const o = onde + ' referência ' + (i + 1);
      CAMPOS_REF.forEach(c => { if (!nv(String(r[c] == null ? '' : r[c]))) E(o, 'falta o campo “' + c + '”'); });
      if (nv(r.link) && !/^https?:\/\//.test(r.link)) E(o, 'link deve começar com http:// ou https://');
      if (r.naoVerificado) {
        W(o, '[não verificado]');
        if (opc.pendencias != null && !opc.pendencias.includes(a.id)) E(o, 'referência não verificada precisa estar listada em docs/PENDENCIAS.md (citando ' + a.id + ')');
      } else if (!/^\d{4}-\d{2}-\d{2}$/.test(r.verificado || '')) E(o, 'falta “verificado” (AAAA-MM-DD) ou naoVerificado:true');
    });
    (a.aprofundar || []).forEach((r, i) => CAMPOS_APROF.forEach(c => { if (!nv(String(r[c] == null ? '' : r[c]))) E(onde + ' aprofundar ' + (i + 1), 'falta o campo “' + c + '”'); }));
    // tarefa
    const t = a.tarefa;
    if (!t) { E(onde, 'falta a tarefa da aula'); continue; }
    const lo = red ? REDUZIDO.tarefaObj : LIM.tarefaObj, ld = red ? REDUZIDO.tarefaDis : LIM.tarefaDis;
    if (!Array.isArray(t.obj) || !entre(t.obj.length, lo)) E(onde, 'tarefa: precisa de ' + lo[0] + ' a ' + lo[1] + ' objetivas (tem ' + (t.obj || []).length + ')');
    if (!Array.isArray(t.dis) || !entre(t.dis.length, ld)) E(onde, 'tarefa: precisa de ' + ld[0] + ' a ' + ld[1] + ' dissertativas (tem ' + (t.dis || []).length + ')');
    (t.obj || []).forEach(q => questaoObj(q, onde + ' tarefa', a, false));
    (t.dis || []).forEach(q => questaoDis(q, onde + ' tarefa', false));
    posicoes(t.obj || [], onde + ' tarefa');
    if (t.pratica) {
      if (!nv(t.pratica.instrucao) || !Array.isArray(t.pratica.perguntas) || !t.pratica.perguntas.length) E(onde, 'exercício prático precisa de instrucao e perguntas');
      (t.pratica.perguntas || []).forEach(q => { unico(q.id, onde + ' prática'); if (!nv(q.q) || !(q.min >= 1)) E(onde + ' prática ' + q.id, 'pergunta precisa de q e min'); });
    }
  }

  // atividades
  const atvNoIndice = new Set();
  reg.curso.modulos.forEach(m => { (m.blocos || []).forEach(b => b.teste && atvNoIndice.add(b.teste)); m.trabalho && atvNoIndice.add(m.trabalho); m.prova && atvNoIndice.add(m.prova); });
  for (const v of Object.values(reg.atividades)) {
    const onde = v.tipo + ' ' + v.id;
    unico(v.id, onde);
    const mod = modulos[v.modulo]; const red = mod && mod.demo;
    if (!['teste', 'trabalho', 'prova'].includes(v.tipo)) { E(onde, 'tipo inválido: ' + v.tipo); continue; }
    if (!mod) E(onde, 'módulo inexistente: ' + v.modulo);
    if (!atvNoIndice.has(v.id)) E(onde, 'atividade não consta no content/indice.js');
    if (!nv(v.titulo)) E(onde, 'falta título');
    let aulasValidas = null;
    if (mod && v.tipo === 'teste') { const b = (mod.blocos || []).find(x => x.id === v.bloco); if (!b) E(onde, 'bloco inexistente: ' + v.bloco); else { aulasValidas = b.aulas; if (b.teste !== v.id) E(onde, 'o bloco ' + b.id + ' aponta para outro teste (' + b.teste + ')'); } }
    if (mod && v.tipo !== 'teste') { aulasValidas = (mod.blocos || []).flatMap(b => b.aulas); if (v.tipo === 'trabalho' && mod.trabalho !== v.id) E(onde, 'o módulo aponta para outro trabalho'); if (v.tipo === 'prova' && mod.prova !== v.id) E(onde, 'o módulo aponta para outra prova'); }
    const obj = v.obj || [], dis = v.dis || [];
    obj.forEach(q => questaoObj(q, onde, null, true));
    dis.forEach(q => questaoDis(q, onde, v.tipo !== 'trabalho'));
    [...obj, ...dis].forEach(q => { if (q.aula && aulasValidas && !aulasValidas.includes(q.aula)) E(onde + ' ' + q.id, 'a aula ' + q.aula + ' não pertence ' + (v.tipo === 'teste' ? 'ao bloco' : 'ao módulo')); });
    posicoes(obj, onde);
    const s = v.sorteio || {};
    if (v.tipo === 'trabalho') {
      if (obj.length) E(onde, 'trabalho não tem objetivas'); if (dis.length < 1) E(onde, 'precisa de ao menos 1 pergunta dissertativa');
      if (!Array.isArray(v.roteiro) || !v.roteiro.length || !v.roteiro.every(nv)) E(onde, 'falta o roteiro passo a passo');
    } else {
      const pad = PADRAO[v.tipo], nObj = s.obj != null ? s.obj : pad.obj, nDis = s.dis != null ? s.dis : pad.dis;
      if (!red && (nObj < pad.obj || nDis < pad.dis)) E(onde, 'sorteio menor que o padrão da especificação (' + pad.obj + ' objetivas e ' + pad.dis + ' dissertativa(s))');
      const fator = v.tipo === 'prova' ? 2 : 1;
      if (obj.length < fator * nObj) E(onde, 'banco de objetivas pequeno: ' + obj.length + ' (precisa de pelo menos ' + fator * nObj + (fator === 2 ? ', o dobro do sorteio' : '') + ')');
      if (dis.length < fator * nDis) E(onde, 'banco de dissertativas pequeno: ' + dis.length + ' (precisa de pelo menos ' + fator * nDis + ')');
      if (v.tipo === 'teste' && aulasValidas) aulasValidas.forEach(id => { if (![...obj, ...dis].some(q => q.aula === id)) W(onde, 'nenhuma questão cobre a aula ' + id); });
    }
  }

  // estrutura do curso
  for (const m of reg.curso.modulos) {
    const onde = 'módulo ' + m.id;
    if (!nv(m.titulo)) E(onde, 'falta título');
    if (!(m.blocos || []).length) { W(onde, 'em construção (sem blocos)'); continue; }
    const aulas = m.blocos.flatMap(b => b.aulas);
    if (!m.demo && !entre(aulas.length, LIM.aulasModulo)) E(onde, 'precisa de 7 a 14 aulas (tem ' + aulas.length + ')');
    m.blocos.forEach(b => {
      if (!m.demo && !entre(b.aulas.length, LIM.aulasBloco)) E(onde + ' bloco ' + b.id, 'teste de bloco a cada 3 ou 4 aulas (bloco tem ' + b.aulas.length + ')');
      if (!b.teste || !reg.atividades[b.teste] || reg.atividades[b.teste].tipo !== 'teste') E(onde + ' bloco ' + b.id, 'falta o teste de bloco (id inexistente ou de outro tipo)');
      b.aulas.forEach(id => { if (!reg.aulas[id]) E(onde + ' bloco ' + b.id, 'aula não registrada: ' + id); else if (reg.aulas[id].modulo !== m.id) E(onde, 'aula ' + id + ' declara outro módulo'); });
    });
    if (!m.trabalho || !reg.atividades[m.trabalho] || reg.atividades[m.trabalho].tipo !== 'trabalho') E(onde, 'falta o trabalho do módulo');
    if (!m.prova || !reg.atividades[m.prova] || reg.atividades[m.prova].tipo !== 'prova') E(onde, 'falta a prova do módulo');
  }
  return { erros, avisos, resumo: { aulas: Object.keys(reg.aulas).length, atividades: Object.keys(reg.atividades).length, termos: reg.G.length, questoes: ids.size } };
}

// Carrega os arquivos de conteúdo do disco, exatamente como o app faz.
function carregar(raiz) {
  const reg = require('../js/registro.js'); reg.limpar();
  const ctx = vm.createContext({ Escola: reg });
  const rodar = rel => { const f = path.join(raiz, rel); if (!fs.existsSync(f)) { reg.erros.push('arquivo listado no índice não existe: ' + rel); return; }
    try { vm.runInContext(fs.readFileSync(f, 'utf8'), ctx, { filename: rel }); } catch (e) { reg.erros.push('erro ao ler ' + rel + ': ' + e.message); } };
  rodar('content/glossario.js'); rodar('content/indice.js');
  const lista = reg.curso.arquivos || [];
  lista.forEach(rodar);
  // arquivos em content/modulo-* que não estão no índice
  const dir = path.join(raiz, 'content');
  fs.readdirSync(dir).filter(d => /^modulo-/.test(d)).forEach(d => fs.readdirSync(path.join(dir, d)).filter(f => f.endsWith('.js')).forEach(f => {
    const rel = 'content/' + d + '/' + f; if (!lista.includes(rel)) reg.erros.push('arquivo fora do índice (não será carregado pelo app): ' + rel); }));
  return reg;
}

function principal() {
  const raiz = path.resolve(__dirname, '..');
  const pend = path.join(raiz, 'docs', 'PENDENCIAS.md');
  const r = validarRegistro(carregar(raiz), { pendencias: fs.existsSync(pend) ? fs.readFileSync(pend, 'utf8') : '' });
  r.avisos.forEach(a => console.log('aviso: ' + a));
  r.erros.forEach(e => console.error('ERRO: ' + e));
  console.log('\n' + r.resumo.aulas + ' aulas, ' + r.resumo.atividades + ' atividades, ' + r.resumo.questoes + ' ids de conteúdo, ' + r.resumo.termos + ' termos. ' + r.erros.length + ' erro(s), ' + r.avisos.length + ' aviso(s).');
  process.exitCode = r.erros.length ? 1 : 0;
}
if (require.main === module) principal();
module.exports = { validarRegistro, carregar };

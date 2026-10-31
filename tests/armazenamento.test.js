/* Testes da migração, do backup e do caderno. Rodar: node tests/armazenamento.test.js */
const assert = require('assert');
const A = require('../js/armazenamento.js');
const reg = require('../js/registro.js');
let ok = 0;
const teste = (nome, f) => { try { f(); ok++; console.log('  ok  ' + nome); } catch (e) { console.error('FALHOU: ' + nome + '\n' + e.stack); process.exitCode = 1; } };
const fakeLS = (ini = {}) => { const m = Object.assign({}, ini); return { m, getItem: k => (k in m ? m[k] : null), setItem: (k, v) => { m[k] = String(v); }, removeItem: k => { delete m[k]; } }; };

// Progresso real do aluno, no formato antigo (sem versão), com tudo que o app antigo guardava.
const ANTIGO = { done: { m0a: true, m0c: true, f0: true }, tasks: { t1: { s: 2, n: 'vi os dados sem login' }, t6: { s: 1, n: '' } },
  best: 5, theme: 'dark', days: { '2026-10-30': 1800, '2026-10-31': 900 }, goal: 120, fc: { API: 3, Cliente: 1 } };

console.log('Migração');
teste('progresso antigo é migrado sem perder nada', () => {
  const ls = fakeLS({ escoladev: JSON.stringify(ANTIGO) });
  const { S } = A.carregar(ls);
  assert.strictEqual(S.v, 2);
  for (const k of Object.keys(ANTIGO)) assert.deepStrictEqual(S[k], ANTIGO[k], 'campo perdido: ' + k);
  ['lidas', 'resp', 'tent', 'em', 'erros', 'anot'].forEach(k => assert.deepStrictEqual(S[k], {}));
  assert.deepStrictEqual(S.duv, []);
});
teste('guarda cópia do progresso antigo antes de migrar', () => {
  const ls = fakeLS({ escoladev: JSON.stringify(ANTIGO) });
  A.carregar(ls); assert.deepStrictEqual(JSON.parse(ls.m[A.CHAVE_V1]), ANTIGO);
});
teste('a cópia antiga não é sobrescrita nas aberturas seguintes', () => {
  const ls = fakeLS({ escoladev: JSON.stringify(ANTIGO) });
  const { S } = A.carregar(ls); S.resp.x = 'novo'; A.salvar(S, ls); A.carregar(ls);
  assert.deepStrictEqual(JSON.parse(ls.m[A.CHAVE_V1]), ANTIGO);
});
teste('migrar duas vezes dá o mesmo resultado (idempotente)', () => {
  const a = A.migrar(ANTIGO), b = A.migrar(JSON.parse(JSON.stringify(a))); assert.deepStrictEqual(a, b);
});
teste('campos desconhecidos são preservados', () => {
  assert.strictEqual(A.migrar({ done: {}, tasks: {}, futuro: 42 }).futuro, 42);
});
teste('sem nada salvo, começa do zero com versão 2', () => {
  const { S } = A.carregar(fakeLS()); assert.strictEqual(S.v, 2); assert.ok(!A.temDados(S));
});
teste('texto salvo corrompido não derruba o app e é guardado à parte', () => {
  const ls = fakeLS({ escoladev: '{quebrado' }); const r = A.carregar(ls);
  assert.strictEqual(r.S.v, 2); assert.ok(r.aviso); assert.strictEqual(ls.m.escoladev_ilegivel, '{quebrado');
});
teste('progresso de versão futura gera aviso', () => {
  const r = A.carregar(fakeLS({ escoladev: JSON.stringify({ v: 9, done: {}, tasks: {} }) })); assert.ok(/mais nova/.test(r.aviso));
});

console.log('Salvar e backup');
teste('salvar e carregar devolvem o mesmo estado', () => {
  const ls = fakeLS(); const S = A.padrao(); S.resp.a = 'x'; S.lidas.b = 1;
  assert.ok(A.salvar(S, ls)); assert.deepStrictEqual(A.carregar(ls).S, S);
});
teste('falha ao salvar (armazenamento cheio) é detectada', () => {
  const ls = { setItem() { throw new Error('quota'); }, getItem: () => null };
  assert.strictEqual(A.salvar(A.padrao(), ls), false); assert.ok(A.falhou);
});
teste('exportar e importar preservam tudo', () => {
  const S = A.migrar(ANTIGO); S.resp.q1 = 2; S.tent.t1 = [{ nota: 8 }]; S.duv.push({ id: 1, q: 'o que é DNS?', tag: 'curiosidade', status: 'aberta' });
  const r = A.importar(A.exportar(S)); assert.ok(r.ok); assert.deepStrictEqual(r.S, S);
});
teste('importa o texto copiado pela versão antiga do app', () => {
  const r = A.importar(JSON.stringify(ANTIGO)); assert.ok(r.ok); assert.strictEqual(r.S.v, 2); assert.deepStrictEqual(r.S.done, ANTIGO.done);
});
teste('importação recusa texto inválido e backup de versão futura', () => {
  assert.ok(!A.importar('não é json').ok); assert.ok(!A.importar('{"a":1}').ok); assert.ok(!A.importar('[]').ok);
  assert.ok(!A.importar(JSON.stringify({ formato: 'escola-dev-backup', v: 9, dados: {} })).ok);
});
teste('lembrete de backup depois de 7 dias, só se houver dados', () => {
  const dia = 86400000, S = A.migrar(ANTIGO); S.bk = 1000;
  assert.ok(!A.precisaBackup(S, 1000 + 6 * dia)); assert.ok(A.precisaBackup(S, 1000 + 7 * dia));
  const vazio = A.padrao(); vazio.ini = 0; assert.ok(!A.precisaBackup(vazio, 30 * dia));
});
teste('avisa quando o volume de dados se aproxima do limite do localStorage', () => {
  const S = A.padrao(); assert.ok(!A.apertado(S)); S.resp.grande = 'x'.repeat(A.LIMITE_BYTES); assert.ok(A.apertado(S));
});

console.log('Caderno');
teste('caderno em Markdown junta anotações, dúvidas e notas das tarefas antigas', () => {
  reg.limpar(); reg.aula({ id: 'a1', titulo: 'Aula 1' });
  const S = A.migrar(ANTIGO); S.anot.a1 = 'minha nota'; S.duv.push({ id: 1, q: 'Por que o céu é azul?\ndetalhe', tag: 'curiosidade', status: 'respondida', resp: 'dispersão' });
  const md = A.cadernoMd(reg, S, { T: [{ id: 't1', t: 'Etapa 1' }] });
  assert.match(md, /### Aula 1\n\nminha nota/); assert.match(md, /### Por que o céu é azul\?/); assert.match(md, /dispersão/); assert.match(md, /### Etapa 1\n\nvi os dados sem login/);
});

console.log('\n' + ok + ' testes passaram' + (process.exitCode ? ', COM FALHAS' : ''));

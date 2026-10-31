/* Testes da lógica de liberação, notas e sorteio. Rodar: node tests/motor.test.js */
const assert = require('assert');
const reg = require('../js/registro.js');
const M = require('../js/motor.js');

let ok = 0;
const teste = (nome, f) => { try { f(); ok++; console.log('  ok  ' + nome); } catch (e) { console.error('FALHOU: ' + nome + '\n' + e.stack); process.exitCode = 1; } };

const obj = (id, a = 0, aula) => ({ id, q: 'q', o: ['a', 'b', 'c', 'd'], a, e: 'e', aula, obj: 0 });
const dis = (id, aula) => ({ id, q: 'q', min: 10, modelo: 'm', criterios: ['c1', 'c2', 'c3', 'c4'], aula });
const aula = (id, modulo) => ({ id, modulo, titulo: 'Aula ' + id, tarefa: { obj: [obj(id + '-o1', 1, id), obj(id + '-o2', 2, id)], dis: [dis(id + '-d1', id)] } });

function montar() {
  reg.limpar();
  ['a1', 'a2', 'a3'].forEach(i => reg.aula(aula(i, 'm1')));
  ['b1', 'b2'].forEach(i => reg.aula(aula(i, 'm2')));
  const bancoObj = id => [1, 2, 3, 4, 5, 6].map(n => obj(id + '-o' + n, n % 4));
  reg.atividade({ id: 't1', tipo: 'teste', modulo: 'm1', titulo: 'Teste 1', sorteio: { obj: 3, dis: 1 }, obj: bancoObj('t1'), dis: [dis('t1-d1'), dis('t1-d2')] });
  reg.atividade({ id: 'w1', tipo: 'trabalho', modulo: 'm1', titulo: 'Trabalho 1', obj: [], dis: [dis('w1-d1'), dis('w1-d2')] });
  reg.atividade({ id: 'p1', tipo: 'prova', modulo: 'm1', titulo: 'Prova 1', sorteio: { obj: 4, dis: 1 }, obj: bancoObj('p1'), dis: [dis('p1-d1'), dis('p1-d2')] });
  reg.defCurso({ modulos: [
    { id: 'm1', titulo: 'Módulo 1', blocos: [{ id: 'm1b1', aulas: ['a1', 'a2', 'a3'], teste: 't1' }], trabalho: 'w1', prova: 'p1' },
    { id: 'm2', titulo: 'Módulo 2', blocos: [{ id: 'm2b1', aulas: ['b1', 'b2'] }] },
    { id: 'm3', titulo: 'Módulo 3 (sem conteúdo)' }
  ] });
}
const responder = (S, id) => { const a = reg.aulas[id]; S.resp = S.resp || {}; a.tarefa.obj.forEach(q => { S.resp[q.id] = 0; }); a.tarefa.dis.forEach(q => { S.resp[q.id] = 'texto com mais de dez letras'; }); };
const concluirAula = (S, id) => { responder(S, id); S.lidas = S.lidas || {}; S.lidas[id] = 1; };
const aprovar = (S, id, nota = 8) => { S.tent = S.tent || {}; S.tent[id] = [{ nota }]; };

console.log('Liberação');
teste('só a primeira aula está liberada no começo', () => {
  montar(); const c = M.calcular(reg, {});
  assert.strictEqual(c.itens.a1.estado, 'disponivel');
  assert.strictEqual(c.itens.a2.estado, 'bloqueado');
  assert.strictEqual(c.itens.t1.estado, 'bloqueado');
  assert.strictEqual(c.itens.w1.estado, 'bloqueado');
  assert.strictEqual(c.itens.p1.estado, 'bloqueado');
  assert.strictEqual(c.itens.b1.estado, 'bloqueado');
});
teste('ler a aula sem responder a tarefa não libera a próxima', () => {
  montar(); const S = { lidas: { a1: 1 } }; const c = M.calcular(reg, S);
  assert.strictEqual(c.itens.a1.estado, 'andamento'); assert.strictEqual(c.itens.a2.estado, 'bloqueado');
  assert.match(c.itens.a2.falta[0], /Aula a1/);
});
teste('responder a tarefa sem marcar como lida não libera a próxima', () => {
  montar(); const S = {}; responder(S, 'a1');
  assert.strictEqual(M.calcular(reg, S).itens.a2.estado, 'bloqueado');
});
teste('dissertativa abaixo do mínimo de caracteres não conta', () => {
  montar(); const S = { lidas: { a1: 1 } }; responder(S, 'a1'); S.resp['a1-d1'] = 'curta';
  assert.strictEqual(M.tarefaCompleta(reg.aulas.a1, S), false);
  assert.deepStrictEqual(M.tarefaProgresso(reg.aulas.a1, S), { feitas: 2, total: 3 });
});
teste('lida + tarefa 100% conclui a aula e libera a seguinte', () => {
  montar(); const S = {}; concluirAula(S, 'a1'); const c = M.calcular(reg, S);
  assert.strictEqual(c.itens.a1.estado, 'concluido'); assert.strictEqual(c.itens.a2.estado, 'disponivel');
  assert.strictEqual(c.proximo.id, 'a2');
});
teste('teste de bloco só abre com todas as aulas do bloco concluídas', () => {
  montar(); const S = {}; concluirAula(S, 'a1'); concluirAula(S, 'a2');
  assert.strictEqual(M.calcular(reg, S).itens.t1.estado, 'bloqueado');
  concluirAula(S, 'a3'); assert.strictEqual(M.calcular(reg, S).itens.t1.estado, 'disponivel');
});
teste('trabalho exige aulas concluídas e teste aprovado (6,9 não aprova)', () => {
  montar(); const S = {}; ['a1', 'a2', 'a3'].forEach(i => concluirAula(S, i));
  aprovar(S, 't1', 6.9); let c = M.calcular(reg, S);
  assert.strictEqual(c.itens.w1.estado, 'bloqueado'); assert.match(c.itens.w1.falta.join(' '), /Teste 1/);
  aprovar(S, 't1', 7.0); c = M.calcular(reg, S); assert.strictEqual(c.itens.w1.estado, 'disponivel');
});
teste('prova só abre com trabalho aprovado', () => {
  montar(); const S = {}; ['a1', 'a2', 'a3'].forEach(i => concluirAula(S, i)); aprovar(S, 't1');
  assert.strictEqual(M.calcular(reg, S).itens.p1.estado, 'bloqueado');
  aprovar(S, 'w1', 7); assert.strictEqual(M.calcular(reg, S).itens.p1.estado, 'disponivel');
});
teste('módulo seguinte só libera com a prova aprovada', () => {
  montar(); const S = {}; ['a1', 'a2', 'a3'].forEach(i => concluirAula(S, i)); aprovar(S, 't1'); aprovar(S, 'w1');
  let c = M.calcular(reg, S); assert.strictEqual(c.itens.b1.estado, 'bloqueado'); assert.strictEqual(c.modulos[1].estado, 'bloqueado');
  aprovar(S, 'p1', 6.5); assert.strictEqual(M.calcular(reg, S).itens.b1.estado, 'bloqueado');
  aprovar(S, 'p1', 7); c = M.calcular(reg, S);
  assert.strictEqual(c.modulos[0].estado, 'concluido'); assert.strictEqual(c.itens.b1.estado, 'disponivel');
});
teste('módulo sem conteúdo aparece como em construção e trava os seguintes', () => {
  montar(); const c = M.calcular(reg, {}); assert.strictEqual(c.modulos[2].estado, 'construcao');
});
teste('módulo de demonstração é independente da ordem e fora do progresso do curso', () => {
  montar(); reg.aula(aula('d1', 'demo'));
  reg.curso.modulos.push({ id: 'demo', demo: true, titulo: 'Demo', blocos: [{ id: 'db', aulas: ['d1'] }] });
  const S = {}; assert.strictEqual(M.calcular(reg, S).itens.d1.estado, 'disponivel');
  concluirAula(S, 'd1'); assert.strictEqual(M.progressoCurso(reg, S).feitos, 0);
});
teste('progresso do curso conta itens concluídos', () => {
  montar(); const S = {}; concluirAula(S, 'a1');
  const p = M.progressoCurso(reg, S); assert.strictEqual(p.feitos, 1); assert.strictEqual(p.total, 8);
});

console.log('Notas');
teste('aprovação com 7,0 e arredondamento de uma casa', () => {
  assert.ok(M.aprovada(7)); assert.ok(M.aprovada(7.04)); assert.ok(!M.aprovada(6.94)); assert.ok(M.aprovada(6.96)); assert.ok(!M.aprovada(null));
});
teste('nota de objetivas e de dissertativas', () => {
  assert.strictEqual(M.notaObj([{ ok: true }, { ok: true }, { ok: false }, { ok: true }]), 7.5);
  assert.strictEqual(M.notaDisQuestao([true, true, false, true]), 7.5);
  assert.strictEqual(M.notaDis([[true, true], [true, false]]), 7.5);
});
teste('prova: objetivas 60% e dissertativas 40%', () => {
  assert.ok(Math.abs(M.notaAtividade('prova', 10, 5) - 8) < 1e-9);
  assert.strictEqual(M.notaAtividade('trabalho', null, 8), 8);
});
teste('média do módulo: prova 50%, trabalho 30%, testes 20%', () => {
  montar(); const S = {}; aprovar(S, 'p1', 10); aprovar(S, 'w1', 8); aprovar(S, 't1', 5);
  const m = M.mediaModulo(reg, S, reg.curso.modulos[0]);
  assert.ok(Math.abs(m.media - (5 + 2.4 + 1)) < 1e-9); assert.ok(m.completa);
});
teste('média parcial quando falta nota', () => {
  montar(); const S = {}; aprovar(S, 'w1', 8); const m = M.mediaModulo(reg, S, reg.curso.modulos[0]);
  assert.strictEqual(m.media, 8); assert.ok(!m.completa);
});
teste('a melhor tentativa é a que vale', () => {
  montar(); const S = { tent: { t1: [{ nota: 4 }, { nota: 8 }, { nota: 6 }] } };
  assert.strictEqual(M.melhorNota(S, 't1'), 8);
});

console.log('Sorteio e tentativas');
const rngFixo = (() => { let s = 7; return () => { s = (s * 16807) % 2147483647; return s / 2147483647; }; });
teste('sorteia a quantidade pedida sem repetir', () => {
  montar(); const em = M.novaTentativa(reg.atividades.t1, {}, rngFixo());
  assert.strictEqual(em.obj.length, 3); assert.strictEqual(new Set(em.obj).size, 3); assert.strictEqual(em.dis.length, 1);
});
teste('nova tentativa prioriza questões ainda não vistas', () => {
  montar(); const at = reg.atividades.t1, S = { tent: {} };
  const e1 = M.novaTentativa(at, S, rngFixo());
  S.tent.t1 = [{ nota: 5, obj: e1.obj.map(id => ({ id })), dis: e1.dis.map(id => ({ id })) }];
  const e2 = M.novaTentativa(at, S, rngFixo());
  assert.ok(e2.obj.every(id => !e1.obj.includes(id)), 'repetiu questão vista com banco suficiente');
  assert.notStrictEqual(e2.dis[0], e1.dis[0]);
});
teste('banco menor que o sorteio devolve o que existe', () => {
  assert.strictEqual(M.sortear([{ id: 'x' }], 5, [], rngFixo()).length, 1);
});
teste('tentativa só finaliza com tudo respondido e autoavaliado', () => {
  montar(); const at = reg.atividades.t1, em = M.novaTentativa(at, {}, rngFixo());
  assert.ok(!M.prontaParaFinalizar(em));
  em.obj.forEach(id => { em.r[id] = 0; }); assert.ok(!M.prontaParaFinalizar(em));
  em.d[em.dis[0]] = { txt: 'abc', env: true, av: false, crit: [] }; assert.ok(!M.prontaParaFinalizar(em));
  em.d[em.dis[0]].av = true; assert.ok(M.prontaParaFinalizar(em));
});
teste('finalizar calcula a nota com gabarito e critérios', () => {
  montar(); const at = reg.atividades.t1, em = M.novaTentativa(at, {}, rngFixo());
  em.obj.forEach((id, i) => { const q = at.obj.find(x => x.id === id); em.r[id] = i === 0 ? q.a : (q.a + 1) % 4; });
  em.d[em.dis[0]] = { txt: 'resposta', env: true, av: true, crit: [true, true, true, false] };
  const f = M.finalizar(reg, at, em);
  assert.ok(Math.abs(f.notaObj - 10 / 3) < 1e-9); assert.strictEqual(f.notaDis, 7.5);
  assert.ok(Math.abs(f.nota - ((10 / 3) * 0.6 + 7.5 * 0.4)) < 1e-9);
});

console.log('Fila de revisão');
teste('erro entra na fila e sai quando acertado na revisão', () => {
  montar(); const S = {}; M.registrarErro(S, 'a1-o1', 'a1');
  assert.strictEqual(M.filaRevisao(reg, S).length, 1);
  M.resultadoRevisao(S, 'a1-o1', false); assert.strictEqual(S.erros['a1-o1'].n, 2);
  M.resultadoRevisao(S, 'a1-o1', true); assert.strictEqual(M.filaRevisao(reg, S).length, 0);
});
teste('questão de teste também é achada pelo id', () => {
  montar(); assert.ok(reg.questao('t1-o3')); assert.strictEqual(reg.questao('nao-existe'), null);
});

console.log('\n' + ok + ' testes passaram' + (process.exitCode ? ', COM FALHAS' : ''));

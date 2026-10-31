/* Testes da jornada (pontos, níveis e conquistas). Rodar: node tests/jornada.test.js */
const assert = require('assert');
const reg = require('../js/registro.js');
const M = require('../js/motor.js');
const J = require('../js/jornada.js');

let ok = 0;
const teste = (nome, f) => { try { f(); ok++; console.log('  ok  ' + nome); } catch (e) { console.error('FALHOU: ' + nome + '\n' + e.stack); process.exitCode = 1; } };

const obj = (id, a = 0) => ({ id, q: 'q', o: ['a', 'b', 'c', 'd'], a, e: 'e' });
const dis = id => ({ id, q: 'q', min: 10, modelo: 'm', criterios: ['c1', 'c2'] });
function montar() {
  reg.limpar();
  ['a1', 'a2'].forEach(i => reg.aula({ id: i, modulo: 'm1', titulo: 'Aula ' + i, tarefa: { obj: [obj(i + '-o1')], dis: [dis(i + '-d1')] } }));
  reg.atividade({ id: 'p1', tipo: 'prova', modulo: 'm1', titulo: 'Prova', obj: [obj('p1-o1')], dis: [dis('p1-d1')] });
  reg.defCurso({ modulos: [{ id: 'm1', titulo: 'Módulo 1', blocos: [{ id: 'b1', aulas: ['a1', 'a2'] }], prova: 'p1' }, { id: 'm2', titulo: 'Em construção' }] });
}
const concluirAula = (S, id) => { S.resp[id + '-o1'] = 0; S.resp[id + '-d1'] = 'texto com mais de dez letras'; S.lidas[id] = 1; };
const vazio = () => ({ resp: {}, lidas: {}, tent: {}, days: {}, done: {}, duv: [], anot: {}, fc: {} });

teste('aluno novo começa no nível 1, com 0 pontos e nenhuma medalha', () => {
  montar(); const j = J.calcular(reg, M, vazio());
  assert.strictEqual(j.xp, 0); assert.strictEqual(j.nivel.n, 0); assert.strictEqual(j.nivel.nome, 'Curioso');
  assert.strictEqual(j.proximo.faltam, 100); assert.ok(j.conquistas.every(c => !c.ok));
});
teste('aula lida e tarefa completa somam pontos e dão medalhas', () => {
  montar(); const S = vazio(); concluirAula(S, 'a1'); const j = J.calcular(reg, M, S);
  assert.strictEqual(j.xp, J.PONTOS.aulaLida + J.PONTOS.tarefaCompleta);
  const g = j.conquistas.filter(c => c.ok).map(c => c.id); assert.ok(g.includes('primeira-aula') && g.includes('primeira-tarefa'));
});
teste('prova aprovada dá os pontos da prova e o bônus do módulo; vale a melhor nota, sem pontos repetidos', () => {
  montar(); const S = vazio(); concluirAula(S, 'a1'); concluirAula(S, 'a2'); S.tent.p1 = [{ nota: 5 }, { nota: 10 }];
  const j = J.calcular(reg, M, S);
  assert.strictEqual(j.xp, 2 * (J.PONTOS.aulaLida + J.PONTOS.tarefaCompleta) + J.PONTOS.prova + J.PONTOS.modulo);
  const g = j.conquistas.filter(c => c.ok).map(c => c.id);
  ['aprovado', 'nota-10', 'persistente', 'modulo-1'].forEach(id => assert.ok(g.includes(id), id));
  assert.ok(!g.includes('curso'), 'o módulo em construção impede o curso de estar completo');
});
teste('nota 6,96 não aprova e não rende os pontos da prova', () => {
  montar(); const S = vazio(); concluirAula(S, 'a1'); concluirAula(S, 'a2'); S.tent.p1 = [{ nota: 6.96 }];
  assert.strictEqual(J.calcular(reg, M, S).xp, 2 * (J.PONTOS.aulaLida + J.PONTOS.tarefaCompleta));
});
teste('o nível sobe ao passar do limite', () => {
  montar(); const S = vazio(); for (let i = 1; i <= 25; i++) S.days['2026-01-' + String(i).padStart(2, '0')] = 900;
  const j = J.calcular(reg, M, S); assert.strictEqual(j.xp, 125); assert.strictEqual(j.nivel.nome, 'Aprendiz');
  assert.strictEqual(j.proximo.faltam, 125); assert.strictEqual(j.proximo.pct, 17);
});
teste('sequência de dias: conta dias seguidos com 10 min ou mais, e hoje sem estudo não quebra', () => {
  const hoje = new Date(2026, 9, 31, 15);
  assert.strictEqual(J.sequencia({ '2026-10-30': 600, '2026-10-29': 700, '2026-10-27': 900 }, hoje), 2);
  assert.strictEqual(J.sequencia({ '2026-10-31': 600, '2026-10-30': 599 }, hoje), 1);
  assert.strictEqual(J.maiorSequencia({ '2026-10-01': 600, '2026-10-02': 600, '2026-10-03': 600, '2026-10-10': 600 }), 3);
});
teste('medalhas de hábito: dúvidas, anotações, cartões e backup', () => {
  montar(); const S = vazio(); S.duv = [1, 2, 3, 4, 5]; S.anot = { a1: 'x', a2: 'y', a3: 'z', a4: '  ' };
  for (let i = 0; i < 10; i++) S.fc['t' + i] = 1; S.bk = Date.now();
  const g = J.calcular(reg, M, S).conquistas.filter(c => c.ok).map(c => c.id);
  ['curioso', 'anotador', 'cartoes', 'backup'].forEach(id => assert.ok(g.includes(id), id));
});
teste('aguenta um progresso quase vazio, sem campos', () => { montar(); assert.strictEqual(J.calcular(reg, M, {}).xp, 0); });

console.log(ok + ' testes passaram');

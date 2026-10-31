/* Testa o validador: ele precisa aceitar o conteúdo bom e REPROVAR cada tipo de defeito. Rodar: node tests/validador.test.js */
const assert = require('assert');
const path = require('path');
const { validarRegistro, carregar } = require('../tools/validar-conteudo.js');
const raiz = path.resolve(__dirname, '..');
let ok = 0;
const teste = (nome, f) => { try { f(); ok++; console.log('  ok  ' + nome); } catch (e) { console.error('FALHOU: ' + nome + '\n' + e.stack); process.exitCode = 1; } };
const novo = () => carregar(raiz);
const falha = (reg, trecho, opc) => { const r = validarRegistro(reg, opc); assert.ok(r.erros.some(e => e.includes(trecho)), 'esperava erro com “' + trecho + '”, veio: ' + JSON.stringify(r.erros.slice(0, 4))); };

teste('o conteúdo atual do repositório passa sem erros', () => { const r = validarRegistro(novo()); assert.deepStrictEqual(r.erros, []); });
teste('reprova aula sem uma das 10 partes', () => { const r = novo(); r.aulas['demo-a01'].partes.splice(3, 1); falha(r, 'precisa das 10 partes'); });
teste('reprova parte vazia', () => { const r = novo(); r.aulas['demo-a01'].partes[4].html = ' '; falha(r, 'está vazia'); });
teste('reprova termo novo que não existe no glossário', () => { const r = novo(); r.aulas['demo-a01'].partes[9].termos.push('Termo Fantasma'); falha(r, 'Termo Fantasma'); });
teste('reprova índice do gabarito inválido', () => { const r = novo(); r.aulas['demo-a01'].tarefa.obj[0].a = 4; falha(r, 'índice do gabarito inválido'); });
teste('reprova gabarito que não é número', () => { const r = novo(); r.atividades['demo-prova'].obj[0].a = '2'; falha(r, 'índice do gabarito inválido'); });
teste('reprova id duplicado', () => { const r = novo(); r.aulas['demo-a02'].tarefa.obj[0].id = 'demo-a01-o1'; falha(r, 'id duplicado'); });
teste('reprova questão sem explicação', () => { const r = novo(); r.aulas['demo-a01'].tarefa.obj[0].e = ''; falha(r, 'explicação'); });
teste('reprova alternativas repetidas ou em número errado', () => { const r = novo(); r.aulas['demo-a01'].tarefa.obj[0].o = ['a', 'b', 'c']; falha(r, '4 alternativas'); const s = novo(); s.aulas['demo-a01'].tarefa.obj[0].o = ['a', 'a', 'b', 'c']; falha(s, 'repetidas'); });
teste('reprova dissertativa sem resposta-modelo ou com poucos critérios', () => { const r = novo(); r.aulas['demo-a01'].tarefa.dis[0].modelo = ''; falha(r, 'resposta-modelo'); const s = novo(); s.aulas['demo-a01'].tarefa.dis[0].criterios = ['só um']; falha(s, '3 a 5 critérios'); });
teste('reprova questão ligada a objetivo inexistente', () => { const r = novo(); r.atividades['demo-prova'].obj[0].obj = 9; falha(r, 'objetivo'); });
teste('reprova questão de teste ligada a aula de fora do bloco', () => { const r = novo(); r.aulas['x'] = JSON.parse(JSON.stringify(r.aulas['demo-a01'])); r.aulas['x'].id = 'x'; r.atividades['demo-teste1'].obj[0].aula = 'x'; falha(r, 'não pertence'); });
teste('reprova referência sem campos exigidos', () => {
  const r = novo(); r.aulas['demo-a01'].referencias = [{ autor: 'A', titulo: 'T', ano: 2020, tipo: 'livro', idioma: 'pt', link: 'https://exemplo.org', verificado: '2026-10-31' }];
  falha(r, 'falta o campo “ler”');
});
teste('reprova referência sem verificação nem marca de não verificado', () => {
  const r = novo(); r.aulas['demo-a01'].referencias = [{ autor: 'A', titulo: 'T', ano: 2020, tipo: 'livro', idioma: 'pt', link: 'https://exemplo.org', ler: 'cap. 1' }];
  falha(r, 'verificado');
});
teste('referência não verificada exige registro em docs/PENDENCIAS.md', () => {
  const r = novo(); r.aulas['demo-a01'].referencias = [{ autor: 'A', titulo: 'T', ano: 2020, tipo: 'livro', idioma: 'pt', link: 'https://exemplo.org', ler: 'cap. 1', naoVerificado: true }];
  falha(r, 'PENDENCIAS.md', { pendencias: 'nada aqui' });
  assert.deepStrictEqual(validarRegistro(r, { pendencias: 'demo-a01: referência a verificar' }).erros, []);
});
teste('módulo de verdade exige 2 a 5 referências, 5 a 8 objetivas e 7 a 14 aulas', () => {
  const r = novo(); r.curso.modulos.find(m => m.id === 'demo').demo = false; const e = validarRegistro(r).erros.join('\n');
  assert.match(e, /referências: precisa de 2 a 5/); assert.match(e, /5 a 8 objetivas/); assert.match(e, /7 a 14 aulas/); assert.match(e, /sorteio menor que o padrão/);
});
teste('prova precisa de banco com o dobro do sorteio', () => { const r = novo(); r.atividades['demo-prova'].obj = r.atividades['demo-prova'].obj.slice(0, 5); falha(r, 'banco de objetivas pequeno'); });
teste('reprova aula e atividade fora do índice e arquivo fora do índice', () => {
  const r = novo(); r.aula({ id: 'solta' }); falha(r, 'não consta em nenhum bloco');
  const s = novo(); s.curso.arquivos = s.curso.arquivos.slice(1); s.erros.push('x'); falha(s, 'registro: x');
});
teste('reprova todas as corretas na mesma posição', () => { const r = novo(); r.atividades['demo-prova'].obj.forEach(q => { const c = q.o[q.a]; q.o.splice(q.a, 1); q.o.unshift(c); q.a = 0; }); falha(r, 'mesma posição'); });
teste('reprova bloco sem teste e módulo sem prova', () => {
  const r = novo(); delete r.curso.modulos.find(m => m.id === 'demo').blocos[0].teste; falha(r, 'falta o teste de bloco');
  const s = novo(); s.curso.modulos.find(m => m.id === 'demo').prova = 'nao-existe'; falha(s, 'falta a prova do módulo');
});
console.log('\n' + ok + ' testes passaram' + (process.exitCode ? ', COM FALHAS' : ''));

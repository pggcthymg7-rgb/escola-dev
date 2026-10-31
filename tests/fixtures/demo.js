/* Módulo de demonstração do motor, usado só pelos testes automáticos.
   Ele saiu do site no Marco 2, mas continua sendo o material estável que os testes percorrem
   (liberação, tarefas, dissertativas, notas, boletim). Assim os testes não dependem do conteúdo real do curso. */
const fs = require('fs'), path = require('path'), vm = require('vm');

const ARQUIVOS = ['aula-01', 'aula-02', 'aula-03', 'teste-1', 'trabalho', 'prova'].map(f => 'tests/fixtures/modulo-demo/' + f + '.js');
const MODULO = {
  id: 'demo', titulo: 'Demonstração do motor da escola', demo: true,
  descricao: 'Módulo pequeno, só para testar liberação, tarefas, testes, dissertativas e boletim. Não conta no progresso do curso.',
  blocos: [{ id: 'demo-b1', aulas: ['demo-a01', 'demo-a02', 'demo-a03'], teste: 'demo-teste1' }],
  trabalho: 'demo-trabalho', prova: 'demo-prova'
};

// Acrescenta a demonstração a um registro já carregado (validador e testes em Node).
function acrescentar(reg, raiz) {
  reg.curso.modulos.push(JSON.parse(JSON.stringify(MODULO)));
  reg.curso.arquivos = (reg.curso.arquivos || []).concat(ARQUIVOS);
  const ctx = vm.createContext({ Escola: reg });
  ARQUIVOS.forEach(f => vm.runInContext(fs.readFileSync(path.join(raiz, f), 'utf8'), ctx, { filename: f }));
  return reg;
}

// Trecho que o servidor dos testes de navegador acrescenta ao content/indice.js, para o app carregar a demonstração.
const trechoNavegador = '\n;(function(r){var c=r.Escola.curso;c.modulos.push(' + JSON.stringify(MODULO) + ');c.arquivos=c.arquivos.concat(' + JSON.stringify(ARQUIVOS) + ');})(typeof self!=="undefined"?self:this);\n';

module.exports = { ARQUIVOS, MODULO, acrescentar, trechoNavegador };

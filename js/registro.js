/* Registro do conteúdo do curso. Os arquivos em content/ chamam estas funções.
   Roda no navegador (window.Escola), no service worker e no Node (validador e testes). */
(function (raiz) {
  const R = {
    aulas: {}, atividades: {}, curso: { modulos: [], arquivos: [] }, G: [], erros: [],
    defCurso(c) { R.curso = c; },
    aula(a) { if (R.aulas[a.id]) R.erros.push('aula duplicada: ' + a.id); R.aulas[a.id] = a; },
    atividade(a) { if (R.atividades[a.id]) R.erros.push('atividade duplicada: ' + a.id); R.atividades[a.id] = a; },
    glossario(lista) { R.G = lista.slice().sort((x, y) => x[0].localeCompare(y[0], 'pt')); },
    modulo(id) { return R.curso.modulos.find(m => m.id === id); },
    // Todas as questões objetivas e dissertativas que existem (tarefas e atividades), por id.
    questao(id) {
      for (const a of Object.values(R.aulas)) {
        const t = a.tarefa || {};
        for (const q of (t.obj || [])) if (q.id === id) return Object.assign({ aula: a.id }, q);
      }
      for (const v of Object.values(R.atividades)) {
        for (const q of (v.obj || [])) if (q.id === id) return q;
      }
      return null;
    },
    limpar() { R.aulas = {}; R.atividades = {}; R.curso = { modulos: [], arquivos: [] }; R.G = []; R.erros = []; }
  };
  if (typeof module !== 'undefined' && module.exports) module.exports = R; else raiz.Escola = R;
})(typeof self !== 'undefined' ? self : this);

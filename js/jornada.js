/* Jornada: pontos, níveis e conquistas. Tudo é calculado a partir do progresso que já existe,
   então não há nada novo para migrar: se uma regra mudar, os pontos se recalculam sozinhos.
   Roda no navegador e no Node (testes). */
(function (raiz) {
  const J = {};

  // Quanto vale cada coisa. Ler e responder conta pouco; ser aprovado conta mais.
  J.PONTOS = { aulaLida: 20, tarefaCompleta: 30, teste: 60, trabalho: 100, prova: 150, modulo: 200, diaEstudo: 5, legado: 10 };

  // Níveis: pontos mínimos, nome e ícone. O último é a meta do curso.
  J.NIVEIS = [
    [0, 'Curioso', '🌱'], [100, 'Aprendiz', '📘'], [250, 'Explorador', '🧭'], [500, 'Construtor', '🧱'],
    [900, 'Leitor de código', '🔍'], [1400, 'Depurador', '🐞'], [2000, 'Arquiteto', '📐'], [2800, 'Auditor', '🛡️'],
    [3800, 'Engenheiro', '⚙️'], [5000, 'Mestre do ofício', '🎓'], [6500, 'Vibe coder consciente', '🚀']
  ];

  const chave = d => d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
  // Dias seguidos com 10 minutos ou mais (a mesma regra do painel). Hoje ainda sem estudo não quebra a sequência.
  J.sequencia = (days, agora) => {
    days = days || {}; let n = 0; const d = new Date(agora || Date.now()), hoje = chave(d);
    for (let i = 0; i < 400; i++) { const k = chave(d); if ((days[k] || 0) >= 600) n++; else if (n > 0 || k !== hoje) break; d.setDate(d.getDate() - 1); }
    return n;
  };

  J.CONQUISTAS = [
    ['primeira-aula', '📖', 'Primeira página', 'Marque sua primeira aula como lida.', x => x.lidas >= 1],
    ['primeira-tarefa', '✍️', 'Mão na massa', 'Responda 100% de uma tarefa.', x => x.tarefas >= 1],
    ['aprovado', '✅', 'Aprovado!', 'Tire 7,0 ou mais em um teste, trabalho ou prova.', x => x.aprovacoes >= 1],
    ['nota-10', '🌟', 'Nota máxima', 'Tire 10 em qualquer avaliação.', x => x.notaDez],
    ['persistente', '🔁', 'Persistente', 'Faça uma nova tentativa de uma avaliação.', x => x.refez],
    ['modulo-1', '🏝️', 'Primeira ilha', 'Conclua um módulo do curso.', x => x.modulos >= 1],
    ['modulo-6', '🗺️', 'Meio do mapa', 'Conclua 6 módulos.', x => x.modulos >= 6],
    ['curso', '🏆', 'Vibe coder consciente', 'Conclua todos os módulos do curso.', x => x.cursoCompleto],
    ['seq-3', '🔥', 'Pegando ritmo', 'Estude 3 dias seguidos.', x => x.maiorSeq >= 3],
    ['seq-7', '⚡', 'Uma semana firme', 'Estude 7 dias seguidos.', x => x.maiorSeq >= 7],
    ['seq-30', '💎', 'Hábito de verdade', 'Estude 30 dias seguidos.', x => x.maiorSeq >= 30],
    ['horas-10', '⏳', '10 horas de estudo', 'Some 10 horas com a escola aberta.', x => x.minutos >= 600],
    ['curioso', '💭', 'Mente curiosa', 'Anote 5 dúvidas ou curiosidades.', x => x.duvidas >= 5],
    ['anotador', '🗒️', 'Caderno vivo', 'Escreva anotações em 3 aulas.', x => x.anotacoes >= 3],
    ['cartoes', '🃏', 'Memória treinada', 'Revise 10 termos nos cartões.', x => x.cartoes >= 10],
    ['backup', '💾', 'Prevenido', 'Faça seu primeiro backup.', x => x.backup]
  ];

  // Maior sequência de dias seguidos em todo o histórico (para as conquistas não sumirem quando a sequência quebra).
  J.maiorSequencia = days => {
    const ks = Object.keys(days || {}).filter(k => days[k] >= 600).sort(); let melhor = 0, atual = 0, ant = null;
    ks.forEach(k => { const d = new Date(k + 'T12:00:00'); atual = ant && Math.round((d - ant) / 86400000) === 1 ? atual + 1 : 1; ant = d; melhor = Math.max(melhor, atual); });
    return melhor;
  };

  J.calcular = (reg, M, S, agora) => {
    S = S || {}; const P = J.PONTOS, c = M.calcular(reg, S);
    const x = { lidas: 0, tarefas: 0, aprovacoes: 0, notaDez: false, refez: false, modulos: 0, cursoCompleto: false };
    let xp = 0;
    c.modulos.forEach(m => {
      m.itens.forEach(it => {
        if (it.k === 'aula') {
          const a = reg.aulas[it.id]; if (!a) return;
          if (M.aulaLida(a, S)) { xp += P.aulaLida; x.lidas++; }
          if (M.tarefaCompleta(a, S)) { xp += P.tarefaCompleta; x.tarefas++; }
        } else {
          const ts = M.tentativas(S, it.id), b = M.melhorNota(S, it.id);
          if (ts.length > 1) x.refez = true;
          if (b != null && b >= 10 - 1e-9) x.notaDez = true;
          if (b != null && M.aprovada(b)) { xp += P[it.k] || 0; x.aprovacoes++; }
        }
      });
      if (!m.demo && m.itens.length && m.estado === 'concluido') { xp += P.modulo; x.modulos++; }
    });
    const reais = c.modulos.filter(m => !m.demo);
    x.cursoCompleto = reais.length > 0 && reais.every(m => m.itens.length && m.estado === 'concluido');
    const dias = Object.keys(S.days || {}).filter(k => S.days[k] >= 600).length;
    xp += dias * P.diaEstudo;
    xp += Object.keys(S.done || {}).filter(k => S.done[k]).length * P.legado;
    x.minutos = Math.round(Object.values(S.days || {}).reduce((s, v) => s + (+v || 0), 0) / 60);
    x.maiorSeq = J.maiorSequencia(S.days);
    x.duvidas = (S.duv || []).length;
    x.anotacoes = Object.keys(S.anot || {}).filter(k => String(S.anot[k] || '').trim().length > 0).length;
    x.cartoes = Object.keys(S.fc || {}).length;
    x.backup = !!S.bk;

    let n = 0; J.NIVEIS.forEach((nv, i) => { if (xp >= nv[0]) n = i; });
    const nv = J.NIVEIS[n], prox = J.NIVEIS[n + 1];
    return {
      xp, sequencia: J.sequencia(S.days, agora),
      nivel: { n, nome: nv[1], icone: nv[2], min: nv[0] },
      proximo: prox ? { nome: prox[1], icone: prox[2], min: prox[0], faltam: prox[0] - xp, pct: Math.round(100 * (xp - nv[0]) / (prox[0] - nv[0])) } : null,
      conquistas: J.CONQUISTAS.map(k => ({ id: k[0], icone: k[1], titulo: k[2], desc: k[3], ok: !!k[4](x) })),
      fatos: x
    };
  };

  if (typeof module !== 'undefined' && module.exports) module.exports = J; else raiz.EscolaJornada = J;
})(typeof self !== 'undefined' ? self : this);

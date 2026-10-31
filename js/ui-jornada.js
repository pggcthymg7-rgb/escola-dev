/* Parte lúdica da interface: cartão de nível no início, tela de conquistas e comemorações.
   As comemorações aparecem por cima da tela sem bloquear nenhum toque e somem sozinhas. */
(function () {
  const reg = Escola, M = EscolaMotor, J = EscolaJornada, UI = window.UI, esc = UI.esc, T = UI.telas;

  UI.jornada = () => J.calcular(reg, M, UI.S);

  const saudacao = () => { const h = new Date().getHours(); return h < 5 ? 'Boa madrugada' : h < 12 ? 'Bom dia' : h < 18 ? 'Boa tarde' : 'Boa noite'; };

  // Cartão do topo do início: nível, pontos, barra até o próximo nível e sequência de dias.
  UI.heroi = () => {
    const j = UI.jornada(), ganhas = j.conquistas.filter(c => c.ok).length, p = j.proximo;
    return '<div class="heroi"><div class="heroi-top"><span class="avatar" aria-hidden="true">' + j.nivel.icone + '</span><div style="flex:1;min-width:0">' +
      '<div class="heroi-ola">' + saudacao() + '! Você está no</div><div class="heroi-nivel">Nível ' + (j.nivel.n + 1) + ' · ' + esc(j.nivel.nome) + '</div>' +
      '<div class="heroi-xp">' + j.xp + ' pontos</div></div><div class="fogo" title="Dias seguidos de estudo"><span aria-hidden="true">🔥</span><b>' + j.sequencia + '</b><small>' + (j.sequencia === 1 ? 'dia' : 'dias') + '</small></div></div>' +
      (p ? '<div class="xpbar" role="progressbar" aria-label="Pontos até o próximo nível" aria-valuemin="0" aria-valuemax="100" aria-valuenow="' + p.pct + '"><i style="width:' + p.pct + '%"></i></div><div class="heroi-prox">Faltam ' + p.faltam + ' pontos para ' + p.icone + ' ' + esc(p.nome) + '</div>'
        : '<div class="heroi-prox">Você chegou ao topo da jornada. 🎉</div>') +
      '<button class="btn s heroi-btn" data-a="nav" data-i="conq">🏅 Conquistas: ' + ganhas + ' de ' + j.conquistas.length + '</button></div>';
  };

  T.conq = () => {
    const j = UI.jornada(), P = J.PONTOS;
    let h = '<button class="btn g s" data-a="nav" data-i="home">Voltar ao início</button><h1 style="margin-top:14px">Sua jornada</h1>';
    h += '<p class="mu">Os pontos e as medalhas existem para deixar o caminho mais gostoso. Quem decide o avanço no curso continua sendo o que você domina: aulas lidas, tarefas respondidas e aprovações.</p>';
    h += '<h2>Os níveis</h2><div class="niveis">' + J.NIVEIS.map((nv, i) => '<div class="nv ' + (i < j.nivel.n ? 'passou' : i === j.nivel.n ? 'aqui' : '') + '"><span aria-hidden="true">' + nv[2] + '</span><b>' + (i + 1) + '. ' + esc(nv[1]) + '</b><small>' + nv[0] + ' pts' + (i === j.nivel.n ? ' · você está aqui' : '') + '</small></div>').join('') + '</div>';
    h += '<h2>Medalhas</h2><div class="medalhas">' + j.conquistas.map(c => '<div class="med ' + (c.ok ? 'ok' : '') + '"><span class="med-i" aria-hidden="true">' + (c.ok ? c.icone : '🔒') + '</span><b>' + esc(c.titulo) + '</b><small>' + esc(c.desc) + '</small>' + (c.ok ? '<span class="pill ok">ganha</span>' : '') + '</div>').join('') + '</div>';
    h += '<h2>Como ganhar pontos</h2><div class="card"><ul class="ganhos">' +
      [['📖', 'Ler uma aula até o fim e marcar como lida', P.aulaLida], ['✍️', 'Responder 100% da tarefa da aula', P.tarefaCompleta], ['✅', 'Ser aprovado num teste de bloco', P.teste],
        ['🛠️', 'Ser aprovado no trabalho do módulo', P.trabalho], ['🎓', 'Ser aprovado na prova do módulo', P.prova], ['🏝️', 'Concluir um módulo inteiro', P.modulo],
        ['🔥', 'Cada dia com 10 minutos ou mais de estudo', P.diaEstudo], ['📜', 'Cada item concluído no material anterior', P.legado]]
        .map(g => '<li><span aria-hidden="true">' + g[0] + '</span><span style="flex:1">' + g[1] + '</span><b>+' + g[2] + '</b></li>').join('') + '</ul>' +
      '<p class="mu" style="margin:8px 0 0">Os pontos do módulo de demonstração deixam de contar quando ele for retirado, no Marco 2. Refazer uma avaliação não dá pontos repetidos: vale a melhor nota.</p></div>';
    return h;
  };

  /* ---- comemorações ---- */
  const fila = [];
  let mostrando = false;
  function proxima() {
    if (mostrando || !fila.length) return;
    mostrando = true;
    const f = fila.shift();
    let box = document.getElementById('festa');
    if (!box) { box = document.createElement('div'); box.id = 'festa'; box.setAttribute('aria-live', 'polite'); document.body.appendChild(box); }
    const confete = Array.from({ length: 18 }, (_, i) => '<i style="--x:' + (Math.round(Math.random() * 200) - 100) + 'px;--d:' + (i * 40) + 'ms;--c:' + ['#14b8a6', '#8b5cf6', '#f59e0b', '#f43f5e', '#22c55e'][i % 5] + '"></i>').join('');
    box.innerHTML = '<div class="festa-card"><div class="confete" aria-hidden="true">' + confete + '</div><span class="festa-i" aria-hidden="true">' + f.icone + '</span><div><b>' + esc(f.titulo) + '</b><div>' + esc(f.texto) + '</div></div></div>';
    box.classList.add('on');
    setTimeout(() => { box.classList.remove('on'); setTimeout(() => { mostrando = false; proxima(); }, 350); }, 4200);
  }
  UI.festejar = (icone, titulo, texto) => { fila.push({ icone, titulo, texto }); proxima(); };

  // Depois de cada tela desenhada, compara com o que já foi comemorado e festeja o que for novo.
  UI.celebrar = () => {
    const S = UI.S, j = UI.jornada(), ganhas = j.conquistas.filter(c => c.ok).map(c => c.id);
    if (!S.jv) { S.jv = { n: j.nivel.n, c: ganhas }; UI.salvarLogo(); return; }   // primeira vez: só registra, sem festa
    const novas = j.conquistas.filter(c => c.ok && S.jv.c.indexOf(c.id) < 0);
    const subiu = j.nivel.n > S.jv.n;
    if (!novas.length && !subiu && ganhas.length === S.jv.c.length) return;
    novas.forEach(c => UI.festejar(c.icone, 'Medalha: ' + c.titulo, c.desc));
    if (subiu) UI.festejar(j.nivel.icone, 'Você subiu de nível!', 'Agora você é Nível ' + (j.nivel.n + 1) + ': ' + j.nivel.nome + '.');
    S.jv = { n: Math.max(S.jv.n, j.nivel.n), c: ganhas.concat(S.jv.c.filter(id => ganhas.indexOf(id) < 0)) };
    UI.salvarLogo();
  };
  const desenhar = UI.render;
  UI.render = () => { desenhar(); try { UI.celebrar(); } catch (e) { /* a festa nunca pode quebrar a escola */ } };
})();

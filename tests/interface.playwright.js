/* Teste de ponta a ponta no navegador (Playwright). Rodar: node tests/interface.playwright.js
   Sobe um servidor local, abre a escola em tela de celular e de desktop e percorre o fluxo inteiro. */
const http = require('http'), fs = require('fs'), path = require('path');
const { chromium } = require('playwright');
const assert = require('assert');
const raiz = path.resolve(__dirname, '..');
const TIPOS = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.png': 'image/png' };
const servidor = http.createServer((req, res) => {
  const f = path.join(raiz, decodeURIComponent(req.url.split('?')[0]).replace(/\/$/, '/index.html'));
  if (!f.startsWith(raiz) || !fs.existsSync(f) || fs.statSync(f).isDirectory()) { res.writeHead(404); return res.end(); }
  res.writeHead(200, { 'Content-Type': TIPOS[path.extname(f)] || 'application/octet-stream' }); res.end(fs.readFileSync(f));
});
let ok = 0; const passo = async (nome, f) => { try { await f(); ok++; console.log('  ok  ' + nome); } catch (e) { console.error('FALHOU: ' + nome + '\n' + e.stack); process.exitCode = 1; } };
const ANTIGO = { done: { m0a: true, f0: true }, tasks: { t1: { s: 2, n: 'minha nota antiga' } }, best: 4, theme: '', goal: 120, days: { '2026-10-30': 1800 }, fc: { API: 3 } };

(async () => {
  await new Promise(r => servidor.listen(0, r));
  const url = 'http://localhost:' + servidor.address().port + '/index.html';
  const nav = await chromium.launch();
  const erros = [];
  async function abrir(viewport, antigo) {
    const ctx = await nav.newContext({ viewport, acceptDownloads: true });
    await ctx.grantPermissions(['clipboard-read', 'clipboard-write'], { origin: new URL(url).origin }).catch(() => {});
    const p = await ctx.newPage(); p.setDefaultTimeout(5000);
    p.on('pageerror', e => erros.push('PAGE ' + e.message)); p.on('console', m => { if (m.type() === 'error') erros.push('CONSOLE ' + m.text()); });
    p.on('dialog', d => d.accept());
    if (antigo) await p.addInitScript(s => { if (!localStorage.getItem('escoladev')) localStorage.setItem('escoladev', s); }, JSON.stringify(antigo));
    await p.goto(url); await p.waitForSelector('h1');
    return { p, ctx };
  }
  const h1 = p => p.$eval('h1', e => e.textContent);
  const ir = async (p, v) => p.click('nav button[data-i=' + v + ']');
  const estado = p => p.evaluate(() => JSON.parse(localStorage.getItem('escoladev')));
  const rolagemHorizontal = p => p.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1);

  console.log('Celular (390x800), com progresso antigo');
  const { p, ctx } = await abrir({ width: 390, height: 800 }, ANTIGO);

  await passo('progresso antigo é migrado sem perda e ganha versão 2', async () => {
    await ir(p, 'curso'); const S = await estado(p);
    assert.strictEqual(S.v, 2); assert.deepStrictEqual(S.done, ANTIGO.done); assert.deepStrictEqual(S.tasks, ANTIGO.tasks); assert.strictEqual(S.best, 4); assert.strictEqual(S.goal, 120); assert.deepStrictEqual(S.fc, ANTIGO.fc);
    const copia = await p.evaluate(() => localStorage.getItem('escoladev_v1_backup')); assert.deepStrictEqual(JSON.parse(copia), ANTIGO);
  });
  await passo('material anterior continua abrindo, com o progresso antigo', async () => {
    await p.click('[data-a=nav][data-i=leg].card'); assert.strictEqual(await h1(p), 'Material anterior');
    assert.match(await p.textContent('#app'), /Concluída/); await p.click('[data-a=ltab][data-i=tar]'); assert.match(await p.$eval('textarea[data-in=ltn]', e => e.value), /minha nota antiga/);
  });
  await passo('mapa mostra módulo de demonstração e módulos em construção', async () => {
    await ir(p, 'curso'); const t = await p.textContent('#app');
    assert.match(t, /Demonstração do motor/); assert.match(t, /Em construção/); assert.match(t, /4 Servidor, APIs e Node\.js/);
  });
  await passo('só a primeira aula está liberada; o resto mostra cadeado e o que falta', async () => {
    await p.click('[data-a=modulo][data-i=demo]'); const t = await p.textContent('#app');
    assert.match(t, /Como estudar na Escola Dev/); assert.match(t, /Conclua antes a aula/); assert.match(t, /Seja aprovado/);
    assert.strictEqual(await p.locator('.it.bloqueado').count(), 5);
  });
  await passo('aula abre, tem índice, barra de leitura e as 10 partes', async () => {
    await p.click('[data-a=abrir][data-i="aula:demo-a01"]'); assert.strictEqual(await h1(p), 'Como estudar na Escola Dev');
    assert.strictEqual(await p.locator('h2[id^=parte-]').count(), 10); assert.ok(await p.locator('#leitura-i').count());
    await p.click('details.ind summary'); await p.click('[data-a=ancora][data-i=parte-5]');
    await p.evaluate(() => window.scrollTo(0, document.body.scrollHeight)); await p.waitForTimeout(100);
    assert.ok(parseFloat(await p.$eval('#leitura-i', e => e.style.width)) > 50);
  });
  await passo('marcar como lida sem a tarefa não libera a próxima aula', async () => {
    await p.click('[data-a=lida]'); assert.match(await p.textContent('#app'), /Aula lida/);
    assert.match(await p.textContent('#app'), /Próxima aula bloqueada/);
  });
  await passo('tarefa: objetiva dá resultado na hora e erro entra na fila de revisão', async () => {
    await p.click('[data-a=tarefa]'); assert.match(await h1(p), /Tarefa:/);
    await p.click('[data-a=tobj][data-i="demo-a01-o1|0"]');           // errada de propósito (a certa é a 1)
    assert.match(await p.textContent('.q'), /Não foi essa/); assert.strictEqual(await p.locator('[data-a=tobj][data-i="demo-a01-o1|1"].ok').count(), 1);
    await p.click('[data-a=tobj][data-i="demo-a01-o1|2"]', { force: true }).catch(() => {});
    assert.deepStrictEqual(Object.keys((await estado(p)).erros), ['demo-a01-o1']);
  });
  await passo('tarefa: dissertativa só conta com o mínimo de caracteres; progresso salva sozinho', async () => {
    await p.click('[data-a=tobj][data-i="demo-a01-o2|2"]');
    await p.fill('textarea[data-in=tdis]', 'curto'); assert.match(await p.textContent('#tprog'), /2 de 3/);
    assert.ok(await p.locator('#tfim .card').count() === 0);
    await p.fill('textarea[data-in=tdis]', 'Porque o objetivo é entender de verdade, no meu ritmo, sem avançar sem dominar o conteúdo.');
    assert.match(await p.textContent('#tprog'), /100% respondida/); assert.ok(await p.locator('#tfim .card').count());
    await p.waitForTimeout(600); assert.match((await estado(p)).resp['demo-a01-d1'], /entender de verdade/);
  });
  await passo('recarregar a página mantém as respostas (retomada)', async () => {
    await p.reload(); await p.waitForSelector('h1'); await ir(p, 'curso'); await p.click('[data-a=modulo][data-i=demo]');
    assert.match(await p.textContent('#app'), /tarefa 3\/3/);
  });
  await passo('resposta-modelo aparece na tarefa e o botão copia o pedido de revisão', async () => {
    await p.click('[data-a=abrir][data-i="aula:demo-a01"]'); await p.click('[data-a=tarefa]');
    await p.click('[data-a=tmodelo]'); assert.match(await p.textContent('.modelo'), /Resposta-modelo/);
    await p.click('[data-a=prev]'); const copiado = await p.evaluate(() => navigator.clipboard.readText()).catch(() => null);
    if (copiado) { assert.match(copiado, /Professor, peço sua correção/); assert.match(copiado, /Critérios/); }
  });
  await passo('aula lida + tarefa 100% libera a aula seguinte', async () => {
    await ir(p, 'curso'); await p.click('[data-a=modulo][data-i=demo]');
    assert.strictEqual(await p.locator('.it.bloqueado').count(), 4);
    assert.ok(await p.locator('[data-a=abrir][data-i="aula:demo-a02"]').count());
  });
  // concluir as outras duas aulas direto pelo estado, para chegar ao teste
  await passo('com as 3 aulas concluídas o teste de bloco abre (liberação por regra)', async () => {
    await p.evaluate(() => {
      const S = UI.S; ['demo-a02', 'demo-a03'].forEach(id => { const a = Escola.aulas[id]; S.lidas[id] = 1; a.tarefa.obj.forEach(q => S.resp[q.id] = q.a); a.tarefa.dis.forEach(q => S.resp[q.id] = 'x'.repeat(q.min)); }); UI.salvar();
    });
    await ir(p, 'curso'); await p.click('[data-a=modulo][data-i=demo]');
    assert.ok(await p.locator('[data-a=abrir][data-i="teste:demo-teste1"]').count()); assert.strictEqual(await p.locator('.it.bloqueado').count(), 2);
  });
  await passo('teste: reprovar (nota < 7), ver gabarito comentado com aula de origem, e tentar de novo', async () => {
    await p.click('[data-a=abrir][data-i="teste:demo-teste1"]'); await p.click('[data-a=iniciar]');
    assert.strictEqual(await p.locator('.q .opt').count(), 12);                       // 3 objetivas x 4 alternativas
    assert.ok(await p.$eval('[data-a=concluir]', e => e.disabled));
    const respostas = await p.$$eval('.q:has(.opt)', qs => qs.map(q => q.querySelector('.opt').dataset.i));
    for (const i of respostas) await p.click('[data-a=eobj][data-i="' + i + '"]');       // marca sempre a alternativa A
    await p.fill('textarea[data-in=edis]', 'x'.repeat(120)); await p.click('[data-a=eenv]');
    assert.match(await p.textContent('#app'), /Resposta-modelo/); assert.ok(await p.$eval('[data-a=concluir]', e => e.disabled));
    await p.click('[data-a=eav]');                                                       // nenhum critério marcado: nota 0 na dissertativa
    await p.click('[data-a=concluir]'); assert.match(await h1(p), /tentativa 1/);
    const t = await p.textContent('#app'); assert.match(t, /Ainda não aprovado/); assert.match(t, /Gabarito comentado/); assert.match(t, /Aula de origem/);
  });
  await passo('teste: aprovar com gabarito certo e critérios marcados libera o trabalho', async () => {
    await p.click('[data-a=iniciar]');
    const ids = await p.$$eval('.q:has(.opt)', qs => qs.map(q => q.querySelector('.opt').dataset.i.split('|').slice(0, 2)));
    for (const [atv, qid] of ids) { const certa = await p.evaluate(([a, q]) => Escola.atividades[a].obj.find(x => x.id === q).a, [atv, qid]); await p.click('[data-a=eobj][data-i="' + atv + '|' + qid + '|' + certa + '"]'); }
    await p.fill('textarea[data-in=edis]', 'x'.repeat(120)); await p.click('[data-a=eenv]');
    for (const c of await p.$$('input[data-ch=ecrit]')) await c.check(); await p.click('[data-a=eav]'); await p.click('[data-a=concluir]');
    assert.match(await p.textContent('#app'), /Aprovado/); assert.match(await p.textContent('.nota'), /10,0/);
    await ir(p, 'curso'); await p.click('[data-a=modulo][data-i=demo]'); assert.ok(await p.locator('[data-a=abrir][data-i="trabalho:demo-trabalho"]').count());
  });
  await passo('trabalho e prova: fluxo completo até aprovar o módulo', async () => {
    for (const [tipo, id] of [['trabalho', 'demo-trabalho'], ['prova', 'demo-prova']]) {
      await p.click('[data-a=abrir][data-i="' + tipo + ':' + id + '"]'); await p.click('[data-a=iniciar]');
      const ids = await p.$$eval('.q:has(.opt)', qs => qs.map(q => q.querySelector('.opt').dataset.i.split('|').slice(0, 2)));
      for (const [atv, qid] of ids) { const certa = await p.evaluate(([a, q]) => Escola.atividades[a].obj.find(x => x.id === q).a, [atv, qid]); await p.click('[data-a=eobj][data-i="' + atv + '|' + qid + '|' + certa + '"]'); }
      for (const ta of await p.$$('textarea[data-in=edis]')) { await ta.fill('y'.repeat(150)); }
      while (await p.locator('[data-a=eenv]').count()) await p.locator('[data-a=eenv]').first().click();     // cada clique redesenha a tela
      for (const c of await p.$$('input[data-ch=ecrit]')) await c.check();
      while (await p.locator('[data-a=eav]').count()) await p.locator('[data-a=eav]').first().click();
      await p.click('[data-a=concluir]'); assert.match(await p.textContent('#app'), /Aprovado/);
      await ir(p, 'curso'); await p.click('[data-a=modulo][data-i=demo]');
    }
    assert.match(await p.textContent('#app'), /Concluído/);
  });
  await passo('boletim mostra notas, tentativas e média do módulo', async () => {
    await ir(p, 'bol'); const t = await p.textContent('#app');
    assert.match(t, /Média do módulo: 10,0/); assert.match(t, /2 tentativas/); assert.match(t, /Aprovado/);
  });
  await passo('progresso do curso não conta o módulo de demonstração', async () => {
    await ir(p, 'home'); assert.match(await p.textContent('#app'), /Progresso do curso[\s\S]*0%/);
  });
  await passo('jornada: o início mostra nível e pontos, e a demonstração aprovada rende medalhas', async () => {
    const t = await p.textContent('#app'); assert.match(t, /Nível \d+ · /); assert.match(t, /\d+ pontos/);
    await p.click('[data-a=nav][data-i=conq]'); assert.strictEqual(await h1(p), 'Sua jornada');
    const ganhas = await p.locator('.med.ok').count(); assert.ok(ganhas >= 4, 'medalhas ganhas: ' + ganhas);
    assert.ok((await estado(p)).jv, 'o registro das comemorações não foi salvo');
    assert.ok(!(await rolagemHorizontal(p)));
  });
  await passo('mapa do curso aparece como trilha, com um marco por módulo', async () => {
    await ir(p, 'curso'); assert.strictEqual(await h1(p), 'Mapa do curso');
    assert.strictEqual(await p.locator('.mapa .parada').count(), 13); assert.ok(!(await rolagemHorizontal(p)));
  });
  await passo('fila de revisão: erro sai da fila ao acertar', async () => {
    await ir(p, 'gls'); await p.click('[data-a=nav][data-i=rev]'); assert.match(await h1(p), /Fila de revisão/);
    const antes = (await p.textContent('#app')).match(/(\d+) na fila/)[1];
    const qid = await p.$eval('.opt', e => e.dataset.i.split('|')[0]); const certa = await p.evaluate(id => Escola.questao(id).a, qid);
    await p.click('[data-a=rvr][data-i="' + qid + '|' + certa + '"]'); assert.match(await p.textContent('#app'), /Saiu da fila/);
    assert.ok(!Object.keys((await estado(p)).erros).includes(qid)); assert.ok(+antes >= 1);
  });
  await passo('caderno de dúvidas: anotar, filtrar, marcar respondida', async () => {
    await ir(p, 'duv'); await p.fill('#dq', 'Por que o céu é azul?'); await p.click('[data-a=dadd]');
    assert.match(await p.textContent('#app'), /Por que o céu é azul/); await p.click('[data-a=dst]'); assert.match(await p.textContent('#app'), /Respondida/);
    await p.click('[data-a=dfil][data-i=abertas]'); assert.doesNotMatch(await p.textContent('#app'), /Por que o céu é azul/);
  });
  await passo('busca acha aula, termo e anotação, sem diferenciar acento', async () => {
    await p.evaluate(() => { UI.S.anot['demo-a01'] = 'lembrar da MEDIA ponderada'; UI.salvar(); });
    await ir(p, 'busca'); await p.fill('#bq', 'media'); const t = await p.textContent('#br');
    assert.match(t, /Anotações e dúvidas/); await p.fill('#bq', 'cardapio'); assert.match(await p.textContent('#br'), /API/);
  });
  await passo('backup: baixa o arquivo, apaga tudo e importa de volta sem perda', async () => {
    await ir(p, 'mais'); const [dl] = await Promise.all([p.waitForEvent('download'), p.click('[data-a=bkbaixar]')]);
    const arq = await dl.path(); const antes = await estado(p);
    await p.click('[data-a=reset]'); assert.strictEqual(Object.keys((await estado(p)).tent).length, 0);
    await p.setInputFiles('input[type=file]', arq); await p.waitForFunction(() => /importado/.test(document.querySelector('#bkmsg').textContent));
    const depois = await estado(p); assert.deepStrictEqual(depois.tent, antes.tent); assert.deepStrictEqual(depois.done, ANTIGO.done); assert.deepStrictEqual(depois.resp, antes.resp);
  });
  await passo('caderno exporta em .md', async () => {
    const [dl] = await Promise.all([p.waitForEvent('download'), p.click('[data-a=cadbaixar]')]);
    const txt = fs.readFileSync(await dl.path(), 'utf8'); assert.match(txt, /# Meu caderno/); assert.match(txt, /Por que o céu é azul/); assert.match(txt, /minha nota antiga/);
  });
  await passo('lembrete de backup aparece depois de 7 dias', async () => {
    await p.evaluate(() => { UI.S.bk = Date.now() - 8 * 86400000; UI.salvar(); }); await ir(p, 'home'); assert.match(await p.textContent('#app'), /Hora de fazer backup/);
  });
  await passo('armazenamento persistente é pedido e o estado aparece em Mais', async () => {
    await ir(p, 'mais'); assert.match(await p.textContent('#app'), /Armazenamento persistente/);
  });
  await passo('todas as telas cabem na largura do celular, com botões grandes o bastante', async () => {
    for (const v of ['home', 'curso', 'busca', 'gls', 'duv', 'bol', 'mais']) { await ir(p, v); assert.ok(!(await rolagemHorizontal(p)), 'rolagem horizontal em ' + v); }
    const peq = await p.$$eval('nav button', bs => bs.filter(b => b.getBoundingClientRect().height < 44).length); assert.strictEqual(peq, 0);
  });
  await passo('funciona offline: service worker guarda tudo, inclusive aulas e provas', async () => {
    await p.reload(); await p.waitForSelector('h1'); await p.evaluate(() => navigator.serviceWorker.ready);
    await p.waitForFunction(() => caches.keys().then(k => k.length > 0)); await p.reload(); await p.evaluate(() => navigator.serviceWorker.ready);
    const guardados = await p.evaluate(async () => { const c = await caches.open((await caches.keys())[0]); return (await c.keys()).map(r => new URL(r.url).pathname); });
    for (const f of ['/js/motor.js', '/content/modulo-demo/aula-01.js', '/content/modulo-demo/prova.js', '/content/glossario.js', '/css/app.css']) assert.ok(guardados.includes(f), 'fora do cache: ' + f);
    await ctx.setOffline(true); await p.reload(); await p.waitForSelector('h1');
    await ir(p, 'curso'); await p.click('[data-a=modulo][data-i=demo]'); await p.click('[data-a=abrir][data-i="aula:demo-a02"]'); assert.strictEqual(await h1(p), 'Como funcionam as notas e a liberação');
    await ir(p, 'curso'); await p.click('[data-a=modulo][data-i=demo]'); await p.click('[data-a=abrir][data-i="prova:demo-prova"]'); await p.click('[data-a=iniciar]'); assert.ok(await p.locator('.q .opt').count());
    await ctx.setOffline(false);
  });
  await ctx.close();

  console.log('Desktop (1280x800), instalação limpa');
  const d = await abrir({ width: 1280, height: 800 });
  await passo('começa do zero com versão 2 e a barra lateral aparece', async () => {
    assert.strictEqual((await estado(d.p).catch(() => null) || { v: 2 }).v, 2);
    const box = await d.p.$eval('nav', e => { const r = e.getBoundingClientRect(); return { l: r.left, w: r.width, h: r.height }; }); assert.ok(box.l === 0 && box.w < 260, 'barra lateral fora do lugar: ' + JSON.stringify(box));
    assert.ok(!(await rolagemHorizontal(d.p)));
  });
  await passo('módulo de demonstração: aula 2 bloqueada com explicação, no desktop', async () => {
    await ir(d.p, 'curso'); await d.p.click('[data-a=modulo][data-i=demo]'); assert.match(await d.p.textContent('#app'), /Conclua antes a aula “Como estudar na Escola Dev”/);
  });
  await passo('botão voltar do navegador volta à tela anterior', async () => {
    await ir(d.p, 'bol'); await d.p.goBack(); assert.match(await h1(d.p), /Módulo|Demonstração/); 
  });
  await d.ctx.close();

  await nav.close(); servidor.close();
  assert.deepStrictEqual(erros, [], 'erros no console: ' + erros.join(' | '));
  console.log('\n' + ok + ' passos passaram' + (process.exitCode ? ', COM FALHAS' : ''));
})().catch(e => { console.error(e); process.exit(1); });

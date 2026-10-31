# Escola Dev: estado do projeto

Última atualização: 31/10/2026 (terceira sessão, Marco 1). Atualize este arquivo ao fim de cada sessão de trabalho.

## O que é
Plataforma de estudo pessoal (apostila, tarefas, provas, glossário, revisão com cartões, painel com meta diária). Funciona offline como PWA, hospedada no GitHub Pages. A plataforma é uma ferramenta de apoio e não faz parte do currículo do aluno.

## Arquitetura atual (Marco 1)
- `index.html`: só a casca (barra de navegação e `#app`). Sem etapa de build.
- `css/app.css`: todos os estilos (tema claro e escuro, celular e desktop).
- `js/registro.js`: registro do conteúdo (aulas, atividades, glossário, índice do curso). Roda no navegador, no service worker e no Node.
- `js/motor.js`: regras puras: liberação, notas, sorteio, fila de revisão, média do módulo.
- `js/armazenamento.js`: salvar e carregar, migração de esquema, backup, caderno em Markdown.
- `js/ui-base.js`, `ui-curso.js`, `ui-atividade.js`, `ui-extras.js`, `app.js`: telas e inicialização.
- `js/jornada.js` (regras puras de pontos, níveis e medalhas, testadas em `tests/jornada.test.js`) e `js/ui-jornada.js` (cartão de nível no Início, tela "Sua jornada" e comemorações que não bloqueiam a tela). Os pontos são calculados a partir do progresso, sem campo novo para migrar; só `S.jv` guarda o que já foi comemorado.
- `content/`: `indice.js` (módulos, blocos e lista de arquivos carregados), `glossario.js`, `legado.js` (material da primeira versão), `modulo-demo/` (demonstração do motor), e no futuro `modulo-XX/aula-YY.js`.
- `sw.js`: cache offline de tudo. Lê a lista de arquivos de `content/indice.js`. Versão atual do cache: `escola-dev-v8`, repetida em `VERSAO` no `js/registro.js` (aparece no rodapé do Início; o `verificar.sh` confere que as duas batem). Subir a versão a cada mudança de app ou de conteúdo.
- `tools/validar-conteudo.js` e `tools/verificar.sh`; `tests/`; `docs/ESQUEMA-CONTEUDO.md` (como escrever conteúdo) e `docs/PENDENCIAS.md`.
- Progresso do aluno: `localStorage`, chave `escoladev`, esquema `v: 2`. Cópia do progresso antigo em `escoladev_v1_backup`. Nunca versionar progresso com dados pessoais.
- Telas: Início, Curso (mapa, módulo, aula, tarefa, teste, trabalho, prova), Buscar, Termos (dicionário, cartões, fila de revisão), Dúvidas, Boletim, Mais (tema, backup, caderno, armazenamento, material anterior).

## Como verificar antes de cada commit
```
sh tools/verificar.sh          # validador, testes da lógica e teste da interface (celular e desktop)
sh tools/verificar.sh rapido   # sem o teste de navegador
```

## Estado do Marco 1 (motor da escola)
Pronto para sua aprovação. Itens da definição de pronto: liberação por regras (testada), tarefas, testes e provas respondidos na página com salvamento automático, dissertativas com resposta-modelo, critérios, autoavaliação e botão de revisão, boletim, caderno de dúvidas, anotações por aula e busca, backup (exportar e importar), lembrete de 7 dias e armazenamento persistente, offline inclusive provas, migração do progresso antigo sem perda, validador e testes passando, conferido em celular e desktop (Chromium). Pontos que pedem sua decisão ou conferência no iPhone: `docs/PENDENCIAS.md`.

**Não comece o conteúdo dos módulos (Marco 2) antes da aprovação do motor.**

## Estado do conteúdo
- Módulos reais (0.0 a 10): todos "em construção", sem aulas. O Módulo 0.0 entra no Marco 2.
- Módulo de demonstração do motor: 3 aulas, 1 teste de bloco, 1 trabalho e 1 prova (em `content/modulo-demo/`, a apagar no Marco 2).
- Material anterior (primeira versão): 10 lições (m0a a m0e, p0, s1a, s1b, s2a, s2b), 7 tarefas, 6 perguntas de prova, trilha de 6 fases. A lição m0b foi aprofundada; m0c é o padrão de profundidade. Continua acessível e com progresso preservado.
- Glossário: 85 termos.

## Padrão de uma lição (obrigatório)
1. O problema que o conceito resolve.
2. Definição, significado da sigla e analogia.
3. De onde vem e como é criado.
4. Como se usa, com exemplo comentado linha a linha.
5. Quando usar e quando não usar.
6. Diferenças entre variações do conceito.
7. Exemplo real tirado dos projetos do aluno.
8. Como pesquisar e aprender mais (documentação oficial).
9. Exercício com critérios de correção.
10. Termos novos adicionados ao glossário.

Regra: nunca assumir vocabulário. Todo termo técnico é explicado na primeira vez em que aparece.

## Currículo (11 módulos)
1. Noções (Módulo 0.0)
2. Computador e terminal
3. JavaScript
4. HTML, CSS e o navegador por dentro
5. Servidor, APIs e Node.js
6. Dados e banco de dados
7. Git e GitHub
8. Hospedagem e deploy
9. Segurança e auditoria
10. Testes e depuração
11. Operar com IA

Cada módulo termina com prova própria (nota mínima sugerida: 70%) e tarefas com critérios.

## Próximos passos
1. Aprovação do Marco 1 e do visual lúdico pelo aluno: testar o módulo de demonstração no iPhone. Os pontos de `docs/PENDENCIAS.md` ficam como estão, por decisão do Claude Code (o aluno delegou a condução).
2. Marco 2: Módulo 0.0 completo (8 aulas com as 10 partes, referências verificadas, tarefas, 2 testes de bloco, trabalho e prova com banco duplicado). Aproveitar o material anterior (m0a a m0e) como base. Remover o módulo de demonstração.
3. Marcos 3 em diante: um módulo por vez, na ordem da seção 7 do `ESPECIFICACAO.md`.

## Decisões
(Copiadas da seção 11 do `ESPECIFICACAO.md`.)

1. O Claude Code só lê o `CLAUDE.md` do repositório; ele não enxerga os Projetos do claude.ai.
2. O `CONTEXTO_PRIVADO.md` está num repositório público e o aluno decidiu manter assim.
3. A correção das rotas da secretaria (login, CORS, validação) foi antecipada para o módulo 4, e não fica só no módulo de segurança.
4. O Baileys, usado pela secretaria, é uma biblioteca não oficial do WhatsApp: confirmar as regras de uso comercial antes de vender.
5. Nota de aprovação: 7,0 ou mais. Escala de 0 a 10.
6. Dissertativas são autoavaliadas por critérios, com revisão opcional pelo Professor. Correção por IA fica para depois.
7. O curso é medido por conteúdo dominado, nunca por tempo.
8. O Professor só entra em uso depois de a plataforma estar pronta (Marco 1 e Marco 2, no mínimo).

## Regras de trabalho
- Um commit por mudança, mensagem em português dizendo o que mudou. Em conteúdo, um commit por aula.
- Rodar `sh tools/verificar.sh` antes de cada commit.
- Nenhum segredo no repositório (chaves, tokens, telefones, `.env`).
- Ao terminar a sessão, atualizar este arquivo e registrar abaixo.

## Registro de sessões
- 31/10/2026: plataforma v0 criada, Módulo 0.0 iniciado, lição de API aprofundada, pacote PWA gerado e publicado.
- 31/10/2026 (segunda sessão): lição m0b aprofundada nas 10 partes (URL, DNS, TLS, cabeçalhos, status, sem estado, estático e dinâmico, exemplos dos projetos, exercício com critérios). 16 termos novos no glossário. Cache do sw.js passou para escola-dev-v2. Página conferida no navegador sem erros. Não havia relatório em docs/relatorios/.
- 31/10/2026 (terceira sessão): **Marco 1 entregue para aprovação.** Passos: trouxe o `ESPECIFICACAO.md` (estava na `main`) para a branch; copiei as Decisões para este arquivo e o Aviso sobre o Professor para o `CLAUDE.md`; separei CSS, conteúdo e código em arquivos; criei registro, motor (25 testes), armazenamento com migração v2 (17 testes), validador (20 testes que provam que ele reprova cada defeito), esquema documentado, módulo de demonstração, interface nova (mapa, leitor, tarefas, testes, trabalhos, provas, dissertativas com autoavaliação, revisão, boletim, dúvidas, busca, backup) e teste de navegador com 29 passos (celular, desktop, offline). Dois bugs achados pelos testes e corrigidos: o progresso migrado não era gravado até o primeiro salvamento, e "Nova tentativa" na tela de resultado mostrava o resultado antigo. Cache `escola-dev-v6`. Não houve conteúdo novo de módulo. Pendências em `docs/PENDENCIAS.md`.
- 31/10/2026 (terceira sessão, ajuste): a aprovação passou a usar a nota exata, sem arredondamento (6,96 não aprova). A tela mostra a nota com uma casa decimal truncada para baixo (6,96 aparece como 6,9). Cache `escola-dev-v6`. Testes do motor: 27. Pull request aberto da branch para a `main`, sem merge.
- 31/10/2026 (quarta sessão): o aluno deixou de usar o chat de planejamento; o Claude Code passa a planejar, construir e verificar. Criado `docs/PASSAGEM.md` com o contexto do chat anterior. Seção "Como falar com o aluno" no `CLAUDE.md`, com as regras 1 a 4 e, a pedido do aluno, as regras 5 (o Claude Code conduz, tudo em linguagem comum) e 6 (segurança proporcional a uma plataforma de estudo pessoal). O Marco 1 foi juntado à branch `claude/hopeful-fermi-h97b2a`, sem conflito; `sh tools/verificar.sh` passou inteiro (validador, 27 + 17 + 20 testes, 29 passos de interface). Falta juntar essa branch na `main`.
- 31/10/2026 (quarta sessão, continuação): com autorização do aluno, o Marco 1 foi publicado na `main`. O aluno definiu: secretaria e pendências de segurança não são prioridade (ele vai tirá-la do ar); a base do curso vem antes dos projetos; qualidade máxima, podendo acrescentar conteúdo ligado aos projetos; visual lúdico. Registrado em `docs/PASSAGEM.md`.
- 31/10/2026 (quarta sessão, visual lúdico): nova paleta (verde-água e violeta, claro e escuro), botões com relevo, cartão de nível no Início (11 níveis, de Curioso a Vibe coder consciente, pontos e dias seguidos), tela "Sua jornada" com níveis, 16 medalhas e a tabela de pontos, mapa do curso como trilha de ilhas e comemoração com confete ao ganhar medalha ou subir de nível (desligada para quem pede menos movimento). A leitura das aulas continua em fundo calmo e fonte serifada. Testes: 8 novos da jornada e 2 passos novos de interface; `sh tools/verificar.sh` passou inteiro. Cache `escola-dev-v7`. Não testado em iPhone real.
- 31/10/2026 (quarta sessão, ajuste do computador): o aluno confirmou que tudo funcionou no iPhone, mas não no computador. Teste no tamanho de tela de computador (Chromium) não achou erro; a causa provável é a cópia antiga guardada pelo navegador. Correções: a barra lateral vai até o fim da tela; o `sw.js` busca arquivos sempre frescos (sem a cópia de até 10 minutos do GitHub Pages), para nunca misturar versões; quando uma versão nova assume, a página salva e recarrega sozinha uma vez; número da versão no rodapé do Início (`VERSAO` em `js/registro.js`, conferida contra o `sw.js` pelo `verificar.sh`). Teste de atualização simulado (v8 para v9): a versão nova aparece na primeira abertura. Cache `escola-dev-v8`. Não testado no Safari do Mac.

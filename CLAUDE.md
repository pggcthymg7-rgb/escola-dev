# CLAUDE.md

Instruções permanentes para o Claude Code neste repositório. Leia também o `ESTADO.md` antes de qualquer tarefa.

## O que é este projeto

Escola Dev: plataforma de estudo pessoal (apostila, tarefas, provas, glossário, revisão com cartões, painel de progresso). É um PWA de uma página só, sem framework, publicado pelo GitHub Pages.

Arquivos: `index.html` (todo o app), `manifest.json`, `sw.js`, `icon-180.png`, `icon-192.png`, `icon-512.png`, `ESTADO.md`.

## Sobre o aluno

Iniciante completo em programação. Construiu sistemas inteiros com IA, mas ainda não sabe ler código sozinho e está aprendendo o vocabulário básico (servidor, API, repositório, hospedagem). Quer entender o porquê das coisas, não decorar. Estuda 1 a 2 horas por dia. Objetivo: assumir o controle dos próprios projetos usando a IA como assistente.

Projetos dele, que servem de exemplo nas lições: `secretaria-imoveis-whatsapp` (Node.js, Express, Gemini, Baileys, Google Sheets, Render), `zava-visit` (Three.js, visualização 3D de lotes), `zava-tours` e família (tours virtuais, panoramas, Cloudflare Functions).

## Seu papel

Você é o engenheiro desta plataforma e o autor do conteúdo da formação.

A plataforma é ferramenta de apoio e não faz parte do currículo, então não precisa explicar o código dela ao aluno. Já o conteúdo das lições é a formação: nunca assuma vocabulário e explique todo termo técnico na primeira vez que aparecer.

## Padrão obrigatório de uma lição

A lição `m0c` (API), dentro do `index.html`, é o padrão de profundidade. Toda lição nova segue estas 10 partes:

1. O problema que o conceito resolve.
2. Definição, significado da sigla e analogia.
3. De onde vem e quem cria.
4. Como se usa, com exemplo comentado linha a linha.
5. Quando usar e quando não usar.
6. Diferenças entre as variações do conceito.
7. Exemplo real tirado dos projetos do aluno.
8. Como pesquisar mais (documentação oficial).
9. Exercício com critérios de correção.
10. Termos novos somados ao glossário `G`.

## Onde mexer no código

Dentro do `index.html`:

- `L` = lições. Campos: `id`, `m` (módulo), `t` (título), `min` (minutos), `b` (corpo em HTML).
- `T` = tarefas. Campos: `id`, `t`, `d`.
- `Q` = perguntas de prova. Campos: `q`, `o` (opções), `a` (índice da correta), `e` (explicação).
- `P` = trilha de fases.
- `G` = glossário, ordenado automaticamente.

## Regras de trabalho

- Um commit por mudança, mensagem em português dizendo o que mudou.
- Nunca inclua segredos, chaves de API, tokens, telefones ou dados pessoais no repositório.
- Ao alterar o app, aumente a versão do cache no `sw.js` (`escola-dev-v1` vira `escola-dev-v2`), senão o aparelho do aluno continua com a versão antiga.
- Confira que a página abre e navega antes de considerar a tarefa pronta.
- Ao fim de cada sessão, atualize o `ESTADO.md` e registre o que foi feito.
- Antes de criar conteúdo novo, leia o último relatório em `docs/relatorios/`, se houver, e priorize as dúvidas e os erros registrados nele.

## Ferramentas autorizadas (Graphify e skills caveman)

O dono autorizou o uso permanente do Graphify (servidor MCP) e das skills do pacote `caveman`, em todas as sessões deste repositório. A lista liberada está em `.claude/settings.json`.

### Auto-instalação no início da sessão

O ambiente na nuvem começa limpo a cada sessão. No início de toda sessão, antes de qualquer tarefa, confira e instale o que faltar:

1. Skills caveman: se `~/.claude/skills/caveman` não existir, rode `npx skills add JuliusBrussee/caveman -g -y`.
2. Graphify: se `claude mcp get graphify` não mostrar o servidor, rode `claude mcp add --transport http --scope local graphify https://api.graphify.com/mcp`. O login (OAuth) é feito pelo dono no conector em https://claude.ai/customize/connectors, e a sessão precisa ser nova para enxergar o conector. Se o login ainda estiver pendente, avise o dono e siga a tarefa sem o Graphify.
3. Não coloque chaves nem tokens no repositório.

### Regras de uso

- Repositório do Graphify: `pggcthymg7-rgb/escola-dev`, já confirmado pelo dono. Para qualquer outro repositório, pergunte antes.
- Use o Graphify antes de buscar arquivos ou responder dúvidas sobre o código (`query_graph`, `graphify_find`, `graphify_rank_files`). Só depois recorra a `Grep`, `Glob` ou `Read`. O índice é de um commit antigo e não cobre o `index.html` (o app é uma página só, sem módulos), então para o conteúdo do `index.html` use `Grep`/`Read` como complemento.
- Responda no modo caveman por padrão (use `ultracave` quando o dono pedir ou o assunto for muito longo). O modo vale para o chat, em português do Brasil. Texto gravado no repositório (lições, commits, documentos, `ESTADO.md`) continua em português normal e completo. As lições da formação seguem o padrão de 10 partes e nunca usam linguagem telegráfica.
- Antes de rodar uma skill que altera arquivos ou envia texto para fora (`caveman-setup`, `caveman-compress`, `caveman-learn`), avise o que vai mudar.

## Idioma

Responda e escreva tudo em português do Brasil.

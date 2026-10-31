# Escola Dev: estado do projeto

Última atualização: 31/10/2026 (terceira sessão). Atualize este arquivo ao fim de cada sessão de trabalho.

## O que é
Plataforma de estudo pessoal (apostila, tarefas, provas, glossário, revisão com cartões, painel com meta diária). Funciona offline como PWA, hospedada no GitHub Pages. A plataforma é uma ferramenta de apoio e não faz parte do currículo do aluno.

## Arquitetura atual
- Arquivos: `index.html` (todo o app), `manifest.json`, `sw.js`, `icon-180.png`, `icon-192.png`, `icon-512.png`.
- Dados do conteúdo, dentro do `index.html`: `L` (lições), `T` (tarefas), `Q` (perguntas da prova), `P` (trilha de fases), `G` (glossário, ordenado automaticamente).
- Telas: home, apo (apostila), gls (termos e revisão), tar (tarefas), pro (provas), tri (trilha), mais (tema, exportar e importar progresso).
- Progresso do aluno: `localStorage`, chave `escoladev`. Nunca versionar progresso com dados pessoais.
- Atualização do app: ao publicar versão nova, aumentar `V` no `sw.js` (versão atual: escola-dev-v2), senão o aparelho mantém a versão antiga.

## Estado do conteúdo
- 10 lições: m0a, m0b, m0c, m0d, m0e (Módulo 0.0), p0 (Passo 0), s1a, s1b, s2a, s2b.
- 7 tarefas, 6 perguntas de prova, 76 termos.
- **Padrão de profundidade:** a lição m0c (API). A lição m0b (cliente e servidor) já foi aprofundada nesse nível. As lições m0a, m0d e m0e ainda estão rasas e devem ser aprofundadas nesse nível.

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
1. Aprofundar m0d, m0e e m0a, nessa ordem.
2. Separar o conteúdo em arquivos (`content/*.js`) para facilitar manutenção.
3. Provas por módulo, com histórico de tentativas.
4. Iniciar o módulo Computador e terminal.

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
- Um commit por mudança, mensagem em português dizendo o que mudou.
- Nenhum segredo no repositório (chaves, tokens, telefones, `.env`).
- Ao terminar a sessão, atualizar este arquivo e registrar abaixo.

## Registro de sessões
- 31/10/2026: plataforma v0 criada, Módulo 0.0 iniciado, lição de API aprofundada, pacote PWA gerado e publicado.
- 31/10/2026 (segunda sessão): lição m0b aprofundada nas 10 partes (URL, DNS, TLS, cabeçalhos, status, sem estado, estático e dinâmico, exemplos dos projetos, exercício com critérios). 16 termos novos no glossário. Cache do sw.js passou para escola-dev-v2. Página conferida no navegador sem erros. Não havia relatório em docs/relatorios/.

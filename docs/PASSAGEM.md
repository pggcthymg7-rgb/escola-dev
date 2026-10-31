# Passagem do planejamento

Em 31/10/2026 o aluno deixou de usar o chat de planejamento separado. A partir desta data, o Claude Code é o responsável por planejar, construir e verificar tudo na Escola Dev. Este arquivo guarda o que o chat anterior sabia e que não está no `CLAUDE.md`, no `ESTADO.md` nem no `ESPECIFICACAO.md`.

## Como falar com o aluno

1. Ele é iniciante absoluto e não sabe o que são branch, pull request, merge, ambiente, commit ou arquivos de um repositório. Toda ação no GitHub ou no Claude Code vem passo a passo, em linguagem simples, dizendo exatamente onde clicar. Nunca escreva "faça o merge" sem explicar o que é e como se faz.
2. Ele gosta de entender o porquê das coisas, não de decorar. Quando ele perguntar algo, explique a causa e não só a resposta.
3. Diga sempre o que você testou e o que não testou. Nunca invente referência, livro, link ou vídeo.
4. Quando houver uma decisão com vantagens e desvantagens, apresente as opções e recomende uma. Avise qualquer risco de segurança que notar, inclusive nos outros projetos dele.
5. (Acrescentada pelo aluno em 31/10/2026.) O Claude Code conduz a criação. Tudo que envolva código ou programação é explicado em linguagem comum, traduzida.
6. (Acrescentada pelo aluno em 31/10/2026.) A segurança é proporcional: a plataforma é de estudo pessoal e não precisa de segurança extrema.

## Contexto que não está nos outros arquivos

- **Objetivo:** o aluno quer se tornar um "vibe coder consciente": entender o que cada código faz, definir a estrutura, pedir bem à IA, conferir, auditar e assumir o controle dos próprios projetos, sem depender cegamente dela. Tem altas habilidades e aprende lendo, com exemplos práticos.
- **Uso do computador:** Mac e iPhone. O app Claude está em português e o GitHub em inglês.
- **Pendências de segurança do aluno**, com estado desconhecido, porque ele ainda não confirmou:
  1. olhar em janela anônima o endereço `/api/status` da secretaria na Render;
  2. tornar privado o repositório `secretaria-imoveis-whatsapp`;
  3. tirar o `.env` do GitHub e pôr no `.gitignore`;
  4. revisar a chave do Gemini;
  5. fazer o mapa de hospedagem dos 7 projetos.

  Pergunte sobre isso uma vez no início de cada sessão, em uma linha, até ele dizer que concluiu.
- O `CONTEXTO_PRIVADO.md` está num repositório público e o aluno decidiu manter assim.
- A primeira versão da plataforma (lições, tarefas e prova antigas) está acessível em "Mais".
- A plataforma está publicada em pggcthymg7-rgb.github.io/escola-dev, pelo GitHub Pages. O Professor existe como Projeto no claude.ai, ainda sem uso. As instruções dele estão na seção 10 do `ESPECIFICACAO.md`.
- O aluno fará ao Professor perguntas de curiosidade, também fora do curso. É o esperado.
- **Próxima ordem de trabalho:** o aluno junta o Marco 1 na `main` e testa como aluno (inclusive no iPhone); depois o Claude Code começa o Marco 2 (Módulo 0.0 completo), verificando cada referência abrindo o link e registrando a data.

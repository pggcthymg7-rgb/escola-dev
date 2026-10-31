# Pendências

Lista viva do que ficou por fazer ou por confirmar. O validador (`node tools/validar-conteudo.js`) exige que toda referência marcada `[não verificado]` apareça aqui, citando o id da aula.

## Referências não verificadas

Nenhuma. As 25 referências e os 3 itens de "Para aprofundar" do Módulo 0.0 foram abertos e conferidos em 2026-10-31. (Regra: cada referência nova só vale com link aberto e data em `verificado`; as que não puderem ser verificadas entram aqui com o id da aula.)

## Marco 1 (motor): decisões de interpretação que pedem sua aprovação

A especificação deixa estes pontos em aberto. Escolhi o mais simples e coerente; se preferir outro, é uma mudança pequena no `js/motor.js`.

1. **"Testes concluídos" para abrir o trabalho** foi lido como testes de bloco **aprovados** (nota 7,0 ou mais), porque para concluir o módulo cada teste precisa de 7,0.
2. **Nota de teste de bloco:** objetivas 60% e dissertativas 40%, a mesma regra da prova. A especificação só fixa esses pesos para a prova.
3. **Nota de trabalho:** média das dissertativas, cada uma pela fração de critérios cumpridos.
4. **Várias tentativas:** vale a **melhor** nota de cada atividade, no boletim, na média e na liberação.
5. **Sem arredondamento (decidido pelo aluno):** a aprovação usa a nota exata, então 6,96 não aprova. A tela mostra uma casa decimal truncada para baixo (6,96 aparece como 6,9), para que "7,0" na tela sempre signifique aprovado. O código só tolera 1e-9 de ruído de ponto flutuante nas contas.
6. **Tarefa da aula:** não tem nota. A coluna do boletim mostra respondidas e objetivas certas. Objetiva respondida na tarefa trava (mostra o resultado na hora); o erro entra na fila de revisão.
7. **Fila de revisão:** a questão sai da fila quando você acerta dentro da própria revisão, e não quando acerta por acaso numa prova.
8. **Módulo em construção trava os seguintes.** O Módulo 0.0 está completo; o módulo 1 abre quando a prova do 0.0 for aprovada, mas aparece como "em construção" até ter conteúdo.
9. **Módulo de demonstração**: saiu do site no Marco 2 e foi movido para `tests/fixtures/modulo-demo/`, onde serve só aos testes automáticos. Os termos que ele somou ao glossário ficaram, porque descrevem a plataforma.

## Ainda não feito ou não verificado

- **IndexedDB:** a especificação manda usar se o volume de respostas crescer demais. Não implementei: a escola avisa em Mais e no Início quando os dados passam de cerca de 3,5 MB (o limite do localStorage costuma ser 5 MB) e pede backup. Quando o conteúdo real entrar e o volume crescer, migrar o armazenamento para IndexedDB (a camada `js/armazenamento.js` foi isolada para isso).
- **iPhone real:** os testes rodam em Chromium (celular e desktop simulados). Não testei em Safari/iPhone de verdade. Pontos a conferir no aparelho: baixar o backup (.json) e o caderno (.md), importar arquivo, botão de copiar para o Professor, armazenamento persistente (o Safari decide sozinho) e o modo offline depois de instalar na tela de início.
- **Acessibilidade:** foco visível, contraste e alvos de toque de 44 px foram cuidados e os alvos da barra de navegação são testados, mas não houve auditoria com leitor de tela.
- **Atualização do app:** o `sw.js` serve do cache e atualiza em segundo plano, então a versão nova aparece na segunda abertura depois de publicar (como já era antes).
- **Material anterior** (`content/legado.js`): continua acessível em Mais e no Curso, com o progresso antigo. O Módulo 0.0 novo já substitui as lições m0a a m0e. Retirar só depois de o aluno confirmar que não precisa mais dele.
- **Graphify:** o servidor MCP estava desconectado nesta sessão (precisa de login no conector), então a busca foi feita com as ferramentas normais.

## Marco 2 (Módulo 0.0): o que ficou por conferir

- **Número de projetos:** a especificação fala em 7 projetos, mas o `CONTEXTO_PRIVADO.md` lista 8 nomes. O trabalho do módulo pede "todos os seus repositórios", sem fixar o número; o próprio aluno vai levantar a lista.
- **Exercício prático da aula 5:** pede para abrir `https://api.github.com/users/pggcthymg7-rgb` no navegador. Não deu para abrir esse endereço de dentro do ambiente do Claude (a rede do ambiente bloqueia essa rota); é uma rota pública e documentada da API do GitHub, mas não foi testada aqui.
- **Exercícios que dependem do aluno:** os práticos das aulas 2, 5, 8 e o trabalho pressupõem acesso aos repositórios dele no GitHub (inclusive privados, se ele os tornar privados) e ao painel da Render.
- **iPhone real:** o Módulo 0.0 foi conferido em tela de celular simulada (Chromium), não no Safari do iPhone.

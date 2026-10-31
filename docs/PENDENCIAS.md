# Pendências

Lista viva do que ficou por fazer ou por confirmar. O validador (`node tools/validar-conteudo.js`) exige que toda referência marcada `[não verificado]` apareça aqui, citando o id da aula.

## Referências não verificadas

Nenhuma até agora. (As 3 aulas do módulo de demonstração não têm referências. Quando o Marco 2 entrar, cada referência nova só vale com link aberto e data em `verificado`; as que não puderem ser verificadas entram aqui com o id da aula.)

## Marco 1 (motor): decisões de interpretação que pedem sua aprovação

A especificação deixa estes pontos em aberto. Escolhi o mais simples e coerente; se preferir outro, é uma mudança pequena no `js/motor.js`.

1. **"Testes concluídos" para abrir o trabalho** foi lido como testes de bloco **aprovados** (nota 7,0 ou mais), porque para concluir o módulo cada teste precisa de 7,0.
2. **Nota de teste de bloco:** objetivas 60% e dissertativas 40%, a mesma regra da prova. A especificação só fixa esses pesos para a prova.
3. **Nota de trabalho:** média das dissertativas, cada uma pela fração de critérios cumpridos.
4. **Várias tentativas:** vale a **melhor** nota de cada atividade, no boletim, na média e na liberação.
5. **Arredondamento:** a nota é arredondada para uma casa (6,96 vira 7,0 e aprova), igual ao que aparece na tela.
6. **Tarefa da aula:** não tem nota. A coluna do boletim mostra respondidas e objetivas certas. Objetiva respondida na tarefa trava (mostra o resultado na hora); o erro entra na fila de revisão.
7. **Fila de revisão:** a questão sai da fila quando você acerta dentro da própria revisão, e não quando acerta por acaso numa prova.
8. **Módulo em construção trava os seguintes.** Como o Módulo 0.0 real ainda não tem aulas, nenhum módulo real abre até o Marco 2.
9. **Módulo de demonstração** (`content/modulo-demo/`): existe só para você testar o motor e não conta no progresso do curso. Deve ser apagado no Marco 2: apagar a pasta e tirar o módulo `demo` e os arquivos dele de `content/indice.js` (o `sw.js` lê a lista do índice sozinho). Os 9 termos que ele soma ao glossário podem ficar, pois descrevem a plataforma.

## Ainda não feito ou não verificado

- **IndexedDB:** a especificação manda usar se o volume de respostas crescer demais. Não implementei: a escola avisa em Mais e no Início quando os dados passam de cerca de 3,5 MB (o limite do localStorage costuma ser 5 MB) e pede backup. Quando o conteúdo real entrar e o volume crescer, migrar o armazenamento para IndexedDB (a camada `js/armazenamento.js` foi isolada para isso).
- **iPhone real:** os testes rodam em Chromium (celular e desktop simulados). Não testei em Safari/iPhone de verdade. Pontos a conferir no aparelho: baixar o backup (.json) e o caderno (.md), importar arquivo, botão de copiar para o Professor, armazenamento persistente (o Safari decide sozinho) e o modo offline depois de instalar na tela de início.
- **Acessibilidade:** foco visível, contraste e alvos de toque de 44 px foram cuidados e os alvos da barra de navegação são testados, mas não houve auditoria com leitor de tela.
- **Atualização do app:** o `sw.js` serve do cache e atualiza em segundo plano, então a versão nova aparece na segunda abertura depois de publicar (como já era antes).
- **Material anterior** (`content/legado.js`): continua acessível em Mais e no Curso, com o progresso antigo. Sai no Marco 2, quando o Módulo 0.0 novo substituir as lições antigas. Antes de apagar, confirmar com o aluno.
- **Graphify:** o servidor MCP estava desconectado nesta sessão (precisa de login no conector), então a busca foi feita com as ferramentas normais.

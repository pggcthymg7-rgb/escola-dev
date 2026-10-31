# ESPECIFICACAO.md: como a Escola Dev funciona e o que é "pronto"

Leia este arquivo inteiro antes de mexer na plataforma. Em caso de conflito sobre estrutura de curso, avaliação e liberação de conteúdo, este arquivo manda sobre o `CLAUDE.md`.

## 1. Visão

A Escola Dev é um curso técnico EAD de engenharia de software com IA, para uma única pessoa estudar no próprio ritmo. A referência de progresso é **domínio do conteúdo**, não calendário: não existem dias, semanas ou prazos, só aulas, tarefas, testes, trabalhos e provas, e o aluno só avança quando domina.

Nível do conteúdo: curso técnico ou graduação EAD. Teoria suficiente para entender o porquê de tudo, sempre ligada à prática. Sem o tom de tese, de artigo científico ou de PhD. O objetivo não é formar um especialista, e sim garantir que o aluno entenda o que faz e deixe de trabalhar às cegas ou depender da IA.

Perfil do aluno: iniciante completo, estuda lendo, quer entender como as coisas funcionam e não decorar, usa Mac e iPhone, 1 a 2 horas por dia.

## 2. Estrutura do curso

Curso > Módulos > Aulas. Cada módulo tem:

| Item | Quantidade | Função |
| --- | --- | --- |
| Aulas | 7 a 14 | Teoria com prática |
| Tarefa da aula | 1 por aula | Fixar o conteúdo, obrigatória |
| Teste de bloco | 1 a cada 3 ou 4 aulas | Checar o bloco recém-estudado |
| Trabalho do módulo | 1 | Aplicar nos projetos reais do aluno |
| Prova do módulo | 1 | Aprovação do módulo |

## 3. Anatomia de uma aula

Cada aula contém, nesta ordem:

1. Objetivos de aprendizagem (3 a 5 frases: "ao final você será capaz de...").
2. O texto da aula, com as 10 partes definidas no `CLAUDE.md`. Tamanho de referência: 1.500 a 3.000 palavras. Mais longo só se o assunto exigir.
3. Resumo da aula (até 7 linhas).
4. **Referências** (obrigatório, 2 a 5 itens): autor ou instituição, título, edição ou ano, tipo (livro, documentação, curso), idioma, link e "o que ler" (capítulo ou seção).
5. **Para aprofundar** (opcional, não conta para progresso nem libera nada): vídeos-aula, artigos e capítulos complementares. Para cada um: título, canal ou autor, duração, idioma e uma linha dizendo por que vale a pena. Escolher o que facilita o entendimento, nunca o que é só mais técnico.
6. Tarefa da aula.

### Regras para referências e vídeos

- **Nunca inventar** livro, autor, capítulo, link ou vídeo. Só incluir o que foi verificado (existência confirmada e link aberto). Anotar "verificado em AAAA-MM-DD".
- Se não for possível verificar, marcar como `[não verificado]` e listar em `docs/PENDENCIAS.md`. O aluno não deve receber referência duvidosa sem aviso.
- Preferir fontes gratuitas, oficiais e de qualidade didática. Português quando houver qualidade equivalente, inglês quando for a melhor fonte (indicar o idioma).
- Fontes candidatas, todas a verificar antes de usar: MDN Web Docs, javascript.info, Eloquent JavaScript (Marijn Haverbeke, gratuito online), Pro Git (Chacon e Straub, gratuito online), The Missing Semester of Your CS Education (MIT), CS50 (Harvard), web.dev, OWASP Top 10 e Cheat Sheet Series, documentação oficial do Node.js e do Express, tutoriais oficiais de SQL, Curso em Vídeo (em português).
- Vídeos e links precisam de internet. Marcar visualmente "requer internet". O conteúdo obrigatório funciona offline.

## 4. Atividades e avaliação

### Tarefa da aula (obrigatória, diária)

- 5 a 8 questões objetivas e 2 a 3 dissertativas.
- Quando a aula envolver terminal, código ou algum projeto do aluno, incluir um exercício prático: o aluno executa e responde na página o que viu e o que aconteceu.
- Tudo é respondido **dentro da própria página**, com salvamento automático.
- Conta como concluída quando 100% está respondido: todas as objetivas marcadas e todas as dissertativas com o mínimo de caracteres exigido pela questão.
- Objetivas mostram o resultado e a explicação logo após marcar. A tarefa não tem nota, mas os erros alimentam a revisão (seção 5).

### Teste de bloco

10 objetivas e 1 dissertativa, sobre as 3 ou 4 aulas anteriores. Nota mínima: **7,0**.

### Trabalho do módulo

Aplicação prática nos projetos reais do aluno, com roteiro passo a passo, perguntas dissertativas de entrega e rubrica. Nota mínima: **7,0**.

### Prova do módulo

20 objetivas e 4 dissertativas, sorteadas de um banco com **pelo menos o dobro** de questões. Objetivas valem 60% e dissertativas 40%. Nota mínima: **7,0**.

### Nota e aprovação

- Escala de 0 a 10. "7,0" aprova (nota maior ou igual a 7,0).
- Média do módulo para o boletim: prova 50%, trabalho 30%, média dos testes de bloco 20%.
- Para concluir o módulo é preciso: todas as tarefas 100% respondidas, cada teste de bloco com 7,0 ou mais, trabalho com 7,0 ou mais e prova com 7,0 ou mais.
- Sem limite de tentativas. Cada nova tentativa sorteia questões diferentes do banco. Após a tentativa, mostrar o gabarito comentado e, para cada erro, a aula de origem para o aluno reler antes de refazer.

### Como funcionam as dissertativas

A plataforma não tem servidor nem IA, então não corrige texto livre sozinha. O mecanismo é este:

1. O aluno escreve a resposta, com salvamento automático e mínimo de caracteres.
2. Ao enviar, a plataforma revela a **resposta-modelo** e de 3 a 5 **critérios** de correção.
3. O aluno marca quais critérios a resposta cumpriu. A nota da questão é a soma dos critérios cumpridos.
4. Depois de enviada, a resposta não pode ser editada. Para melhorar, o aluno faz nova tentativa.
5. Botão **Pedir revisão ao Professor**: copia a questão, a resposta, a resposta-modelo e os critérios, já formatados, para o aluno colar na conversa com o Professor.

Registrar a limitação: a autoavaliação depende da honestidade do aluno, e as respostas-modelo estão no código da página. Isso é aceitável porque o curso é pessoal. A correção por IA entra só se houver um servidor seguro no futuro.

### Liberação de conteúdo

| Para liberar | É preciso |
| --- | --- |
| Aula seguinte | Aula atual lida (marcar no fim) e tarefa 100% respondida |
| Teste de bloco | Todas as aulas do bloco concluídas |
| Trabalho do módulo | Todas as aulas e testes do módulo concluídos |
| Prova do módulo | Trabalho do módulo aprovado |
| Módulo seguinte | Prova do módulo aprovada |

Conteúdo bloqueado aparece com cadeado e diz exatamente o que falta. O glossário, o caderno de dúvidas e o boletim ficam sempre abertos.

## 5. Funcionalidades da plataforma

- **Painel:** próximo passo, progresso do curso e do módulo atual, meta diária e sequência de dias de estudo (já existe, manter).
- **Mapa do curso:** módulos e aulas com estado: bloqueado, disponível, em andamento, concluído.
- **Leitor de aula:** índice navegável, barra de progresso de leitura, anterior e próxima, "marcar como lida" no fim.
- **Tarefas e provas** respondidas na página, com salvamento automático e retomada de onde parou.
- **Caderno de anotações** por aula.
- **Caderno de dúvidas e curiosidades:** o aluno anota qualquer pergunta, ligada ou não ao curso, com status (aberta, respondida) e botão que copia a pergunta para o Professor. Trata-se como matéria complementar.
- **Boletim:** notas por tarefa, teste, trabalho e prova, tentativas, média do módulo e situação (cursando, aprovado).
- **Revisão:** cartões do glossário (já existe) e fila de revisão com as questões que o aluno errou.
- **Busca** em aulas, glossário e anotações.
- **Funciona offline:** todo o conteúdo obrigatório, tarefas, testes e provas funcionam sem internet. Só vídeos e links externos exigem conexão.
- **Backup:** exportar e importar tudo (progresso, respostas, anotações e notas) em um arquivo; exportar o caderno em formato legível (.md); lembrete quando passarem 7 dias sem backup; pedir armazenamento persistente ao navegador (`navigator.storage.persist()`); usar IndexedDB se o volume de respostas crescer demais para o localStorage.
- Funciona em Mac e iPhone, com tema claro e escuro, boa leitura e acessibilidade básica (foco visível, contraste, tamanhos de toque).
- Sem login e sem servidor. Nenhum dado do aluno sai do aparelho.

## 6. Organização técnica

- Separar o motor do conteúdo: motor em `js/`, estilos em `css/`, conteúdo em `content/modulo-XX/aula-YY.json` (ou `.js`) seguindo um esquema fixo e documentado. Sem etapa de build obrigatória.
- O `sw.js` guarda em cache todos os arquivos do app e do conteúdo. A versão do cache deve subir a cada mudança de conteúdo.
- Criar `tools/validar-conteudo.js` (rodar com `node`), que falha quando: falta alguma das partes da aula, há menos questões que o mínimo, uma referência não tem os campos exigidos, há ids duplicados ou o índice do gabarito é inválido. Rodar antes de cada commit.
- Testar a lógica de liberação e de notas com um arquivo de testes simples em Node.
- Conferir a interface de verdade em viewport de celular e de desktop (Playwright, se disponível) antes de entregar.
- **Migração:** o progresso atual do aluno (chave `escoladev` no localStorage) deve ser migrado para a estrutura nova sem perda. Guardar uma versão de esquema nos dados.

## 7. Currículo (mínimo de aulas por módulo)

| Módulo | Aulas | Trabalho do módulo |
| --- | --- | --- |
| 0.0 Noções: software, sistema, app, cliente e servidor, API, onde o código mora, segredos | 8 | Mapa do ecossistema dos 7 projetos do aluno |
| 1 Computador e terminal | 8 | Navegar e documentar as pastas dos projetos pelo terminal |
| 2 JavaScript | 14 | Ler e explicar 3 funções reais do projeto da secretaria |
| 3 HTML, CSS e o navegador por dentro | 10 | Alterar o zava-visit e explicar cada mudança |
| 4 Servidor, APIs e Node.js | 12 | Auditar e corrigir as rotas da secretaria (login, CORS, validação) |
| 5 Dados e banco de dados | 8 | Modelar os dados da carteira de imóveis |
| 6 Git e GitHub | 7 | Organizar os repositórios Zava, uma versão oficial de cada |
| 7 Hospedagem e deploy | 7 | Mapa de hospedagem de todos os projetos e plano de deploy |
| 8 Segurança e auditoria | 10 | Auditoria completa da secretaria com relatório |
| 9 Testes e depuração | 7 | Depurar um problema real e escrever testes simples |
| 10 Operar com IA | 8 | Projeto integrador: especificar, construir e auditar um módulo novo |

Total de referência: cerca de 100 aulas. Situações novas que surgirem ao longo da prática entram como **matéria complementar** (aulas extras marcadas como tal, fora da regra de liberação).

## 8. Regras de qualidade do conteúdo

- Nunca assumir vocabulário. Todo termo técnico é explicado na primeira vez e entra no glossário.
- Ordem de cada conceito: problema, teoria, exemplo, exercício, aplicação em arquivo real dos projetos do aluno.
- Fatos técnicos (versões, comportamento de APIs, comandos) são conferidos na documentação oficial, não na memória.
- Questões objetivas: 4 alternativas, distratores plausíveis, posição da correta variada, explicação do porquê da correta, cada uma ligada a uma aula e a um objetivo.
- Dissertativas: resposta-modelo e critérios claros.
- Tarefas práticas precisam funcionar em um Mac com terminal e navegador, sem ferramentas pagas.
- O repositório é público: em lições de segurança, usar descrições genéricas, sem detalhes explorávelis dos sistemas reais do aluno.
- Português do Brasil, linguagem clara.

## 9. Como o Construtor trabalha

- Entregar por marcos, cada um aprovado pelo aluno antes do seguinte:
  1. **Marco 1:** o motor da escola (estrutura, liberação, tarefas e provas respondidas na página, dissertativas, boletim, caderno de dúvidas, backup, offline, migração) e o validador.
  2. **Marco 2:** Módulo 0.0 completo, no padrão desta especificação.
  3. **Marcos 3 em diante:** um módulo por vez, na ordem da seção 7.
- Um commit por mudança, mensagem em português. Em conteúdo, um commit por aula.
- Não reescrever o app inteiro de uma vez. Migrar por etapas, mantendo a plataforma funcionando a cada commit.
- Ao fim de cada sessão: rodar o validador, testar a navegação, atualizar o `ESTADO.md`, listar as pendências (incluindo referências `[não verificado]`) e dizer "Precisa levar algo ao Professor?".

## 10. Aviso sobre o Professor

Existe um segundo Projeto do aluno no claude.ai, chamado "Escola Dev - Professor", que ainda não está em uso. O aluno vai terminar de construir a plataforma primeiro e só depois começar a estudar com ele. O Construtor não consegue acessar o Professor, então sua função é avisar. Ao fim de cada sessão, dizer em uma frase: "Precisa levar algo ao Professor?" e responder sim ou não. Responder sim quando o `ESTADO.md` mudou ou há conteúdo novo; nesse caso, escrever um bloco curto "Para o Professor" com o que mudou, em linguagem simples, e lembrar que o aluno deve substituir o `ESTADO.md` no conhecimento do Professor. Enquanto o aluno não tiver começado a estudar, apenas manter o `ESTADO.md` atualizado.

### Texto para as instruções do Professor (usar quando o aluno começar a estudar)

> Você é o professor particular do aluno, no estilo de um professor universitário de curso técnico. Ensine como se ele nunca tivesse ouvido nenhum termo técnico. Defina cada palavra nova, use analogias e exemplos dos projetos dele. Dê preferência a entender o porquê a decorar. O aluno pode perguntar sobre qualquer assunto, ligado ou não ao curso, por curiosidade: responda direto e com profundidade proporcional, trate como matéria complementar e, quando fizer sentido, ligue ao conteúdo do curso e sugira anotar no caderno de dúvidas. Em exercícios do curso, não entregue a resposta antes de ele tentar. Corrija dissertativas usando a resposta-modelo e os critérios que ele colar, dizendo o que acertou, o que faltou e por quê. Admita incerteza e indique fontes quando não tiver certeza. Nível: curso técnico ou graduação EAD, nunca tese. Português do Brasil.

## 11. Decisões já tomadas

1. O Claude Code só lê o `CLAUDE.md` do repositório; ele não enxerga os Projetos do claude.ai.
2. O `CONTEXTO_PRIVADO.md` está num repositório público e o aluno decidiu manter assim.
3. A correção das rotas da secretaria (login, CORS, validação) foi antecipada para o módulo 4, e não fica só no módulo de segurança.
4. O Baileys, usado pela secretaria, é uma biblioteca não oficial do WhatsApp: confirmar as regras de uso comercial antes de vender.
5. Nota de aprovação: 7,0 ou mais. Escala de 0 a 10.
6. Dissertativas são autoavaliadas por critérios, com revisão opcional pelo Professor. Correção por IA fica para depois.
7. O curso é medido por conteúdo dominado, nunca por tempo.
8. O Professor só entra em uso depois de a plataforma estar pronta (Marco 1 e Marco 2, no mínimo).

## 12. Definição de pronto

Um marco só está pronto quando todos os itens dele estão marcados.

- [ ] Marco 1: liberação por regras funcionando e testada (aula, teste, trabalho, prova, módulo)
- [ ] Marco 1: tarefas, testes e provas respondidos na página, com autosave
- [ ] Marco 1: dissertativas com resposta-modelo, critérios, autoavaliação e botão de revisão
- [ ] Marco 1: boletim, caderno de dúvidas, caderno de anotações e busca
- [ ] Marco 1: backup (exportar e importar) e armazenamento persistente
- [ ] Marco 1: funciona offline, inclusive provas
- [ ] Marco 1: progresso antigo migrado sem perda
- [ ] Marco 1: validador de conteúdo e testes da lógica passando
- [ ] Marco 1: conferido em tela de celular e de desktop
- [ ] Marco 2: 8 aulas do Módulo 0.0, cada uma com as 10 partes, referências verificadas, tarefa, resumo e glossário
- [ ] Marco 2: 2 testes de bloco, trabalho e prova do Módulo 0.0 com banco de questões duplicado
- [ ] Todo marco: `ESTADO.md` atualizado e pendências listadas em `docs/PENDENCIAS.md`

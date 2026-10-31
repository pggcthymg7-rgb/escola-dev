# Esquema do conteúdo

Como escrever aulas, testes, trabalhos e provas para o motor da escola. O validador (`node tools/validar-conteudo.js`) confere tudo isto e falha se algo estiver fora do esquema. As regras de curso e de avaliação vêm do `ESPECIFICACAO.md`, que manda em caso de conflito.

## Onde fica cada coisa

```
content/
  indice.js              módulos, blocos e lista de arquivos que o app carrega
  glossario.js           Escola.glossario([[termo, definição], ...])
  legado.js              material anterior ao Marco 1 (lições, tarefas, prova, trilha)
  modulo-XX/
    aula-YY.js           Escola.aula({...})
    teste-N.js           Escola.atividade({tipo:"teste", ...})
    trabalho.js          Escola.atividade({tipo:"trabalho", ...})
    prova.js             Escola.atividade({tipo:"prova", ...})
```

Todo arquivo novo precisa constar em `arquivos` no `content/indice.js` (o app e o `sw.js` carregam só o que está lá), e toda aula e atividade precisa constar na estrutura do módulo. O validador acusa os dois esquecimentos. Depois de qualquer mudança de conteúdo, suba a versão do cache no `sw.js`.

## Índice (`content/indice.js`)

```js
{ id: "m04", titulo: "4 Servidor, APIs e Node.js", metaAulas: 12, trabalhoPrevisto: "...",
  blocos: [ { id: "m04-b1", aulas: ["m04-a01","m04-a02","m04-a03"], teste: "m04-teste1" }, ... ],
  trabalho: "m04-trabalho", prova: "m04-prova" }
```

Módulo sem `blocos` aparece como "em construção". Um módulo precisa de 7 a 14 aulas e cada bloco de 3 ou 4 aulas, com um teste de bloco. Um módulo com `demo: true` é só para demonstração: usa limites reduzidos e não conta no progresso do curso.

## Aula

```js
Escola.aula({
  id: "m04-a01", modulo: "m04", titulo: "...", min: 45,
  objetivos: ["Ao final você será capaz de ...", ...],            // 3 a 5 frases
  partes: [ {n:1, titulo:"O problema que isto resolve", html:"<p>...</p>"}, ... {n:9, ...},
            {n:10, titulo:"Termos novos no glossário", termos:["API", "Rota (endpoint)"]} ],
  resumo: ["...", ...],                                            // até 7 linhas
  referencias: [ { autor, titulo, ano, tipo, idioma, link, ler, verificado:"2026-10-31" } ],   // 2 a 5
  aprofundar: [ { titulo, autor, duracao, idioma, porque, link } ],                            // opcional
  tarefa: { obj: [questão objetiva x 5 a 8], dis: [dissertativa x 2 a 3],
            pratica: { instrucao: "...", perguntas: [ {id, q, min} ] } }                       // pratica é opcional
});
```

- As 10 partes são as do `CLAUDE.md`: problema; definição, sigla e analogia; de onde vem e quem cria; como se usa; quando usar e quando não; diferenças entre variações; exemplo real dos projetos do aluno; como pesquisar mais; exercício com critérios; termos novos. A parte 10 lista só os nomes dos termos, que precisam existir no glossário.
- Texto de referência: 1.500 a 3.000 palavras nas partes 1 a 9 (o validador só avisa).
- Referência nunca é inventada. Só entra com `verificado` (data em que o link foi aberto e a existência confirmada). Se não der para verificar, use `naoVerificado: true` e liste a aula em `docs/PENDENCIAS.md`; o validador exige esse registro.

## Questões

Objetiva (`aula` é obrigatório nos bancos de teste e prova):

```js
{ id: "m04-a01-o1", q: "enunciado", o: ["A","B","C","D"], a: 2, e: "explicação do porquê da correta", aula: "m04-a01", obj: 0 }
```

- Exatamente 4 alternativas distintas; `a` é o índice (0 a 3) da correta e deve variar de posição; `obj` é o índice do objetivo da aula a que a questão se liga.
- Ids únicos em todo o curso.

Dissertativa:

```js
{ id: "m04-a01-d1", q: "enunciado", min: 80, modelo: "resposta-modelo", criterios: ["...","...","..."], aula: "m04-a01" }   // 3 a 5 critérios
```

`min` é o mínimo de caracteres. A nota da questão é a fração dos critérios que o aluno marca como cumpridos.

## Atividades

```js
Escola.atividade({
  id: "m04-teste1", tipo: "teste", modulo: "m04", bloco: "m04-b1", titulo: "...",
  obj: [banco de objetivas], dis: [banco de dissertativas],
  sorteio: { obj: 10, dis: 1 }       // opcional; padrões abaixo
});
```

| Tipo | Sorteio padrão | Banco mínimo | Nota mínima |
| --- | --- | --- | --- |
| `teste` | 10 objetivas, 1 dissertativa | igual ao sorteio | 7,0 |
| `trabalho` | todas as dissertativas (sem objetivas); exige `roteiro: ["passo", ...]` | 1 dissertativa | 7,0 |
| `prova` | 20 objetivas, 4 dissertativas | o dobro do sorteio (40 e 8) | 7,0 |

- Questões de teste vêm só das aulas do bloco; de trabalho e prova, das aulas do módulo.
- Cada tentativa sorteia questões diferentes, dando preferência às que o aluno ainda não viu.
- Nota de teste e prova: objetivas 60% e dissertativas 40%. Nota do trabalho: só dissertativas. Média do módulo no boletim: prova 50%, trabalho 30%, média dos testes 20%, usando a melhor tentativa de cada atividade.

## Estado do aluno (localStorage, chave `escoladev`, esquema v2)

`v` versão do esquema · `lidas` aulas marcadas como lidas · `resp` respostas da tarefa por id de questão · `tent` tentativas concluídas por atividade · `em` tentativa em andamento · `erros` fila de revisão · `anot` anotações por aula · `duv` caderno de dúvidas · `bk` data do último backup. Os campos do app antigo (`done`, `tasks`, `best`, `theme`, `days`, `goal`, `fc`) continuam existindo. A migração só acrescenta campos e guarda uma cópia do progresso antigo em `escoladev_v1_backup`.

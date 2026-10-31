/* Módulo de demonstração do motor (Marco 1). Será removido quando o Módulo 0.0 real entrar (Marco 2). */
Escola.aula({
 "id": "demo-a01",
 "modulo": "demo",
 "titulo": "Como estudar na Escola Dev",
 "min": 10,
 "objetivos": [
  "Explicar que a escola mede domínio do conteúdo e não tempo.",
  "Descrever a ordem curso, módulo e aula.",
  "Dizer o que é preciso para liberar a aula seguinte."
 ],
 "partes": [
  {
   "n": 1,
   "titulo": "O problema que isto resolve",
   "html": "<p>Estudar sozinho tem um risco: você não sabe se entendeu de verdade ou só leu. A escola resolve isso travando o avanço até você mostrar que dominou o que acabou de estudar.</p>"
  },
  {
   "n": 2,
   "titulo": "Definição e analogia",
   "html": "<p>O curso se organiza em <b>módulos</b>, e cada módulo em <b>aulas</b>. Analogia: as fases de um videogame. Você só abre a fase seguinte quando passa da atual, e pode repetir quantas vezes quiser. Não existem dias, semanas ou prazos.</p>"
  },
  {
   "n": 3,
   "titulo": "De onde vem e quem cria",
   "html": "<p>As regras desta escola estão escritas no arquivo <code>ESPECIFICACAO.md</code> do repositório. Quem monta a plataforma e o conteúdo é o Claude, a partir dessas regras que você aprovou.</p>"
  },
  {
   "n": 4,
   "titulo": "Como se usa",
   "html": "<ol><li>Leia a aula na ordem das seções.</li><li>Marque a aula como lida, no fim.</li><li>Responda a tarefa da aula: tudo, 100%.</li><li>A aula seguinte abre sozinha.</li></ol>"
  },
  {
   "n": 5,
   "titulo": "Quando usar e quando não usar",
   "html": "<p>Use a escola para entender o porquê das coisas. Ela não substitui a prática: sempre que a aula pedir um comando no terminal ou uma olhada num projeto seu, faça de verdade e anote o que viu.</p>"
  },
  {
   "n": 6,
   "titulo": "Diferenças entre as variações",
   "html": "<p>Há quatro tipos de atividade: a <b>tarefa da aula</b> (todo dia, sem nota), o <b>teste de bloco</b> (a cada 3 ou 4 aulas), o <b>trabalho do módulo</b> (aplicação nos seus projetos) e a <b>prova do módulo</b>.</p>"
  },
  {
   "n": 7,
   "titulo": "Exemplo real nos seus projetos",
   "html": "<p>No Módulo 0.0, o trabalho será montar o mapa do ecossistema dos seus 7 projetos. É assim que cada módulo termina: aplicando o que você aprendeu no que já é seu.</p>"
  },
  {
   "n": 8,
   "titulo": "Como pesquisar mais",
   "html": "<p>Dentro da escola, use a aba Buscar para achar uma palavra em aulas, glossário e anotações. Cada aula real terá uma lista de <b>Referências</b> com onde ler mais.</p>"
  },
  {
   "n": 9,
   "titulo": "Exercício com critérios de correção",
   "html": "<p>Abra o Curso e ache o cadeado de uma atividade. Leia o que falta para abri-la. <b>Critérios:</b> (a) você achou um item bloqueado; (b) citou o que o cadeado pedia.</p>"
  },
  {
   "n": 10,
   "titulo": "Termos novos no glossário",
   "termos": [
    "Tarefa da aula",
    "Teste de bloco",
    "Trabalho do módulo",
    "Prova do módulo"
   ]
  }
 ],
 "resumo": [
  "A escola mede domínio, não tempo.",
  "O curso tem módulos e cada módulo tem aulas.",
  "Para abrir a próxima aula: marcar a atual como lida e responder 100% da tarefa.",
  "Há tarefa, teste de bloco, trabalho e prova."
 ],
 "referencias": [],
 "tarefa": {
  "obj": [
   {
    "id": "demo-a01-o1",
    "q": "O que libera a aula seguinte na Escola Dev?",
    "o": [
     "Passar um dia inteiro estudando",
     "Marcar a aula como lida e responder 100% da tarefa",
     "Apenas abrir a aula",
     "Pedir permissão ao Professor"
    ],
    "a": 1,
    "e": "A aula seguinte abre quando a atual está lida e a tarefa está 100% respondida.",
    "aula": "demo-a01",
    "obj": 2
   },
   {
    "id": "demo-a01-o2",
    "q": "O que mede o seu avanço no curso?",
    "o": [
     "Os dias passados desde o início",
     "As horas com a página aberta",
     "O domínio do conteúdo",
     "A quantidade de anotações"
    ],
    "a": 2,
    "e": "A referência é domínio do conteúdo. Não há dias, semanas nem prazos.",
    "aula": "demo-a01",
    "obj": 0
   }
  ],
  "dis": [
   {
    "id": "demo-a01-d1",
    "q": "Explique com suas palavras por que a escola não usa prazos nem semanas.",
    "min": 80,
    "modelo": "Porque o objetivo é entender de verdade, no seu ritmo. Se existisse um prazo, daria para avançar sem dominar o conteúdo. Aqui só se avança quando se domina.",
    "criterios": [
     "Diz que o avanço depende de dominar o conteúdo",
     "Explica que cada pessoa tem seu ritmo",
     "Relaciona prazo ao risco de avançar sem entender"
    ],
    "aula": "demo-a01"
   }
  ]
 }
});

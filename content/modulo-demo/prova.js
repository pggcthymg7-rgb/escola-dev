/* Módulo de demonstração do motor (Marco 1). Será removido quando o Módulo 0.0 real entrar (Marco 2). */
Escola.atividade({
 "id": "demo-prova",
 "tipo": "prova",
 "modulo": "demo",
 "titulo": "Prova do módulo de demonstração",
 "sorteio": {
  "obj": 4,
  "dis": 1
 },
 "obj": [
  {
   "id": "demo-p1-o1",
   "q": "Qual é a escala das notas?",
   "o": [
    "0 a 5",
    "0 a 10",
    "1 a 100",
    "A a F"
   ],
   "a": 1,
   "e": "As notas vão de 0 a 10.",
   "aula": "demo-a02",
   "obj": 0
  },
  {
   "id": "demo-p1-o2",
   "q": "A prova do módulo só abre quando:",
   "o": [
    "O trabalho do módulo está aprovado",
    "Passam 7 dias",
    "O teste de bloco foi aberto",
    "O Professor autoriza"
   ],
   "a": 0,
   "e": "A prova exige o trabalho do módulo aprovado.",
   "aula": "demo-a02",
   "obj": 2
  },
  {
   "id": "demo-p1-o3",
   "q": "O módulo seguinte só libera com:",
   "o": [
    "A tarefa da primeira aula",
    "A prova do módulo aprovada",
    "Um backup recente",
    "Uma dúvida respondida"
   ],
   "a": 1,
   "e": "É preciso aprovar a prova do módulo.",
   "aula": "demo-a02",
   "obj": 2
  },
  {
   "id": "demo-p1-o4",
   "q": "Quantas tentativas se pode fazer?",
   "o": [
    "Uma",
    "Três",
    "Dez",
    "Quantas quiser"
   ],
   "a": 3,
   "e": "Não há limite de tentativas, e cada uma sorteia questões diferentes.",
   "aula": "demo-a02",
   "obj": 2
  },
  {
   "id": "demo-p1-o5",
   "q": "Nas provas, as objetivas valem:",
   "o": [
    "40%",
    "50%",
    "60%",
    "100%"
   ],
   "a": 2,
   "e": "Objetivas 60% e dissertativas 40%.",
   "aula": "demo-a02",
   "obj": 2
  },
  {
   "id": "demo-p1-o6",
   "q": "Para que serve a fila de revisão?",
   "o": [
    "Treinar as objetivas que você errou",
    "Guardar suas anotações",
    "Contar o tempo de estudo",
    "Fazer backup"
   ],
   "a": 0,
   "e": "Ela reúne as objetivas erradas para treino.",
   "aula": "demo-a03",
   "obj": 1
  },
  {
   "id": "demo-p1-o7",
   "q": "O que a escola mede como progresso?",
   "o": [
    "O tempo na página",
    "O número de dias",
    "O domínio do conteúdo",
    "O número de cliques"
   ],
   "a": 2,
   "e": "A medida é o domínio do conteúdo.",
   "aula": "demo-a01",
   "obj": 0
  },
  {
   "id": "demo-p1-o8",
   "q": "A autoavaliação de uma dissertativa é feita:",
   "o": [
    "Pela escola, automaticamente",
    "Por você, marcando os critérios cumpridos",
    "Pelo navegador",
    "Pelo Git"
   ],
   "a": 1,
   "e": "Você marca os critérios que sua resposta cumpriu.",
   "aula": "demo-a03",
   "obj": 0
  }
 ],
 "dis": [
  {
   "id": "demo-p1-d1",
   "q": "Descreva a ordem de liberação do conteúdo dentro de um módulo.",
   "min": 100,
   "modelo": "Primeiro as aulas, cada uma lida e com tarefa 100% respondida. Depois o teste de bloco. Com aulas e testes concluídos, abre o trabalho. Com o trabalho aprovado, abre a prova. A prova aprovada libera o módulo seguinte.",
   "criterios": [
    "Cita aulas com tarefa",
    "Cita teste, trabalho e prova nesta ordem",
    "Diz que a prova aprovada libera o módulo seguinte"
   ],
   "aula": "demo-a02"
  },
  {
   "id": "demo-p1-d2",
   "q": "Por que a autoavaliação depende da honestidade, e por que isso é aceitável aqui?",
   "min": 80,
   "modelo": "Porque a plataforma não tem servidor nem IA para corrigir. É aceitável porque o curso é pessoal: quem se prejudica ao marcar errado é o próprio aluno.",
   "criterios": [
    "Cita que não há servidor ou IA corrigindo",
    "Cita que o curso é pessoal",
    "Explica a consequência de marcar um critério sem cumpri-lo"
   ],
   "aula": "demo-a03"
  },
  {
   "id": "demo-p1-d3",
   "q": "Explique por que um aluno com média 7,5 pode ainda assim não estar aprovado no módulo.",
   "min": 80,
   "modelo": "Porque cada atividade precisa de 7,0 ou mais. A média é só para o boletim: uma prova com 6,0 não aprova o módulo.",
   "criterios": [
    "Diz que cada atividade exige 7,0",
    "Diferencia média de aprovação",
    "Dá um exemplo numérico"
   ],
   "aula": "demo-a02"
  }
 ]
});

/* Módulo de demonstração do motor (Marco 1). Será removido quando o Módulo 0.0 real entrar (Marco 2). */
Escola.aula({
 "id": "demo-a02",
 "modulo": "demo",
 "titulo": "Como funcionam as notas e a liberação",
 "min": 10,
 "objetivos": [
  "Dizer qual é a nota mínima de aprovação.",
  "Calcular a média de um módulo.",
  "Explicar a ordem de liberação das atividades."
 ],
 "partes": [
  {
   "n": 1,
   "titulo": "O problema que isto resolve",
   "html": "<p>Para saber o que falta para avançar, você precisa de regras claras e de números. Sem isso, a sensação de estar aprendendo engana.</p>"
  },
  {
   "n": 2,
   "titulo": "Definição e analogia",
   "html": "<p>A <b>nota</b> vai de 0 a 10 e a aprovação exige <b>7,0 ou mais</b>. O <b>boletim</b> reúne todas as notas. A média do módulo pesa: prova 50%, trabalho 30% e média dos testes de bloco 20%.</p>"
  },
  {
   "n": 3,
   "titulo": "De onde vem e quem cria",
   "html": "<p>Estas regras vêm da especificação da escola, que você aprovou. Se quiser mudar um peso, o lugar é o arquivo <code>ESPECIFICACAO.md</code>.</p>"
  },
  {
   "n": 4,
   "titulo": "Como se usa",
   "html": "<p>Exemplo: prova 8, trabalho 7 e média dos testes 9. Conta: 0,5 × 8 + 0,3 × 7 + 0,2 × 9 = 4 + 2,1 + 1,8 = <b>7,9</b>.</p><p>Ordem de liberação: aula, depois teste de bloco, depois trabalho, depois prova, depois o módulo seguinte.</p>"
  },
  {
   "n": 5,
   "titulo": "Quando usar e quando não usar",
   "html": "<p>Não há limite de tentativas em teste, trabalho e prova. Use cada erro como mapa: o gabarito mostra de qual aula a questão veio, para reler antes de refazer.</p>"
  },
  {
   "n": 6,
   "titulo": "Diferenças entre as variações",
   "html": "<p>Nas provas, as objetivas valem 60% e as dissertativas 40%. No trabalho, a nota vem só das dissertativas, pelos critérios.</p>"
  },
  {
   "n": 7,
   "titulo": "Exemplo real nos seus projetos",
   "html": "<p>No trabalho do módulo 4 você vai auditar e corrigir as rotas da secretária. Para chegar lá, a prova do módulo anterior precisa estar aprovada.</p>"
  },
  {
   "n": 8,
   "titulo": "Como pesquisar mais",
   "html": "<p>Abra a aba Boletim para ver sua situação em cada módulo: cursando ou aprovado, tentativas e média.</p>"
  },
  {
   "n": 9,
   "titulo": "Exercício com critérios de correção",
   "html": "<p>Calcule a média de um módulo com prova 6, trabalho 9 e testes 8, e diga se a prova está aprovada. <b>Critérios:</b> (a) média 7,3; (b) diz que a prova com 6 não aprova, mesmo com média boa.</p>"
  },
  {
   "n": 10,
   "titulo": "Termos novos no glossário",
   "termos": [
    "Boletim"
   ]
  }
 ],
 "resumo": [
  "Aprovação: nota 7,0 ou mais, numa escala de 0 a 10.",
  "Média do módulo: prova 50%, trabalho 30%, testes 20%.",
  "Sem limite de tentativas; cada tentativa sorteia questões diferentes.",
  "Prova só abre com o trabalho aprovado."
 ],
 "referencias": [],
 "tarefa": {
  "obj": [
   {
    "id": "demo-a02-o1",
    "q": "Qual é a nota mínima para ser aprovado?",
    "o": [
     "5,0",
     "6,0",
     "7,0",
     "8,0"
    ],
    "a": 2,
    "e": "A aprovação exige nota maior ou igual a 7,0.",
    "aula": "demo-a02",
    "obj": 0
   },
   {
    "id": "demo-a02-o2",
    "q": "Quanto vale a prova na média do módulo?",
    "o": [
     "20%",
     "30%",
     "50%",
     "100%"
    ],
    "a": 2,
    "e": "Prova 50%, trabalho 30% e testes de bloco 20%.",
    "aula": "demo-a02",
    "obj": 1
   }
  ],
  "dis": [
   {
    "id": "demo-a02-d1",
    "q": "Calcule a média de um módulo com prova 8, trabalho 6 e média dos testes 10. Mostre a conta.",
    "min": 60,
    "modelo": "0,5 × 8 + 0,3 × 6 + 0,2 × 10 = 4 + 1,8 + 2 = 7,8.",
    "criterios": [
     "Usa os pesos 50%, 30% e 20%",
     "Chega ao resultado 7,8",
     "Mostra a conta passo a passo"
    ],
    "aula": "demo-a02"
   }
  ]
 }
});

/* Módulo de demonstração do motor (Marco 1). Será removido quando o Módulo 0.0 real entrar (Marco 2). */
Escola.atividade({
 "id": "demo-teste1",
 "tipo": "teste",
 "modulo": "demo",
 "bloco": "demo-b1",
 "titulo": "Teste de bloco: noções da escola",
 "sorteio": {
  "obj": 3,
  "dis": 1
 },
 "obj": [
  {
   "id": "demo-t1-o1",
   "q": "Quantas aulas precisam estar concluídas para o teste de bloco abrir?",
   "o": [
    "Apenas a última",
    "Todas as aulas do bloco",
    "Metade das aulas",
    "Nenhuma"
   ],
   "a": 1,
   "e": "O teste de bloco abre quando todas as aulas do bloco estão concluídas.",
   "aula": "demo-a01",
   "obj": 2
  },
  {
   "id": "demo-t1-o2",
   "q": "Aula concluída significa:",
   "o": [
    "Só ter aberto a aula",
    "Lida e com a tarefa 100% respondida",
    "Ter nota 10",
    "Ter feito a prova"
   ],
   "a": 1,
   "e": "Lida e com a tarefa 100% respondida.",
   "aula": "demo-a01",
   "obj": 2
  },
  {
   "id": "demo-t1-o3",
   "q": "A tarefa da aula tem nota?",
   "o": [
    "Sim, de 0 a 10",
    "Sim, só em provas",
    "Não, mas os erros alimentam a revisão",
    "Não e não registra nada"
   ],
   "a": 2,
   "e": "A tarefa não tem nota, mas os erros vão para a fila de revisão.",
   "aula": "demo-a03",
   "obj": 1
  },
  {
   "id": "demo-t1-o4",
   "q": "Qual nota aprova um teste de bloco?",
   "o": [
    "6,0",
    "6,9",
    "7,0",
    "9,0"
   ],
   "a": 2,
   "e": "A aprovação exige 7,0 ou mais.",
   "aula": "demo-a02",
   "obj": 0
  },
  {
   "id": "demo-t1-o5",
   "q": "Quanto pesa o trabalho do módulo na média?",
   "o": [
    "20%",
    "30%",
    "50%",
    "70%"
   ],
   "a": 1,
   "e": "Trabalho 30%.",
   "aula": "demo-a02",
   "obj": 1
  },
  {
   "id": "demo-t1-o6",
   "q": "Por que a resposta-modelo só aparece depois de enviar?",
   "o": [
    "Para você não copiar antes de tentar",
    "Porque ela é secreta",
    "Por limitação do navegador",
    "Porque só o Professor a lê"
   ],
   "a": 0,
   "e": "Ver antes tiraria o esforço de tentar. Depois de enviar, a comparação ensina.",
   "aula": "demo-a03",
   "obj": 0
  }
 ],
 "dis": [
  {
   "id": "demo-t1-d1",
   "q": "Explique a diferença entre tarefa da aula e teste de bloco.",
   "min": 80,
   "modelo": "A tarefa da aula é diária, obrigatória e sem nota, e serve para fixar uma aula. O teste de bloco vem a cada 3 ou 4 aulas, tem nota e exige 7,0 para aprovar.",
   "criterios": [
    "Diz que a tarefa não tem nota e o teste tem",
    "Cita que o teste cobre um bloco de aulas",
    "Cita a nota mínima 7,0"
   ],
   "aula": "demo-a01"
  },
  {
   "id": "demo-t1-d2",
   "q": "Por que a escola mostra de qual aula veio cada questão errada?",
   "min": 60,
   "modelo": "Para você reler a aula certa antes de refazer, em vez de repetir o teste no escuro.",
   "criterios": [
    "Diz que ajuda a reler a aula de origem",
    "Relaciona com refazer a atividade",
    "Usa as próprias palavras, sem copiar a aula"
   ],
   "aula": "demo-a03"
  }
 ]
});

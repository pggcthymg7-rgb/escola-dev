/* Módulo de demonstração do motor (Marco 1). Será removido quando o Módulo 0.0 real entrar (Marco 2). */
Escola.aula({
 "id": "demo-a03",
 "modulo": "demo",
 "titulo": "Dissertativas, revisão e caderno",
 "min": 10,
 "objetivos": [
  "Descrever como uma dissertativa é corrigida na escola.",
  "Explicar para que serve a fila de revisão.",
  "Usar o caderno de dúvidas e o pedido de revisão ao Professor."
 ],
 "partes": [
  {
   "n": 1,
   "titulo": "O problema que isto resolve",
   "html": "<p>A plataforma não tem servidor nem inteligência artificial própria, então não consegue corrigir texto livre sozinha. Mesmo assim, você precisa de retorno sobre o que escreveu.</p>"
  },
  {
   "n": 2,
   "titulo": "Definição e analogia",
   "html": "<p>Na <b>autoavaliação por critérios</b>, você escreve, envia, vê a <b>resposta-modelo</b> e a lista de critérios, e marca o que sua resposta cumpriu. A nota é a soma dos critérios cumpridos.</p>"
  },
  {
   "n": 3,
   "titulo": "De onde vem e quem cria",
   "html": "<p>Esse mecanismo foi definido na especificação da escola, para funcionar sem servidor e sem enviar seus dados para fora do aparelho.</p>"
  },
  {
   "n": 4,
   "titulo": "Como se usa",
   "html": "<ol><li>Escreva e deixe o salvamento automático trabalhar.</li><li>Toque em Enviar. A resposta trava.</li><li>Compare com a resposta-modelo e marque os critérios.</li><li>Se quiser, toque em Pedir revisão ao Professor e cole o texto copiado na conversa.</li></ol>"
  },
  {
   "n": 5,
   "titulo": "Quando usar e quando não usar",
   "html": "<p>A autoavaliação depende da sua honestidade, e as respostas-modelo estão no código da página. Como o curso é só seu, isso é aceitável: o único prejudicado por marcar critério que não cumpriu é você.</p>"
  },
  {
   "n": 6,
   "titulo": "Diferenças entre as variações",
   "html": "<p>O <b>caderno de dúvidas</b> serve para qualquer pergunta, ligada ou não ao curso. A <b>fila de revisão</b> guarda só as questões objetivas que você errou.</p>"
  },
  {
   "n": 7,
   "titulo": "Exemplo real nos seus projetos",
   "html": "<p>Ao estudar API, por exemplo, você pode anotar uma dúvida sobre a secretária no caderno e depois levá-la ao Professor com um toque.</p>"
  },
  {
   "n": 8,
   "titulo": "Como pesquisar mais",
   "html": "<p>Use Buscar para achar anotações antigas e Mais para exportar o caderno em formato legível (.md).</p>"
  },
  {
   "n": 9,
   "titulo": "Exercício com critérios de correção",
   "html": "<p>Escreva uma dúvida qualquer no caderno e marque-a como respondida. <b>Critérios:</b> (a) a dúvida aparece na lista; (b) o status mudou para respondida.</p>"
  },
  {
   "n": 10,
   "titulo": "Termos novos no glossário",
   "termos": [
    "Autoavaliação por critérios",
    "Resposta-modelo e critérios",
    "Fila de revisão",
    "Caderno de dúvidas"
   ]
  }
 ],
 "resumo": [
  "Dissertativa: escrever, enviar, comparar com a resposta-modelo e marcar os critérios.",
  "Depois de enviada, a resposta não pode ser editada.",
  "Questões objetivas erradas entram na fila de revisão.",
  "O caderno de dúvidas aceita qualquer pergunta."
 ],
 "referencias": [],
 "tarefa": {
  "obj": [
   {
    "id": "demo-a03-o1",
    "q": "Quando aparecem a resposta-modelo e os critérios de uma dissertativa de teste ou prova?",
    "o": [
     "Antes de escrever",
     "Depois de enviar a resposta",
     "Nunca aparecem",
     "Só com internet"
    ],
    "a": 1,
    "e": "Eles são revelados ao enviar. Depois do envio, a resposta não pode mais ser editada.",
    "aula": "demo-a03",
    "obj": 0
   },
   {
    "id": "demo-a03-o2",
    "q": "O que acontece com uma questão objetiva que você errou?",
    "o": [
     "Ela some para sempre",
     "Ela entra na fila de revisão",
     "Ela reduz a nota de todas as provas",
     "Ela bloqueia o módulo"
    ],
    "a": 1,
    "e": "Os erros alimentam a fila de revisão, para você treinar até acertar.",
    "aula": "demo-a03",
    "obj": 1
   }
  ],
  "dis": [
   {
    "id": "demo-a03-d1",
    "q": "Descreva o caminho de uma dúvida, desde que ela surge até chegar ao Professor.",
    "min": 80,
    "modelo": "Eu anoto a dúvida no caderno de dúvidas. Depois toco no botão de copiar para o Professor e colo o texto na conversa com ele. Quando recebo a resposta, marco a dúvida como respondida.",
    "criterios": [
     "Cita o caderno de dúvidas",
     "Cita o botão que copia a pergunta",
     "Termina com a dúvida marcada como respondida"
    ],
    "aula": "demo-a03"
   }
  ]
 }
});

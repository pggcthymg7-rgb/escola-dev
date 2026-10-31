/* Índice do curso: módulos, blocos e a lista de arquivos de conteúdo que o app carrega.
   Módulos sem blocos aparecem como "em construção". Esquema documentado em docs/ESQUEMA-CONTEUDO.md. */
(function(r){r.Escola.defCurso({
 "modulos": [
  {
   "id": "m00",
   "titulo": "0.0 Noções",
   "metaAulas": 8,
   "trabalhoPrevisto": "Mapa do ecossistema dos 7 projetos do aluno"
  },
  {
   "id": "m01",
   "titulo": "1 Computador e terminal",
   "metaAulas": 8,
   "trabalhoPrevisto": "Navegar e documentar as pastas dos projetos pelo terminal"
  },
  {
   "id": "m02",
   "titulo": "2 JavaScript",
   "metaAulas": 14,
   "trabalhoPrevisto": "Ler e explicar 3 funções reais do projeto da secretaria"
  },
  {
   "id": "m03",
   "titulo": "3 HTML, CSS e o navegador por dentro",
   "metaAulas": 10,
   "trabalhoPrevisto": "Alterar o zava-visit e explicar cada mudança"
  },
  {
   "id": "m04",
   "titulo": "4 Servidor, APIs e Node.js",
   "metaAulas": 12,
   "trabalhoPrevisto": "Auditar e corrigir as rotas da secretaria (login, CORS, validação)"
  },
  {
   "id": "m05",
   "titulo": "5 Dados e banco de dados",
   "metaAulas": 8,
   "trabalhoPrevisto": "Modelar os dados da carteira de imóveis"
  },
  {
   "id": "m06",
   "titulo": "6 Git e GitHub",
   "metaAulas": 7,
   "trabalhoPrevisto": "Organizar os repositórios Zava, uma versão oficial de cada"
  },
  {
   "id": "m07",
   "titulo": "7 Hospedagem e deploy",
   "metaAulas": 7,
   "trabalhoPrevisto": "Mapa de hospedagem de todos os projetos e plano de deploy"
  },
  {
   "id": "m08",
   "titulo": "8 Segurança e auditoria",
   "metaAulas": 10,
   "trabalhoPrevisto": "Auditoria completa da secretaria com relatório"
  },
  {
   "id": "m09",
   "titulo": "9 Testes e depuração",
   "metaAulas": 7,
   "trabalhoPrevisto": "Depurar um problema real e escrever testes simples"
  },
  {
   "id": "m10",
   "titulo": "10 Operar com IA",
   "metaAulas": 8,
   "trabalhoPrevisto": "Projeto integrador: especificar, construir e auditar um módulo novo"
  },
  {
   "id": "demo",
   "titulo": "Demonstração do motor da escola",
   "demo": true,
   "descricao": "Módulo pequeno, só para você testar liberação, tarefas, testes, dissertativas e boletim. Não conta no progresso do curso e será removido no Marco 2.",
   "blocos": [
    {
     "id": "demo-b1",
     "aulas": [
      "demo-a01",
      "demo-a02",
      "demo-a03"
     ],
     "teste": "demo-teste1"
    }
   ],
   "trabalho": "demo-trabalho",
   "prova": "demo-prova"
  }
 ],
 "arquivos": [
  "content/modulo-demo/aula-01.js",
  "content/modulo-demo/aula-02.js",
  "content/modulo-demo/aula-03.js",
  "content/modulo-demo/teste-1.js",
  "content/modulo-demo/trabalho.js",
  "content/modulo-demo/prova.js"
 ]
});})(typeof self!=='undefined'?self:this);

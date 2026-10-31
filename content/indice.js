/* Índice do curso: módulos, blocos e a lista de arquivos de conteúdo que o app carrega.
   Módulos sem blocos aparecem como "em construção". Esquema documentado em docs/ESQUEMA-CONTEUDO.md. */
(function(r){r.Escola.defCurso({
 "modulos": [
  {
   "id": "m00",
   "titulo": "0.0 Noções",
   "metaAulas": 8,
   "trabalhoPrevisto": "Mapa do ecossistema dos seus projetos",
   "blocos": [
    { "id": "m00-b1", "aulas": ["m00-a01", "m00-a02", "m00-a03", "m00-a04"], "teste": "m00-teste1" },
    { "id": "m00-b2", "aulas": ["m00-a05", "m00-a06", "m00-a07", "m00-a08"], "teste": "m00-teste2" }
   ],
   "trabalho": "m00-trabalho",
   "prova": "m00-prova"
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
  }
 ],
 "arquivos": [
  "content/modulo-00/aula-01.js",
  "content/modulo-00/aula-02.js",
  "content/modulo-00/aula-03.js",
  "content/modulo-00/aula-04.js",
  "content/modulo-00/aula-05.js",
  "content/modulo-00/aula-06.js",
  "content/modulo-00/aula-07.js",
  "content/modulo-00/aula-08.js",
  "content/modulo-00/teste-1.js",
  "content/modulo-00/teste-2.js",
  "content/modulo-00/trabalho.js",
  "content/modulo-00/prova.js"
 ]
});})(typeof self!=='undefined'?self:this);

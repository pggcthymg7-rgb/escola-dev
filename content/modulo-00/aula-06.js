/* Módulo 0.0, aula 6. Esquema em docs/ESQUEMA-CONTEUDO.md. */
Escola.aula({
 id: "m00-a06", modulo: "m00", min: 55,
 titulo: "Onde o código mora: arquivos, repositório, Git e GitHub",
 objetivos: [
  "Explicar o que é um repositório e por que o código fica num repositório e não solto em pastas.",
  "Diferenciar Git de GitHub.",
  "Descrever, com suas palavras, commit, branch, pull request e merge, e a ordem em que acontecem.",
  "Decidir entre repositório público e privado, sabendo que o histórico guarda tudo o que já foi enviado.",
  "Encontrar no GitHub o histórico de commits de um projeto seu e ler o que mudou em um deles."
 ],
 partes: [
  { n: 1, titulo: "O problema que isto resolve", html: `
<p>Imagine que você escreve um contrato no computador. Você salva como <code>contrato.docx</code>. Depois muda uma cláusula e salva como <code>contrato-final.docx</code>. O cliente pede ajustes: <code>contrato-final-2.docx</code>, <code>contrato-final-agora-vai.docx</code>. Uma semana depois, alguém pergunta: "o que mudou entre a versão de terça e a de hoje? Quem mudou? Por quê?". Você não sabe responder.</p>
<p>Com código, isso é muito pior. Um projeto tem dezenas de arquivos que dependem uns dos outros. Uma mudança pequena num arquivo pode quebrar outro. A IA altera dez arquivos de uma vez. Se algo parar de funcionar, você precisa saber exatamente o que mudou e precisa conseguir voltar ao estado em que funcionava.</p>
<p>A solução tem nome: <b>controle de versão</b>. É um sistema que registra cada mudança, com data, autor e motivo, e permite voltar a qualquer ponto. O mais usado no mundo é o <b>Git</b>, e o lugar mais usado para guardá-lo na internet é o <b>GitHub</b>. É lá que os seus projetos moram, inclusive esta escola.</p>` },

  { n: 2, titulo: "Definição, siglas e analogia", html: `
<h3>Arquivo e pasta</h3>
<p>Um <b>arquivo</b> é uma unidade de informação guardada com um nome, como <code>index.js</code>. Uma <b>pasta</b> (ou diretório) agrupa arquivos e outras pastas. Um projeto é, fisicamente, uma pasta com arquivos dentro.</p>
<h3>Repositório</h3>
<p>Um <b>repositório</b> ("repo", para os íntimos) é a pasta do projeto <i>mais</i> o histórico completo de todas as mudanças. Analogia: um livro-caixa. Não basta saber o saldo de hoje; o livro guarda cada lançamento, em ordem, com data e descrição, e você pode reconstruir o saldo de qualquer dia.</p>
<h3>Git</h3>
<p><b>Git</b> é o programa que faz o controle de versão. Ele roda no seu computador e cuida do histórico. Não é um site; é uma ferramenta.</p>
<h3>GitHub</h3>
<p><b>GitHub</b> é um site (de uma empresa, hoje parte da Microsoft) que guarda repositórios Git na internet e acrescenta ferramentas para colaborar: páginas para ver o código, discussões, revisão de mudanças e até hospedagem de sites (o GitHub Pages). Analogia: o Git é o livro-caixa; o GitHub é o cartório onde você guarda uma cópia oficial e onde outras pessoas podem consultar e propor lançamentos.</p>
<h3>As quatro palavras que você mais vai ouvir</h3>
<ul>
<li><b>Commit</b> (registrar, comprometer-se): um ponto salvo no histórico, com uma mensagem dizendo o que mudou. É um lançamento no livro-caixa. Cada commit tem um código de identificação, como <code>a401716</code>.</li>
<li><b>Branch</b> (ramo): uma linha paralela de trabalho. Você cria um ramo a partir da versão oficial, faz mudanças nele sem mexer na oficial e, quando estiver bom, junta. A versão oficial costuma ficar no ramo chamado <code>main</code> (principal).</li>
<li><b>Pull request</b> (pedido para puxar; no GitHub em português, "solicitação de pull"): um pedido formal, no site do GitHub, para juntar as mudanças de um ramo em outro. Mostra tudo o que mudou e permite revisar antes.</li>
<li><b>Merge</b> (mesclar, juntar): a ação de juntar um ramo em outro. Depois do merge, as mudanças passam a fazer parte da versão oficial.</li>
</ul>` },

  { n: 3, titulo: "De onde vem e quem cria", html: `
<p>Programas de controle de versão existem desde os anos 1970. Os primeiros guardavam o histórico só no computador local; depois vieram os <b>centralizados</b>, em que o histórico fica num servidor e cada pessoa pega uma cópia de trabalho.</p>
<p>O <b>Git</b> foi criado em 2005 por Linus Torvalds, o criador do Linux, porque a ferramenta que a equipe do Linux usava deixou de ser gratuita para eles. Ele queria algo rápido e <b>distribuído</b>: cada pessoa tem uma cópia completa do histórico, não só dos arquivos. Se o servidor sumir, qualquer cópia reconstrói tudo. O Git é <b>código aberto</b>: o código dele é público e qualquer um pode usar e estudar.</p>
<p>O <b>GitHub</b> surgiu em 2008 como um serviço para hospedar repositórios Git com uma interface amigável, e se tornou o maior lugar de código do mundo. A Microsoft comprou o GitHub em 2018. Existem alternativas, como o GitLab e o Bitbucket, que fazem coisas parecidas.</p>
<p>Quem cria os <b>seus</b> repositórios é você (ou o Claude, agindo na sua conta, como nesta escola). Quem cria os commits é quem faz as mudanças; cada commit registra o autor.</p>` },

  { n: 4, titulo: "Como se usa: o ciclo de uma mudança, passo a passo", html: `
<p>Este é o ciclo que aconteceu de verdade quando o Claude construiu o Marco 1 desta escola. Leia como uma receita comentada:</p>
<pre><code>1. Criar um ramo a partir da main
   // claude/blissful-edison-gzfftk: uma cópia paralela da versão oficial
2. Mudar arquivos no ramo
   // ex.: criar js/motor.js, alterar index.html
3. Fazer um commit para cada mudança, com mensagem clara
   // "Cria o motor (liberação, notas, sorteio) com 25 testes em Node"
4. Enviar (push) os commits do computador para o GitHub
   // agora o ramo existe também no site
5. Abrir um pull request do ramo para a main
   // o GitHub mostra a lista de arquivos e linhas que mudaram
6. Revisar e testar
   // você testou no iPhone antes de aprovar
7. Fazer o merge
   // as mudanças entram na main
8. A hospedagem publica a nova main
   // o GitHub Pages atualiza o site em cerca de um minuto</code></pre>
<p>Alguns verbos extras que você verá:</p>
<ul>
<li><b>Push</b> (empurrar): enviar commits do seu computador para o GitHub.</li>
<li><b>Pull</b> (puxar): trazer do GitHub para o seu computador o que mudou lá.</li>
<li><b>Clone</b> (clonar): baixar um repositório inteiro, com histórico, pela primeira vez.</li>
</ul>
<h3>Como fazer um merge pelo site do GitHub</h3>
<ol>
<li>Abra o repositório no GitHub e clique na aba <b>Pull requests</b>, no alto.</li>
<li>Clique no pull request que você quer revisar.</li>
<li>Na aba <b>Files changed</b> (arquivos alterados), veja o que mudou: linhas em verde entraram, linhas em vermelho saíram.</li>
<li>Se estiver tudo certo, volte à aba <b>Conversation</b>, role até o fim e clique no botão verde <b>Merge pull request</b>, depois em <b>Confirm merge</b>.</li>
</ol>
<p>Por que tanto passo, se dava para mudar direto na main? Porque o ramo isola o risco. Se algo der errado no ramo, a versão oficial (e o site no ar) continua intacta.</p>` },

  { n: 5, titulo: "Quando usar e quando não usar", html: `
<h3>Use repositório e Git sempre que</h3>
<ul>
<li>For código, mesmo pequeno, mesmo só seu. O histórico vai salvar você no dia em que a IA quebrar algo.</li>
<li>Houver mais de uma pessoa (ou uma pessoa e uma IA) mexendo nos mesmos arquivos.</li>
<li>Você quiser publicar algo: quase toda hospedagem moderna publica direto de um repositório.</li>
</ul>
<h3>Faça commits pequenos e com mensagem que diga o que mudou</h3>
<p>Um commit por mudança, como manda a regra desta escola. "Ajustes" não diz nada; "Corrige o cálculo da comissão quando o percentual vem vazio" diz tudo. Commits pequenos são fáceis de revisar e de desfazer.</p>
<h3>Não coloque no repositório</h3>
<ul>
<li><b>Segredos</b>: senhas, chaves de API, tokens. O Git guarda o histórico para sempre: apagar o arquivo depois não apaga a versão antiga, que continua acessível a quem souber procurar. Aula 8.</li>
<li><b>Arquivos gerados ou baixados</b>, como a pasta <code>node_modules</code> (onde o npm baixa as dependências): eles podem ser recriados a qualquer momento a partir do <code>package.json</code>.</li>
<li><b>Arquivos muito grandes</b>, como centenas de megabytes de fotos: o Git não foi feito para isso e o repositório fica lento para todos. Para mídia pesada existem outras soluções.</li>
</ul>
<p>Para dizer ao Git o que ignorar, existe um arquivo chamado <code>.gitignore</code>, com uma lista de nomes e padrões. O ponto no início do nome faz o arquivo ficar oculto no Finder do Mac.</p>` },

  { n: 6, titulo: "Diferenças entre as variações", html: `
<h3>Público e privado</h3>
<ul>
<li><b>Público</b>: qualquer pessoa na internet vê o código e todo o histórico. Bom para projetos abertos, portfólio e para hospedar sites gratuitamente no GitHub Pages.</li>
<li><b>Privado</b>: só você e quem você convidar. Bom para projetos com regras de negócio que você não quer expor.</li>
</ul>
<p>Um ponto importante: trocar de público para privado esconde o repositório a partir daquele momento, mas não desfaz o que alguém já viu ou copiou enquanto ele era público.</p>
<h3>Local e remoto</h3>
<p>O repositório no seu computador é o <b>local</b>. A cópia no GitHub é o <b>remoto</b>. Eles não se atualizam sozinhos: push leva do local para o remoto, pull traz do remoto para o local.</p>
<h3>Fork e clone</h3>
<p><b>Clone</b> é uma cópia de trabalho de um repositório, ligada ao original. <b>Fork</b> (garfo, bifurcação) é uma cópia do repositório de outra pessoa para dentro da sua conta no GitHub, para você mexer à vontade e, se quiser, propor as mudanças de volta por um pull request.</p>
<h3>Git pelo terminal, pelo site ou por um app</h3>
<p>O Git original é usado por comandos no Terminal (você aprende no módulo 1 e no módulo 6). O site do GitHub permite fazer várias coisas clicando, e existem apps como o GitHub Desktop. Todos mexem no mesmo histórico.</p>` },

  { n: 7, titulo: "Exemplo real: os seus projetos", html: `
<h3>escola-dev</h3>
<p>Repositório público na sua conta. Tem a <code>main</code>, que o GitHub Pages publica, e ramos criados pelo Claude para cada sessão de trabalho, com nomes começando por <code>claude/</code>. Cada mudança desta escola é um commit com mensagem em português, e você pode ler todos eles. Esta própria aula entrou por um commit.</p>
<h3>secretaria-imoveis-whatsapp</h3>
<p>Repositório com o servidor em Node.js. A Render está ligada a ele: quando a <code>main</code> muda, a Render baixa a versão nova e reinicia o programa. Ou seja, um merge na <code>main</code> desse repositório é, na prática, uma publicação. Isso torna o ramo e o pull request ainda mais importantes ali.</p>
<h3>panofotos</h3>
<p>Guarda muitas imagens dentro do Git, o que deixa o repositório pesado. É um bom exemplo do "não coloque arquivos muito grandes" da parte 5. Você vai organizar os repositórios no trabalho do módulo 6 (Git e GitHub).</p>
<h3>A família Zava</h3>
<p>Há vários repositórios com nomes parecidos (zava-tours, tours, Zava-Way e outros). Saber qual é a versão oficial de cada projeto é uma das tarefas do trabalho deste módulo: o mapa do ecossistema.</p>` },

  { n: 8, titulo: "Como pesquisar mais", html: `
<ul>
<li><b>Pro Git</b>, de Scott Chacon e Ben Straub, 2ª edição: o livro de referência do Git, gratuito e traduzido para o português no site oficial do Git. Comece pelas seções 1.1 e 1.3.</li>
<li><b>GitHub Docs, "Sobre repositórios"</b> e <b>"Olá, Mundo"</b>, em português. O "Olá, Mundo" é um tutorial curto em que você cria um repositório, um ramo, um commit, um pull request e faz o merge, tudo clicando no site.</li>
<li><b>Glossário do GitHub</b>, em português, para qualquer palavra estranha que aparecer na tela.</li>
</ul>
<p><b>Ao pedir à IA</b>: diga sempre em que ramo ela deve trabalhar e peça "um commit por mudança, com mensagem em português". Ao revisar, abra o pull request e olhe a aba Files changed antes de aprovar.</p>` },

  { n: 9, titulo: "Exercício com critérios de correção", html: `
<ol>
<li>Abra <code>github.com/pggcthymg7-rgb/escola-dev</code>. Logo acima da lista de arquivos, à direita, clique no número com um relógio (o histórico de <b>commits</b>).</li>
<li>Escolha três commits e anote, para cada um: a mensagem, a data e quantos arquivos mudaram (clique no commit para ver).</li>
<li>Abra um desses commits e encontre uma linha verde (que entrou) e uma vermelha (que saiu). Copie uma de cada.</li>
<li>Explique por que o Claude trabalha num ramo e não direto na <code>main</code>.</li>
</ol>
<p><b>Critérios de correção</b>:</p>
<ul>
<li>Encontrou o histórico e anotou três commits reais, com mensagem e data.</li>
<li>Identificou corretamente linhas adicionadas e removidas.</li>
<li>No item 4, explicou que o ramo isola o risco: a <code>main</code>, que está no ar, só muda depois de revisar e juntar.</li>
</ul>` },

  { n: 10, titulo: "Termos novos no glossário", termos: ["Arquivo e pasta", "Repositório", "Controle de versão", "Git", "GitHub", "Commit", "Branch (ramo)", "Pull request", "Merge", "Push e pull", "Clone e fork", ".gitignore", "Código aberto"] }
 ],
 resumo: [
  "Repositório = pasta do projeto + histórico completo de mudanças.",
  "Git é o programa de controle de versão; GitHub é o site que guarda repositórios Git e ajuda a colaborar.",
  "Commit é um ponto salvo com mensagem; branch é uma linha paralela; pull request é o pedido para juntar; merge é a junção.",
  "Ciclo: ramo, mudanças, commits, push, pull request, revisão, merge, publicação.",
  "O histórico guarda tudo para sempre: nunca envie segredos; use .gitignore.",
  "Público: todos veem código e histórico. Privado: só convidados. Tornar privado não desfaz o que já foi visto.",
  "Em projetos ligados a uma hospedagem, um merge na main é, na prática, uma publicação."
 ],
 referencias: [
  { autor: "Scott Chacon e Ben Straub", titulo: "Pro Git, 2ª edição, seção 1.1: Sobre Controle de Versão", ano: "2014", tipo: "livro (gratuito online, traduzido)", idioma: "português", link: "https://git-scm.com/book/pt-br/v2/Primeiros-Passos-Sobre-Controle-de-Vers%c3%a3o", ler: "A seção inteira, com atenção aos sistemas distribuídos.", verificado: "2026-10-31" },
  { autor: "Scott Chacon e Ben Straub", titulo: "Pro Git, 2ª edição, seção 1.3: O que é Git?", ano: "2014", tipo: "livro (gratuito online, traduzido)", idioma: "português", link: "https://git-scm.com/book/pt-br/v2/Primeiros-Passos-O-que-%c3%a9-Git%3F", ler: "Snapshots, não diferenças e Os Três Estados.", verificado: "2026-10-31" },
  { autor: "GitHub Docs", titulo: "Sobre repositórios", ano: "página viva", tipo: "documentação", idioma: "português", link: "https://docs.github.com/pt/repositories/creating-and-managing-repositories/about-repositories", ler: "Terminologia do repositório e Sobre a visibilidade do repositório.", verificado: "2026-10-31" },
  { autor: "GitHub Docs", titulo: "Olá, Mundo", ano: "página viva", tipo: "tutorial", idioma: "português", link: "https://docs.github.com/pt/get-started/start-your-journey/hello-world", ler: "Leia as cinco etapas. Fazer o tutorial é opcional.", verificado: "2026-10-31" }
 ],
 tarefa: {
  obj: [
   { id: "m00-a06-o1", q: "O que um repositório tem que uma pasta comum não tem?", o: ["Arquivos maiores", "O histórico completo de mudanças", "Um endereço na internet obrigatório", "Senhas do projeto"], a: 1, e: "Repositório é a pasta mais o histórico de cada mudança, com data, autor e mensagem.", obj: 0 },
   { id: "m00-a06-o2", q: "Qual a diferença entre Git e GitHub?", o: ["São a mesma coisa.", "GitHub é o programa e Git é o site.", "Git é o programa de controle de versão; GitHub é o site que guarda repositórios Git.", "Git só funciona dentro do GitHub."], a: 2, e: "O Git roda no computador e cuida do histórico. O GitHub hospeda os repositórios e acrescenta ferramentas de colaboração.", obj: 1 },
   { id: "m00-a06-o3", q: "Qual a ordem correta?", o: ["merge, commit, pull request", "pull request, commit, merge", "commit, merge, pull request", "commit, pull request, merge"], a: 3, e: "Primeiro você registra as mudanças (commits), depois pede para juntar (pull request) e, aprovado, junta (merge).", obj: 2 },
   { id: "m00-a06-o4", q: "Para que serve trabalhar num branch (ramo)?", o: ["Para isolar as mudanças sem mexer na versão oficial até elas estarem prontas.", "Para deixar o site mais rápido.", "Para esconder o código de outras pessoas.", "Para apagar o histórico."], a: 0, e: "O ramo é uma linha paralela: a main, que está no ar, só muda depois do merge.", obj: 2 },
   { id: "m00-a06-o5", q: "Alguém enviou uma chave de API num commit e, no commit seguinte, apagou o arquivo. A chave está segura?", o: ["Sim, porque o arquivo foi apagado.", "Sim, se o repositório tiver poucos visitantes.", "Não, porque o histórico guarda a versão antiga do arquivo.", "Não, porque o GitHub publica as chaves no site."], a: 2, e: "O Git guarda tudo o que já foi registrado. A chave continua no histórico e deve ser trocada.", obj: 3 },
   { id: "m00-a06-o6", q: "No histórico de um commit no GitHub, o que significam as linhas em verde?", o: ["Linhas que entraram", "Linhas com erro", "Linhas que saíram", "Linhas com comentários"], a: 0, e: "Verde: adicionadas. Vermelho: removidas.", obj: 4 },
   { id: "m00-a06-o7", q: "Na secretaria, a Render publica automaticamente cada mudança na main. O que isso significa?", o: ["Que commits em outros ramos também vão para o ar.", "Que um merge na main é, na prática, uma publicação.", "Que a Render guarda o histórico do Git.", "Que o repositório precisa ser público."], a: 1, e: "A hospedagem acompanha a main. Juntar na main é colocar no ar.", obj: 2 },
   { id: "m00-a06-o8", q: "O que é o arquivo .gitignore?", o: ["Um arquivo que apaga commits antigos.", "Uma senha do GitHub.", "Uma lista do que o Git deve ignorar e não registrar.", "Um tipo de branch."], a: 2, e: "Ele diz ao Git quais arquivos e pastas não entram no repositório, como node_modules ou um .env.", obj: 3 }
  ],
  dis: [
   { id: "m00-a06-d1", q: "Explique para alguém que nunca programou o que são commit, branch, pull request e merge, usando uma única analogia que ligue os quatro.", min: 250, modelo: "Analogia de uma editora de livros. O livro publicado é a main. Um autor pega uma cópia de trabalho para escrever um capítulo novo sem mexer no livro à venda: é o branch. Cada vez que termina uma parte, anota no caderno de revisões o que mudou: é o commit. Quando o capítulo fica pronto, ele entrega ao editor um pedido de inclusão com tudo o que mudou marcado: é o pull request. O editor revisa e, aprovando, inclui o capítulo na próxima edição: é o merge.", criterios: ["Analogia única e coerente para os quatro termos", "Commit como registro de uma mudança com descrição", "Branch como linha paralela que não mexe na versão oficial", "Pull request como pedido revisável para juntar", "Merge como a junção à versão oficial"], aula: "m00-a06" },
   { id: "m00-a06-d2", q: "Para cada projeto, diga se você o deixaria público ou privado e por quê: (a) esta escola; (b) um sistema que você pretende vender para imobiliárias.", min: 180, modelo: "(a) Público: não tem segredos nem dados de pessoas, e o GitHub Pages gratuito publica a partir dele; serve também de portfólio. (b) Privado: tem regras de negócio que são o produto, e um erro de configuração exposto ajudaria quem quisesse atacar; além disso, se algum dia um segredo escapar para o histórico, ele não fica visível ao mundo. Em ambos, nenhum segredo vai para o repositório.", criterios: ["Decide de forma justificada para a escola", "Decide de forma justificada para o sistema comercial", "Menciona o histórico ou a exposição do código como fator", "Lembra que segredos não vão para o repositório em nenhum caso"], aula: "m00-a06" }
  ],
  pratica: { instrucao: "No GitHub, abra o repositório escola-dev, clique na aba Pull requests e depois no filtro Closed (fechados).", perguntas: [
   { id: "m00-a06-p1", q: "Quantos pull requests fechados existem? Abra um e anote: de qual ramo para qual ramo ele pedia a junção, e quantos commits ele tinha. Se não houver nenhum, explique em que outro lugar do GitHub dá para ver que mudanças foram juntadas à main.", min: 120 }
  ] }
 }
});

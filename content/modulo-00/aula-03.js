/* Módulo 0.0, aula 3. Esquema em docs/ESQUEMA-CONTEUDO.md. Base: lição m0b do material anterior, reorganizada. */
Escola.aula({
 id: "m00-a03", modulo: "m00", min: 50,
 titulo: "Internet, web, cliente e servidor",
 objetivos: [
  "Diferenciar internet de web.",
  "Explicar o modelo cliente e servidor e perceber que um mesmo programa pode fazer os dois papéis.",
  "Dizer quando um projeto precisa de um servidor próprio e quando não precisa.",
  "Diferenciar servidor sempre ligado, funções sob demanda (serverless) e hospedagem estática.",
  "Identificar o cliente e o servidor em cada um dos seus projetos."
 ],
 partes: [
  { n: 1, titulo: "O problema que isto resolve", html: `
<p>Imagine o sistema da secretaria de imóveis. Ele precisa ser alcançado por qualquer pessoa, a qualquer hora e de qualquer aparelho. O seu celular, porém, desliga, muda de lugar e troca de rede o tempo todo. Se cada aparelho tivesse de guardar todos os imóveis e conversar diretamente com todos os outros, nada ficaria atualizado e ninguém acharia ninguém.</p>
<p>A solução é dividir os papéis. Um computador fica parado, ligado e com endereço fixo, guardando os dados e as regras. Os demais aparelhos vão até ele pedir o que precisam. Essa divisão se chama <b>modelo cliente e servidor</b>, e quase tudo o que você usa na internet funciona assim: o Instagram, o banco, o WhatsApp e esta escola.</p>
<p>Entender esse modelo responde perguntas práticas: por que um site "cai"? Por que alguns projetos custam dinheiro todo mês e outros não? Onde deve ficar uma senha? Por que o seu robô para quando a Render tem problema, mas o zava-visit continua no ar?</p>` },

  { n: 2, titulo: "Definição, siglas e analogia", html: `
<h3>Internet e web não são a mesma coisa</h3>
<p>A <b>internet</b> é a rede física e lógica que liga bilhões de computadores no mundo: cabos submarinos, antenas, roteadores e as regras que permitem que um computador encontre o outro. É a infraestrutura, como as estradas de um país.</p>
<p>A <b>web</b> (de <i>World Wide Web</i>, "teia de alcance mundial") é um dos serviços que funcionam <i>sobre</i> a internet: as páginas que você abre num navegador, ligadas por links. O e-mail e as chamadas de vídeo também usam a internet, mas não são a web. Se a internet são as estradas, a web é uma das empresas de transporte que circulam por elas.</p>
<h3>Cliente</h3>
<p><b>Cliente</b> é o programa que faz o pedido. A palavra é a mesma de "cliente de loja", e a ideia também: quem chega e pede. O Safari, um app no celular e até o seu robô, quando consulta o Gemini, são clientes.</p>
<h3>Servidor</h3>
<p><b>Servidor</b> vem de "servir": é o programa que fica esperando pedidos e os atende. Muita gente usa a mesma palavra para o computador onde esse programa roda. Os dois usos aparecem por aí, então preste atenção ao contexto.</p>
<p>O servidor não tem nada de mágico. É um computador comum, muitas vezes sem tela, ligado o tempo todo, com um programa que fica "escutando" pedidos. Empresas como Render, Cloudflare e GitHub alugam computadores assim.</p>
<h3>A analogia do restaurante</h3>
<p>Você (cliente) senta, faz o pedido ao garçom e recebe o prato. A cozinha (servidor) fica aberta durante o expediente, guarda os ingredientes e decide como o prato é feito. Você não entra na cozinha e a cozinha não vai até a sua casa: ela só responde quando alguém pede.</p>
<p>Um detalhe importante: <b>os papéis dependem do momento, não da máquina</b>. O seu robô é servidor quando recebe um pedido do painel e é cliente quando chama o Gemini. É como um restaurante que compra pão de uma padaria: para os clientes ele é a cozinha; para a padaria, ele é o cliente.</p>
<h3>Requisição e resposta</h3>
<p>O pedido do cliente se chama <b>requisição</b> (em inglês, <i>request</i>). O que o servidor devolve é a <b>resposta</b> (<i>response</i>). Toda conversa na web é uma sequência de pares requisição e resposta. Na próxima aula você vai ver como eles são por dentro.</p>` },

  { n: 3, titulo: "De onde vem e quem cria", html: `
<p>O modelo cliente e servidor existe desde os grandes computadores dos anos 1960 e 1970, quando vários terminais simples (uma tela e um teclado, sem poder de processamento) falavam com uma máquina central.</p>
<p>A internet nasceu de pesquisas militares e universitárias nos Estados Unidos, a partir do fim dos anos 1960, e foi crescendo como uma rede de redes. A <b>web</b> veio depois: entre 1989 e 1991, Tim Berners-Lee, então pesquisador no CERN (um laboratório de física na Europa), criou o primeiro navegador, o primeiro servidor web e as regras da conversa entre eles. Ele também criou o HTML e o formato dos endereços que você digita até hoje.</p>
<p>Essas regras de conversa se chamam <b>protocolos</b>: acordos escritos sobre como pedir e como responder, para que programas feitos por pessoas diferentes se entendam. O protocolo da web é o <b>HTTP</b> (você vai vê-lo na aula 4). Hoje os padrões são mantidos por organizações abertas, como a IETF (que cuida dos protocolos da internet, inclusive o HTTP) e a W3C e o WHATWG (que cuidam das tecnologias das páginas). Ninguém é dono da conversa; por isso qualquer navegador fala com qualquer servidor.</p>
<p><b>Quem cria o cliente e o servidor de cada sistema</b> é quem desenvolve o sistema. No seu caso, com a IA: o servidor da secretaria é o programa em Node.js com Express; o cliente é qualquer coisa que o chame, do navegador com o painel aberto até outro programa.</p>` },

  { n: 4, titulo: "Como se usa: um pedido do começo ao fim", html: `
<p>Veja, passo a passo e comentado, o que acontece quando você abre o painel de um sistema seu no navegador. Os termos técnicos de cada passo serão aprofundados na próxima aula; aqui o foco é quem faz o quê.</p>
<pre><code>1. Você digita o endereço e toca em Ir.
   // você está usando um CLIENTE: o navegador
2. O navegador descobre onde fica o computador do servidor.
   // como achar o endereço de alguém numa lista telefônica
3. O navegador envia uma REQUISIÇÃO: "me dê a página do painel".
   // o pedido viaja pela INTERNET
4. O SERVIDOR recebe, decide o que fazer e monta a RESPOSTA.
   // pode consultar a planilha ou outra API antes de responder
5. A resposta volta: o texto da página (HTML).
6. O navegador lê o HTML e percebe que precisa de mais coisas:
   estilo (CSS), comportamento (JavaScript), imagens.
   // cada uma vira uma nova requisição
7. Com tudo em mãos, o navegador desenha a tela.
8. Você toca em "Salvar imóvel".
   // o JavaScript da página faz uma nova requisição, com os dados
9. O servidor grava e responde "deu certo".
   // o servidor guarda; o navegador só mostra</code></pre>
<p>Três lições desse percurso:</p>
<ol>
<li><b>Uma página gera muitas requisições.</b> Não é um pedido só; são dezenas.</li>
<li><b>O servidor só fala quando alguém pede.</b> Ele não "empurra" nada sozinho no modelo básico.</li>
<li><b>Quem guarda é o servidor.</b> Se você fechar o navegador, os dados continuam lá. É isso que permite abrir o painel no Mac e no iPhone e ver a mesma coisa.</li>
</ol>` },

  { n: 5, titulo: "Quando usar um servidor próprio e quando não usar", html: `
<h3>Use um servidor próprio quando</h3>
<ul>
<li><b>Precisa guardar dados que vários aparelhos enxergam</b>: os imóveis, os tours salvos, os pedidos.</li>
<li><b>Precisa guardar um segredo</b>, como a chave do Gemini. O segredo só pode ficar no servidor, porque <b>tudo que vai para o navegador pode ser lido por qualquer pessoa</b>. Você verá isso a fundo na aula 8.</li>
<li><b>Precisa rodar algo sem ninguém com a página aberta</b>, como o robô que escuta o WhatsApp o dia todo.</li>
<li><b>Precisa conferir o que o cliente mandou.</b> O cliente roda no aparelho de outra pessoa e pode ser alterado por ela. Por isso, regras importantes (preço, permissão, validação) são conferidas no servidor.</li>
</ul>
<h3>Não use quando</h3>
<p>A página só mostra conteúdo fixo, igual para todos. Um servidor que roda código custa dinheiro, pode cair, precisa de manutenção e aumenta os pontos por onde alguém pode tentar entrar. Para conteúdo fixo, uma hospedagem que só entrega arquivos é mais barata, mais rápida e mais simples. Esta escola, por exemplo, não tem servidor próprio: os arquivos ficam no GitHub Pages e todo o trabalho acontece no seu aparelho, inclusive guardar o seu progresso.</p>` },

  { n: 6, titulo: "Diferenças entre as variações", html: `
<h3>Três jeitos de ter um "servidor"</h3>
<ul>
<li><b>Servidor sempre ligado</b>: um programa que roda continuamente num computador alugado, como a secretaria na Render. É o certo para quem precisa manter conexões abertas o tempo todo, como a do WhatsApp. Em alguns planos gratuitos, a hospedagem pausa o programa quando ninguém usa, e o primeiro pedido seguinte demora enquanto ele "acorda". Confira as regras do plano que você usa.</li>
<li><b>Funções sob demanda</b>, também chamadas <b>serverless</b> ("sem servidor"): pequenos trechos de código que a hospedagem executa só quando chega um pedido, como as funções do zava-tours na Cloudflare. Você não cuida de uma máquina ligada e paga, em geral, pelo uso. O nome engana: o servidor continua existindo, só não é problema seu.</li>
<li><b>Hospedagem estática</b>: só entrega arquivos prontos, sem rodar código seu (GitHub Pages, Cloudflare Pages). Barata e muito estável.</li>
</ul>
<h3>Front-end e back-end</h3>
<p>O código que roda no cliente (navegador) é o <b>front-end</b>; o que roda no servidor é o <b>back-end</b>. Numa página simples, o back-end monta quase tudo e o front-end só mostra. Em aplicações como esta escola ou o zava-visit, o front-end faz boa parte do trabalho.</p>
<h3>Uma exceção: ponto a ponto</h3>
<p>No modelo <b>peer-to-peer</b> (ponto a ponto, de igual para igual), os aparelhos falam direto entre si, sem um servidor central. Alguns programas de compartilhamento de arquivos funcionam assim. Existe, mas não é o que os seus projetos usam.</p>
<h3>O que muda de um servidor para outro</h3>
<ul>
<li><b>Latência</b>: o tempo de ida e volta de um pedido. Quanto mais longe o servidor, maior.</li>
<li><b>Capacidade</b>: quantos pedidos ele aguenta ao mesmo tempo.</li>
<li><b>Disponibilidade</b>: quanto tempo fica no ar sem falhar.</li>
<li><b>Custo</b>: grátis com limites, ou pago por mês ou por uso.</li>
</ul>
<p>Quando uma resposta demora demais, o cliente desiste e mostra um erro de <b>timeout</b> (tempo esgotado).</p>` },

  { n: 7, titulo: "Exemplo real: os seus projetos", html: `
<h3>secretaria-imoveis-whatsapp: os dois papéis ao mesmo tempo</h3>
<p>Como <b>servidor</b>, o programa em Node.js com Express, na Render, recebe os pedidos do painel. Como <b>cliente</b>, o mesmo programa chama o Gemini, lê e grava na planilha do Google e mantém uma conexão aberta com o WhatsApp. É um servidor sempre ligado, porque a conexão com o WhatsApp precisa ficar aberta o tempo todo.</p>
<h3>zava-tours: estático com um pouco de dinâmico</h3>
<p>O navegador de quem abre um tour é o cliente. Ele pede os arquivos (páginas, imagens panorâmicas) a uma hospedagem estática. Para guardar ou carregar um tour, chama pequenas funções sob demanda na Cloudflare. Ou seja: a maior parte é estática, e só a parte que guarda dados roda código.</p>
<h3>zava-visit: só estático</h3>
<p>O navegador baixa os arquivos, e o Three.js desenha o 3D no próprio aparelho. Não há um programa seu rodando num servidor. Por isso, se a Render tiver um problema, o zava-visit nem percebe: são peças independentes.</p>
<h3>Escola Dev</h3>
<p>Também só estática. O "servidor" é o GitHub Pages, que entrega os arquivos. O seu progresso fica guardado no próprio aparelho, e por isso o que você faz no iPhone não aparece no Mac sem um backup.</p>` },

  { n: 8, titulo: "Como pesquisar mais", html: `
<ul>
<li><b>MDN Web Docs</b>, nas páginas "Como a Web funciona" e "Visão geral do cliente-servidor", ambas em português. Elas usam as mesmas palavras desta aula e trazem diagramas.</li>
<li><b>Veja a conversa de verdade</b>: no Mac, abra o Chrome, aperte <code>Cmd + Option + I</code> para abrir as ferramentas de desenvolvedor, clique na aba <b>Network</b> (Rede) e recarregue a página. Cada linha que aparece é uma requisição. No Safari, primeiro é preciso ligar os recursos de desenvolvedor nos Ajustes do Safari, na aba Avançado.</li>
<li><b>Documentação das hospedagens</b> que você usa (Render, Cloudflare, GitHub Pages): cada uma explica o que roda e o que não roda nos planos gratuitos.</li>
</ul>
<p><b>Pergunta útil para a IA</b>: "neste projeto, o que roda no cliente e o que roda no servidor? Faça uma lista de cada lado e diga onde ficam os segredos". Se a resposta disser que um segredo fica no cliente, desconfie.</p>` },

  { n: 9, titulo: "Exercício com critérios de correção", html: `
<p>Monte uma tabela no caderno desta aula, com uma linha para cada um destes três: a secretaria, o zava-tours e esta escola. Colunas:</p>
<ol>
<li>Quem é o cliente?</li>
<li>Quem é o servidor (e qual a variação: sempre ligado, sob demanda ou estático)?</li>
<li>O que viaja no pedido?</li>
<li>O que volta na resposta?</li>
<li>Onde os dados ficam guardados?</li>
</ol>
<p><b>Critérios de correção</b>:</p>
<ul>
<li>Na secretaria, o mesmo programa aparece nos dois papéis (servidor do painel e cliente do Gemini ou da planilha).</li>
<li>A variação de servidor de cada projeto está correta.</li>
<li>Na Escola Dev, você percebeu que os dados ficam no aparelho, não num servidor.</li>
<li>As colunas "pedido" e "resposta" trazem coisas concretas (por exemplo, "a página do painel", "os dados de um tour"), não só "informações".</li>
</ul>` },

  { n: 10, titulo: "Termos novos no glossário", termos: ["Internet", "Web", "Cliente", "Servidor", "Requisição", "Resposta", "Protocolo", "Front-end", "Back-end", "Serverless (funções sob demanda)", "Hospedagem", "Latência", "Timeout"] }
 ],
 resumo: [
  "Internet é a rede que liga os computadores; a web é um serviço sobre ela (páginas e links).",
  "Cliente pede; servidor atende. Os papéis dependem do momento: um programa pode ser os dois.",
  "Toda conversa é uma sequência de requisição e resposta, seguindo um protocolo (na web, o HTTP).",
  "Use servidor próprio para guardar dados compartilhados, segredos, tarefas contínuas e conferir o que o cliente manda.",
  "Para conteúdo fixo, hospedagem estática basta: mais barata, rápida e simples.",
  "Variações: servidor sempre ligado (secretaria), funções sob demanda (zava-tours) e estático (zava-visit, Escola Dev).",
  "Tudo que chega ao navegador pode ser lido por qualquer pessoa."
 ],
 referencias: [
  { autor: "MDN Web Docs (Mozilla)", titulo: "Como a Web funciona", ano: "página viva", tipo: "documentação", idioma: "português", link: "https://developer.mozilla.org/pt-BR/docs/Learn_web_development/Getting_started/Web_standards/How_the_web_works", ler: "As seções Clientes e servidores e Então, o que acontece, exatamente?", verificado: "2026-10-31" },
  { autor: "MDN Web Docs (Mozilla)", titulo: "Visão geral do cliente-servidor", ano: "página viva", tipo: "documentação", idioma: "português", link: "https://developer.mozilla.org/pt-BR/docs/Learn_web_development/Extensions/Server-side/First_steps/Client-Server_overview", ler: "As seções Sites estáticos e Sites dinâmicos. Os exemplos de código podem ser pulados por enquanto.", verificado: "2026-10-31" },
  { autor: "MDN Web Docs (Mozilla)", titulo: "O que é um servidor web (web server)?", ano: "página viva", tipo: "documentação", idioma: "português", link: "https://developer.mozilla.org/pt-BR/docs/Learn_web_development/Howto/Web_mechanics/What_is_a_web_server", ler: "Sumário e a seção Conteúdo estático vs. dinâmico.", verificado: "2026-10-31" }
 ],
 tarefa: {
  obj: [
   { id: "m00-a03-o1", q: "Qual frase descreve corretamente a relação entre internet e web?", o: ["São dois nomes para a mesma coisa.", "A web é a rede física; a internet é o conjunto de páginas.", "A internet é a rede que liga os computadores; a web é um serviço que funciona sobre ela.", "A internet só existe dentro do navegador."], a: 2, e: "A internet é a infraestrutura (as estradas). A web é um dos serviços que usam essa infraestrutura, como o e-mail também usa.", obj: 0 },
   { id: "m00-a03-o2", q: "O robô da secretaria recebe pedidos do painel e também chama o Gemini. Isso mostra que:", o: ["um mesmo programa pode ser servidor num momento e cliente em outro", "o robô é um navegador", "o Gemini é o cliente do painel", "cliente e servidor precisam estar no mesmo computador"], a: 0, e: "Os papéis dependem do momento, não da máquina: quem pede é cliente, quem atende é servidor.", obj: 1 },
   { id: "m00-a03-o3", q: "Por que a chave de uma IA não pode ficar no código que roda no navegador?", o: ["Porque o navegador apaga as chaves sozinho.", "Porque tudo que chega ao navegador pode ser lido por qualquer pessoa.", "Porque o navegador não sabe usar chaves.", "Porque a chave deixa o site mais lento."], a: 1, e: "O código do front-end vai para o aparelho de quem visita. Qualquer um pode abrir e ler. Segredos ficam no servidor.", obj: 2 },
   { id: "m00-a03-o4", q: "Um site de cardápio que mostra o mesmo conteúdo fixo para todos os visitantes precisa de:", o: ["um servidor sempre ligado com banco de dados", "hospedagem estática, que só entrega arquivos", "funções sob demanda para cada visita", "um app nativo"], a: 1, e: "Conteúdo fixo não exige código rodando no servidor. Hospedagem estática é mais barata, rápida e simples.", obj: 2 },
   { id: "m00-a03-o5", q: "As funções do zava-tours na Cloudflare, que só rodam quando chega um pedido, são um exemplo de:", o: ["peer-to-peer", "servidor sempre ligado", "sistema operacional", "funções sob demanda (serverless)"], a: 3, e: "Serverless: a hospedagem executa o código só quando há pedido. O servidor existe, mas você não cuida dele.", obj: 3 },
   { id: "m00-a03-o6", q: "Por que o zava-visit continua no ar mesmo quando a Render tem problemas?", o: ["Porque ele é estático e não depende de um programa rodando na Render.", "Porque ele tem uma cópia da Render dentro dele.", "Porque o Three.js substitui o servidor.", "Porque ele é um app nativo."], a: 0, e: "São peças independentes. O zava-visit só precisa que os arquivos sejam entregues; o 3D é desenhado no aparelho.", obj: 4 },
   { id: "m00-a03-o7", q: "O que é timeout?", o: ["Um tipo de servidor gratuito.", "O tempo que um site fica no ar por mês.", "O erro que aparece quando a resposta demora demais e o cliente desiste de esperar.", "Uma pausa programada para manutenção."], a: 2, e: "Timeout significa tempo esgotado: o cliente para de esperar a resposta.", obj: 3 }
  ],
  dis: [
   { id: "m00-a03-d1", q: "Explique o modelo cliente e servidor com uma analogia sua (que não seja o restaurante) e mostre, na analogia, como um mesmo participante pode fazer os dois papéis.", min: 200, modelo: "Exemplo: uma biblioteca. O leitor (cliente) pede um livro no balcão; o bibliotecário (servidor) busca no acervo e entrega. O acervo fica sempre no mesmo lugar e todos os leitores vão até ele. Quando a biblioteca encomenda livros novos a uma editora, ela passa a ser cliente da editora. No software é igual: o programa da secretaria atende o painel (servidor) e pede respostas ao Gemini (cliente).", criterios: ["Analogia própria e coerente, com quem pede e quem atende", "Explica que o servidor guarda e espera pedidos", "Mostra um mesmo participante nos dois papéis", "Liga a analogia a um caso de software"], aula: "m00-a03" },
   { id: "m00-a03-d2", q: "Você quer criar uma página para mostrar fotos de um condomínio (conteúdo fixo) e, no futuro, um formulário em que interessados deixam nome e telefone. Que tipo de hospedagem você usaria em cada fase, e por quê?", min: 200, modelo: "Na primeira fase, só fotos fixas, uma hospedagem estática basta (GitHub Pages ou Cloudflare Pages): é barata, rápida e não roda código meu. Quando entrar o formulário, preciso guardar os contatos num lugar que eu acesse depois e conferir os dados enviados, o que exige código rodando fora do navegador. Para algo pequeno, funções sob demanda resolvem sem manter um servidor ligado; um servidor sempre ligado só seria necessário se houvesse tarefas contínuas.", criterios: ["Escolhe hospedagem estática para o conteúdo fixo, com justificativa", "Percebe que guardar os contatos exige código fora do navegador", "Escolhe funções sob demanda ou servidor para o formulário, com justificativa", "Menciona custo, simplicidade ou segurança na decisão"], aula: "m00-a03" }
  ],
  pratica: { instrucao: "No Mac, abra esta escola no Chrome (ou no Safari com os recursos de desenvolvedor ligados), aperte Cmd + Option + I, clique na aba Network (Rede) e recarregue a página.", perguntas: [
   { id: "m00-a03-p1", q: "Quantas requisições apareceram, aproximadamente? Cite o nome de três arquivos pedidos (por exemplo, app.css). Isso confirma que uma página gera muitas requisições?", min: 100 }
  ] }
 }
});

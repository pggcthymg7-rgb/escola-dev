/* Módulo 0.0, aula 5. Esquema em docs/ESQUEMA-CONTEUDO.md. Base: lição m0c do material anterior (padrão de profundidade), reorganizada. */
Escola.aula({
 id: "m00-a05", modulo: "m00", min: 55,
 titulo: "API: como sistemas conversam",
 objetivos: [
  "Explicar o que é uma API, o significado da sigla e a diferença entre o contrato e o código que o cumpre.",
  "Reconhecer as quatro origens de API (de terceiros, própria, do navegador e de biblioteca) nos seus projetos.",
  "Ler uma rota simples em Express e uma chamada com fetch, dizendo o que cada linha faz.",
  "Ler um pequeno trecho de JSON e dizer quais dados ele contém.",
  "Diferenciar REST, webhook e WebSocket, e saber por onde começar a ler a documentação de uma API nova."
 ],
 partes: [
  { n: 1, titulo: "O problema que isto resolve", html: `
<p>Programas são feitos por pessoas e empresas diferentes, em linguagens diferentes, rodando em computadores diferentes. O seu robô precisa que o Gemini, do Google, entenda uma mensagem. Ele não pode abrir o código do Google e usá-lo por dentro: o código é do Google, roda nos computadores do Google e muda sem aviso.</p>
<p>Ao mesmo tempo, o painel da secretaria, que roda no navegador, precisa pedir ao programa na Render a lista de imóveis. São dois programas separados, em lugares diferentes, que precisam combinar como conversar.</p>
<p>A solução é o dono de cada sistema publicar um <b>contrato</b>: "estes são os pedidos que aceito, nesta forma, e estas são as respostas que devolvo". Quem quiser usar o sistema segue o contrato, sem precisar saber como ele funciona por dentro. Esse contrato é a <b>API</b>, e ela é a cola de quase todo software moderno.</p>` },

  { n: 2, titulo: "Definição, sigla e analogia", html: `
<p><b>API</b> é a sigla de <i>Application Programming Interface</i>, "interface de programação de aplicações". <b>Interface</b> é um ponto de contato entre duas coisas. "De programação" quer dizer que quem usa esse ponto de contato é <i>outro programa</i>, e não uma pessoa. A tela que você toca é uma interface para pessoas; a API é uma interface para programas.</p>
<p><b>Analogia da tomada</b>: o formato da tomada é um padrão. Você liga qualquer aparelho sem saber como a usina funciona, e a usina pode trocar as turbinas sem que você perceba, desde que a tomada continue igual.</p>
<p><b>Analogia do cardápio</b>: o cardápio lista o que você pode pedir e o que vem em cada prato, sem deixar você entrar na cozinha. Cada item do cardápio é uma <b>rota</b> da API.</p>
<h3>Uma API é código?</h3>
<p>São duas coisas ligadas:</p>
<ul>
<li><b>O contrato</b>: um texto (a <b>documentação</b>) que diz quais pedidos existem, o que enviar e o que volta. É isso que você, como cliente, lê e usa.</li>
<li><b>O código que cumpre o contrato</b>: escrito por quem criou o sistema e rodando no servidor dele. Você não vê esse código e não precisa ver.</li>
</ul>
<h3>Rota, verbo e JSON</h3>
<ul>
<li><b>Rota</b> (ou <i>endpoint</i>, "ponto final"): cada item do cardápio, identificado por um método e um caminho, como <code>GET /api/imoveis</code>.</li>
<li><b>Verbos</b>: os métodos HTTP da aula 4. GET pega, POST cria, PUT altera, DELETE apaga.</li>
<li><b>JSON</b> (<i>JavaScript Object Notation</i>, notação de objetos do JavaScript): o formato de texto mais usado para os dados que vão e voltam. Ele organiza tudo em pares nome e valor, entre chaves: <code>{"quartos": 3, "bairro": "Centro"}</code>. Uma lista vai entre colchetes: <code>[1, 2, 3]</code>. Apesar do nome, é usado por praticamente todas as linguagens.</li>
</ul>` },

  { n: 3, titulo: "De onde vem e quem cria", html: `
<p>A ideia de um programa oferecer funções para outros programas é antiga: sistemas operacionais oferecem APIs há décadas, para que os apps peçam coisas como "abra um arquivo" ou "mostre uma janela". Com a web, a partir dos anos 2000, empresas passaram a oferecer APIs pela internet, usando HTTP. Hoje, praticamente todo serviço digital grande tem uma.</p>
<p>Sempre <b>alguém escreve</b> uma API. Existem quatro origens, e os seus projetos usam todas:</p>
<ol>
<li><b>API de terceiros</b>: criada por uma empresa para você usar, como a do Gemini. Você pede, ela responde, geralmente exigindo uma <b>chave</b> e dentro de <b>limites de uso</b> e de preço. Para facilitar, muitas empresas oferecem um <b>SDK</b> (<i>Software Development Kit</i>, kit de desenvolvimento): uma biblioteca pronta que monta os pedidos para você. Na secretaria, a dependência do Google para o Gemini é um SDK.</li>
<li><b>API própria</b>: a que você (com a IA) criou no programa da secretaria, usando o Express. Quem escreve decide o que cada rota faz e <i>quem pode usá-la</i>.</li>
<li><b>API do navegador</b>: funções que o Safari ou o Chrome oferecem à sua página, como guardar dados no aparelho (<code>localStorage</code>) ou fazer requisições (<code>fetch</code>). Esta escola usa as duas.</li>
<li><b>API de uma biblioteca</b>: o conjunto de funções que uma biblioteca oferece. Quando o zava-visit chama o Three.js, usa a API dele, sem nenhuma internet no meio.</li>
</ol>
<p>Perceba que "API" não significa necessariamente "pela internet". O que define uma API é o contrato entre programas. Mas, no dia a dia da web, quando alguém fala "a API", quase sempre quer dizer um conjunto de rotas HTTP.</p>` },

  { n: 4, titulo: "Como se usa: os dois lados, linha a linha", html: `
<h3>Do lado de quem cria: uma rota em Express</h3>
<pre><code>app.get("/api/imoveis", (req, res) => {     // 1
  const lista = buscarImoveisDaPlanilha();     // 2
  res.json(lista);                             // 3
});                                            // 4</code></pre>
<ol>
<li><code>app.get("/api/imoveis", ...)</code>: "quando chegar um pedido GET para o caminho /api/imoveis, rode a função a seguir". <code>app</code> é o servidor Express. <code>req</code> é o pedido que chegou (<i>request</i>) e <code>res</code> é a resposta que será enviada (<i>response</i>). A seta <code>=&gt;</code> é um jeito curto de escrever uma função.</li>
<li>Chama uma função (escrita em outro lugar do programa) que busca os imóveis e guarda o resultado em <code>lista</code>.</li>
<li><code>res.json(lista)</code> envia a resposta com a lista em formato JSON. Se ninguém disser outra coisa, o código de status é 200.</li>
<li>Fecha a função e a definição da rota.</li>
</ol>
<p>Cada <code>app.get</code>, <code>app.post</code>, <code>app.put</code> e <code>app.delete</code> num programa Express é um item do cardápio. Repare que nada nesse trecho pergunta <i>quem</i> está pedindo: se a rota devolver dados privados, ela precisaria conferir a identidade antes (aula 4, parte 6).</p>
<h3>Do lado de quem usa: uma chamada com fetch</h3>
<pre><code>const resp = await fetch("https://loja.example.com/api/imoveis");  // 1
const dados = await resp.json();                                   // 2
console.log(dados[0].bairro);                                      // 3</code></pre>
<ol>
<li><code>fetch</code> (buscar) é a API do navegador para fazer requisições. Sem dizer o método, ele faz um GET. <code>await</code> quer dizer "espere a resposta chegar antes de seguir", porque a rede leva tempo.</li>
<li>A resposta chega como texto. <code>resp.json()</code> converte o texto JSON em dados que o JavaScript entende.</li>
<li><code>dados[0]</code> pega o primeiro item da lista (a contagem começa em zero) e <code>.bairro</code> pega o campo "bairro" dele.</li>
</ol>
<h3>Lendo o JSON que voltou</h3>
<pre><code>[
  { "id": 7, "bairro": "Centro", "quartos": 3, "preco": 350000 },
  { "id": 9, "bairro": "Setor Sul", "quartos": 2, "preco": 280000 }
]</code></pre>
<p>Lê-se: uma lista (colchetes) com dois imóveis (cada um entre chaves). Cada imóvel tem quatro campos. O texto vai entre aspas; números não. Com isso, a linha 3 do fetch mostraria <code>Centro</code>.</p>` },

  { n: 5, titulo: "Quando usar e quando não usar", html: `
<h3>Use uma API de terceiros quando</h3>
<ul>
<li>Precisa de algo que outro sistema faz melhor que você: IA, mapas, pagamentos, envio de mensagens, e-mail.</li>
<li>O custo e os limites cabem no seu uso. Leia a página de preços e de limites antes de depender dela.</li>
</ul>
<h3>Crie uma API própria quando</h3>
<ul>
<li>A página precisa guardar ou buscar dados num servidor, como o painel da secretaria ou os tours do zava-tours.</li>
<li>Você quer que outros sistemas usem o seu, por exemplo um parceiro que consulta os seus imóveis.</li>
</ul>
<h3>Não use quando</h3>
<ul>
<li>A página só mostra conteúdo fixo, como o zava-visit hoje. Sem servidor, não há API própria para criar.</li>
<li>Uma API de terceiros não oficial é o único caminho e o uso é comercial. Exemplo dos seus projetos: o Baileys, usado na secretaria para o WhatsApp, é uma biblioteca não oficial que imita o WhatsApp Web, e não a API oficial do WhatsApp. Antes de vender um produto que dependa dela, confirme as regras de uso do WhatsApp, porque há risco de bloqueio do número.</li>
</ul>
<h3>Cuidados que valem sempre</h3>
<ul>
<li>A chave de uma API de terceiros é um segredo e fica só no servidor (aula 8).</li>
<li>Toda API própria precisa decidir quem pode usar cada rota. Rota que mostra ou altera dados privados confere a identidade.</li>
<li>APIs mudam. Anote a versão que você usa e acompanhe os avisos de quem a mantém.</li>
</ul>` },

  { n: 6, titulo: "Diferenças entre as variações", html: `
<h3>O que muda de uma API para outra</h3>
<ul>
<li><b>Endereço e rotas</b>: onde pedir e o quê.</li>
<li><b>Formato dos dados</b>: quais campos enviar e quais voltam.</li>
<li><b>Autenticação</b>: chave, login com token ou nenhuma.</li>
<li><b>Limites e preço</b>: quantos pedidos por minuto (<b>rate limit</b>) e quanto custa.</li>
<li><b>Versão</b>: contratos mudam, e versões antigas podem parar de funcionar.</li>
</ul>
<h3>Estilos que você vai encontrar</h3>
<ul>
<li><b>REST</b> (<i>Representational State Transfer</i>): o estilo mais comum. Usa rotas com nomes de coisas (<code>/imoveis</code>, <code>/imoveis/7</code>), os verbos HTTP para dizer a ação e, quase sempre, JSON. A API da secretaria segue esse estilo.</li>
<li><b>GraphQL</b>: um único endereço; o cliente descreve exatamente os dados que quer. Útil em sistemas grandes com muitas telas diferentes.</li>
<li><b>Webhook</b>: o contrário do pedido comum. Em vez de você perguntar o tempo todo "chegou algo?", o outro sistema <i>chama você</i> quando algo acontece, por exemplo um pagamento aprovado. Você fornece um endereço e ele faz um POST nele.</li>
<li><b>WebSocket</b>: uma conversa contínua, com o canal aberto nos dois sentidos, sem repetir pedidos. É assim que o robô mantém a conexão com o WhatsApp para receber mensagens na hora.</li>
</ul>
<h3>Pública, privada e interna</h3>
<p>Uma API <b>pública</b> é oferecida a qualquer desenvolvedor (com cadastro). Uma <b>privada</b> é usada só pelos próprios apps da empresa, como a da secretaria, usada só pelo painel. "Privada" aqui quer dizer que não foi feita para outros, e não que esteja protegida: a proteção depende de conferir a identidade em cada rota.</p>` },

  { n: 7, titulo: "Exemplo real: os seus projetos", html: `
<h3>secretaria-imoveis-whatsapp</h3>
<ul>
<li><b>API própria</b>: as rotas criadas com Express, que o painel chama para listar, criar, alterar e apagar imóveis e para ver como o sistema está.</li>
<li><b>APIs de terceiros</b>: o Gemini (via SDK do Google) e a planilha do Google.</li>
<li><b>Biblioteca não oficial</b>: o Baileys, para o WhatsApp, com o cuidado da parte 5.</li>
<li><b>WebSocket</b>: a conexão contínua com o WhatsApp.</li>
</ul>
<p>Quando você chegar ao módulo 4 (Servidor, APIs e Node.js), o trabalho do módulo será revisar essas rotas uma a uma: o que cada uma faz, quem pode chamá-la e como ela confere os dados recebidos.</p>
<h3>zava-tours</h3>
<p>As funções na Cloudflare formam uma pequena API própria: uma rota que guarda um tour e outra que o devolve, cada uma identificada pelo id do tour. O navegador chama essas rotas com <code>fetch</code>.</p>
<h3>Esta escola</h3>
<p>Não tem API própria, porque não tem servidor. Mas usa APIs do navegador: <code>localStorage</code> para guardar o seu progresso e o <i>service worker</i> para funcionar sem internet.</p>` },

  { n: 8, titulo: "Como pesquisar mais", html: `
<p>Para aprender qualquer API nova, procure a <b>documentação oficial</b> (busque "nome da API docs") e leia nesta ordem:</p>
<ol>
<li><b>Quickstart</b> (início rápido): o primeiro exemplo funcionando.</li>
<li><b>Authentication</b> (autenticação): como se identificar e onde guardar a chave.</li>
<li><b>Reference</b> (referência): a lista completa de rotas e campos.</li>
<li><b>Rate limits</b> e <b>Pricing</b>: limites de uso e preço.</li>
</ol>
<p>Para os conceitos desta aula:</p>
<ul>
<li><b>MDN, glossário "API"</b> e <b>"Introdução às Web APIs"</b>, em português.</li>
<li><b>MDN, "Trabalhando com JSON"</b>, em português.</li>
<li><b>Express, "Olá, exemplo do mundo"</b>, em português: o servidor mais simples possível, com uma rota.</li>
</ul>
<p><b>Ao usar IA</b>: peça que ela cite a página da documentação de onde tirou o nome de cada rota ou função, e abra o link. IAs às vezes inventam rotas que parecem plausíveis e não existem.</p>` },

  { n: 9, titulo: "Exercício com critérios de correção", html: `
<ol>
<li>No GitHub, abra o arquivo principal do servidor da secretaria (o <code>index.js</code>) e use a busca do navegador (<code>Cmd + F</code>) para encontrar <code>app.get</code>, <code>app.post</code>, <code>app.put</code> e <code>app.delete</code>. Monte, no caderno desta aula, uma tabela com: verbo, caminho e o que você acha que a rota faz pelo nome.</li>
<li>Leia este JSON e responda: quantos tours há, qual o nome do segundo e quantas cenas ele tem?
<pre><code>{ "tours": [
    { "id": "a1", "nome": "Casa Lago", "cenas": 5 },
    { "id": "b2", "nome": "Loft Centro", "cenas": 3 }
] }</code></pre></li>
<li>Explique a diferença entre a API do Gemini e a API do programa da secretaria.</li>
</ol>
<p><b>Critérios de correção</b>:</p>
<ul>
<li>Item 1: a tabela tem pelo menos 4 rotas, cada uma com verbo e caminho corretos; a coluna "o que faz" usa o verbo de forma coerente (GET busca, DELETE apaga).</li>
<li>Item 2: 2 tours; o segundo é "Loft Centro", com 3 cenas.</li>
<li>Item 3: o Gemini é API de terceiros (do Google, com chave, limites e preço; você é o cliente); a da secretaria é própria (você criou, roda no seu servidor; o painel é o cliente).</li>
</ul>` },

  { n: 10, titulo: "Termos novos no glossário", termos: ["API", "Rota (endpoint)", "JSON", "SDK", "Chave de API", "Limite de uso (rate limit)", "REST", "Webhook", "WebSocket", "Express", "Documentação", "fetch"] }
 ],
 resumo: [
  "API é o contrato que diz como um programa pode usar outro, sem entrar no código dele.",
  "Origens: de terceiros (Gemini), própria (Express na secretaria), do navegador (fetch, localStorage) e de biblioteca (Three.js).",
  "Rota = verbo + caminho. Os dados costumam viajar em JSON: pares nome e valor entre chaves, listas entre colchetes.",
  "No servidor, app.get define uma rota; no cliente, fetch faz o pedido e resp.json() lê a resposta.",
  "Toda rota com dados privados precisa conferir quem pede; chaves de terceiros ficam só no servidor.",
  "REST usa rotas e verbos; webhook é o outro sistema chamando você; WebSocket é conversa contínua.",
  "Para aprender uma API: Quickstart, Authentication, Reference, Rate limits."
 ],
 referencias: [
  { autor: "MDN Web Docs (Mozilla)", titulo: "API (Glossário do MDN Web Docs)", ano: "página atualizada em 2023", tipo: "documentação", idioma: "português", link: "https://developer.mozilla.org/pt-BR/docs/Glossary/API", ler: "A página inteira (é curta).", verificado: "2026-10-31" },
  { autor: "MDN Web Docs (Mozilla)", titulo: "Introdução às Web APIs", ano: "página viva", tipo: "documentação", idioma: "português", link: "https://developer.mozilla.org/pt-BR/docs/Learn_web_development/Extensions/Client-side_APIs/Introduction", ler: "Seções O que são APIs? e O que as APIs podem fazer?", verificado: "2026-10-31" },
  { autor: "MDN Web Docs (Mozilla)", titulo: "Trabalhando com JSON", ano: "página viva", tipo: "documentação", idioma: "português", link: "https://developer.mozilla.org/pt-BR/docs/Learn_web_development/Core/Scripting/JSON", ler: "Seção Não, sério, o que é o JSON? (Estrutura JSON e Matrizes como JSON).", verificado: "2026-10-31" },
  { autor: "Express (OpenJS Foundation)", titulo: "Olá, exemplo do mundo", ano: "página viva", tipo: "documentação", idioma: "português", link: "https://expressjs.com/pt-br/starter/hello-world.html", ler: "O exemplo de código e a explicação de que caminhos não definidos respondem 404.", verificado: "2026-10-31" }
 ],
 tarefa: {
  obj: [
   { id: "m00-a05-o1", q: "O que significa o 'de programação' em 'interface de programação de aplicações'?", o: ["Que a API só pode ser escrita em JavaScript.", "Que quem usa a interface é outro programa, não uma pessoa.", "Que a API precisa de um programador presente.", "Que a API é uma linguagem de programação."], a: 1, e: "A tela é interface para pessoas; a API é interface para programas.", obj: 0 },
   { id: "m00-a05-o2", q: "O Gemini, usado pela secretaria, é um exemplo de:", o: ["API de terceiros", "API do navegador", "API de biblioteca local", "sistema operacional"], a: 0, e: "É oferecida por outra empresa (Google), com chave, limites e preço.", obj: 1 },
   { id: "m00-a05-o3", q: "Em app.get(\"/api/imoveis\", (req, res) => { ... }), o que é res?", o: ["O pedido que chegou", "A planilha", "A resposta que será enviada", "O código de status"], a: 2, e: "req é o pedido (request) e res é a resposta (response).", obj: 2 },
   { id: "m00-a05-o4", q: "Por que se usa await antes de fetch?", o: ["Para deixar o código mais curto.", "Para apagar a resposta antiga.", "Para transformar texto em número.", "Para esperar a resposta chegar antes de seguir, porque a rede leva tempo."], a: 3, e: "A rede não responde na hora. await faz o código esperar a resposta.", obj: 2 },
   { id: "m00-a05-o5", q: "No JSON [{\"bairro\": \"Centro\", \"quartos\": 3}], o que é \"quartos\": 3?", o: ["Um par nome e valor dentro de um item da lista", "Uma rota da API", "Um cabeçalho HTTP", "Um erro de sintaxe"], a: 0, e: "JSON organiza dados em pares nome e valor entre chaves; os colchetes formam uma lista.", obj: 3 },
   { id: "m00-a05-o6", q: "Um sistema de pagamento avisa o seu servidor, fazendo um POST num endereço seu, sempre que um pagamento é aprovado. Isso é:", o: ["um WebSocket", "um webhook", "um SDK", "um rate limit"], a: 1, e: "Webhook: o outro sistema chama você quando algo acontece.", obj: 4 },
   { id: "m00-a05-o7", q: "Qual a ordem recomendada para ler a documentação de uma API nova?", o: ["Reference, Pricing, Quickstart, Authentication", "Só a Reference basta", "Quickstart, Authentication, Reference, Rate limits", "Rate limits, Reference, Quickstart"], a: 2, e: "Primeiro um exemplo funcionando, depois como se identificar, depois a lista completa e os limites.", obj: 4 },
   { id: "m00-a05-o8", q: "Uma API 'privada' (feita só para o próprio painel) está protegida automaticamente?", o: ["Sim, porque ninguém conhece o endereço.", "Sim, porque o Express bloqueia estranhos.", "Sim, se estiver em HTTPS.", "Não: a proteção depende de cada rota conferir a identidade de quem pede."], a: 3, e: "Privada quer dizer feita para uso próprio, não protegida. HTTPS protege o caminho, não decide quem pode usar a rota.", obj: 0 }
  ],
  dis: [
   { id: "m00-a05-d1", q: "Explique a diferença entre o contrato de uma API e o código que cumpre esse contrato, usando a analogia do cardápio (ou uma sua). Por que essa separação é útil para quem usa a API?", min: 200, modelo: "O contrato é a documentação: diz quais pedidos existem, o que enviar e o que volta, como um cardápio lista os pratos. O código é o que roda no servidor de quem criou a API e faz o trabalho, como a cozinha. A separação é útil porque quem usa só precisa conhecer o contrato: a empresa pode mudar o código por dentro (trocar o fogão, a receita) sem quebrar quem usa, desde que o contrato continue igual.", criterios: ["Define o contrato como documentação de pedidos e respostas", "Define o código como o que roda no servidor de quem criou", "Usa uma analogia coerente", "Explica a vantagem: o cliente não depende de como funciona por dentro"], aula: "m00-a05" },
   { id: "m00-a05-d2", q: "Escolha um dos seus projetos e liste as APIs que ele usa, classificando cada uma pela origem (terceiros, própria, navegador, biblioteca). Para uma delas, diga que cuidado ela exige.", min: 200, modelo: "Secretaria: API própria (rotas Express usadas pelo painel); APIs de terceiros (Gemini, planilha do Google); biblioteca não oficial (Baileys) para o WhatsApp; no painel, API do navegador (fetch). Cuidado: a chave do Gemini fica só no servidor e a rota própria precisa conferir quem pede antes de mostrar ou alterar imóveis.", criterios: ["Lista pelo menos três APIs de um projeto real", "Classifica corretamente cada origem", "Indica um cuidado coerente (chave no servidor, identidade, limites, uso não oficial)", "Usa os termos da aula"], aula: "m00-a05" }
  ],
  pratica: { instrucao: "No navegador do Mac, abra o endereço https://api.github.com/users/pggcthymg7-rgb. É uma API pública do GitHub respondendo a um GET, e o que aparece na tela é JSON.", perguntas: [
   { id: "m00-a05-p1", q: "Copie três campos (nome e valor) que você reconhece. O que esse JSON diz sobre a sua conta? Por que dá para abrir essa rota no navegador sem chave nenhuma?", min: 150 }
  ] }
 }
});

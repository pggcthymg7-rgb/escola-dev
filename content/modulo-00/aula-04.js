/* Módulo 0.0, aula 4. Esquema em docs/ESQUEMA-CONTEUDO.md. Base: lição m0b do material anterior, reorganizada e ampliada. */
Escola.aula({
 id: "m00-a04", modulo: "m00", min: 55,
 titulo: "A viagem de um pedido: URL, DNS, HTTP e códigos de status",
 objetivos: [
  "Ler um endereço (URL) e nomear cada parte: protocolo, domínio, porta, caminho e parâmetros.",
  "Explicar o papel do DNS e do endereço IP para encontrar um servidor.",
  "Descrever uma requisição e uma resposta HTTP: método, cabeçalhos, corpo e código de status.",
  "Interpretar um código de status pela primeira casa (2, 3, 4 ou 5) e dizer de quem é o erro.",
  "Explicar por que o HTTP é sem estado e como cookies e tokens resolvem o login."
 ],
 partes: [
  { n: 1, titulo: "O problema que isto resolve", html: `
<p>Na aula anterior você viu que o cliente pede e o servidor responde. Mas isso deixa perguntas em aberto. Como o seu iPhone acha, entre bilhões de computadores, exatamente o da Render onde roda o seu robô? Como o servidor sabe o que você quer? Como você sabe se deu certo ou errado?</p>
<p>Essas perguntas aparecem o tempo todo no seu dia a dia de quem constrói com IA, só que disfarçadas de mensagens de erro: "404", "500", "DNS_PROBE_FINISHED_NXDOMAIN", "CORS", "timeout". Sem entender a viagem de um pedido, cada erro é um mistério, e a única saída é colar na IA e torcer.</p>
<p>Esta aula dá o mapa da viagem. Com ele, você lê um erro e já sabe em que trecho do caminho o problema aconteceu, o que muda completamente a qualidade da conversa com a IA.</p>` },

  { n: 2, titulo: "Definição, siglas e analogia", html: `
<p>Analogia geral: mandar uma carta. Você precisa do endereço completo (URL), de alguém que converta o nome da rua num CEP que os carteiros entendem (DNS), de um formato de carta que o destinatário saiba ler (HTTP) e de uma resposta que diga se o pedido foi atendido (código de status).</p>
<h3>URL, o endereço</h3>
<p><b>URL</b> é a sigla de <i>Uniform Resource Locator</i>, "localizador uniforme de recurso". É o endereço completo de algo na internet. Veja um exemplo e as partes:</p>
<pre><code>https://loja.example.com:443/api/imoveis?cidade=Goiania&amp;quartos=3
|___|   |_______________| |_| |_________| |_____________________|
  |             |          |       |                 |
protocolo    domínio     porta  caminho     parâmetros (query string)</code></pre>
<ul>
<li><b>Protocolo</b>: o idioma da conversa. <code>https</code> é o HTTP com criptografia; o S final vem de <i>Secure</i>, seguro.</li>
<li><b>Domínio</b>: o nome do computador, escrito para pessoas. Os domínios terminados em <code>example.com</code> são reservados para exemplos, como este.</li>
<li><b>Porta</b>: um número que indica qual programa, naquele computador, deve receber o pedido. Um computador roda muitos programas ao mesmo tempo, como um prédio com muitos apartamentos; a porta é o número do apartamento. A porta padrão do https é a 443 e a do http é a 80. Quando é a padrão, ela fica escondida, e por isso quase nunca aparece.</li>
<li><b>Caminho</b> (<i>path</i>): qual recurso você quer dentro daquele servidor.</li>
<li><b>Parâmetros</b> (<i>query string</i>): informações extras depois do <code>?</code>, em pares <code>nome=valor</code> separados por <code>&amp;</code>.</li>
</ul>
<h3>Endereço IP e DNS</h3>
<p>Computadores se encontram por números, chamados <b>endereço IP</b> (IP vem de <i>Internet Protocol</i>), algo como <code>203.0.113.7</code>. Pessoas preferem nomes. O <b>DNS</b> (<i>Domain Name System</i>, sistema de nomes de domínio) é a lista telefônica da internet: traduz <code>loja.example.com</code> no IP correspondente.</p>
<h3>HTTP</h3>
<p><b>HTTP</b> é <i>HyperText Transfer Protocol</i>, protocolo de transferência de hipertexto. "Hipertexto" é texto com links. O HTTP define o formato da carta: como o cliente pede e como o servidor responde. Ele é texto puro, com uma ordem fixa.</p>
<h3>HTTPS e TLS</h3>
<p>No <b>HTTPS</b>, antes de conversar, cliente e servidor combinam uma forma de <b>criptografar</b> a conversa: embaralhar o conteúdo para que só os dois consigam ler. O servidor apresenta um <b>certificado</b>, um documento digital que prova que ele é mesmo dono daquele domínio. As regras dessa parte se chamam <b>TLS</b> (<i>Transport Layer Security</i>, segurança da camada de transporte). O cadeado no navegador indica que isso deu certo.</p>` },

  { n: 3, titulo: "De onde vem e quem cria", html: `
<p>O URL e o HTTP foram criados por Tim Berners-Lee junto com a web, entre 1989 e 1991. A primeira versão do HTTP era tão simples que só tinha um tipo de pedido: "me dê este documento". Com os anos ele ganhou métodos, cabeçalhos e códigos de status, e passou por várias versões (1.0, 1.1, 2 e 3).</p>
<p>O DNS é mais antigo que a web: foi criado em 1983, quando a lista de computadores da rede ficou grande demais para ser um arquivo único copiado à mão.</p>
<p>Hoje esses padrões são escritos e revisados pela <b>IETF</b> (<i>Internet Engineering Task Force</i>), uma comunidade aberta de engenheiros. Cada padrão é publicado como um documento numerado chamado <b>RFC</b> (<i>Request for Comments</i>, "pedido de comentários", um nome que ficou da época em que eram rascunhos para discussão). O significado atual de métodos, cabeçalhos e códigos de status do HTTP está no RFC 9110, de 2022. Ele é técnico; não precisa ler agora, mas é bom saber que a regra está escrita em algum lugar público.</p>
<p>Os domínios são vendidos por empresas chamadas <b>registradores</b>, sob regras de uma organização internacional, a ICANN. Quem "tem" um domínio, na verdade, aluga o direito de usar aquele nome por um período.</p>` },

  { n: 4, titulo: "Como se usa: uma requisição e uma resposta, linha a linha", html: `
<h3>A viagem completa</h3>
<ol>
<li><b>Leitura do endereço</b>: o navegador separa protocolo, domínio, porta, caminho e parâmetros.</li>
<li><b>DNS</b>: descobre o endereço IP do domínio.</li>
<li><b>Conexão</b>: abre um canal com aquele IP, na porta certa. Se for https, faz o acordo do TLS e confere o certificado.</li>
<li><b>Requisição</b>: envia o pedido em texto.</li>
<li><b>Processamento</b>: o servidor lê o pedido, decide o que fazer e monta a resposta.</li>
<li><b>Resposta</b>: volta um código de status e o conteúdo.</li>
</ol>
<h3>Por dentro: um pedido</h3>
<pre><code>GET /api/imoveis?quartos=3 HTTP/1.1   // método, caminho com parâmetros, versão
Host: loja.example.com                // cabeçalho: qual site deste servidor
Accept: application/json              // cabeçalho: aceito receber dados em JSON
Authorization: Bearer abc123...       // cabeçalho: minha prova de identidade</code></pre>
<ul>
<li><b>Método</b> (ou verbo): a intenção do pedido. <code>GET</code> pega, <code>POST</code> envia ou cria, <code>PUT</code> altera, <code>DELETE</code> apaga.</li>
<li><b>Cabeçalhos</b> (<i>headers</i>): informações sobre o pedido, em pares <code>nome: valor</code>. É neles que costuma viajar a identificação de quem pede.</li>
<li>Um GET normalmente não tem <b>corpo</b>. Num POST, o corpo leva os dados enviados, como um imóvel novo.</li>
</ul>
<h3>Por dentro: a resposta</h3>
<pre><code>HTTP/1.1 200 OK                       // versão, código de status e seu nome
Content-Type: application/json        // cabeçalho: o corpo vem em JSON
Content-Length: 48                    // cabeçalho: tamanho do corpo, em bytes
                                      // linha em branco separa cabeçalhos do corpo
[{"id": 7, "bairro": "Centro", "quartos": 3}]   // corpo: o conteúdo em si</code></pre>
<p>O corpo dessa resposta está em <b>JSON</b> (<i>JavaScript Object Notation</i>), um formato de texto para dados que você verá na aula 5.</p>
<h3>Códigos de status</h3>
<p>O número da resposta é agrupado pela primeira casa:</p>
<ul>
<li><b>1xx</b>: informativo, raro no dia a dia.</li>
<li><b>2xx</b>: deu certo. 200 OK; 201 criado.</li>
<li><b>3xx</b>: vá para outro lugar (redirecionamento). 301 mudou de endereço de vez.</li>
<li><b>4xx</b>: o erro foi do cliente. 400 pedido mal feito; 401 você não se identificou; 403 identificado, mas sem permissão; 404 não encontrado; 429 pedidos demais.</li>
<li><b>5xx</b>: o erro foi do servidor. 500 falha interna; 502 e 503 servidor fora do ar ou sobrecarregado.</li>
</ul>
<p>Regra prática: <b>4 você errou, 5 ele errou</b>. Um 404 pede para conferir o endereço; um 500 pede para olhar o servidor.</p>` },

  { n: 5, titulo: "Quando usar cada coisa e quando não usar", html: `
<h3>Qual método usar</h3>
<ul>
<li><b>GET</b> para buscar, sem mudar nada. Nunca use GET para apagar ou alterar: navegadores e robôs de busca fazem GETs sozinhos, e uma rota de apagar por GET pode ser acionada sem querer.</li>
<li><b>POST</b> para criar ou enviar algo novo.</li>
<li><b>PUT</b> (ou PATCH) para alterar algo que existe.</li>
<li><b>DELETE</b> para apagar.</li>
</ul>
<h3>Onde colocar a informação</h3>
<ul>
<li>Filtros de busca e coisas não secretas podem ir nos <b>parâmetros</b> da URL (<code>?quartos=3</code>).</li>
<li><b>Nunca coloque segredos na URL</b>: ela aparece no histórico do navegador, em registros de servidores e em capturas de tela. Senhas e chaves vão em cabeçalhos ou no corpo, sempre com HTTPS.</li>
<li>Dados maiores (um imóvel inteiro, um formulário) vão no <b>corpo</b> de um POST ou PUT.</li>
</ul>
<h3>HTTP sem S</h3>
<p>Use sempre <b>HTTPS</b> para qualquer coisa publicada. Sem ele, quem estiver no caminho (por exemplo, no mesmo Wi-Fi público) pode ler e até alterar a conversa. O único lugar em que HTTP puro é normal é o <code>localhost</code>, explicado na próxima parte.</p>` },

  { n: 6, titulo: "Diferenças entre as variações", html: `
<h3>Domínio, subdomínio e caminho</h3>
<p>Em <code>pggcthymg7-rgb.github.io/escola-dev</code>, <code>github.io</code> é o domínio do GitHub, <code>pggcthymg7-rgb</code> é um <b>subdomínio</b> (um nome dentro do domínio, dado a você) e <code>/escola-dev</code> é o caminho. Por isso o endereço da escola é seu sem você ter comprado um domínio: você recebeu um subdomínio.</p>
<h3>localhost</h3>
<p><code>localhost</code> é um nome especial que significa "este próprio computador". Quando você roda um servidor no seu Mac e abre <code>http://localhost:3000</code>, o Mac faz o papel de cliente e de servidor ao mesmo tempo. A porta aparece porque não é a padrão. É assim que se testa antes de publicar.</p>
<h3>Sem estado: cookie e token</h3>
<p>O HTTP é <b>sem estado</b> (<i>stateless</i>): cada pedido chega ao servidor como se fosse o primeiro, e ele não se lembra do anterior. Isso simplifica tudo e deixa o servidor atender muita gente. Mas então como um site sabe que você já fez login?</p>
<p>Porque o cliente <b>repete uma prova de identidade a cada pedido</b>. Há dois jeitos comuns:</p>
<ul>
<li><b>Cookie</b>: um pequeno texto que o servidor pede ao navegador para guardar, e que o navegador reenvia sozinho em todo pedido para aquele site.</li>
<li><b>Token</b>: uma sequência de caracteres entregue após o login, que o cliente envia num cabeçalho (como o <code>Authorization</code> do exemplo).</li>
</ul>
<p>Um servidor que não pede essa prova atende qualquer pessoa que conheça o endereço. Por isso, <b>toda rota que mostra ou altera dados privados precisa conferir quem está pedindo</b>. Esse é um dos primeiros pontos que você vai checar quando auditar os seus projetos, no módulo de segurança.</p>
<h3>Status do HTTP e "status" do seu sistema</h3>
<p>Não confunda o <b>código de status</b> (o número da resposta HTTP) com uma rota chamada <code>/status</code> que alguns sistemas têm para mostrar como estão funcionando. São coisas diferentes com nomes parecidos.</p>` },

  { n: 7, titulo: "Exemplo real: os seus projetos", html: `
<h3>O endereço desta escola, decifrado</h3>
<p><code>https://pggcthymg7-rgb.github.io/escola-dev/</code></p>
<ul>
<li><code>https</code>: conversa criptografada, com certificado fornecido pelo GitHub.</li>
<li><code>pggcthymg7-rgb.github.io</code>: o seu subdomínio no domínio do GitHub. O DNS do GitHub o traduz no IP dos servidores dele.</li>
<li>Porta: não aparece, então é a padrão do https, 443.</li>
<li><code>/escola-dev/</code>: o caminho, que é o nome do repositório.</li>
</ul>
<h3>Erros que você já viu ou vai ver</h3>
<ul>
<li><b>Na Render</b>, logo depois de publicar uma versão nova, é comum ver um 502 ou 503 por alguns instantes: o programa novo ainda está subindo. É um erro 5xx, do lado do servidor.</li>
<li><b>No GitHub Pages</b>, um 404 costuma ser caminho errado: um arquivo que mudou de nome ou uma letra maiúscula diferente.</li>
<li><b>No zava-tours</b>, quando o navegador chama a função que carrega um tour, ele faz um GET; quando salva, um POST com o tour no corpo. Se o tour não existir, o certo é a função responder 404.</li>
</ul>
<p>Com esse mapa, o pedido à IA melhora muito. Em vez de "deu erro", você diz: "o POST para a rota de salvar responde 500 depois que publiquei a versão nova; o GET funciona". Isso já elimina metade das hipóteses.</p>` },

  { n: 8, titulo: "Como pesquisar mais", html: `
<ul>
<li><b>MDN: "Uma visão geral do HTTP"</b> e <b>"Códigos de status de respostas HTTP"</b>, ambas em português. A segunda é a lista completa de códigos, ótima para consultar quando aparecer um número desconhecido.</li>
<li><b>MDN: "O que é um nome de domínio?"</b>, em português, explica domínios, registradores e como funciona uma consulta de DNS.</li>
<li><b>MDN: "What is a URL?"</b>, em inglês, detalha cada parte do endereço, inclusive as que não vimos (como a âncora, depois do <code>#</code>).</li>
<li><b>Na prática</b>: o Mac já vem com o <code>curl</code>, um cliente HTTP de linha de comando. No Terminal, <code>curl -I https://example.com</code> faz um pedido e mostra o status e os cabeçalhos da resposta. Você vai usar o Terminal no próximo módulo; guarde este comando.</li>
</ul>` },

  { n: 9, titulo: "Exercício com critérios de correção", html: `
<p>Faça no caderno desta aula:</p>
<ol>
<li>Decifre este endereço, nomeando cada parte: <code>http://localhost:3000/api/imoveis?bairro=Centro&amp;ordem=preco</code>.</li>
<li>Para cada situação, diga a primeira casa do código de status esperado (2, 3, 4 ou 5) e de quem é o erro: (a) você digitou o endereço com uma letra errada; (b) o servidor tentou ler a planilha e ela não respondeu; (c) você pediu dados privados sem fazer login; (d) você criou um imóvel com sucesso.</li>
<li>Explique por que um site de banco precisa de cookie ou token, mesmo depois que você já digitou a senha.</li>
</ol>
<p><b>Critérios de correção</b>:</p>
<ul>
<li>Item 1: protocolo http, domínio localhost (o próprio computador), porta 3000, caminho /api/imoveis, parâmetros bairro e ordem.</li>
<li>Item 2: (a) 4xx, o 404; (b) 5xx, erro do servidor; (c) 4xx, o 401; (d) 2xx, o 201 ou o 200.</li>
<li>Item 3: menciona que o HTTP é sem estado e que a prova de identidade precisa ir em cada pedido.</li>
</ul>` },

  { n: 10, titulo: "Termos novos no glossário", termos: ["URL (endereço)", "Domínio", "Endereço IP", "DNS", "Porta", "Query string", "localhost", "HTTP / HTTPS", "TLS e certificado", "GET, POST, PUT, DELETE", "Cabeçalho (header)", "Corpo (body)", "Código de status", "Sem estado (stateless)", "Cookie e token", "curl"] }
 ],
 resumo: [
  "URL = protocolo + domínio + porta + caminho + parâmetros.",
  "O DNS traduz o nome do domínio no endereço IP do servidor, como uma lista telefônica.",
  "HTTPS é HTTP com criptografia (TLS) e certificado; use sempre em algo publicado.",
  "Requisição: método, caminho, cabeçalhos e, às vezes, corpo. Resposta: código de status, cabeçalhos e corpo.",
  "Status: 2 deu certo, 3 redirecionou, 4 erro do cliente, 5 erro do servidor.",
  "O HTTP é sem estado; cookies e tokens repetem a prova de identidade a cada pedido.",
  "Nunca ponha segredos na URL, e nunca use GET para apagar ou alterar."
 ],
 referencias: [
  { autor: "MDN Web Docs (Mozilla)", titulo: "Uma visão geral do HTTP", ano: "página viva", tipo: "documentação", idioma: "português", link: "https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Guides/Overview", ler: "Seções Aspectos básicos do HTTP, Fluxo HTTP e Mensagens HTTP.", verificado: "2026-10-31" },
  { autor: "MDN Web Docs (Mozilla)", titulo: "Códigos de status de respostas HTTP", ano: "página viva", tipo: "documentação de referência", idioma: "português", link: "https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Reference/Status", ler: "Os cinco grupos, lendo com atenção 200, 201, 301, 400, 401, 403, 404, 429, 500, 502 e 503.", verificado: "2026-10-31" },
  { autor: "MDN Web Docs (Mozilla)", titulo: "O que é um nome de domínio?", ano: "página viva", tipo: "documentação", idioma: "português", link: "https://developer.mozilla.org/pt-BR/docs/Learn_web_development/Howto/Web_mechanics/What_is_a_domain_name", ler: "Sumário, Estrutura dos domain names e Como funciona uma solicitação de DNS?", verificado: "2026-10-31" },
  { autor: "MDN Web Docs (Mozilla)", titulo: "What is a URL?", ano: "página viva", tipo: "documentação", idioma: "inglês", link: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Howto/Web_mechanics/What_is_a_URL", ler: "Seções Basics: anatomy of a URL até Parameters.", verificado: "2026-10-31" }
 ],
 tarefa: {
  obj: [
   { id: "m00-a04-o1", q: "Em https://loja.example.com/api/imoveis?quartos=3, qual parte é o caminho?", o: ["https", "loja.example.com", "/api/imoveis", "quartos=3"], a: 2, e: "O caminho vem depois do domínio (e da porta, se houver) e antes do ?. quartos=3 é um parâmetro.", obj: 0 },
   { id: "m00-a04-o2", q: "Para que serve o DNS?", o: ["Para criptografar a conversa.", "Para traduzir o nome do domínio no endereço IP do servidor.", "Para guardar os arquivos do site.", "Para escolher o método do pedido."], a: 1, e: "O DNS é a lista telefônica da internet: nome para número (IP).", obj: 1 },
   { id: "m00-a04-o3", q: "Qual método HTTP é o certo para criar um imóvel novo?", o: ["GET", "DELETE", "HEAD", "POST"], a: 3, e: "POST envia ou cria algo novo. GET só busca, sem mudar nada.", obj: 2 },
   { id: "m00-a04-o4", q: "Você abriu um endereço e recebeu 404. O que isso indica primeiro?", o: ["O recurso não foi encontrado: confira o endereço.", "O servidor está fora do ar.", "Deu tudo certo.", "Você fez pedidos demais."], a: 0, e: "4xx é erro do lado do cliente; 404 é não encontrado. Comece conferindo o caminho.", obj: 3 },
   { id: "m00-a04-o5", q: "Logo após publicar uma versão nova, a Render responde 503 por alguns segundos. De quem é o problema?", o: ["Do cliente, que digitou errado", "Do DNS do iPhone", "Do servidor, que ainda está subindo", "Do certificado do navegador"], a: 2, e: "5xx indica erro do lado do servidor. 503 costuma ser serviço indisponível no momento.", obj: 3 },
   { id: "m00-a04-o6", q: "Por que um site precisa de cookie ou token mesmo depois do login?", o: ["Porque o HTTP é sem estado e cada pedido precisa provar quem é.", "Porque a senha expira a cada clique.", "Porque o DNS esquece o domínio.", "Porque o HTTPS exige."], a: 0, e: "Sem estado: o servidor não lembra do pedido anterior. A prova de identidade vai em todo pedido.", obj: 4 },
   { id: "m00-a04-o7", q: "Onde NÃO se deve colocar uma senha ou chave?", o: ["Num cabeçalho, com HTTPS", "No corpo de um POST, com HTTPS", "Numa variável guardada só no servidor", "Nos parâmetros da URL"], a: 3, e: "A URL aparece no histórico, em registros de servidores e em capturas de tela.", obj: 0 },
   { id: "m00-a04-o8", q: "O que significa http://localhost:3000?", o: ["Um site do GitHub na porta 3000", "Um programa rodando no seu próprio computador, na porta 3000", "Um endereço IP público", "Um erro de DNS"], a: 1, e: "localhost é o próprio computador. A porta 3000 aparece porque não é a padrão.", obj: 0 }
  ],
  dis: [
   { id: "m00-a04-d1", q: "Descreva, em ordem e com suas palavras, o que acontece desde que você digita o endereço desta escola até a página aparecer. Use os termos URL, DNS, HTTPS, requisição, resposta e código de status.", min: 300, modelo: "O navegador lê a URL e separa protocolo (https), domínio (pggcthymg7-rgb.github.io) e caminho (/escola-dev/). Pergunta ao DNS qual o endereço IP daquele domínio. Abre uma conexão com esse IP na porta 443 e, por ser HTTPS, faz o acordo do TLS e confere o certificado. Envia a requisição GET do caminho. O servidor do GitHub responde com código de status 200 e o HTML no corpo. O navegador lê o HTML, faz novas requisições para o CSS, o JavaScript e as imagens, e então desenha a página.", criterios: ["Ordem correta: URL, DNS, conexão, requisição, resposta", "Explica o papel do DNS (nome para IP)", "Menciona HTTPS com criptografia e certificado", "Menciona o código de status da resposta", "Percebe que há requisições adicionais para CSS, JS ou imagens"], aula: "m00-a04" },
   { id: "m00-a04-d2", q: "Um amigo diz: 'meu site deu erro, o que eu faço?'. Escreva as três primeiras perguntas que você faria a ele, usando o que aprendeu sobre códigos de status, e explique o porquê de cada uma.", min: 200, modelo: "1) Qual o número do erro? Porque a primeira casa já diz se o problema é do pedido (4xx) ou do servidor (5xx). 2) Em qual endereço exatamente, e com qual método (abrindo a página ou salvando algo)? Porque um 404 costuma ser caminho errado, e um erro só ao salvar aponta para a rota de POST. 3) Mudou algo recentemente, como uma publicação nova? Porque um 502 ou 503 logo após publicar costuma ser o servidor subindo ou falhando ao iniciar.", criterios: ["Pergunta o código de status e explica o significado da primeira casa", "Pergunta o endereço ou o método envolvido", "Faz uma pergunta sobre mudança recente ou contexto", "Justifica cada pergunta"], aula: "m00-a04" }
  ],
  pratica: { instrucao: "No Mac, abra o Chrome, entre em pggcthymg7-rgb.github.io/escola-dev, aperte Cmd + Option + I, vá à aba Network (Rede) e recarregue. Clique na primeira linha da lista e procure as abas Headers (Cabeçalhos).", perguntas: [
   { id: "m00-a04-p1", q: "Qual o método (Request Method) e o código de status (Status Code) da primeira linha? Encontre um cabeçalho da resposta e explique o que ele parece dizer.", min: 120 }
  ] }
 }
});

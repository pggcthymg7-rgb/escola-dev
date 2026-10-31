/* Material anterior ao Marco 1 (lições, tarefas, prova e trilha originais). Será substituído no Marco 2. */
const L=[
{id:"m0a",m:"Módulo 0.0",t:"Software, sistema, app, site e página",min:15,b:`<p>São palavras que parecem iguais e não são. Uma analogia ajuda: <b>software</b> é a receita, <b>hardware</b> é a cozinha, e <b>sistema</b> é o restaurante inteiro funcionando.</p><ul><li><b>Software:</b> qualquer conjunto de instruções que o computador executa. É o termo mais amplo.</li><li><b>Aplicativo (app):</b> software que a pessoa usa direto, como o WhatsApp.</li><li><b>Sistema:</b> várias partes trabalhando juntas por um objetivo. Sua secretária é um sistema: robô do WhatsApp, painel, planilha e IA.</li><li><b>Página web:</b> um documento que o navegador abre. <b>Site:</b> conjunto de páginas sob um endereço. <b>Aplicação web:</b> site com funções, como o zava-tours.</li></ul><p>Teste seu entendimento: o zava-visit é um site, um app ou um sistema? Escreva sua resposta antes de ler o dicionário.</p>`},
{id:"m0b",m:"Módulo 0.0",t:"Cliente e servidor: de onde vem, como funciona e quando usar",min:40,b:`<p><b>Comece pelo problema.</b> Você tem um sistema que guarda imóveis e responde mensagens. Ele precisa ser alcançado por qualquer pessoa, a qualquer hora, de qualquer aparelho. Seu celular, porém, desliga, muda de lugar e troca de rede o tempo todo. Se cada aparelho tivesse de guardar tudo e conversar diretamente com todos os outros, nada ficaria atualizado e ninguém acharia ninguém. A solução é dividir os papéis: um computador fica <b>parado, ligado e com endereço fixo</b>, guardando os dados e as regras, e os demais vão até ele <b>pedir</b> o que precisam. Essa divisão é o modelo cliente e servidor, e quase tudo o que você usa na internet funciona assim.</p>
<h3>Definição e analogia</h3>
<p><b>Cliente</b> é o programa que faz o pedido. Em português a palavra é a mesma de “cliente de loja”, e a ideia também: quem chega e pede. Seu navegador (Safari, Chrome), um app no celular e até o seu robô, quando consulta o Gemini, são clientes. <b>Servidor</b> vem do verbo “servir”: é o programa que fica esperando pedidos e os atende. Muita gente usa a palavra também para o computador onde esse programa roda. Os dois usos aparecem, então preste atenção ao contexto.</p>
<p><b>Analogia:</b> um restaurante. Você (cliente) senta, faz o pedido ao garçom e recebe o prato. A cozinha (servidor) fica aberta durante o expediente, guarda os ingredientes e decide como o prato é feito. Você não entra na cozinha e a cozinha não vai até a sua casa: ela só responde quando alguém pede. Um detalhe importante: <b>os papéis dependem do momento, não da máquina</b>. O seu robô é servidor quando recebe uma chamada e é cliente quando chama o Gemini. Um mesmo programa pode ser os dois.</p>
<p><b>O servidor não tem nada de mágico.</b> É um computador comum (muitas vezes sem tela) ligado o tempo todo, com um programa instalado que fica “escutando”. A Render, a Cloudflare e o GitHub Pages alugam computadores assim.</p>
<h3>De onde vem e quem cria</h3>
<p>Esse modelo existe desde os computadores grandes dos anos 1960 e 1970, em que muitos terminais simples falavam com uma máquina central. A web que você usa nasceu em 1989 a 1991, quando <b>Tim Berners-Lee</b> (então no laboratório CERN, na Europa) criou o primeiro navegador, o primeiro servidor e as regras da conversa entre eles. Essas regras são os <b>protocolos</b>: acordos escritos sobre como pedir e como responder, para que programas feitos por pessoas diferentes se entendam. Hoje os padrões da web são mantidos por organizações abertas, como a IETF (que cuida do HTTP) e a W3C (que cuida do HTML e do CSS). Ninguém é “dono” da conversa; por isso qualquer navegador fala com qualquer servidor.</p>
<p>Quem cria o <b>cliente</b> e o <b>servidor</b> de cada sistema é quem desenvolve o sistema. No seu caso, com a IA: o servidor da secretária é o <code>index.js</code> (Node.js com Express), e o cliente é qualquer coisa que o chame, do navegador ao WhatsApp.</p>
<h3>A viagem completa de um pedido</h3>
<p>Quando você digita um endereço e aperta Enter, acontece esta sequência. Cada passo tem um nome que você vai ler em erros e em documentações:</p>
<ol>
<li><b>Leitura do endereço (URL).</b> O navegador separa as partes do que você digitou (veja abaixo).</li>
<li><b>Descoberta do computador (DNS).</b> Computadores se localizam por números, chamados <b>endereço IP</b> (algo como <code>203.0.113.7</code>). Gente prefere nomes. O <b>DNS</b> é a lista telefônica que traduz <code>meusite.onrender.com</code> no número correspondente.</li>
<li><b>Conexão.</b> O navegador abre um canal com esse computador. Em sites seguros (https), os dois combinam uma chave para <b>criptografar</b> a conversa (embaralhá-la de modo que só os dois leiam) e o servidor apresenta um <b>certificado</b>, uma espécie de documento que prova que ele é mesmo quem diz ser. Esse conjunto de regras chama-se <b>TLS</b>.</li>
<li><b>Requisição.</b> O navegador envia o pedido em texto.</li>
<li><b>Processamento.</b> O servidor lê o pedido, decide o que fazer (pode consultar um banco de dados ou outra API) e monta a resposta.</li>
<li><b>Resposta.</b> O servidor devolve um número de status e o conteúdo.</li>
<li><b>Desenho.</b> O navegador recebe o HTML, descobre que precisa também de CSS, JavaScript e imagens, e faz novos pedidos até ter tudo. Só então a página aparece. Uma única página costuma gerar dezenas de requisições.</li>
</ol>
<h3>Lendo um endereço (URL)</h3>
<p><b>URL</b> = <i>Uniform Resource Locator</i>, “localizador uniforme de recurso”. É o endereço completo de algo na internet.</p>
<pre><code>https://meusite.onrender.com:443/api/imoveis?cidade=Goiania&quartos=3
|       |                    |   |            |
|       |                    |   |            +-- parâmetros (query string)
|       |                    |   +-- caminho (path): o que você pede
|       |                    +-- porta: a "porta de entrada" do programa
|       +-- domínio: o nome do computador
+-- protocolo: o idioma da conversa</code></pre>
<ul>
<li><b>Protocolo:</b> <code>https</code> é o HTTP com criptografia. O S final é de <i>Secure</i>.</li>
<li><b>Domínio:</b> o nome do computador. O DNS o converte em endereço IP.</li>
<li><b>Porta:</b> um computador roda muitos programas ao mesmo tempo, então o IP sozinho não basta. A porta é o número da “porta de entrada” de cada programa. A padrão do https é a 443 e a do http é a 80; quando é a padrão, ela fica escondida. Por isso você só vê a porta em casos como <code>localhost:3000</code>.</li>
<li><b>Caminho (path):</b> qual recurso você quer. É o que o servidor usa para escolher a rota.</li>
<li><b>Parâmetros (query string):</b> informações extras depois do <code>?</code>, em pares nome=valor separados por <code>&amp;</code>.</li>
</ul>
<p><b>localhost</b> é um nome especial que significa “este próprio computador”. Quando você roda o <code>index.js</code> na sua máquina e abre <code>http://localhost:3000</code>, o seu computador faz o papel de cliente e de servidor ao mesmo tempo. É assim que se testa antes de publicar.</p>
<h3>Como o pedido e a resposta são por dentro</h3>
<p>HTTP é só texto com um formato fixo. Veja um pedido simplificado e a resposta, com comentário em cada linha:</p>
<pre><code>GET /api/status HTTP/1.1
// método (GET = pegar), caminho, versão do HTTP
Host: meusite.onrender.com
// cabeçalho: em qual dos sites deste computador eu quero mexer
Accept: application/json
// cabeçalho: aceito receber dados em JSON

HTTP/1.1 200 OK
// versão, número de status e seu nome
Content-Type: application/json
// cabeçalho: o que vem no corpo é JSON
Content-Length: 22
// cabeçalho: tamanho do corpo, em bytes

{"inventoryCount": 12}
// corpo: o conteúdo em si</code></pre>
<ul>
<li><b>Método (verbo):</b> a intenção do pedido. GET pega, POST envia ou cria, PUT altera, DELETE apaga.</li>
<li><b>Cabeçalhos (headers):</b> informações sobre o pedido ou a resposta, em pares nome: valor. É neles que costuma viajar a chave de API e a identificação de quem pede.</li>
<li><b>Corpo (body):</b> o conteúdo principal. Num GET geralmente não há corpo no pedido; num POST ele leva os dados enviados.</li>
<li><b>Código de status:</b> o número da resposta, agrupado por centenas: <code>2xx</code> deu certo (200 OK, 201 criado), <code>3xx</code> vá para outro lugar (redirecionamento), <code>4xx</code> o erro foi do cliente (400 pedido mal feito, 401 você não se identificou, 403 proibido, 404 não encontrado, 429 pedidos demais), <code>5xx</code> o erro foi do servidor (500 falha interna, 502 e 503 servidor fora do ar). Regra prática: <b>4 você errou, 5 ele errou</b>.</li>
</ul>
<p><b>Atenção:</b> no seu sistema, <code>/api/status</code> é só o nome de uma rota que devolve o relatório do sistema sobre si mesmo. Não confunda com o número de status.</p>
<h3>Servidor sem memória</h3>
<p>O HTTP é <b>sem estado</b> (<i>stateless</i>): cada pedido chega ao servidor como se fosse o primeiro, e ele não se lembra do anterior. Isso simplifica tudo e deixa o sistema aguentar muita gente. Mas então como um site sabe que você já fez login? Porque o cliente <b>repete uma prova de identidade a cada pedido</b>: um <i>token</i> ou um <i>cookie</i> (um pequeno texto que o navegador guarda e reenvia sozinho). Isso liga diretamente ao Passo 0: as rotas da secretária não pedem esse comprovante, então o servidor atende qualquer cliente sem perguntar quem é.</p>
<h3>Conteúdo estático e dinâmico</h3>
<ul>
<li><b>Estático:</b> o servidor só entrega um arquivo pronto, igual para todo mundo. É o caso do <code>zava-visit</code> no GitHub Pages e desta própria Escola Dev. O servidor aí é simples: não roda código seu, só entrega arquivos.</li>
<li><b>Dinâmico:</b> o servidor executa código a cada pedido e monta uma resposta que depende de quem pede e do que está guardado. É o caso do <code>index.js</code> da secretária e das funções do zava-tours.</li>
</ul>
<h3>Quando usar um servidor e quando não usar</h3>
<p><b>Use um servidor próprio quando:</b></p>
<ul>
<li>precisa guardar dados que vários aparelhos enxerguem (os tours salvos, os imóveis);</li>
<li>precisa guardar um segredo, como a chave do Gemini. O segredo <b>só pode ficar no servidor</b>: tudo que vai para o navegador, qualquer pessoa pode ler;</li>
<li>precisa rodar algo sem ninguém com a página aberta, como o robô que escuta o WhatsApp o dia todo;</li>
<li>precisa validar o que o cliente mandou. Nunca confie no cliente: ele pode ser alterado por quem o usa.</li>
</ul>
<p><b>Não use quando</b> a página só mostra conteúdo fixo. Um servidor dinâmico custa dinheiro, pode cair, precisa de manutenção e aumenta a superfície de ataque (os pontos por onde alguém pode tentar entrar). Para conteúdo fixo, hospedagem de arquivos é mais barata, mais rápida e mais segura.</p>
<h3>Diferenças entre as variações</h3>
<ul>
<li><b>Servidor tradicional (sempre ligado):</b> um programa que roda continuamente, como a secretária na Render. Bom para quem precisa manter conexões abertas, como a do WhatsApp. Em alguns planos gratuitos, a hospedagem pode pausar o programa quando ninguém usa, e o primeiro pedido seguinte demora a ser respondido enquanto ele acorda. Confira o plano que você usa.</li>
<li><b>Funções sob demanda (serverless):</b> pequenos trechos de código que a hospedagem executa só quando chega um pedido, como as Cloudflare Functions do zava-tours. Você não gerencia uma máquina ligada. O nome é enganoso: servidor continua existindo, só não é problema seu.</li>
<li><b>Hospedagem estática:</b> só entrega arquivos (GitHub Pages).</li>
<li><b>Cliente fino e cliente grosso:</b> numa página simples, o servidor monta quase tudo e o cliente só mostra. Num app como esta Escola Dev ou o zava-visit, o cliente (JavaScript no navegador) faz boa parte do trabalho. Isso é o que se chama de front-end e back-end: <b>front-end</b> é o que roda no cliente, <b>back-end</b> é o que roda no servidor.</li>
<li><b>Peer-to-peer:</b> exceção ao modelo, em que aparelhos falam direto entre si sem servidor central (alguns programas de vídeo e de compartilhamento de arquivos). Existe, mas não é o que seus projetos usam.</li>
</ul>
<p><b>Fatores que mudam de um servidor para outro:</b> <b>latência</b> (tempo de ida e volta do pedido; quanto mais longe o servidor, maior), <b>capacidade</b> (quantos pedidos ele aguenta ao mesmo tempo), <b>disponibilidade</b> (quanto tempo fica no ar) e <b>custo</b>. Quando uma resposta demora demais, o cliente desiste e mostra um erro de <b>timeout</b> (tempo esgotado).</p>
<h3>Exemplo real nos seus projetos</h3>
<ul>
<li><b>secretaria-imoveis-whatsapp:</b> é servidor e cliente ao mesmo tempo. Como servidor, o Express na Render recebe pedidos nas rotas <code>/api/...</code>. Como cliente, o mesmo programa chama o Gemini e a planilha do Google, e mantém uma conexão com o WhatsApp através do Baileys. A Render diz em qual <b>porta</b> o programa deve escutar por uma variável de ambiente, e é por isso que ele não usa um número fixo escolhido por você.</li>
<li><b>zava-tours:</b> o navegador de quem abre o tour é o cliente. Ele pede os arquivos ao Cloudflare Pages (conteúdo estático) e, para guardar ou carregar um tour, chama as funções em <code>functions/api/salvar/[id].js</code> e <code>functions/api/carregar/[id].js</code> (conteúdo dinâmico).</li>
<li><b>zava-visit:</b> só estático. O navegador baixa os arquivos e o Three.js desenha o 3D <b>no próprio aparelho</b>. Não há servidor seu rodando código.</li>
<li><b>Passo 0, etapa 1:</b> quando você abre <code>/api/status</code> numa janela anônima, você está sendo um cliente anônimo. Se vier dados, o servidor te atendeu sem perguntar quem você é, e essa é a falha.</li>
</ul>
<h3>Como pesquisar e aprender mais</h3>
<ul>
<li><b>MDN Web Docs</b> (developer.mozilla.org), a documentação mantida pela Mozilla. Busque “MDN HTTP overview” para a visão geral e “MDN HTTP response status codes” para a lista de códigos.</li>
<li>Veja a conversa de verdade: no Chrome, aperte <b>Cmd+Option+I</b> (Mac), abra a aba <b>Network</b> (Rede), recarregue a página e clique em qualquer linha. Você verá método, status e cabeçalhos reais.</li>
<li>No terminal, <code>curl -i https://exemplo.com</code> faz um pedido e mostra o status e os cabeçalhos da resposta. (<b>curl</b> é um cliente de linha de comando.)</li>
<li>Para quem quer o texto dos padrões: busque “RFC 9110”, o documento oficial do HTTP. É técnico; deixe para depois.</li>
</ul>
<h3>Exercício</h3>
<ol>
<li>Em Termos, releia “Cliente”, “Servidor”, “Requisição” e “Código de status”, e veja os termos novos desta lição.</li>
<li>Abra o Chrome em qualquer site, aperte Cmd+Option+I, abra a aba <b>Network</b>, recarregue e escolha três linhas. Anote para cada uma: método, status e o tipo do conteúdo.</li>
<li>Escolha um dos seus projetos e monte uma tabela com quatro colunas: quem é o cliente, quem é o servidor, o que viaja no pedido e o que volta na resposta.</li>
<li>Responda por escrito: por que a chave do Gemini não pode ficar no JavaScript que roda no navegador?</li>
</ol>
<p><b>Critérios de correção:</b> (a) no item 2, os três status começam com 2, 3, 4 ou 5 e você sabe dizer o que a primeira casa significa; (b) no item 3, ao menos um projeto aparece com o mesmo programa nos dois papéis; (c) no item 4, a resposta diz que tudo que chega ao navegador pode ser lido por qualquer pessoa, e que por isso a chave fica só no servidor. Envie suas respostas pelo chat para revisão.</p>`},
{id:"m0c",m:"Módulo 0.0",t:"O que é uma API: de onde vem, como se cria e quando usar",min:45,b:`<p><b>Comece pelo problema.</b> Programas são feitos por pessoas e empresas diferentes, em linguagens diferentes, rodando em computadores diferentes. Seu robô do WhatsApp precisa que o Gemini (do Google) entenda uma mensagem. Ele não pode abrir o código do Google e usá-lo por dentro. A solução é o dono do sistema publicar um <b>contrato</b>: “estes são os pedidos que aceito, nesta forma, e estas são as respostas que devolvo”. Esse contrato é a API.</p><h3>O que a sigla significa</h3><p><b>API</b> = <i>Application Programming Interface</i>, em português “interface de programação de aplicações”. <b>Interface</b> é um ponto de contato. <b>De programação</b> quer dizer que quem usa é outro programa, não uma pessoa. Analogia: a tomada da parede. O formato dela é um padrão, então você liga qualquer aparelho sem saber como a usina funciona. Outra analogia: o cardápio de um restaurante lista o que você pode pedir sem deixar você entrar na cozinha.</p><h3>Uma API é código?</h3><p>São duas coisas ligadas:</p><ul><li><b>O contrato:</b> um texto (a documentação) que diz quais pedidos existem, o que enviar e o que volta. É isso que você, como cliente, lê e usa.</li><li><b>O código que cumpre o contrato:</b> escrito por quem criou o sistema e rodando no servidor dele. Você não vê esse código e não precisa vê-lo.</li></ul><h3>De onde vem e quem cria</h3><p>Sempre alguém a escreve. Existem quatro origens, e seu projeto usa todas:</p><ul><li><b>API de terceiros:</b> criada por uma empresa para você usar, como a do Gemini. Você pede, ela responde, geralmente com uma chave e dentro de limites de uso e de preço. O pacote <code>@google/genai</code>, no seu package.json, é um <b>SDK</b>: código pronto que embrulha a API do Gemini para você não montar os pedidos à mão.</li><li><b>API própria:</b> a que você (com a IA) criou no <code>index.js</code>, usando a biblioteca Express. Veja o exemplo abaixo.</li><li><b>API do navegador:</b> funções que o próprio Safari ou Chrome oferecem à sua página, como guardar dados no aparelho (localStorage) ou buscar dados (fetch).</li><li><b>API de uma biblioteca:</b> o conjunto de funções que uma biblioteca expõe. Ao usar o Three.js nos tours 3D, você usa a API dele.</li></ul><p>Como a sua API própria é criada, em um trecho simplificado no estilo do seu projeto:</p><pre><code>app.get("/api/status", async (req, res) => {
  // app.get: quando alguém PEDIR (GET) este caminho...
  // /api/status: o caminho, um item do cardápio
  // req: o pedido que chegou. res: a resposta que voltará
  res.json({ inventoryCount: 12 });
  // ...devolva estes dados em formato JSON
});</code></pre><p>Cada <code>app.get</code>, <code>app.post</code>, <code>app.put</code> e <code>app.delete</code> do seu index.js é um item do cardápio. Quem o escreve decide o que ele faz e também <b>quem pode usá-lo</b>. Foi aqui que faltou o login.</p><p><b>Um cuidado para o futuro:</b> o Baileys, que seu robô usa para o WhatsApp, é uma biblioteca não oficial que simula o WhatsApp Web, e não a API oficial do WhatsApp. Confirme as regras do WhatsApp para uso comercial antes de vender o produto, porque há risco de bloqueio do número.</p><h3>Rotas, verbos e JSON</h3><ul><li><b>Rota (endpoint):</b> cada item do cardápio, como <code>/api/property</code>.</li><li><b>Verbos:</b> GET pega dados, POST cria, PUT altera, DELETE apaga.</li><li><b>JSON:</b> o formato dos dados trocados, texto organizado em nome e valor: <code>{"quartos": 3}</code>.</li></ul><p><b>Por que isso importa no seu projeto:</b> as rotas da secretária não pedem login. É como um restaurante em que qualquer pessoa na rua pode gritar “apague todos os imóveis” e a cozinha obedece, sem perguntar quem é. Essa é a falha que tratamos no Passo 0.</p><h3>Como você usa uma API (do lado do cliente)</h3><p>No JavaScript, o comando é <code>fetch</code>: ele faz a requisição e espera a resposta.</p><pre><code>const resp = await fetch("https://meusite.onrender.com/api/status");
// pede ao endereço (GET é o padrão)
const dados = await resp.json();
// transforma o texto JSON em dados que o JavaScript entende
console.log(dados.inventoryCount);
// mostra um valor da resposta</code></pre><p>APIs de terceiros costumam exigir uma <b>chave</b> enviada junto com o pedido, para saber quem pede e poder cobrar ou limitar.</p><h3>Quando usar uma API</h3><ul><li>Quando você precisa de algo que outro sistema faz melhor do que você: IA, mapas, pagamentos, envio de mensagens.</li><li>Quando a página precisa guardar ou buscar dados num servidor. No zava-tours, <code>functions/api/salvar/[id].js</code> e <code>carregar/[id].js</code> formam uma pequena API que guarda e devolve cada tour.</li><li>Quando você quer que outros sistemas usem o seu, por exemplo ao vender a secretária para empresas.</li></ul><p><b>Quando não usar:</b> numa página que só mostra conteúdo fixo, como o zava-visit hoje. Sem servidor, não há API.</p><h3>Por que uma API é diferente da outra</h3><p>Cada API é um contrato próprio. O que muda de uma para outra:</p><ul><li><b>Endereço e rotas:</b> onde pedir e o quê.</li><li><b>Formato dos dados:</b> quais campos enviar e quais voltam.</li><li><b>Autenticação:</b> chave, login ou nenhuma (a sua, hoje).</li><li><b>Limites e preço:</b> quantos pedidos por minuto e quanto custa.</li><li><b>Versão:</b> contratos mudam, e versões antigas podem parar de funcionar.</li></ul><p><b>Estilos que você vai encontrar:</b> <b>REST</b> é o mais comum, com rotas, verbos e JSON, e é o estilo da sua API. <b>GraphQL</b> tem um único endereço e você descreve os dados que quer. <b>Webhook</b> é o contrário: o outro sistema chama você quando algo acontece (seu .env tem uma URL de webhook para a planilha). <b>WebSocket</b> é uma conversa contínua, sem repetir pedidos, como a que o robô mantém com o WhatsApp.</p><h3>Como aprender uma API nova</h3><p>Procure a <b>documentação</b> oficial (busque “nome da API docs”). Leia nesta ordem: <i>Quickstart</i> (primeiro exemplo), <i>Authentication</i> (como se identificar), <i>Reference</i> (todas as rotas) e <i>Rate limits</i> (limites de uso).</p><h3>Exercício</h3><ol><li>Em Termos, releia “API”, “Rota” e “JSON”.</li><li>Abra o index.js da secretária e liste cada <code>app.get</code>, <code>app.post</code>, <code>app.put</code> e <code>app.delete</code>. Monte uma tabela: verbo, caminho, o que faz e se pede login.</li><li>Explique, com suas palavras, a diferença entre a API do Gemini e a API do seu index.js. Envie pelo chat.</li></ol>`},
{id:"m0d",m:"Módulo 0.0",t:"Onde o código mora: arquivos, Git e hospedagem",min:25,b:`<p><b>Código</b> é texto com instruções numa linguagem de programação. Um <b>projeto</b> é uma pasta cheia de arquivos de código.</p><h3>As três camadas de um site</h3><ul><li><b>HTML:</b> a estrutura (títulos, botões).</li><li><b>CSS:</b> a aparência (cores, tamanhos).</li><li><b>JavaScript:</b> o comportamento (o que acontece ao clicar).</li></ul><p>Tudo isso é o <b>front-end</b>: roda no navegador. O <b>back-end</b> roda no servidor, fora da vista, como o <code>index.js</code> da secretária. Os dados ficam num <b>banco de dados</b>; sua planilha do Google cumpre esse papel.</p><h3>Guardando versões</h3><p><b>Git</b> é a máquina do tempo do código. Cada <b>commit</b> é uma foto salva com uma mensagem. O <b>repositório</b> é a pasta com todo o histórico. O <b>GitHub</b> guarda repositórios na nuvem.</p><h3>Colocando no ar</h3><p><b>Hospedagem</b> é alugar um computador para deixar o projeto ligado (Render, Cloudflare, GitHub Pages). <b>Deploy</b> é publicar a versão nova lá.</p>`},
{id:"m0e",m:"Módulo 0.0",t:"Segredos e segurança em palavras simples",min:15,b:`<p>Uma <b>chave de API</b> é a senha que autoriza seu sistema a usar um serviço, como o Gemini. Quem a possui gasta o seu limite. Por isso ela vive num arquivo <code>.env</code> (ou nas variáveis de ambiente da Render), nunca no GitHub.</p><ul><li><b>Autenticação:</b> provar quem você é.</li><li><b>Autorização:</b> o que você pode fazer depois de provar.</li><li><b>Vulnerabilidade:</b> falha que deixa alguém fazer o que não deveria.</li><li><b>Auditoria:</b> examinar o sistema para achar essas falhas.</li></ul><p>Seu objetivo final é ser capaz de auditar. Tudo o que você aprende aqui leva a isso.</p>`},
{id:"p0",m:"Passo 0",t:"Conter o risco dos seus projetos",min:20,b:`<p>Leia antes o <b>Módulo 0.0</b>. Os termos desta lição estão explicados lá e em <b>Termos</b>.</p><p>Seus projetos já têm dados de clientes reais. Antes de estudar, vamos <b>reduzir a exposição</b>. Cada etapa tem um porquê, e entender o porquê é o que te transforma em auditor.</p>
<h3>O que descobrimos</h3><ul><li>O servidor da secretária não pede login em nenhuma rota.</li><li>O arquivo <code>.env</code> (o cofre de chaves) foi parar no GitHub.</li><li>Seu número pessoal aparece em arquivos públicos.</li></ul>
<h3>Ideia central</h3><p>Um sistema é seguro quando só entra quem provou quem é (<b>autenticação</b>) e só faz o que lhe é permitido (<b>autorização</b>). Hoje, nas rotas da API, qualquer pessoa entra e faz tudo.</p>
<p>As etapas práticas estão em <b>Tarefas</b>. Faça uma por vez e anote o que viu.</p>`},
{id:"s1a",m:"Semana 1",t:"O computador por dentro",min:25,b:`<p>Todo programa que você já pediu à IA acaba em quatro peças: <b>arquivos</b> (guardados no disco), <b>processos</b> (programas rodando), <b>memória</b> (onde o processo guarda o que está usando) e <b>rede</b> (como falam com outros computadores).</p>
<h3>Um servidor é só um computador</h3><p>A Render, a Cloudflare e o GitHub Pages são computadores de outras pessoas, ligados 24h, que guardam seus arquivos e rodam seu código. Quando alguém abre o link do seu tour, o navegador pede os arquivos a esse computador.</p>
<h3>O caminho de uma requisição</h3><ol><li>Você digita o endereço.</li><li>O navegador descobre o computador dono dele (DNS).</li><li>Envia um pedido (HTTP).</li><li>O servidor responde com arquivos ou dados.</li><li>O navegador desenha a página.</li></ol>
<p><b>Por que importa:</b> cada falha de segurança vive em algum ponto desse caminho. Saber o caminho é saber onde olhar.</p>`},
{id:"s1b",m:"Semana 1",t:"Terminal: seus primeiros comandos",min:30,b:`<p>O terminal é uma conversa por texto com o computador. Tudo que você faz clicando também pode ser feito por comando, e a IA usa comandos o tempo todo.</p>
<pre><code>pwd          # mostra em qual pasta você está
ls           # lista o que há na pasta
cd nome      # entra numa pasta
cd ..        # volta uma pasta
mkdir teste  # cria uma pasta
node -v      # mostra a versão do Node.js</code></pre>
<p>No Mac, abra o app <b>Terminal</b> (Cmd+Espaço e digite Terminal). Regra de ouro: <b>leia o comando antes de dar Enter</b>. Se não entende o que ele faz, pergunte no chat.</p>`},
{id:"s2a",m:"Semana 2",t:"JavaScript: variáveis e tipos",min:30,b:`<p>Uma <b>variável</b> é uma caixa com nome que guarda um valor. Em JavaScript:</p>
<pre><code>const marca = "Zava";     // texto (string), não muda
let lotes = 12;           // número, pode mudar
lotes = lotes + 1;        // agora vale 13
const ativo = true;       // verdadeiro ou falso (boolean)</code></pre>
<p><b>Exercício de prever:</b> antes de rodar, escreva o que <code>console.log(marca, lotes)</code> mostra depois dessas linhas. Depois confira no console do navegador (Cmd+Option+J).</p>`},
{id:"s2b",m:"Semana 2",t:"JavaScript: funções",min:30,b:`<p>Uma <b>função</b> é uma receita com nome: recebe ingredientes (parâmetros) e devolve um resultado.</p>
<pre><code>function precoTotal(valor, desconto) {
  return valor - valor * desconto;
}
precoTotal(500000, 0.1);   // devolve 450000</code></pre>
<p>Quando você lê o <code>index.js</code> da secretária, quase tudo são funções. Ler código é achar a função, ver o que entra e o que sai.</p>`}];
const T=[
{id:"t1",t:"Passo 0 - Etapa 1: ver o sistema de fora",d:"Antes, leia as lições do Módulo 0.0. Depois, abra uma janela anônima do navegador (Cmd+Shift+N). Digite o endereço do seu sistema na Render, que termina em onrender.com, e acrescente /api/status no fim. Isso faz você pedir ao sistema, como um estranho, o relatório dele sobre si mesmo. Se aparecer um bloco de texto cheio de dados, a falha existe. Anote o que viu, sem colar telefones."},
{id:"t2",t:"Passo 0 - Etapa 2: repositório privado",d:"Repositório é a pasta do projeto guardada no GitHub. Lá: Settings, Danger Zone, Change visibility, Make private, no secretaria-imoveis-whatsapp. Depois confira se a Render ainda faz deploy."},
{id:"t3",t:"Passo 0 - Etapa 3: tirar o .env do GitHub",d:"O .env é o arquivo de segredos do sistema (chaves e senhas). Apague-o pela página do GitHub e adicione a linha .env ao arquivo .gitignore. O .env.example continua."},
{id:"t4",t:"Passo 0 - Etapa 4: revisar a chave do Gemini",d:"Chave de API é a senha que autoriza seu sistema a usar o Gemini (a IA do Google). No Google AI Studio, veja as chaves. Se alguma já esteve em lugar público, crie outra, apague a antiga e ponha a nova em Environment na Render."},
{id:"t5",t:"Passo 0 - Etapa 5: mapa do ecossistema",d:"Tabela com os 7 projetos: o que faz, link no ar, onde está hospedado (github.io, onrender.com, pages.dev) e se é versão de outro."},
{id:"t6",t:"Semana 1: navegar pelo terminal",d:"Abra o Terminal, use pwd, ls e cd até chegar na pasta de um projeto seu. Rode node -v. Anote o que cada comando mostrou."},
{id:"t7",t:"Semana 2: prever código",d:"Faça o exercício de prever da lição de variáveis. Escreva sua previsão antes de rodar e compare depois."}];
const Q=[
{q:"Por que o arquivo .env não deve ir para o GitHub?",o:["Contém chaves e senhas do sistema","Ele é pesado demais","O Git não consegue ler","Deixa o site mais lento"],a:0,e:"O .env é o cofre de segredos. No GitHub público, qualquer um poderia ler."},
{q:"O que significa uma API sem autenticação?",o:["Que ela é mais rápida","Que qualquer pessoa pode chamar suas rotas sem provar quem é","Que ela não usa internet","Que ela não guarda dados"],a:1,e:"Sem autenticação o servidor não sabe quem pede, então aceita tudo."},
{q:"Qual comando mostra em qual pasta você está?",o:["ls","cd ..","pwd","mkdir"],a:2,e:"pwd mostra o caminho da pasta atual."},
{q:"Em JavaScript, qual palavra declara uma variável que não muda?",o:["let","const","func","var2"],a:1,e:"const cria uma constante. let permite mudar o valor."},
{q:"Por que prever o resultado antes de rodar um código?",o:["Para rodar mais rápido","Porque o computador exige","Para treinar o modelo mental do que o código faz","Não serve para nada"],a:2,e:"Prever e comparar é o treino que te permite auditar código que você não escreveu."},
{q:"Tornar um repositório privado resolve toda a segurança?",o:["Sim, resolve tudo","Não, reduz a exposição mas a API sem login continua frágil","Só vale para HTML","Só vale em fins de semana"],a:1,e:"Privado esconde o código, mas o servidor no ar segue aceitando chamadas de qualquer um."}];
const P=[
{id:"f0",t:"Fase 0: terminal e computador",m:"Marco: navego e rodo comandos sem medo."},
{id:"f1",t:"Fase 1: JavaScript e DOM",m:"Marco: leio e altero o zava-visit explicando cada linha."},
{id:"f2",t:"Fase 2: web, APIs e hospedagem",m:"Marco: explico o caminho de uma requisição até o banco."},
{id:"f3",t:"Fase 3: Git e organização",m:"Marco: uma versão oficial de cada projeto, sem segredos no GitHub."},
{id:"f4",t:"Fase 4: segurança e auditoria",m:"Marco: protejo as rotas da API e explico cada linha."},
{id:"f5",t:"Fase 5: operar com IA",m:"Marco: especifico, reviso e audito um módulo novo."}];

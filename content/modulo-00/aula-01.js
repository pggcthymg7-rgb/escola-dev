/* Módulo 0.0, aula 1. Esquema em docs/ESQUEMA-CONTEUDO.md. */
Escola.aula({
 id: "m00-a01", modulo: "m00", min: 45,
 titulo: "Software, sistema, app, site e página: as palavras da base",
 objetivos: [
  "Diferenciar hardware de software com um exemplo do seu dia a dia.",
  "Explicar o que é um programa, um aplicativo e um sistema, e por que um sistema costuma juntar várias peças.",
  "Distinguir página, site e aplicação web, e dizer onde cada um roda.",
  "Classificar os seus próprios projetos usando essas palavras com precisão."
 ],
 partes: [
  { n: 1, titulo: "O problema que isto resolve", html: `
<p>Quando você conversa com uma IA sobre os seus projetos, ela usa palavras como <i>sistema</i>, <i>app</i>, <i>site</i>, <i>front-end</i>, <i>servidor</i> e <i>deploy</i> como se você já soubesse o que cada uma significa. Se você não sabe, acontecem três coisas ruins.</p>
<ol>
<li><b>Você pede mal.</b> Pedir "arruma o app" quando o problema está no servidor faz a IA mexer no lugar errado.</li>
<li><b>Você não consegue conferir.</b> Se a IA diz "isso é só uma página estática, não precisa de servidor", você não tem como saber se ela acertou.</li>
<li><b>Você fica dependente.</b> Quem não tem as palavras não consegue nem descrever o que quer, e passa a aceitar o que vier.</li>
</ol>
<p>Esta aula resolve a base de tudo: dar nome certo às coisas. Parece pouco, mas é como aprender os nomes das peças de um carro antes de conversar com o mecânico. Você não vai consertar o motor hoje, mas vai entender o que ele está dizendo e perceber quando a explicação não fecha.</p>` },

  { n: 2, titulo: "Definição, siglas e analogia", html: `
<p>Vamos montar o vocabulário do mais amplo para o mais específico. Pense numa <b>cozinha</b>: o fogão, as panelas e a geladeira são as coisas físicas; as receitas são as instruções; o restaurante inteiro é a organização de tudo funcionando junto.</p>
<h3>Hardware e software</h3>
<p><b>Hardware</b> (do inglês <i>hard</i>, duro, e <i>ware</i>, mercadoria) é a parte física: a tela, o processador, a memória, o cabo, o seu iPhone em si. É o fogão e as panelas.</p>
<p><b>Software</b> (de <i>soft</i>, macio) é a parte que não se pega na mão: as instruções que dizem ao hardware o que fazer. É a receita. Um iPhone sem software é um peso de papel caro; um software sem hardware é uma receita sem cozinha.</p>
<h3>Programa</h3>
<p>Um <b>programa</b> é um software com uma tarefa definida: a calculadora, o Safari, o WhatsApp. No dia a dia, "programa" e "software" são usados quase como sinônimos. A diferença é de ênfase: "software" é o termo geral; "programa" é uma unidade concreta que você instala, abre e fecha.</p>
<h3>Sistema operacional</h3>
<p>O <b>sistema operacional</b> é o programa que administra o hardware e deixa os outros programas rodarem: o iOS no iPhone e o macOS no Mac. Ele é o gerente da cozinha: decide quem usa o fogão, onde cada coisa é guardada e impede que uma receita atrapalhe a outra.</p>
<h3>Aplicativo (app)</h3>
<p><b>Aplicativo</b>, ou <b>app</b> (abreviação do inglês <i>application</i>, aplicação), é o programa feito para a pessoa usar diretamente numa tarefa: pedir comida, mandar mensagem, editar foto. Todo app é um programa, mas nem todo programa é um app: o programa que controla o Wi-Fi do seu Mac trabalha escondido e você nunca o "usa" diretamente.</p>
<h3>Sistema</h3>
<p><b>Sistema</b> é a palavra mais importante desta aula, e a mais mal usada. Um sistema é um conjunto de peças que trabalham juntas para cumprir um objetivo. As peças podem ser vários programas, dados guardados, serviços de outras empresas e até pessoas seguindo regras. Um banco é um sistema: tem o app no seu celular, os computadores do banco, o banco de dados com os saldos e as regras de segurança. O app é só a porta de entrada.</p>
<p>Analogia: o <i>restaurante</i> é o sistema. O cardápio, o garçom, a cozinha, o estoque e o caixa são peças. Quando alguém diz "o sistema caiu", pode ser que só uma peça tenha parado, e as outras estejam bem.</p>
<h3>Página, site e aplicação web</h3>
<p>A <b>web</b> (teia, em inglês) é o conjunto de documentos e serviços que você acessa por um navegador. O <b>navegador</b> (Safari, Chrome) é o programa que busca e mostra esses documentos.</p>
<ul>
<li><b>Página web</b>: um único documento que o navegador mostra, com um endereço próprio. Esta aula, aberta na tela, é uma página.</li>
<li><b>Site</b>: um conjunto de páginas ligadas entre si, sob um mesmo nome (o domínio). Por exemplo, todas as páginas do site de uma loja.</li>
<li><b>Aplicação web</b> (ou "web app"): um site que se comporta como um aplicativo. Você não só lê: você faz coisas, salva dados, faz login. O Gmail no navegador é uma aplicação web.</li>
</ul>
<p>A fronteira entre site e aplicação web é gradual, não uma linha nítida. A pergunta útil é: <i>a pessoa só lê, ou ela age e o sistema guarda o que ela fez?</i></p>` },

  { n: 3, titulo: "De onde vem e quem cria", html: `
<p>As palavras vêm da história da computação, quase todas do inglês.</p>
<ul>
<li><b>Hardware</b> já existia antes dos computadores: era o nome das lojas de ferragens nos Estados Unidos. Quando surgiram as máquinas de calcular eletrônicas, nos anos 1940 e 1950, a parte física herdou o nome.</li>
<li><b>Software</b> apareceu por contraste, para nomear a parte "macia", que se troca sem mexer na máquina. O termo se popularizou nos anos 1960, quando programas começaram a ser vendidos separados dos computadores.</li>
<li><b>App</b> existia como abreviação há décadas, mas virou palavra do dia a dia em 2008, quando a Apple abriu a App Store para o iPhone.</li>
<li><b>Web</b> nasceu entre 1989 e 1991, criada por Tim Berners-Lee no CERN, um laboratório de pesquisa na Europa. Ele inventou a página, o endereço e o navegador como os conhecemos. Você vai ver essa história com detalhe na aula 3.</li>
</ul>
<p><b>Quem cria</b> software são pessoas que escrevem instruções numa <b>linguagem de programação</b>, um idioma com regras rígidas que o computador consegue seguir (assunto da próxima aula). Hoje boa parte desse texto é escrita com ajuda de IA, como os seus projetos. A IA escreve; a responsabilidade de entender o que foi escrito continua sendo de quem publica. É exatamente por isso que você está aqui.</p>
<p>Ninguém é dono dessas palavras. Elas não têm uma definição oficial única, e cada empresa usa do seu jeito. Por isso, quando uma documentação ou uma IA usar um termo de forma estranha, pergunte: "o que você quer dizer com sistema aqui?".</p>` },

  { n: 4, titulo: "Como se usa: um exemplo comentado", html: `
<p>O jeito de usar este vocabulário é descrever qualquer coisa digital em camadas: o que é físico, que programas rodam, onde cada um roda e como eles formam um sistema. Veja o exemplo de pedir comida num app de entrega, descrito linha a linha:</p>
<pre><code>Hardware:    seu iPhone, os computadores da empresa, o celular do entregador
             // a parte física; sem ela nada roda
Sist. oper.: iOS no seu iPhone; outro sistema nos computadores da empresa
             // o gerente de cada máquina
App:         o aplicativo de entrega no seu iPhone
             // a porta de entrada que você toca
Site:        a página da empresa onde você também pode pedir pelo navegador
             // outra porta de entrada, para o mesmo sistema
Programas:   o programa que recebe pedidos, o que calcula o frete,
             o que avisa o restaurante
             // peças que você nunca vê, rodando longe de você
Dados:       cardápios, endereços, histórico de pedidos
             // a memória do sistema
Sistema:     tudo isso junto, mais as regras (prazo, pagamento, cancelamento)
             // o restaurante inteiro, não só o cardápio</code></pre>
<p>Repare em três coisas que esse exemplo ensina:</p>
<ol>
<li><b>O app e o site são só portas.</b> Os dois levam ao mesmo sistema. Se o site sair do ar e o app continuar funcionando, o problema está numa porta, não no sistema todo.</li>
<li><b>A maior parte do sistema é invisível.</b> O que você toca é uma fração pequena. A maior parte roda em computadores que você nunca vai ver.</li>
<li><b>Os dados são parte do sistema.</b> Se o programa estiver perfeito e os dados se perderem, o sistema não cumpre o objetivo.</li>
</ol>
<p>Agora faça o teste ao contrário. Quando alguém disser "o sistema não está funcionando", você pergunta: qual peça? A porta (app ou site), um programa que roda longe, os dados ou um serviço de outra empresa? Essa pergunta sozinha já coloca você no controle da conversa.</p>` },

  { n: 5, titulo: "Quando usar cada palavra e quando não usar", html: `
<ul>
<li><b>Diga "sistema"</b> quando falar do conjunto inteiro: "o sistema da secretária junta o robô, o painel e a planilha". <b>Não diga</b> "sistema" para uma peça só: "o sistema travou" quando quem travou foi a tela do painel. Isso esconde onde está o problema.</li>
<li><b>Diga "app"</b> para o que se usa diretamente, principalmente no celular. <b>Não diga</b> "app" para um programa que roda escondido num servidor; esse é um programa, um serviço ou uma parte do sistema.</li>
<li><b>Diga "página"</b> para um endereço específico e <b>"site"</b> para o conjunto. "Mude a página de contato" é preciso; "mude o site" é vago.</li>
<li><b>Diga "aplicação web"</b> quando a pessoa age e o sistema guarda o que ela fez, por exemplo um painel com login. Quando só há leitura, "site" basta.</li>
<li><b>Diga "software"</b> quando quiser falar de forma geral ("o software é meu, o hardware é alugado") e <b>"programa"</b> quando for uma unidade concreta ("o programa que envia as mensagens").</li>
</ul>
<p>Uma regra prática que vale para o curso inteiro: <b>quanto mais específica a palavra, melhor o pedido à IA</b>. "Arrume o sistema" gera uma resposta genérica. "Na página do painel, o botão de salvar não grava na planilha" leva direto ao ponto.</p>` },

  { n: 6, titulo: "Diferenças entre as variações", html: `
<h3>Os tipos de app</h3>
<ul>
<li><b>App nativo</b>: feito especificamente para um sistema operacional (iOS ou Android) e instalado pela loja. Tem acesso fácil à câmera, aos avisos e ao armazenamento do aparelho.</li>
<li><b>Aplicação web</b>: roda dentro do navegador. Não precisa instalar; basta o endereço. Funciona em qualquer aparelho com navegador.</li>
<li><b>PWA</b> (<i>Progressive Web App</i>, aplicação web progressiva): uma aplicação web que pode ser "instalada" na tela de início e funcionar sem internet. A própria Escola Dev é uma PWA: você a abre pelo ícone, como um app, mas ela é feita com as mesmas peças de um site.</li>
<li><b>Programa de computador</b> (ou "app de desktop"): instalado no Mac ou no Windows, como o Pages ou o Excel.</li>
</ul>
<h3>Site estático e site dinâmico</h3>
<ul>
<li><b>Estático</b>: as páginas já estão prontas, guardadas como arquivos. Todo mundo que abre recebe o mesmo conteúdo. É barato e simples de publicar.</li>
<li><b>Dinâmico</b>: as páginas são montadas na hora, por um programa, conforme quem pede e o que está guardado. Uma busca de imóveis que mostra resultados diferentes para cada filtro é dinâmica.</li>
</ul>
<h3>Sistema pequeno e sistema grande</h3>
<p>Um sistema pode ter duas peças ou duas mil. A palavra não indica tamanho, indica <i>integração</i>: peças que dependem umas das outras. Um robô que lê mensagens, consulta uma planilha e pede ajuda a uma IA já é um sistema, mesmo feito por uma pessoa só.</p>` },

  { n: 7, titulo: "Exemplo real: os seus projetos", html: `
<p>Vamos classificar três projetos seus com o vocabulário novo. É uma descrição de alto nível, sem detalhes internos.</p>
<h3>secretaria-imoveis-whatsapp</h3>
<p>É um <b>sistema</b>, e um bom exemplo de por que essa palavra existe. As peças são:</p>
<ul>
<li>um <b>programa</b> que roda num computador alugado (na Render) e fica ligado o tempo todo;</li>
<li>uma conexão com o <b>WhatsApp</b>, serviço de outra empresa;</li>
<li>uma <b>planilha</b> do Google, onde ficam os <b>dados</b> dos imóveis;</li>
<li>o <b>Gemini</b>, uma IA de outra empresa, que o programa consulta;</li>
<li>um <b>painel</b> que você abre no navegador, uma <b>aplicação web</b>, porque você age nele e o sistema guarda o que você fez.</li>
</ul>
<p>Quando algo falhar, a primeira pergunta é qual dessas cinco peças falhou.</p>
<h3>zava-visit</h3>
<p>É um <b>site</b>, mais precisamente uma <b>página</b> rica, que mostra lotes em 3D. Pelo que você descreveu, ela é <b>estática</b>: os arquivos ficam prontos e o navegador faz todo o trabalho de desenhar o 3D. Não há um programa seu rodando num servidor. Isso a torna barata e simples de publicar.</p>
<h3>zava-tours</h3>
<p>Começa como um site, mas, ao guardar e carregar tours, ganha um pedacinho de programa rodando longe do usuário (as funções na Cloudflare). Isso faz dele uma pequena <b>aplicação web</b>: o usuário age e o sistema guarda.</p>
<p>Perceba o ganho: com quatro palavras (sistema, programa, site, aplicação web), você já consegue explicar a alguém, ou a uma IA, a natureza de cada projeto em uma frase.</p>` },

  { n: 8, titulo: "Como pesquisar mais", html: `
<p>Para palavras básicas como estas, desconfie de definições soltas na internet: cada site usa do seu jeito. Prefira três tipos de fonte.</p>
<ol>
<li><b>Documentação de quem faz a tecnologia.</b> Para a web, a melhor referência gratuita é o <b>MDN Web Docs</b>, mantido pela Mozilla (a organização que faz o navegador Firefox) com a comunidade. Muitas páginas têm tradução para o português.</li>
<li><b>Cursos de universidades reconhecidas.</b> O <b>CS50</b>, de Harvard, é gratuito e tem aulas dubladas em português.</li>
<li><b>O glossário desta escola.</b> Toda palavra nova entra lá. Use a aba Termos e os cartões de revisão.</li>
</ol>
<p><b>Como buscar:</b> escreva o termo mais a palavra "MDN" (por exemplo, "página web site diferença MDN"). Para perguntar a uma IA, peça a definição <i>e</i> um exemplo, e depois pergunte "qual a diferença entre X e Y?". A pergunta de diferença revela se a definição foi bem entendida, tanto por ela quanto por você.</p>` },

  { n: 9, titulo: "Exercício com critérios de correção", html: `
<p>Escolha <b>dois</b> aplicativos que você usa todo dia (por exemplo, o do seu banco e o WhatsApp). Para cada um, escreva no caderno de anotações desta aula:</p>
<ol>
<li>O hardware envolvido do seu lado e do lado da empresa.</li>
<li>As portas de entrada: existe app? site? aplicação web?</li>
<li>Pelo menos três peças invisíveis que você imagina que o sistema tenha.</li>
<li>Que dados o sistema precisa guardar.</li>
</ol>
<p><b>Critérios de correção</b> (confira você mesmo):</p>
<ul>
<li>Separou o físico (hardware) das instruções (software).</li>
<li>Usou "sistema" para o conjunto e não para uma peça.</li>
<li>Identificou pelo menos uma porta de entrada além do app, ou explicou por que não existe.</li>
<li>Listou dados concretos (por exemplo, "saldo", "conversas", "contatos"), não só "informações".</li>
</ul>` },

  { n: 10, titulo: "Termos novos no glossário", termos: ["Hardware", "Software", "Programa", "Sistema operacional", "Aplicativo (app)", "Sistema", "Página web", "Site", "Aplicação web", "Navegador", "PWA", "Conteúdo estático e dinâmico"] }
 ],
 resumo: [
  "Hardware é a parte física; software são as instruções que dizem ao hardware o que fazer.",
  "Programa é um software com tarefa definida; app é o programa que a pessoa usa diretamente.",
  "O sistema operacional (iOS, macOS) administra o hardware e deixa os outros programas rodarem.",
  "Sistema é o conjunto de peças (programas, dados, serviços e regras) trabalhando juntas; o app é só uma porta.",
  "Página é um documento com endereço próprio; site é o conjunto de páginas; aplicação web é o site em que a pessoa age e o sistema guarda.",
  "Estático: arquivos prontos, iguais para todos. Dinâmico: montado na hora por um programa.",
  "Quanto mais precisa a palavra, melhor o pedido à IA e mais fácil achar onde está o problema."
 ],
 referencias: [
  { autor: "MDN Web Docs (Mozilla)", titulo: "Qual a diferença entre página web, site, servidor web e mecanismo de busca?", ano: "página viva", tipo: "documentação", idioma: "português", link: "https://developer.mozilla.org/pt-BR/docs/Learn_web_development/Getting_started/Environment_setup/Browsing_the_web", ler: "O artigo inteiro, com atenção à analogia da biblioteca e às seções Página web e Site.", verificado: "2026-10-31" },
  { autor: "MDN Web Docs (Mozilla)", titulo: "Como a Internet funciona?", ano: "página viva", tipo: "documentação", idioma: "português", link: "https://developer.mozilla.org/pt-BR/docs/Learn_web_development/Howto/Web_mechanics/How_does_the_Internet_work", ler: "As seções Resumo e A Internet e a Web. O resto será útil na aula 3.", verificado: "2026-10-31" }
 ],
 aprofundar: [
  { titulo: "CS50x 2026, semana 0 (Scratch)", autor: "Universidade Harvard, David J. Malan", duracao: "aula longa (a página não informa a duração)", idioma: "inglês, com dublagem e legendas em português", porque: "Explica do zero como o computador representa e processa informação, com muitos exemplos visuais.", link: "https://cs50.harvard.edu/x/weeks/0/" }
 ],
 tarefa: {
  obj: [
   { id: "m00-a01-o1", q: "Qual destes é hardware?", o: ["O iOS", "O processador do iPhone", "O WhatsApp", "A planilha de imóveis"], a: 1, e: "Hardware é a parte física. O processador é uma peça física; o iOS e o WhatsApp são software, e a planilha é um conjunto de dados.", obj: 0 },
   { id: "m00-a01-o2", q: "Qual frase usa a palavra 'sistema' do jeito mais preciso?", o: ["O sistema travou, porque o botão da tela não respondeu.", "Abri o sistema no meu iPhone e tirei uma foto.", "O sistema da loja junta o app, o site, o estoque e o pagamento.", "Sistema é o mesmo que aplicativo."], a: 2, e: "Sistema é o conjunto de peças trabalhando juntas. Nas outras frases, a palavra é usada para uma peça só ou como sinônimo de app.", obj: 1 },
   { id: "m00-a01-o3", q: "O que diferencia uma aplicação web de um site comum?", o: ["A aplicação web precisa ser instalada pela App Store.", "Na aplicação web a pessoa age e o sistema guarda o que ela fez.", "O site é sempre maior que a aplicação web.", "A aplicação web não usa navegador."], a: 1, e: "A aplicação web roda no navegador, como o site, mas permite agir (salvar, editar, fazer login) e guarda o resultado.", obj: 2 },
   { id: "m00-a01-o4", q: "A Escola Dev abre pelo ícone na tela de início e funciona sem internet, mas é feita com as peças de um site. Ela é:", o: ["um app nativo", "um sistema operacional", "uma PWA", "um servidor"], a: 2, e: "PWA (Progressive Web App) é uma aplicação web que pode ser instalada na tela de início e funcionar offline.", obj: 2 },
   { id: "m00-a01-o5", q: "Um site em que todos os visitantes recebem exatamente os mesmos arquivos prontos é chamado de:", o: ["dinâmico", "nativo", "operacional", "estático"], a: 3, e: "Estático: as páginas já estão prontas como arquivos. Dinâmico: montado na hora por um programa.", obj: 2 },
   { id: "m00-a01-o6", q: "Pela descrição da aula, o projeto da secretaria de imóveis é melhor descrito como:", o: ["um sistema, porque junta programa, planilha, WhatsApp, IA e painel", "uma página estática", "um sistema operacional", "um hardware"], a: 0, e: "São várias peças que dependem umas das outras para cumprir um objetivo. Isso é a definição de sistema.", obj: 3 },
   { id: "m00-a01-o7", q: "O papel do sistema operacional (iOS, macOS) é:", o: ["mostrar páginas da web", "guardar as planilhas da empresa", "substituir o hardware", "administrar o hardware e deixar os outros programas rodarem"], a: 3, e: "Ele é o gerente da máquina: divide o processador, a memória e o armazenamento entre os programas.", obj: 0 }
  ],
  dis: [
   { id: "m00-a01-d1", q: "Explique, com suas palavras e uma analogia sua (diferente da cozinha), a diferença entre programa, app e sistema.", min: 200, modelo: "Programa é um conjunto de instruções com uma tarefa definida. App é um programa feito para a pessoa usar diretamente. Sistema é o conjunto de peças que trabalham juntas por um objetivo: vários programas, dados, serviços e regras. Analogia: numa escola, cada professor é um programa com uma função; a secretaria que atende os pais é o app, a porta de entrada; e a escola inteira, com professores, diários, regras e prédio, é o sistema.", criterios: ["Define programa como software com tarefa definida", "Define app como o programa que a pessoa usa diretamente", "Define sistema como conjunto de peças integradas, não como sinônimo de app", "Traz uma analogia própria e coerente"], aula: "m00-a01" },
   { id: "m00-a01-d2", q: "Escolha um projeto seu que não foi detalhado na aula (por exemplo, panofotos ou outro da família Zava) e classifique-o: é página, site, aplicação web ou sistema? Justifique pelas definições.", min: 150, modelo: "Resposta pessoal. Exemplo: o panofotos é um site estático: guarda fotos panorâmicas em arquivos prontos e o navegador só exibe. Não há um programa meu rodando num servidor nem dados que o usuário altere, então não é aplicação web nem sistema.", criterios: ["Escolhe um projeto real e diz a classificação", "Justifica usando a definição (só leitura x a pessoa age; arquivos prontos x programa rodando)", "Menciona onde roda ou que peças tem", "Usa os termos de forma consistente com a aula"], aula: "m00-a01" }
  ],
  pratica: { instrucao: "Abra a Escola Dev de dois jeitos no seu iPhone: pelo Safari, digitando o endereço, e pelo ícone na tela de início (se ainda não instalou, use Compartilhar e depois Adicionar à Tela de Início). Compare as duas aberturas.", perguntas: [
   { id: "m00-a01-p1", q: "O que muda na tela entre abrir pelo Safari e abrir pelo ícone? O que continua igual? Com base nisso, por que dá para dizer que a Escola Dev é uma PWA e não um app nativo?", min: 120 }
  ] }
 }
});

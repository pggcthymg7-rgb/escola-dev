/* Módulo 0.0, aula 7. Esquema em docs/ESQUEMA-CONTEUDO.md. */
Escola.aula({
 id: "m00-a07", modulo: "m00", min: 50,
 titulo: "Onde o sistema roda: hospedagem, deploy e ambientes",
 objetivos: [
  "Explicar o que é hospedagem e o que se está alugando quando se usa uma.",
  "Descrever as etapas de um deploy (construir, lançar, executar) e o que fazer quando ele falha.",
  "Diferenciar os ambientes local, de teste e de produção, e dizer por que eles devem ser parecidos.",
  "Escolher o tipo de hospedagem (estática, sob demanda ou sempre ligada) para um projeto, considerando custo e limites dos planos gratuitos.",
  "Ler os registros (logs) de um deploy como primeira fonte de diagnóstico."
 ],
 partes: [
  { n: 1, titulo: "O problema que isto resolve", html: `
<p>Na aula 6, o código ficou guardado num repositório. Mas código guardado não faz nada: é uma receita na gaveta. Para alguém usar o seu sistema, o código precisa estar <b>rodando</b> num computador ligado, conectado à internet, com um endereço que as pessoas consigam alcançar.</p>
<p>Esse computador poderia ser o seu Mac. Só que o Mac dorme, desliga, muda de Wi-Fi, não tem um endereço fixo e, se ficar acessível a qualquer um na internet, vira um risco. Ninguém quer depender do próprio notebook para o sistema ficar no ar.</p>
<p>A solução é alugar um lugar feito para isso: a <b>hospedagem</b>. E o ato de levar a versão nova do código do repositório para lá, e colocá-la para rodar, se chama <b>deploy</b>. Entender as duas coisas responde às perguntas mais comuns de quem tem projetos no ar: "por que o site demorou para abrir?", "por que a mudança não apareceu?", "por que funcionava no meu computador e não funciona lá?".</p>` },

  { n: 2, titulo: "Definição, siglas e analogia", html: `
<h3>Hospedagem</h3>
<p><b>Hospedagem</b> é o serviço de manter os seus arquivos ou programas em computadores de uma empresa, ligados o tempo todo e conectados à internet. Você aluga capacidade (processamento, memória, armazenamento e tráfego) e, em troca, recebe um endereço. Render, Cloudflare e GitHub Pages são empresas de hospedagem.</p>
<p>Analogia: um ponto comercial num shopping. Você não constrói o prédio, não cuida da energia nem da segurança do estacionamento. Você aluga o espaço, monta a sua loja e o shopping cuida de mantê-lo aberto e com endereço conhecido. Há lojas de tamanhos e preços diferentes, e há quiosques grátis com regras rígidas.</p>
<h3>Deploy</h3>
<p><b>Deploy</b> (implantar, colocar em posição) é o processo de levar uma versão do código para a hospedagem e deixá-la rodando. Em português também se diz "implantação" ou, informalmente, "publicar" e "subir". Analogia: a reforma da loja. Você prepara tudo, troca a vitrine e reabre; enquanto isso, o ideal é que os clientes nem percebam.</p>
<h3>Ambientes</h3>
<p>Um <b>ambiente</b> é um lugar onde o sistema roda, com a sua própria configuração:</p>
<ul>
<li><b>Local</b> (ou de desenvolvimento): o seu computador, onde você testa enquanto constrói. Lembra do <code>localhost</code> da aula 4?</li>
<li><b>Teste</b> (também chamado de homologação ou <i>staging</i>): uma cópia do sistema no ar, mas só para testar, com dados de mentira.</li>
<li><b>Produção</b>: o ambiente de verdade, que as pessoas usam, com dados reais. "Está em produção" quer dizer "está no ar, valendo".</li>
</ul>
<h3>Log</h3>
<p>Um <b>log</b> (registro, como o diário de bordo de um navio) é a lista de mensagens que um programa escreve enquanto roda: "iniciei", "recebi um pedido", "deu erro na linha tal". Toda hospedagem mostra os logs do deploy e do programa rodando. É a primeira coisa a olhar quando algo dá errado.</p>` },

  { n: 3, titulo: "De onde vem e quem cria", html: `
<p>No começo da web, quem queria um site comprava um computador (um servidor), instalava num lugar com boa internet e energia (os <b>data centers</b>, prédios cheios de servidores) e cuidava de tudo. Depois surgiram empresas que alugavam espaço nesses computadores.</p>
<p>A partir de meados dos anos 2000 veio a <b>computação em nuvem</b> (<i>cloud</i>): empresas como Amazon, Google e Microsoft passaram a alugar capacidade sob demanda, por hora ou por uso, e o cliente nem sabe em qual máquina física o programa está. "Nuvem" é só um apelido para "computadores de outra empresa, acessados pela internet".</p>
<p>Em seguida vieram as <b>plataformas</b> que escondem ainda mais a complexidade: você conecta o repositório e elas fazem o deploy sozinhas a cada mudança. A Render é desse tipo. O GitHub Pages e o Cloudflare Pages fazem o mesmo para sites estáticos, e as funções da Cloudflare (Pages Functions, que rodam sobre os Cloudflare Workers) acrescentam pedaços de código sob demanda.</p>
<p>Quem cria a configuração do deploy de cada projeto é quem o publica: escolher a hospedagem, conectar o repositório, informar o comando que inicia o programa e as variáveis de ambiente (aula 8). Muitas vezes isso foi feito uma vez, com ajuda da IA, e nunca mais olhado. Vale saber onde fica.</p>` },

  { n: 4, titulo: "Como se usa: um deploy comentado, etapa por etapa", html: `
<p>O que acontece na Render quando um projeto Node.js recebe um merge na <code>main</code>. As etapas seguem uma ideia clássica, descrita no método "The Twelve-Factor App": <b>construir, lançar, executar</b>.</p>
<pre><code>1. A Render percebe a mudança na main
   // ela "assiste" ao repositório conectado
2. CONSTRUIR (build): baixa o código e as dependências
   // roda algo como: npm install
   // se uma dependência não existir ou falhar, o deploy para aqui
3. LANÇAR (release): junta o código construído com a configuração
   // as variáveis de ambiente (chaves, endereços) entram aqui
   // cada lançamento recebe uma identificação própria
4. EXECUTAR (run): inicia o programa
   // roda algo como: node index.js
   // se o programa quebrar ao iniciar, o deploy falha aqui
5. Verificação: a Render confere se o programa responde
   // só então ela passa a mandar os pedidos para a versão nova
6. A versão antiga é desligada</code></pre>
<p>Cada etapa escreve nos <b>logs do deploy</b>. Quando um deploy falha, o caminho é sempre o mesmo:</p>
<ol>
<li>Abra a página do serviço na hospedagem e procure a lista de deploys (na Render, <b>Events</b> ou <b>Deploys</b>).</li>
<li>Abra o deploy que falhou e role os logs até a primeira linha com <code>Error</code> ou <code>failed</code>.</li>
<li>Copie essa linha <i>e as cinco anteriores</i> para a IA, dizendo em que etapa ela apareceu (build ou execução).</li>
</ol>
<h3>Voltar atrás: rollback</h3>
<p>Como cada lançamento tem identificação própria, dá para <b>reverter</b> (fazer <i>rollback</i>) para a versão anterior que funcionava, enquanto se investiga. A Render tem um botão para isso na lista de deploys. Outra forma é reverter o commit na <code>main</code>, o que dispara um deploy novo com o código antigo.</p>
<h3>E num site estático?</h3>
<p>No GitHub Pages, que publica esta escola, é mais simples: não há programa para executar. O deploy é copiar os arquivos da <code>main</code> para os servidores do GitHub, o que leva cerca de um minuto. Você acompanhou isso quando o site novo demorou um pouco a aparecer.</p>` },

  { n: 5, titulo: "Quando usar cada hospedagem e quando não usar", html: `
<h3>Hospedagem estática (GitHub Pages, Cloudflare Pages)</h3>
<p><b>Use</b> para páginas e aplicações que rodam inteiras no navegador: esta escola, o zava-visit, sites de apresentação. É gratuita dentro de limites generosos, rápida e quase não quebra.</p>
<p><b>Não use</b> quando precisar guardar dados de vários usuários ou esconder segredos: não há onde rodar código seu.</p>
<h3>Funções sob demanda (Cloudflare Pages Functions, Workers)</h3>
<p><b>Use</b> para pequenas tarefas de servidor que acontecem quando alguém pede: salvar um formulário, carregar um tour, conversar com uma API de terceiros guardando a chave longe do navegador.</p>
<p><b>Não use</b> para tarefas que precisam ficar rodando o tempo todo ou manter uma conexão aberta, como escutar o WhatsApp.</p>
<h3>Servidor sempre ligado (Render e similares)</h3>
<p><b>Use</b> quando o programa precisa ficar ativo continuamente, como o robô da secretaria.</p>
<p><b>Atenção aos planos gratuitos.</b> Na Render, segundo a documentação dela, serviços web gratuitos "dormem" depois de 15 minutos sem receber pedidos. O pedido seguinte demora enquanto o programa acorda, e, enquanto dorme, ele não faz nada, nem escutar mensagens. Para um robô que precisa estar sempre atento, isso é um problema real, e é o tipo de detalhe que se resolve lendo a página de limites antes de escolher.</p>
<h3>Regra geral</h3>
<p>Escolha a opção <b>mais simples que resolve</b>. Cada degrau (estático, sob demanda, sempre ligado) traz mais custo, mais manutenção e mais coisas que podem dar errado.</p>` },

  { n: 6, titulo: "Diferenças entre as variações", html: `
<h3>Os três ambientes, lado a lado</h3>
<ul>
<li><b>Local</b>: só você acessa, dados de mentira, erros não afetam ninguém, mudanças instantâneas.</li>
<li><b>Teste</b>: parecido com produção, acessado por quem testa, dados de mentira. Serve para pegar o erro antes do usuário.</li>
<li><b>Produção</b>: todo mundo acessa, dados reais, cada erro tem custo.</li>
</ul>
<p>Projetos pessoais muitas vezes só têm local e produção. Tudo bem, desde que você saiba que está testando direto no ar e tome cuidado redobrado.</p>
<h3>"Funciona na minha máquina"</h3>
<p>Essa frase famosa descreve o erro que aparece em produção e não aparece no local. As causas mais comuns: uma variável de ambiente que existe no seu computador e não foi configurada na hospedagem; uma versão diferente do Node.js; um arquivo que está no seu computador e não foi enviado ao repositório; diferença de maiúsculas e minúsculas em nomes de arquivos. O princípio de <b>paridade entre desenvolvimento e produção</b> do Twelve-Factor App diz exatamente isso: quanto mais parecidos forem os ambientes, menos surpresas.</p>
<h3>Domínio próprio e subdomínio</h3>
<p>Toda hospedagem dá um endereço gratuito, em geral um subdomínio dela (como <code>pggcthymg7-rgb.github.io</code>). Você pode comprar um domínio próprio num registrador e apontá-lo para a hospedagem, configurando o DNS. Para estudo, o gratuito basta.</p>
<h3>Custo</h3>
<p>Os modelos mais comuns: <b>gratuito com limites</b>; <b>mensalidade fixa</b> por um tamanho de máquina; e <b>pagamento por uso</b> (por pedido, por tempo de execução, por tráfego). No pagamento por uso, um erro que gera pedidos sem parar pode virar uma conta alta: vale configurar alertas de gasto.</p>` },

  { n: 7, titulo: "Exemplo real: os seus projetos", html: `
<h3>escola-dev no GitHub Pages</h3>
<p>Hospedagem estática. Deploy automático a cada mudança na <code>main</code>, em cerca de um minuto. Só existem os ambientes local (o computador onde o Claude testa) e produção (o site). Por isso o Claude roda testes automáticos antes de cada publicação: eles fazem o papel do ambiente de teste.</p>
<h3>secretaria-imoveis-whatsapp na Render</h3>
<p>Servidor sempre ligado, com deploy automático a partir da <code>main</code>. As configurações sensíveis (como a chave do Gemini) ficam guardadas na Render, em variáveis de ambiente, e entram na etapa de lançamento. Como o robô precisa manter a conexão com o WhatsApp, o comportamento do plano escolhido (dormir ou não quando ocioso) afeta diretamente se ele responde às mensagens. Você decidiu tirá-lo do ar até chegar ao módulo em que vai revisá-lo com calma; tirar do ar, na Render, é suspender o serviço no painel dela.</p>
<h3>zava-tours na Cloudflare</h3>
<p>A parte estática (páginas, imagens) vai para o Cloudflare Pages, e as funções que salvam e carregam tours rodam sob demanda. Dois tipos de hospedagem no mesmo projeto, cada um onde faz sentido.</p>
<h3>zava-visit</h3>
<p>Só estático. Qualquer hospedagem estática serve. É o mais barato e o mais estável dos seus projetos, justamente por ser o mais simples.</p>
<p>Fazer o <b>mapa de hospedagem</b> de todos os seus projetos (onde roda, que tipo, plano, endereço e como o deploy acontece) é parte do trabalho deste módulo.</p>` },

  { n: 8, titulo: "Como pesquisar mais", html: `
<ul>
<li><b>Documentação de cada hospedagem</b>: GitHub Docs ("O que é o GitHub Pages?", em português), Render Docs ("Your First Render Deploy", em inglês) e Cloudflare Docs ("Functions", em inglês). Procure sempre as páginas de <i>limits</i> (limites) e <i>pricing</i> (preços) do plano que você usa.</li>
<li><b>The Twelve-Factor App</b>, de Adam Wiggins, com tradução para o português: doze princípios para construir sistemas fáceis de publicar. Os fatores V (Construa, lance, execute) e X (Paridade entre desenvolvimento e produção) são o assunto desta aula. O fator III (Configurações) é o da próxima.</li>
</ul>
<p><b>Ao pedir ajuda à IA com um deploy</b>: diga qual hospedagem, qual etapa falhou (build ou execução), cole a primeira linha de erro com as anteriores e diga o que mudou desde o último deploy que funcionou.</p>` },

  { n: 9, titulo: "Exercício com critérios de correção", html: `
<p>No caderno desta aula, monte uma tabela com <b>todos</b> os seus projetos que estão (ou estiveram) no ar. Colunas:</p>
<ol>
<li>Nome do projeto.</li>
<li>Onde está hospedado (ou "não sei").</li>
<li>Tipo: estático, sob demanda, sempre ligado ou misto.</li>
<li>Endereço público.</li>
<li>Como o deploy acontece (automático a partir de qual ramo, ou manual).</li>
<li>Plano (gratuito ou pago) e um limite que você conheça.</li>
</ol>
<p><b>Critérios de correção</b>:</p>
<ul>
<li>Todos os projetos que você lembra aparecem, mesmo com "não sei" em alguma coluna.</li>
<li>O tipo de cada um é coerente com o que ele faz (guarda dados? fica escutando?).</li>
<li>Pelo menos um projeto tem a coluna de deploy preenchida com o ramo correto.</li>
<li>Os "não sei" viram perguntas anotadas no caderno de dúvidas. Esta tabela é o rascunho do trabalho do módulo.</li>
</ul>` },

  { n: 10, titulo: "Termos novos no glossário", termos: ["Hospedagem", "Deploy", "Ambiente (local, teste, produção)", "Log", "Build", "Rollback", "Nuvem (cloud)", "Data center"] }
 ],
 resumo: [
  "Hospedagem é alugar computadores ligados e conectados para o código rodar; deploy é levar a versão nova até lá e colocá-la para rodar.",
  "Etapas do deploy: construir (baixar dependências), lançar (juntar com a configuração) e executar (iniciar o programa).",
  "Quando falha, leia o log: a primeira linha de erro e as anteriores, sabendo em que etapa ela apareceu.",
  "Ambientes: local, teste e produção. Quanto mais parecidos, menos 'funciona na minha máquina'.",
  "Estático para o que roda no navegador; sob demanda para tarefas curtas de servidor; sempre ligado para o que precisa ficar ativo.",
  "Planos gratuitos têm limites (na Render, o serviço web gratuito dorme após 15 minutos sem pedidos).",
  "Rollback volta à versão anterior que funcionava enquanto se investiga."
 ],
 referencias: [
  { autor: "GitHub Docs", titulo: "O que é o GitHub Pages?", ano: "página viva", tipo: "documentação", idioma: "português", link: "https://docs.github.com/pt/pages/getting-started-with-github-pages/what-is-github-pages", ler: "Sobre o GitHub Pages e Tipos de GitHub Pages sites.", verificado: "2026-10-31" },
  { autor: "Render", titulo: "Your First Render Deploy", ano: "página viva", tipo: "documentação", idioma: "inglês", link: "https://render.com/docs/your-first-deploy", ler: "Seções Deploy your code e Monitor your deploy, e o aviso sobre serviços gratuitos que dormem.", verificado: "2026-10-31" },
  { autor: "Adam Wiggins", titulo: "The Twelve-Factor App, fator V: Construa, lance, execute", ano: "página atualizada em 2017", tipo: "guia de boas práticas", idioma: "português", link: "https://12factor.net/pt_br/build-release-run", ler: "A página inteira.", verificado: "2026-10-31" },
  { autor: "Adam Wiggins", titulo: "The Twelve-Factor App, fator X: Paridade entre desenvolvimento e produção", ano: "página atualizada em 2017", tipo: "guia de boas práticas", idioma: "português", link: "https://12factor.net/pt_br/dev-prod-parity", ler: "A página inteira; pule a tabela se ficar técnica demais.", verificado: "2026-10-31" }
 ],
 aprofundar: [
  { titulo: "Functions (Cloudflare Pages)", autor: "Cloudflare Docs", duracao: "leitura de 5 minutos", idioma: "inglês", porque: "Mostra como o zava-tours roda código no servidor sem manter um servidor ligado.", link: "https://developers.cloudflare.com/pages/functions/" }
 ],
 tarefa: {
  obj: [
   { id: "m00-a07-o1", q: "O que você aluga quando contrata uma hospedagem?", o: ["O código-fonte de outra empresa", "Computadores ligados e conectados, com um endereço, para o seu código rodar", "Um domínio, obrigatoriamente", "Uma licença do Git"], a: 1, e: "Hospedagem é capacidade de computadores mantidos por outra empresa: processamento, memória, armazenamento e tráfego.", obj: 0 },
   { id: "m00-a07-o2", q: "Um deploy falhou com um erro ao rodar npm install. Em que etapa foi?", o: ["Executar", "Lançar", "Construir (build)", "Rollback"], a: 2, e: "Baixar as dependências faz parte da construção. Se a dependência falha, o deploy para antes de executar.", obj: 1 },
   { id: "m00-a07-o3", q: "O que é o ambiente de produção?", o: ["O ambiente de verdade, que as pessoas usam, com dados reais", "O computador de quem programa", "Uma cópia com dados de mentira", "O repositório no GitHub"], a: 0, e: "Produção é o sistema no ar, valendo.", obj: 2 },
   { id: "m00-a07-o4", q: "O sistema funciona no seu computador e falha na hospedagem. Qual é uma causa comum?", o: ["O navegador está em modo escuro.", "O repositório é público.", "O GitHub está fora do ar.", "Uma variável de ambiente configurada no seu computador não foi configurada na hospedagem."], a: 3, e: "Diferenças de configuração entre ambientes são a causa clássica do 'funciona na minha máquina'.", obj: 2 },
   { id: "m00-a07-o5", q: "Para um robô que precisa escutar mensagens o tempo todo, qual hospedagem é a adequada?", o: ["Hospedagem estática", "Servidor sempre ligado, num plano que não durma quando ocioso", "Funções sob demanda", "Nenhuma: deixar rodando no notebook"], a: 1, e: "Ele precisa ficar ativo continuamente. Estático não roda código e sob demanda só roda quando chega um pedido.", obj: 3 },
   { id: "m00-a07-o6", q: "Qual a primeira coisa a olhar quando um deploy falha?", o: ["O log do deploy, procurando a primeira linha de erro", "O código inteiro, do início", "O preço do plano", "A configuração do DNS"], a: 0, e: "O log diz em que etapa e com que mensagem falhou. É a pista mais direta.", obj: 4 },
   { id: "m00-a07-o7", q: "Depois de um deploy, o site quebrou. Qual ação devolve rapidamente a versão anterior enquanto você investiga?", o: ["Apagar o repositório", "Trocar de hospedagem", "Fazer rollback para o deploy anterior", "Mudar o domínio"], a: 2, e: "Cada lançamento tem identificação própria; dá para voltar ao anterior que funcionava.", obj: 1 },
   { id: "m00-a07-o8", q: "Segundo a documentação da Render, o que acontece com um serviço web gratuito após 15 minutos sem pedidos?", o: ["Ele é apagado.", "Ele passa a cobrar.", "Ele dorme, e o pedido seguinte demora enquanto ele acorda.", "Nada muda."], a: 2, e: "É o 'spin down' dos serviços gratuitos. Enquanto dorme, o programa não faz nada.", obj: 3 }
  ],
  dis: [
   { id: "m00-a07-d1", q: "Explique as etapas construir, lançar e executar de um deploy usando uma analogia sua, e diga em qual delas entram as configurações secretas.", min: 220, modelo: "Analogia de um food truck. Construir é preparar os ingredientes e montar a cozinha a partir da lista de compras (baixar o código e as dependências). Lançar é juntar a cozinha montada com o alvará e as chaves do caminhão, que mudam de cidade para cidade (as configurações e segredos, como variáveis de ambiente). Executar é abrir o balcão e começar a atender (iniciar o programa). As configurações secretas entram no lançamento, e não ficam na cozinha montada, para que a mesma construção possa ser usada em lugares diferentes.", criterios: ["Analogia própria e coerente", "Construir como preparar código e dependências", "Lançar como juntar com a configuração", "Executar como iniciar o programa", "Diz que os segredos entram no lançamento"], aula: "m00-a07" },
   { id: "m00-a07-d2", q: "Um amigo quer publicar três coisas: um portfólio de fotos, um formulário de contato que envia os dados para uma planilha, e um robô do Telegram que responde mensagens o dia todo. Recomende o tipo de hospedagem para cada um e justifique.", min: 220, modelo: "Portfólio: hospedagem estática, porque só mostra arquivos prontos; é grátis e estável. Formulário: funções sob demanda, porque só precisa rodar código quando alguém envia, e a chave da planilha fica no servidor, fora do navegador. Robô: servidor sempre ligado, porque precisa ficar ativo escutando mensagens, num plano que não durma quando ocioso.", criterios: ["Estático para o portfólio, com justificativa", "Sob demanda (ou servidor) para o formulário, mencionando a chave fora do navegador", "Sempre ligado para o robô, mencionando a atividade contínua", "Considera custo ou limites de plano gratuito"], aula: "m00-a07" }
  ],
  pratica: { instrucao: "No GitHub, abra o repositório escola-dev. Na coluna da direita, procure a seção Deployments (implantações) e clique em github-pages.", perguntas: [
   { id: "m00-a07-p1", q: "Quando foi o último deploy? Quantos deploys aparecem na lista, aproximadamente? Isso confirma que cada mudança na main gerou uma publicação?", min: 100 }
  ] }
 }
});

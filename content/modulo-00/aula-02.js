/* Módulo 0.0, aula 2. Esquema em docs/ESQUEMA-CONTEUDO.md. */
Escola.aula({
 id: "m00-a02", modulo: "m00", min: 50,
 titulo: "Código e linguagens: como uma ideia vira programa",
 objetivos: [
  "Explicar o que é código-fonte e por que ele precisa seguir uma sintaxe exata.",
  "Ler um trecho curto de JavaScript e dizer, linha a linha, o que ele faz.",
  "Diferenciar linguagem, biblioteca e framework, com exemplos dos seus projetos.",
  "Explicar a diferença entre código interpretado e compilado, e onde o JavaScript roda (navegador e Node.js)."
 ],
 partes: [
  { n: 1, titulo: "O problema que isto resolve", html: `
<p>O computador é muito rápido e muito obediente, mas não entende nada. Ele não sabe o que é "imóvel", "cliente" ou "mande uma mensagem simpática". Lá no fundo, o processador só sabe fazer operações minúsculas com números: somar, comparar, copiar um valor de um lugar para outro. Bilhões delas por segundo.</p>
<p>As pessoas, por outro lado, pensam em ideias: "quando chegar uma mensagem pedindo apartamento de 3 quartos, procure na planilha e responda com os três mais baratos". Entre a ideia humana e as operações minúsculas da máquina existe um abismo.</p>
<p>O <b>código</b> é a ponte. É um texto escrito numa linguagem que as pessoas conseguem ler e que uma ferramenta consegue traduzir, sem ambiguidade nenhuma, para as operações da máquina.</p>
<p>Para você, isso importa por um motivo concreto: a IA escreve código para os seus projetos. Se você não sabe o que é código, nem como ele é lido, só consegue julgar o resultado pelo que aparece na tela. É como aprovar um contrato sem ler, só porque a capa ficou bonita. Esta aula é o primeiro passo para ler o contrato.</p>` },

  { n: 2, titulo: "Definição, siglas e analogia", html: `
<h3>Código e código-fonte</h3>
<p><b>Código</b> é o texto com as instruções de um programa. Quando se quer deixar claro que é o texto original, escrito por pessoas (ou por uma IA), diz-se <b>código-fonte</b>. Ele fica guardado em arquivos comuns, como um documento de texto, só que com extensões como <code>.js</code>, <code>.html</code> ou <code>.css</code>. A <b>extensão</b> é o final do nome do arquivo, depois do ponto, e indica o tipo de conteúdo.</p>
<h3>Linguagem de programação</h3>
<p>Uma <b>linguagem de programação</b> é um idioma artificial com vocabulário pequeno e regras rígidas. Exemplos: JavaScript, Python, Swift. As regras de escrita de uma linguagem se chamam <b>sintaxe</b>. No português, se você esquecer uma vírgula, o leitor entende do mesmo jeito. Na programação, uma vírgula ou um parêntese fora do lugar faz o programa inteiro parar com um erro. A máquina não "adivinha" o que você quis dizer.</p>
<h3>Analogia: a receita</h3>
<p>Código é uma receita escrita para um cozinheiro que segue tudo ao pé da letra e nunca improvisa. Se a receita diz "bata 3 ovos" e você só tem 2, ele para. Se diz "asse até ficar bom", ele não sabe o que é "bom". Por isso receitas para computador precisam ser exatas: quantidades, ordem e o que fazer em cada situação, inclusive nas situações ruins ("se não houver ovos, avise").</p>
<h3>Três peças que aparecem em quase todo código</h3>
<ul>
<li><b>Variável</b>: um nome que guarda um valor, como uma etiqueta numa caixa. <code>preco = 350000</code> guarda o número 350000 na caixa chamada <code>preco</code>.</li>
<li><b>Função</b>: um bloco de instruções com nome, que pode ser usado várias vezes. É como uma sub-receita ("massa básica") que você chama sempre que precisa, em vez de reescrever.</li>
<li><b>Comentário</b>: um texto dentro do código que a máquina ignora e que serve só para pessoas. Em JavaScript, tudo depois de <code>//</code> numa linha é comentário.</li>
</ul>
<h3>Bug</h3>
<p><b>Bug</b> (inseto, em inglês) é um defeito no código: o programa faz algo diferente do que deveria. O nome ficou famoso por uma história de 1947, quando técnicos acharam uma mariposa presa num computador e colaram o inseto no relatório. A palavra já era usada antes para defeitos em máquinas, mas a história pegou.</p>` },

  { n: 3, titulo: "De onde vem e quem cria", html: `
<p>Os primeiros computadores eram programados com números diretamente, em <b>linguagem de máquina</b>: sequências de zeros e uns que o processador executa. Era lento e fácil de errar. Nos anos 1950 surgiram linguagens com palavras e símbolos mais próximos dos humanos, e programas que traduzem esse texto para a linguagem da máquina. Desde então foram criadas centenas de linguagens, cada uma pensada para um tipo de problema.</p>
<h3>JavaScript, a linguagem dos seus projetos</h3>
<p>O <b>JavaScript</b> foi criado em 1995 por Brendan Eich, na empresa Netscape, que fazia o navegador mais usado da época. O objetivo era deixar as páginas da web interativas: reagir a cliques, validar formulários, mudar o conteúdo sem recarregar. Apesar do nome, ele não tem relação com a linguagem Java; o nome foi uma escolha de marketing.</p>
<p>Hoje as regras do JavaScript são definidas por um padrão chamado <b>ECMAScript</b>, mantido por um comitê da organização Ecma International, formado por representantes de empresas como Google, Apple, Mozilla e Microsoft. Por isso o mesmo código funciona no Safari, no Chrome e no Firefox: todos seguem o mesmo padrão.</p>
<h3>Do navegador para o servidor: Node.js</h3>
<p>Por muitos anos o JavaScript só rodava dentro do navegador. Em 2009, Ryan Dahl criou o <b>Node.js</b>, um programa que roda JavaScript fora do navegador, direto no computador. Ele usa o V8, o mesmo motor de JavaScript do Chrome. Foi isso que permitiu escrever servidores em JavaScript, como o programa da sua secretaria.</p>
<h3>Quem cria o código</h3>
<p>Programadores, e cada vez mais IAs guiadas por pessoas. Em projetos grandes, milhares de pessoas escrevem código em conjunto, e boa parte dele é aproveitada de outros projetos, como você verá na parte 6.</p>` },

  { n: 4, titulo: "Como se usa: um exemplo comentado linha a linha", html: `
<p>Veja um código curto em JavaScript. Ele calcula a comissão de um corretor sobre a venda de um imóvel. Leia primeiro só os comentários (depois de <code>//</code>), depois o código.</p>
<pre><code>// Calcula a comissão de uma venda de imóvel.
function calcularComissao(valorVenda, percentual) {   // 1
  const comissao = valorVenda * percentual / 100;     // 2
  return comissao;                                    // 3
}                                                     // 4

const venda = 350000;                                 // 5
const resultado = calcularComissao(venda, 6);         // 6
console.log("Comissão: R$ " + resultado);             // 7</code></pre>
<p>Agora, linha por linha:</p>
<ol>
<li><code>function calcularComissao(valorVenda, percentual) {</code> cria uma <b>função</b> chamada <code>calcularComissao</code>. Entre parênteses ficam os <b>parâmetros</b>: os valores que a função recebe de quem a chamar. A chave <code>{</code> abre o corpo da função.</li>
<li><code>const comissao = valorVenda * percentual / 100;</code> cria uma variável <code>comissao</code> e guarda nela o resultado da conta. <code>const</code> quer dizer "constante": o valor não vai mudar depois. <code>*</code> é multiplicação e <code>/</code> é divisão. O ponto e vírgula encerra a instrução, como o ponto final de uma frase.</li>
<li><code>return comissao;</code> devolve o valor para quem chamou a função. É a "resposta" da função.</li>
<li><code>}</code> fecha o corpo da função. Até aqui nada foi calculado: a função só foi <i>definida</i>, como uma receita escrita e guardada na gaveta.</li>
<li><code>const venda = 350000;</code> guarda o valor da venda numa variável. Números se escrevem sem ponto de milhar.</li>
<li><code>calcularComissao(venda, 6)</code> <i>chama</i> a função: tira a receita da gaveta e a executa com 350000 e 6. O valor devolvido (21000) fica guardado em <code>resultado</code>.</li>
<li><code>console.log(...)</code> mostra um texto na tela de mensagens (o "console"). O <code>+</code> aqui junta textos: o resultado é <code>Comissão: R$ 21000</code>.</li>
</ol>
<p>Repare na ordem: o computador lê de cima para baixo, mas a função só roda quando é chamada (linha 6). Esse é um dos pontos que mais confundem quem começa: <b>definir</b> uma função é diferente de <b>executar</b> a função.</p>
<h3>Como esse texto vira ação</h3>
<p>O processador não entende JavaScript. Quem entende é um <b>interpretador</b>: um programa que lê o código e executa as instruções correspondentes. O navegador tem um interpretador de JavaScript dentro dele, e o Node.js é um interpretador que roda no computador. Se você salvar o código acima num arquivo <code>comissao.js</code> e tiver o Node.js instalado, o comando <code>node comissao.js</code> no Terminal mostra a comissão. Você vai fazer isso no módulo de terminal.</p>` },

  { n: 5, titulo: "Quando usar e quando não usar", html: `
<h3>Quando escrever código vale a pena</h3>
<ul>
<li>Quando uma tarefa se repete muito e segue regras claras: responder pedidos, calcular valores, organizar dados.</li>
<li>Quando você precisa de algo sob medida, que nenhum produto pronto faz do jeito que você quer.</li>
<li>Quando várias peças precisam conversar sozinhas, sem uma pessoa no meio (WhatsApp, planilha e IA, por exemplo).</li>
</ul>
<h3>Quando não vale</h3>
<ul>
<li>Quando já existe uma ferramenta pronta que resolve bem. Uma planilha com fórmulas muitas vezes basta; código é mais coisa para manter.</li>
<li>Quando a regra ainda não está clara na sua cabeça. Código só automatiza o que já se sabe fazer. Se você não sabe descrever a regra em português, a IA vai inventar uma.</li>
<li>Quando o custo de manter é maior que o ganho. Todo código precisa de cuidado: atualizações, correções, segurança.</li>
</ul>
<h3>Qual linguagem escolher</h3>
<p>Para web, JavaScript é praticamente obrigatório no navegador, e com o Node.js também serve no servidor. Por isso ele é a linguagem central deste curso. Outras linguagens brilham em outros lugares: Python em análise de dados e IA, Swift em apps nativos para iPhone, SQL para consultar bancos de dados. Aprender bem uma linguagem torna muito mais fácil aprender a segunda, porque as ideias (variável, função, condição, repetição) são as mesmas.</p>` },

  { n: 6, titulo: "Diferenças entre as variações", html: `
<h3>Interpretado ou compilado</h3>
<ul>
<li><b>Interpretado</b>: um programa (o interpretador) lê o código e executa na hora. JavaScript e Python funcionam assim. Vantagem: você muda e roda de novo imediatamente.</li>
<li><b>Compilado</b>: antes de rodar, um programa chamado <b>compilador</b> traduz o código inteiro para linguagem de máquina e gera um arquivo executável. Swift e C funcionam assim. Vantagem: costuma rodar mais rápido e acusa certos erros antes de executar.</li>
</ul>
<p>Na prática, a fronteira é misturada: os interpretadores modernos de JavaScript também compilam partes do código por dentro, para ganhar velocidade. Para você, basta saber que com JavaScript você escreve, salva e roda, sem uma etapa de compilação separada.</p>
<h3>Linguagem, biblioteca e framework</h3>
<ul>
<li><b>Linguagem</b>: o idioma (JavaScript).</li>
<li><b>Biblioteca</b>: um pacote de código pronto, escrito por outras pessoas, que você chama quando precisa. Analogia: uma caixa de ferramentas. Você decide quando usar o martelo. O <b>Three.js</b>, usado no zava-visit para desenhar em 3D, é uma biblioteca.</li>
<li><b>Framework</b> (estrutura, armação): um esqueleto pronto que define como o seu programa se organiza, e chama o seu código nos momentos certos. Analogia: a planta de uma casa que já vem com as paredes mestras; você decide os acabamentos. O <b>Express</b>, usado na secretaria para receber pedidos pela internet, costuma ser chamado de framework.</li>
</ul>
<p>A diferença prática: <i>você chama a biblioteca; o framework chama você</i>.</p>
<h3>Dependências</h3>
<p>Quando um projeto usa bibliotecas e frameworks de outras pessoas, eles se chamam <b>dependências</b>: o seu código depende deles para funcionar. Em projetos Node.js, a lista de dependências fica num arquivo chamado <code>package.json</code>, e elas são baixadas por uma ferramenta chamada <b>npm</b> (<i>Node Package Manager</i>, gerenciador de pacotes do Node). Um projeto pequeno pode ter dezenas de dependências, e cada uma pode ter as suas próprias.</p>
<h3>Front-end e back-end</h3>
<p>O código que roda no navegador do usuário (o que ele vê e toca) é o <b>front-end</b>, a "frente". O código que roda no servidor, longe do usuário, é o <b>back-end</b>, os "bastidores". Os dois podem ser escritos em JavaScript. Você vai aprofundar isso na aula 3.</p>` },

  { n: 7, titulo: "Exemplo real: os seus projetos", html: `
<h3>zava-visit: linguagens da web e uma biblioteca</h3>
<p>O zava-visit usa as três linguagens da web, cada uma com um papel:</p>
<ul>
<li><b>HTML</b> (<i>HyperText Markup Language</i>, linguagem de marcação de hipertexto): a estrutura da página, o que é título, botão, área do 3D. Ela marca o conteúdo, mas não faz contas nem toma decisões.</li>
<li><b>CSS</b> (<i>Cascading Style Sheets</i>, folhas de estilo em cascata): a aparência, como cores, tamanhos e posição.</li>
<li><b>JavaScript</b>: o comportamento, como girar a câmera ao arrastar o dedo e mostrar as informações de um lote ao tocar nele.</li>
</ul>
<p>O desenho em 3D não foi escrito do zero: vem da biblioteca <b>Three.js</b>. O seu código chama o Three.js ("crie uma cena", "coloque este modelo", "desenhe"), e ele faz o trabalho pesado.</p>
<h3>secretaria: JavaScript fora do navegador</h3>
<p>O coração da secretaria é um arquivo <code>index.js</code>, rodado pelo <b>Node.js</b> num computador da Render. Ele usa o framework <b>Express</b> para receber pedidos e várias outras dependências: uma para conectar ao WhatsApp, outra para falar com o Gemini, outra para ler a planilha. Se você abrir o <code>package.json</code> desse projeto no GitHub, vai ver a lista dessas dependências. Cada nome ali é código de outra pessoa que roda dentro do seu sistema; é por isso que, no módulo de segurança, você vai aprender a avaliá-las.</p>` },

  { n: 8, titulo: "Como pesquisar mais", html: `
<ul>
<li><b>MDN Web Docs</b>: referência oficial de fato para JavaScript, HTML e CSS, com muitas páginas em português. Busque "MDN" mais o termo, por exemplo "MDN função JavaScript".</li>
<li><b>javascript.info</b>: tutorial moderno e muito bem organizado, em inglês, escrito por Ilya Kantor e colaboradores.</li>
<li><b>Eloquent JavaScript</b>: livro gratuito de Marijn Haverbeke, em inglês, 4ª edição (2024). A introdução explica o que é programar de um jeito acessível.</li>
<li><b>Documentação de cada biblioteca</b>: o Three.js, o Express e o Node.js têm sites oficiais. Quando a IA usar uma função de uma biblioteca, procure o nome dela na documentação para confirmar que existe e faz o que a IA disse.</li>
</ul>
<p><b>Como perguntar à IA sobre um código:</b> cole o trecho e peça "explique linha a linha, para quem nunca programou, e diga o que acontece se o valor X estiver vazio". Pedir o caso ruim ("e se...") é o que revela se o código foi pensado direito.</p>` },

  { n: 9, titulo: "Exercício com critérios de correção", html: `
<p>Leia o código abaixo, sem rodar, e escreva no caderno desta aula o que cada linha faz e o que aparece na tela.</p>
<pre><code>function precoPorMetro(preco, area) {
  return preco / area;
}
const apto = precoPorMetro(480000, 80);
const casa = precoPorMetro(720000, 160);
console.log("Apartamento: " + apto);
console.log("Casa: " + casa);</code></pre>
<p><b>Critérios de correção</b>:</p>
<ul>
<li>Identificou que a função foi definida nas linhas 1 a 3 e só executada nas linhas 4 e 5.</li>
<li>Explicou o que são <code>preco</code> e <code>area</code> (parâmetros) e o que <code>return</code> faz.</li>
<li>Calculou os resultados: 6000 para o apartamento e 4500 para a casa.</li>
<li>Escreveu as duas linhas exatas que aparecem na tela.</li>
<li>Bônus: disse o que aconteceria se a área fosse 0 (a divisão por zero dá <code>Infinity</code>, "infinito", em JavaScript; ou seja, o programa não para, mas mostra um valor sem sentido).</li>
</ul>` },

  { n: 10, titulo: "Termos novos no glossário", termos: ["Código", "Código-fonte", "Linguagem de programação", "Sintaxe", "Variável", "Função", "Comentário (no código)", "Bug", "JavaScript", "Interpretador e compilador", "Node.js", "Biblioteca", "Framework", "Dependência", "npm", "HTML", "CSS", "Front-end", "Back-end"] }
 ],
 resumo: [
  "Código-fonte é o texto com as instruções de um programa, guardado em arquivos (.js, .html, .css).",
  "Cada linguagem tem uma sintaxe exata: um sinal fora do lugar faz o programa parar.",
  "Variável guarda um valor com um nome; função é um bloco de instruções com nome; comentário é texto só para pessoas.",
  "Definir uma função é diferente de executá-la: ela só roda quando é chamada.",
  "JavaScript é interpretado: o navegador ou o Node.js leem o código e executam na hora.",
  "Você chama a biblioteca (Three.js); o framework chama você (Express). Ambos são dependências.",
  "HTML dá a estrutura, CSS a aparência e JavaScript o comportamento."
 ],
 referencias: [
  { autor: "MDN Web Docs (Mozilla)", titulo: "O que é JavaScript?", ano: "página viva", tipo: "documentação", idioma: "português", link: "https://developer.mozilla.org/pt-BR/docs/Learn_web_development/Core/Scripting/What_is_JavaScript", ler: "As seções Definição de alto nível e O que JavaScript está fazendo na sua página web? (incluindo interpretado x compilado e lado cliente x lado servidor).", verificado: "2026-10-31" },
  { autor: "Marijn Haverbeke", titulo: "Eloquent JavaScript, 4ª edição", ano: "2024", tipo: "livro (gratuito online)", idioma: "inglês", link: "https://eloquentjavascript.net/00_intro.html", ler: "Capítulo Introduction, seções On programming e Why language matters.", verificado: "2026-10-31" },
  { autor: "Ilya Kantor e colaboradores (javascript.info)", titulo: "An Introduction to JavaScript", ano: "página viva", tipo: "tutorial", idioma: "inglês", link: "https://javascript.info/intro", ler: "As seções What is JavaScript? e What makes JavaScript unique?", verificado: "2026-10-31" }
 ],
 tarefa: {
  obj: [
   { id: "m00-a02-o1", q: "Por que um parêntese fora do lugar pode fazer um programa inteiro parar?", o: ["Porque o computador fica sem memória.", "Porque a linguagem tem sintaxe rígida e o interpretador não adivinha a intenção.", "Porque o navegador bloqueia códigos com erros de português.", "Porque parênteses só podem ser usados em funções."], a: 1, e: "Linguagens de programação exigem sintaxe exata. Diferente de um leitor humano, o interpretador não corrige nem deduz o que você quis dizer.", obj: 0 },
   { id: "m00-a02-o2", q: "No código da aula, em que momento a função calcularComissao é executada?", o: ["Na linha em que a palavra function aparece.", "Quando o arquivo é salvo.", "Na linha em que ela é chamada: calcularComissao(venda, 6).", "Ela nunca é executada."], a: 2, e: "Definir a função apenas a guarda. Ela só roda quando é chamada pelo nome, com os valores entre parênteses.", obj: 1 },
   { id: "m00-a02-o3", q: "O que a palavra return faz dentro de uma função?", o: ["Devolve um valor para quem chamou a função.", "Volta para o início do arquivo.", "Apaga a variável.", "Mostra o valor na tela."], a: 0, e: "return entrega o resultado da função. Quem mostra na tela é o console.log.", obj: 1 },
   { id: "m00-a02-o4", q: "O Three.js é chamado pelo seu código sempre que você precisa desenhar em 3D. Ele é melhor classificado como:", o: ["sistema operacional", "linguagem de programação", "framework", "biblioteca"], a: 3, e: "Você chama a biblioteca quando precisa. No framework é o contrário: ele organiza o programa e chama o seu código.", obj: 2 },
   { id: "m00-a02-o5", q: "O que o Node.js permite fazer?", o: ["Desenhar páginas mais bonitas.", "Rodar JavaScript fora do navegador, por exemplo num servidor.", "Transformar JavaScript em Swift.", "Guardar planilhas na nuvem."], a: 1, e: "Node.js é um programa que interpreta JavaScript fora do navegador, usando o motor V8 do Chrome.", obj: 3 },
   { id: "m00-a02-o6", q: "Num projeto Node.js, onde fica a lista das dependências?", o: ["No arquivo package.json", "No arquivo index.html", "Dentro do navegador", "No sistema operacional"], a: 0, e: "O package.json lista as dependências, e o npm as baixa.", obj: 2 },
   { id: "m00-a02-o7", q: "Qual é a principal diferença entre código interpretado e compilado?", o: ["Interpretado é sempre mais rápido.", "Compilado só funciona no navegador.", "No compilado, um compilador traduz tudo antes de rodar; no interpretado, o código é lido e executado na hora.", "Não há diferença; são nomes para a mesma coisa."], a: 2, e: "O compilador gera um executável antes; o interpretador executa enquanto lê. JavaScript é, na prática, interpretado.", obj: 3 },
   { id: "m00-a02-o8", q: "Na linha console.log(\"Casa: \" + 4500), o que aparece na tela?", o: ["4504", "Casa: 4500", "\"Casa: \" + 4500", "Um erro, porque não se soma texto com número"], a: 1, e: "Com um texto, o + junta (concatena) em vez de somar. O resultado é o texto Casa: 4500.", obj: 1 }
  ],
  dis: [
   { id: "m00-a02-d1", q: "Explique para um amigo que nunca programou o que é uma função, usando uma analogia sua, e por que definir uma função é diferente de executá-la.", min: 200, modelo: "Função é um conjunto de instruções com um nome, que pode ser usado várias vezes. É como uma receita de molho guardada no caderno: escrever a receita não faz o molho; o molho só existe quando alguém pega o caderno e segue a receita com os ingredientes do dia. No código, a definição (function) guarda a receita, e a chamada (o nome com os valores entre parênteses) é que executa, devolvendo o resultado com return.", criterios: ["Define função como bloco de instruções com nome, reutilizável", "Traz uma analogia própria e coerente", "Explica que a definição só guarda e a chamada executa", "Menciona os valores recebidos (parâmetros) ou o resultado devolvido (return)"], aula: "m00-a02" },
   { id: "m00-a02-d2", q: "Qual a diferença entre biblioteca e framework? Dê um exemplo de cada tirado dos seus projetos e explique por que ambos são chamados de dependências.", min: 180, modelo: "Biblioteca é código pronto que eu chamo quando preciso, como o Three.js no zava-visit para desenhar em 3D. Framework é um esqueleto que organiza o programa e chama o meu código nos momentos certos, como o Express na secretaria, que recebe os pedidos e chama a parte que eu escrevi para cada rota. Os dois são dependências porque meu projeto depende de código feito por outras pessoas para funcionar; eles ficam listados no package.json.", criterios: ["Explica que o programador chama a biblioteca", "Explica que o framework organiza e chama o código do programador", "Dá exemplos corretos dos projetos (Three.js e Express ou equivalentes)", "Explica o conceito de dependência"], aula: "m00-a02" }
  ],
  pratica: { instrucao: "Abra no navegador o repositório de um projeto seu em Node.js no GitHub (por exemplo, secretaria-imoveis-whatsapp) e clique no arquivo package.json. Procure a parte chamada dependencies.", perguntas: [
   { id: "m00-a02-p1", q: "Quantas dependências aparecem? Copie três nomes. Para um deles, procure na internet o que ele faz e escreva em uma frase.", min: 120 }
  ] }
 }
});

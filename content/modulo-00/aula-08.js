/* Módulo 0.0, aula 8. Esquema em docs/ESQUEMA-CONTEUDO.md. Descrições genéricas: o repositório é público (ESPECIFICACAO.md, seção 8). */
Escola.aula({
 id: "m00-a08", modulo: "m00", min: 50,
 titulo: "Segredos: senhas, chaves, .env e variáveis de ambiente",
 objetivos: [
  "Explicar o que é um segredo num sistema e por que ele nunca vai para o código nem para o navegador.",
  "Explicar o que são variáveis de ambiente e o arquivo .env, e como um programa lê uma variável.",
  "Diferenciar autenticação de autorização, e chave de API de senha de usuário.",
  "Descrever o que fazer quando um segredo vaza: trocar, revogar, conferir o uso e corrigir a causa.",
  "Localizar onde ficam os segredos de um projeto seu na hospedagem, sem copiá-los para lugar nenhum."
 ],
 partes: [
  { n: 1, titulo: "O problema que isto resolve", html: `
<p>Um sistema precisa provar quem ele é para outros sistemas. O programa da secretaria precisa provar ao Google que tem direito de usar o Gemini, e o Google cobra pelo uso. A prova é uma <b>chave</b>: uma sequência longa de letras e números. Quem tem a chave, para o Google, <i>é</i> você.</p>
<p>Agora junte isso ao que você aprendeu nas aulas anteriores:</p>
<ul>
<li>Tudo que vai para o navegador pode ser lido por qualquer pessoa (aula 3).</li>
<li>Um repositório público mostra o código e todo o histórico a qualquer pessoa, e o histórico nunca esquece (aula 6).</li>
<li>Robôs vasculham repositórios públicos o tempo todo procurando chaves esquecidas.</li>
</ul>
<p>Uma chave escrita direto no código vai parar no GitHub, no histórico e, às vezes, no navegador de cada visitante. Em pouco tempo, alguém pode usá-la para gastar a sua cota, gerar uma conta alta no seu nome ou acessar os seus dados. O problema desta aula é: <b>como o programa usa um segredo sem que o segredo apareça no código?</b></p>` },

  { n: 2, titulo: "Definição, siglas e analogia", html: `
<h3>Segredo</h3>
<p>Em sistemas, <b>segredo</b> (ou credencial) é qualquer informação que dá acesso a algo e que, se vazar, permite que outra pessoa se passe por você. Exemplos: senhas, chaves de API, tokens, endereços de webhook que aceitam escrita, chaves de criptografia.</p>
<h3>Chave de API e senha</h3>
<p>Uma <b>senha</b> é escolhida por uma pessoa para entrar numa conta. Uma <b>chave de API</b> é gerada por um serviço para que um <i>programa</i> se identifique. A chave costuma ser longa e aleatória, e pode ser trocada a qualquer momento sem mudar a sua senha da conta.</p>
<h3>Autenticação e autorização</h3>
<ul>
<li><b>Autenticação</b>: provar <i>quem</i> você é. A recepção do prédio confere o seu documento.</li>
<li><b>Autorização</b>: decidir <i>o que</i> você pode fazer. O crachá abre o 3º andar, mas não o 10º.</li>
</ul>
<p>Uma rota de API pode autenticar (saber quem pede) e ainda assim precisar autorizar (aquela pessoa pode apagar imóveis?).</p>
<h3>Variável de ambiente</h3>
<p>Uma <b>variável de ambiente</b> é um par nome e valor que o sistema operacional (ou a hospedagem) entrega ao programa no momento em que ele começa a rodar, de fora do código. O código diz apenas "use o valor da variável chamada <code>GEMINI_API_KEY</code>"; o valor em si fica guardado no ambiente.</p>
<p><b>Analogia</b>: o cofre do hotel. O manual do quarto (o código) diz "seus documentos estão no cofre". O manual pode ser público e ficar na mesa; o segredo (a combinação) fica com a recepção (a hospedagem) e só é entregue a quem está hospedado (o programa rodando).</p>
<h3>O arquivo .env</h3>
<p>No seu computador, para não ter de configurar variáveis à mão toda vez, é comum guardá-las num arquivo chamado <code>.env</code> (de <i>environment</i>, ambiente), uma linha por variável: <code>GEMINI_API_KEY=...</code>. Um programa lê esse arquivo ao iniciar. O <code>.env</code> é <b>só para o seu computador</b>: ele entra no <code>.gitignore</code> e nunca vai para o repositório. Na hospedagem, as mesmas variáveis são cadastradas no painel dela.</p>` },

  { n: 3, titulo: "De onde vem e quem cria", html: `
<p>Variáveis de ambiente existem desde os primeiros sistemas Unix, nos anos 1970, como um jeito de passar configurações a um programa sem mudá-lo. A ideia de usá-las para separar configuração de código foi popularizada pelo <b>Twelve-Factor App</b>, no fator III, "Configurações": tudo que muda entre um ambiente e outro (endereços, credenciais) fica fora do código, em variáveis de ambiente.</p>
<p>O arquivo <code>.env</code> é uma convenção, não um padrão oficial. Ele se popularizou com bibliotecas que leem esse arquivo e transformam cada linha em variável de ambiente; nas versões recentes do Node.js, há também uma opção própria para isso.</p>
<p><b>Quem cria os segredos</b> é o serviço que os exige: o Google gera a chave do Gemini no Google AI Studio; o GitHub gera tokens; você cria as suas senhas. <b>Quem guarda</b> é você: no gerenciador de senhas (como o app Senhas do iPhone e do Mac), no painel da hospedagem e, para testes locais, no <code>.env</code> fora do Git.</p>
<p>As próprias empresas recomendam isso. A documentação do Gemini, por exemplo, diz para nunca colocar chaves em sistemas de controle de versão como o Git e para não escrever chaves direto em apps web ou de celular; as chamadas devem passar por um servidor seu.</p>` },

  { n: 4, titulo: "Como se usa: do .env ao programa, linha a linha", html: `
<h3>O arquivo .env (só no seu computador)</h3>
<pre><code># Configurações locais. Este arquivo está no .gitignore.
GEMINI_API_KEY=cole-aqui-a-sua-chave     # o valor real nunca aparece em aula
PORT=3000                                # em que porta rodar localmente</code></pre>
<ul>
<li>Linhas que começam com <code>#</code> são comentários.</li>
<li>Cada linha é <code>NOME=valor</code>, sem espaços em volta do igual. Por convenção, nomes em maiúsculas.</li>
</ul>
<h3>O .gitignore (vai para o repositório)</h3>
<pre><code>node_modules/
.env</code></pre>
<p>Duas linhas: "ignore a pasta de dependências" e "ignore o .env". Assim, mesmo que você mande "enviar tudo", o Git não registra o segredo. Para que o projeto continue fácil de configurar, é comum enviar um arquivo <code>.env.example</code> com os <i>nomes</i> das variáveis e valores vazios.</p>
<h3>O código (vai para o repositório)</h3>
<pre><code>const chave = process.env.GEMINI_API_KEY;        // 1
if (!chave) {                                     // 2
  console.error("Falta a variável GEMINI_API_KEY"); // 3
  process.exit(1);                                // 4
}                                                 // 5</code></pre>
<ol>
<li><code>process.env</code> é, no Node.js, o lugar onde ficam as variáveis de ambiente. A linha pega o valor de <code>GEMINI_API_KEY</code> e guarda em <code>chave</code>. O código não contém o segredo, só o nome dele.</li>
<li><code>if (!chave)</code>: "se não houver chave". O <code>!</code> significa "não".</li>
<li>Escreve no log uma mensagem clara, com o nome da variável que falta (nunca o valor).</li>
<li>Encerra o programa com código 1, que indica erro. Melhor parar com um aviso claro do que rodar quebrado.</li>
<li>Fecha o bloco do <code>if</code>.</li>
</ol>
<h3>Na hospedagem</h3>
<p>Na Render, as variáveis ficam na página do serviço, na seção <b>Environment</b>: um campo para o nome e outro para o valor. Salvar uma mudança dispara um deploy novo, porque a configuração entra na etapa de lançamento (aula 7).</p>` },

  { n: 5, titulo: "Quando usar e quando não usar", html: `
<h3>Regras que valem sempre</h3>
<ul>
<li><b>Nunca no código.</b> Nem "só para testar", nem "o repositório é privado". Repositórios mudam de visibilidade, são clonados, e o histórico guarda tudo.</li>
<li><b>Nunca no navegador.</b> Nada que precise ficar secreto vai em código de front-end, em HTML ou num arquivo que o site entrega. Se a página precisa usar uma API paga, ela chama um servidor seu (ou uma função sob demanda), e é o servidor que usa a chave.</li>
<li><b>Nunca na URL</b>, nem em capturas de tela, nem colado em conversas, inclusive com IAs. Se precisar mostrar uma configuração, troque o valor por <code>***</code>.</li>
<li><b>Um segredo por finalidade.</b> Uma chave para o ambiente local e outra para produção. Se uma vazar, você troca só ela.</li>
<li><b>Menor permissão possível.</b> Se o serviço permite restringir uma chave (a um site, a uma API, a um limite de gasto), restrinja.</li>
<li><b>Alertas de gasto.</b> Em serviços pagos por uso, configure um aviso de consumo: ele é o alarme que dispara se alguém estiver usando a sua chave.</li>
</ul>
<h3>Quando um valor não precisa ser segredo</h3>
<p>Nem toda configuração é secreta. A porta, o nome do ambiente ("produção") ou o endereço público do seu site podem ficar em variáveis de ambiente por organização, mas não causam dano se aparecerem. A pergunta é sempre: <i>se um estranho tiver este valor, ele consegue agir em meu nome ou ver o que não devia?</i></p>` },

  { n: 6, titulo: "Diferenças entre as variações", html: `
<h3>Onde guardar, do mais simples ao mais robusto</h3>
<ul>
<li><b>Gerenciador de senhas</b> (app Senhas, 1Password, Bitwarden): para você guardar e lembrar. Não é onde o programa lê.</li>
<li><b>Arquivo .env</b>: para o programa no seu computador. Fora do Git.</li>
<li><b>Variáveis de ambiente da hospedagem</b> (Render, Cloudflare): para o programa em produção. É o padrão em projetos pequenos e médios.</li>
<li><b>Cofres de segredos</b> (<i>secret managers</i>, como o do Google Cloud): serviços dedicados, com registro de quem acessou cada segredo e troca automática. Usados em sistemas maiores.</li>
</ul>
<h3>Quando um segredo vaza: o roteiro</h3>
<ol>
<li><b>Revogue e troque</b> o segredo no serviço de origem (gere uma chave nova e apague a antiga). Apagar o arquivo do repositório não basta: o histórico guarda a versão antiga.</li>
<li><b>Atualize</b> a chave nova no painel da hospedagem e no seu <code>.env</code>.</li>
<li><b>Confira o uso</b>: veja no painel do serviço se houve consumo estranho no período.</li>
<li><b>Corrija a causa</b>: por que o segredo foi parar ali? Falta de <code>.gitignore</code>? Chave no front-end? Ajuste para não repetir.</li>
</ol>
<h3>Ajuda automática</h3>
<p>O GitHub tem o <b>escaneamento de segredos</b> (<i>secret scanning</i>): ele procura credenciais conhecidas nos repositórios e avisa. Em repositórios públicos, roda de graça e automaticamente. É uma rede de proteção, não um motivo para relaxar.</p>` },

  { n: 7, titulo: "Exemplo real: os seus projetos", html: `
<p>Os exemplos aqui são de alto nível de propósito: este repositório é público, e uma aula não deve servir de mapa para ninguém.</p>
<h3>secretaria-imoveis-whatsapp</h3>
<p>Usa pelo menos dois tipos de segredo: a chave do Gemini e as credenciais de acesso à planilha do Google. O lugar certo deles em produção é a seção Environment do serviço na Render; no seu computador, um <code>.env</code> que está no <code>.gitignore</code>. Uma tarefa de quando você revisar esse projeto: confirmar que o <code>.gitignore</code> contém <code>.env</code>, que o histórico não guarda nenhuma chave real (se guardar, a chave é trocada, conforme o roteiro da parte 6) e que o código lê tudo de <code>process.env</code>.</p>
<h3>zava-tours</h3>
<p>Se as funções na Cloudflare precisarem de alguma chave (para guardar os tours, por exemplo), ela fica nas variáveis do projeto na Cloudflare, e nunca no JavaScript das páginas, que vai para o navegador de quem abre o tour.</p>
<h3>Esta escola</h3>
<p>Não tem nenhum segredo, e foi desenhada assim: sem servidor, sem login, sem chaves. O seu progresso fica no seu aparelho. Por isso ela pode morar num repositório público sem risco.</p>` },

  { n: 8, titulo: "Como pesquisar mais", html: `
<ul>
<li><b>The Twelve-Factor App, fator III: Configurações</b>, em português. Curto e direto.</li>
<li><b>OWASP Secrets Management Cheat Sheet</b>, em inglês. A OWASP (<i>Open Worldwide Application Security Project</i>) é uma comunidade aberta de segurança de software. O texto é técnico; leia a introdução agora e volte a ele no módulo de segurança.</li>
<li><b>GitHub Docs, "Escaneamento de segredos"</b> e <b>"Ignorar arquivos"</b>, em português.</li>
<li><b>Documentação de cada serviço</b>: "Environment Variables and Secrets" na Render e "Using Gemini API keys" no Google, ambas em inglês, com as recomendações de segurança de quem fornece a chave.</li>
</ul>
<p><b>Ao pedir ajuda à IA</b>: nunca cole o valor de um segredo. Escreva <code>GEMINI_API_KEY=***</code>. Peça à IA para revisar o código procurando "qualquer valor que pareça uma senha, chave ou token escrito direto no código".</p>` },

  { n: 9, titulo: "Exercício com critérios de correção", html: `
<p>Faça sem copiar nenhum valor secreto para lugar nenhum:</p>
<ol>
<li>No GitHub, abra um repositório seu em Node.js e procure o arquivo <code>.gitignore</code>. Anote se ele existe e se contém <code>.env</code>.</li>
<li>No mesmo repositório, use a busca do GitHub (a tecla <code>/</code> abre a busca) por <code>process.env</code>. Anote os <b>nomes</b> das variáveis que o código lê.</li>
<li>No painel da hospedagem desse projeto, encontre a seção de variáveis de ambiente e confira se cada nome anotado no item 2 está cadastrado lá. Não copie os valores.</li>
<li>Escreva o roteiro que você seguiria se descobrisse uma chave real no histórico desse repositório.</li>
</ol>
<p><b>Critérios de correção</b>:</p>
<ul>
<li>Itens 1 e 2: anotou a existência do <code>.gitignore</code>, a presença ou falta do <code>.env</code> nele e pelo menos um nome de variável.</li>
<li>Item 3: comparou nomes, não valores, e anotou qualquer variável que falte em algum lado.</li>
<li>Item 4: o roteiro começa por trocar a chave no serviço de origem (e não por apagar o arquivo), inclui atualizar a hospedagem, conferir o uso e corrigir a causa.</li>
<li>Se encontrou algo errado, anotou no caderno de dúvidas para tratar no módulo de segurança, sem pânico: agora você sabe o que fazer.</li>
</ul>` },

  { n: 10, titulo: "Termos novos no glossário", termos: ["Segredo (credencial)", "Chave de API", "Autenticação", "Autorização", "Variável de ambiente", ".env", ".gitignore", "Escaneamento de segredos", "Revogar", "Vulnerabilidade"] }
 ],
 resumo: [
  "Segredo é qualquer informação que permite agir em seu nome: senha, chave, token.",
  "Segredos nunca vão para o código, para o navegador, para a URL nem para conversas.",
  "O código lê o segredo de uma variável de ambiente (process.env no Node.js); o valor fica fora do código.",
  "No computador, o .env guarda as variáveis e fica no .gitignore; na hospedagem, elas ficam no painel.",
  "Autenticação prova quem você é; autorização decide o que você pode fazer.",
  "Se vazar: revogue e troque no serviço, atualize a hospedagem, confira o uso e corrija a causa. Apagar o arquivo não basta.",
  "Menor permissão, uma chave por ambiente e alertas de gasto reduzem o estrago de um vazamento."
 ],
 referencias: [
  { autor: "Adam Wiggins", titulo: "The Twelve-Factor App, fator III: Configurações", ano: "página atualizada em 2017", tipo: "guia de boas práticas", idioma: "português", link: "https://12factor.net/pt_br/config", ler: "A página inteira.", verificado: "2026-10-31" },
  { autor: "Google AI for Developers", titulo: "Using Gemini API keys", ano: "página viva", tipo: "documentação", idioma: "inglês", link: "https://ai.google.dev/gemini-api/docs/api-key", ler: "Seções Security and secret management e Restricting and securing your keys.", verificado: "2026-10-31" },
  { autor: "Render", titulo: "Environment Variables and Secrets", ano: "página viva", tipo: "documentação", idioma: "inglês", link: "https://render.com/docs/configure-environment-variables", ler: "Setting environment variables (In the Render Dashboard) e Using a .env file.", verificado: "2026-10-31" },
  { autor: "GitHub Docs", titulo: "Escaneamento de segredos", ano: "página viva", tipo: "documentação", idioma: "português", link: "https://docs.github.com/pt/code-security/secret-scanning/introduction/about-secret-scanning", ler: "Os primeiros parágrafos e a parte sobre repositórios públicos.", verificado: "2026-10-31" },
  { autor: "OWASP Cheat Sheet Series", titulo: "Secrets Management Cheat Sheet", ano: "página viva", tipo: "guia de segurança", idioma: "inglês", link: "https://cheatsheetseries.owasp.org/cheatsheets/Secrets_Management_Cheat_Sheet.html", ler: "Só a seção 1, Introduction, por enquanto. O resto fica para o módulo de segurança.", verificado: "2026-10-31" }
 ],
 aprofundar: [
  { titulo: "Ignorar arquivos", autor: "GitHub Docs", duracao: "leitura de 5 minutos", idioma: "português", porque: "Explica como o .gitignore funciona e o que fazer com um arquivo que já foi registrado antes de entrar na lista.", link: "https://docs.github.com/pt/get-started/git-basics/ignoring-files" }
 ],
 tarefa: {
  obj: [
   { id: "m00-a08-o1", q: "Por que uma chave de API nunca deve ficar no JavaScript que roda no navegador?", o: ["Porque o JavaScript não aceita textos longos.", "Porque qualquer visitante pode ler o código que chega ao navegador.", "Porque a chave deixa a página lenta.", "Porque o navegador apaga a chave."], a: 1, e: "Tudo que vai para o navegador é público. A chamada deve passar por um servidor seu, que guarda a chave.", obj: 0 },
   { id: "m00-a08-o2", q: "O que faz a linha const chave = process.env.GEMINI_API_KEY;?", o: ["Cria uma chave nova no Google.", "Escreve a chave no arquivo .env.", "Lê o valor da variável de ambiente GEMINI_API_KEY, sem que o segredo esteja no código.", "Envia a chave para o GitHub."], a: 2, e: "process.env é onde o Node.js guarda as variáveis de ambiente. O código só tem o nome.", obj: 1 },
   { id: "m00-a08-o3", q: "Onde o arquivo .env deve estar listado?", o: ["No .gitignore", "No package.json", "No index.html", "Na URL do site"], a: 0, e: "O .gitignore impede que o Git registre o .env.", obj: 1 },
   { id: "m00-a08-o4", q: "O crachá abre o 3º andar, mas não o 10º. Isso ilustra:", o: ["Criptografia", "Autenticação", "Deploy", "Autorização"], a: 3, e: "Autorização decide o que você pode fazer; autenticação prova quem você é.", obj: 2 },
   { id: "m00-a08-o5", q: "Você descobriu uma chave real num commit antigo de um repositório público. Qual é o primeiro passo?", o: ["Apagar o arquivo e fazer um commit novo.", "Tornar o repositório privado e esquecer o assunto.", "Revogar a chave no serviço de origem e gerar uma nova.", "Mudar o nome da variável."], a: 2, e: "O histórico e as cópias já feitas guardam a chave. Só trocá-la no serviço a torna inútil para quem a pegou.", obj: 3 },
   { id: "m00-a08-o6", q: "Qual destes valores NÃO precisa ser tratado como segredo?", o: ["A chave do Gemini", "O token de acesso à planilha", "A senha do painel", "A porta em que o programa roda"], a: 3, e: "A porta é configuração, não dá acesso a nada. As outras permitem agir em seu nome.", obj: 0 },
   { id: "m00-a08-o7", q: "Para que serve um arquivo .env.example no repositório?", o: ["Para guardar as chaves reais de forma segura.", "Para mostrar os nomes das variáveis necessárias, com valores vazios.", "Para substituir o .gitignore.", "Para fazer o deploy."], a: 1, e: "Ele documenta o que precisa ser configurado, sem conter segredo nenhum.", obj: 1 },
   { id: "m00-a08-o8", q: "Ao pedir ajuda a uma IA com um erro de configuração, como mostrar a variável da chave?", o: ["Colar o valor completo, para ela testar.", "Colar só metade do valor.", "Mostrar o nome e trocar o valor por ***.", "Mandar uma captura de tela do painel da hospedagem."], a: 2, e: "O valor nunca sai do lugar seguro. O nome basta para a IA entender a configuração.", obj: 4 }
  ],
  dis: [
   { id: "m00-a08-d1", q: "Explique, com uma analogia sua, como um programa usa um segredo sem que o segredo esteja escrito no código. Inclua o papel do .env no seu computador e do painel da hospedagem em produção.", min: 250, modelo: "Analogia de um estacionamento com manobrista. O manual de procedimentos (código) diz: 'pegue a chave do carro no claviculário com o número da vaga'. O manual pode ser público. As chaves ficam no claviculário trancado (variáveis de ambiente). No meu computador, o claviculário é o .env, que fica fora do Git pelo .gitignore. Em produção, é a seção de variáveis da hospedagem. O programa, ao iniciar, recebe o valor pelo nome (process.env.NOME) e usa, sem que o valor apareça no código.", criterios: ["Analogia própria e coerente com código público e segredo guardado à parte", "Explica que o código só contém o nome da variável", "Explica o .env local e que ele fica no .gitignore", "Explica que em produção o valor fica no painel da hospedagem", "Não sugere colocar o segredo no código ou no navegador"], aula: "m00-a08" },
   { id: "m00-a08-d2", q: "Por que apagar um arquivo com uma chave e fazer um novo commit não resolve um vazamento? Descreva o roteiro completo correto.", min: 220, modelo: "Porque o Git guarda o histórico: a versão antiga do arquivo, com a chave, continua acessível em commits anteriores, e alguém pode já ter copiado. O roteiro é: 1) revogar a chave no serviço de origem e gerar uma nova; 2) cadastrar a nova no painel da hospedagem e no .env local; 3) conferir no painel do serviço se houve uso estranho; 4) corrigir a causa, por exemplo incluindo o .env no .gitignore ou tirando a chave do front-end.", criterios: ["Explica que o histórico guarda a versão antiga", "Menciona que alguém pode já ter copiado", "Roteiro começa por revogar e trocar a chave", "Inclui atualizar a hospedagem, conferir o uso e corrigir a causa"], aula: "m00-a08" }
  ],
  pratica: { instrucao: "Abra o repositório escola-dev no GitHub e procure um arquivo .gitignore na lista. Depois, pense no que esta escola guarda e onde.", perguntas: [
   { id: "m00-a08-p1", q: "O repositório escola-dev tem .gitignore? Por que esta escola pode ser pública sem risco de vazar segredos? Onde fica o único dado pessoal que ela guarda (o seu progresso)?", min: 150 }
  ] }
 }
});

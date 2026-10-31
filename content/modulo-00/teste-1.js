/* Módulo 0.0, teste do bloco 1 (aulas 1 a 4). Banco com o dobro do sorteio: 20 objetivas e 2 dissertativas. */
(function () {
  // q(id, aula, objetivo, enunciado, [4 alternativas], índice da correta, explicação)
  const q = (id, aula, obj, enunciado, o, a, e) => ({ id: 'm00-t1-o' + id, aula: 'm00-a0' + aula, obj, q: enunciado, o, a, e });
  Escola.atividade({
    id: 'm00-teste1', tipo: 'teste', modulo: 'm00', bloco: 'm00-b1',
    titulo: 'Teste do bloco 1: palavras da base, código, cliente e servidor, a viagem de um pedido',
    sorteio: { obj: 10, dis: 1 },
    obj: [
      q(1, 1, 0, 'O teclado do Mac é:', ['software', 'sistema operacional', 'hardware', 'aplicativo'], 2, 'É uma peça física. Hardware é o que se pode tocar.'),
      q(2, 1, 1, 'Um banco tem app, site, computadores próprios, banco de dados e regras de segurança. O conjunto disso tudo é melhor chamado de:', ['sistema', 'página', 'programa', 'navegador'], 0, 'Sistema é o conjunto de peças integradas. O app é só uma porta de entrada.'),
      q(3, 1, 2, 'Um site em que o visitante só lê textos e vê fotos, sem fazer login nem salvar nada, é:', ['uma aplicação web', 'um site', 'um sistema operacional', 'um app nativo'], 1, 'Quando a pessoa só lê, "site" basta. Aplicação web é quando ela age e o sistema guarda.'),
      q(4, 1, 2, 'Qual destas é uma característica de uma PWA?', ['Só funciona com internet.', 'Precisa ser baixada da App Store.', 'É feita com as peças de um site e pode ser instalada na tela de início.', 'Roda apenas no Mac.'], 2, 'PWA é uma aplicação web que pode ser instalada e funcionar offline, como esta escola.'),
      q(5, 1, 3, 'O zava-visit, em que os arquivos ficam prontos e o navegador desenha o 3D, é classificado como:', ['site estático', 'servidor sempre ligado', 'sistema operacional', 'aplicação dinâmica com banco de dados'], 0, 'Não há programa seu rodando num servidor: os arquivos são entregues prontos.'),
      q(6, 2, 0, 'O que acontece se você esquecer de fechar um parêntese num arquivo JavaScript?', ['O navegador corrige sozinho.', 'O programa para com um erro de sintaxe.', 'O código roda mais devagar.', 'Nada, parênteses são opcionais.'], 1, 'A sintaxe é rígida: o interpretador não adivinha o que você quis dizer.'),
      q(7, 2, 1, 'Em function dobro(n) { return n * 2; }, o que é n?', ['O nome da função', 'O resultado', 'Um comentário', 'Um parâmetro: o valor que a função recebe'], 3, 'Parâmetros ficam entre os parênteses da definição e recebem os valores de quem chama.'),
      q(8, 2, 1, 'Depois de function dobro(n) { return n * 2; }, qual linha executa a função?', ['const x = dobro(5);', 'function dobro(n)', 'return n * 2;', '// dobro'], 0, 'Definir só guarda a receita. A chamada, com o nome e os valores, executa.'),
      q(9, 2, 2, 'O Express, que organiza o servidor e chama o seu código quando chega um pedido, é melhor classificado como:', ['biblioteca de 3D', 'framework', 'sistema operacional', 'linguagem'], 1, 'No framework, ele chama você. Na biblioteca, você a chama.'),
      q(10, 2, 3, 'Qual programa permite que o JavaScript rode fora do navegador, num servidor?', ['Three.js', 'Safari', 'Node.js', 'GitHub'], 2, 'O Node.js é um interpretador de JavaScript que roda no computador, usando o motor V8.'),
      q(11, 3, 0, 'E-mail, chamadas de vídeo e páginas web têm em comum que:', ['todos são a web', 'todos funcionam sobre a internet', 'nenhum usa a internet', 'todos precisam de um navegador'], 1, 'A internet é a infraestrutura; a web é só um dos serviços sobre ela.'),
      q(12, 3, 1, 'Quando o programa da secretaria pede uma resposta ao Gemini, nesse momento ele é:', ['servidor', 'navegador', 'cliente', 'hospedagem'], 2, 'Quem pede é cliente. O papel depende do momento, não da máquina.'),
      q(13, 3, 2, 'Qual destas é uma boa razão para ter um servidor próprio?', ['Mostrar um texto fixo igual para todos.', 'Deixar a página mais colorida.', 'Usar menos internet.', 'Guardar dados que vários aparelhos precisam ver.'], 3, 'Dados compartilhados, segredos, tarefas contínuas e conferência do que o cliente manda pedem servidor.'),
      q(14, 3, 3, 'Que tipo de hospedagem só entrega arquivos prontos, sem rodar código seu?', ['Estática', 'Servidor sempre ligado', 'Funções sob demanda', 'Peer-to-peer'], 0, 'GitHub Pages e Cloudflare Pages são exemplos de hospedagem estática.'),
      q(15, 3, 4, 'Por que o progresso desta escola no iPhone não aparece sozinho no Mac?', ['Porque o GitHub apaga o progresso.', 'Porque o progresso fica guardado no próprio aparelho, sem servidor.', 'Porque o Mac não tem navegador.', 'Porque a escola é um app nativo.'], 1, 'A escola é estática e guarda tudo no aparelho. Para levar a outro, use o backup.'),
      q(16, 4, 0, 'Em http://localhost:3000/painel, qual é a porta?', ['http', 'localhost', '/painel', '3000'], 3, 'A porta vem depois dos dois-pontos, logo após o domínio.'),
      q(17, 4, 1, 'O que o DNS devolve quando recebe um nome de domínio?', ['O endereço IP correspondente', 'O certificado do site', 'O código de status', 'O HTML da página'], 0, 'O DNS traduz nome em número, como uma lista telefônica.'),
      q(18, 4, 2, 'Onde costuma viajar a prova de identidade (token) numa requisição?', ['No código de status', 'Num cabeçalho, como Authorization', 'No domínio', 'Na porta'], 1, 'Cabeçalhos carregam informações sobre o pedido, inclusive a identificação.'),
      q(19, 4, 3, 'Uma resposta com status 401 significa:', ['tudo certo', 'o servidor caiu', 'você não se identificou', 'a página mudou de endereço'], 2, '401: falta autenticação. 403 seria identificado, mas sem permissão.'),
      q(20, 4, 4, 'O que significa dizer que o HTTP é sem estado?', ['Que ele não funciona em nenhum estado do Brasil.', 'Que cada pedido chega como se fosse o primeiro, sem lembrança dos anteriores.', 'Que ele não tem códigos de status.', 'Que ele não usa criptografia.'], 1, 'Por isso cookies e tokens repetem a prova de identidade a cada pedido.')
    ],
    dis: [
      { id: 'm00-t1-d1', aula: 'm00-a03', q: 'Escolha um projeto seu e descreva quem é o cliente e quem é o servidor, que tipo de hospedagem ele usa e por que esse tipo faz sentido para o que o projeto precisa fazer.', min: 220,
        modelo: 'Exemplo: zava-tours. O cliente é o navegador de quem abre o tour. Os arquivos (páginas e panoramas) vêm de uma hospedagem estática, porque são iguais para todos. Para salvar e carregar tours, o navegador chama funções sob demanda na Cloudflare, que fazem o papel de servidor só quando há um pedido. Faz sentido porque só uma pequena parte precisa guardar dados, e não há tarefa contínua que exija um servidor sempre ligado.',
        criterios: ['Identifica corretamente cliente e servidor no projeto escolhido', 'Nomeia o tipo de hospedagem certo', 'Justifica pelo que o projeto precisa (dados, segredos, tarefa contínua ou conteúdo fixo)', 'Usa os termos das aulas de forma correta'] },
      { id: 'm00-t1-d2', aula: 'm00-a04', q: 'Você salvou um imóvel no painel e apareceu um erro. Explique como os conceitos de método HTTP e código de status ajudam a descobrir onde está o problema, e o que você diria à IA ao pedir ajuda.', min: 220,
        modelo: 'Salvar é um POST para a rota de imóveis. Primeiro olho o código de status: se for 4xx, o problema está no pedido (dados faltando, sem identificação, rota errada); se for 5xx, está no servidor (falha interna ou fora do ar). Também comparo com um GET: se buscar funciona e salvar não, o problema é específico da rota de POST. À IA eu diria: "o POST para a rota de salvar imóvel responde 500 desde a última publicação; o GET da lista funciona; segue a linha de erro do log".',
        criterios: ['Identifica que salvar é um POST', 'Usa a primeira casa do status para separar erro do cliente e do servidor', 'Propõe comparar com outra rota ou método', 'Escreve um pedido à IA específico, com método, rota, status e contexto'] }
    ]
  });
})();

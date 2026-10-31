# Contexto privado do aluno (NÃO colocar no GitHub público)

Este arquivo vai só no conhecimento dos Projetos do Claude. Ele tem informações sobre outros projetos que não devem ficar em repositório público.

## Quem é o aluno
- Iniciante completo. Construiu um sistema inteiro com IA, mas depende dela para planejar, escrever, auditar e revisar. Comprou o primeiro computador (Mac) para aprender.
- Objetivo: virar um engenheiro de software que usa IA como assistente: entender, definir a estrutura, pedir bem, conferir, auditar e assumir o controle dos projetos.
- Uso: primeiro projetos pessoais e atendimento ao cliente, depois vender software para empresas.
- Tempo: 1 a 2 horas por dia. Prazo de referência: cerca de 12 meses.
- Como aprende: lendo, com conceitos claros, exemplos práticos, manuais e atividades. Quer entender o porquê das coisas, não decorar. Sem tempo para graduação.
- Não sabia o que é servidor, API, status, repositório, hospedagem, e a diferença entre software, sistema, app e página. Nunca assumir vocabulário.

## Projetos do aluno (GitHub: pggcthymg7-rgb)
- secretaria-imoveis-whatsapp (Node.js, Express, Gemini, Baileys, Google Sheets, Render): robô que monitora grupos de WhatsApp e responde com imóveis compatíveis, com painel web.
- zava-visit (HTML/CSS/JS, Three.js): visualização 3D de lotes e áreas de lazer em condomínios.
- zava-tours, tours, panofotos, Zava-Way, Zava-Maping, ZAVA-PROCESS: família de tours virtuais, panoramas, mapeamento e waypoints.

## Diagnóstico de segurança da secretaria (feito a partir do código enviado)
1. As rotas da API não pedem login e o CORS está aberto: qualquer pessoa que conheça o endereço da Render poderia ler a carteira de imóveis, alterar configurações, trocar a chave do Gemini, apagar imóveis ou enviar arquivos. (Não foi testado no ar, só lido no código.)
2. O arquivo `.env` estava versionado no GitHub (chaves vazias no momento da análise).
3. O número pessoal do aluno aparece em arquivos públicos (render.yaml, settings.json, index.js).
4. No zava-tours, a função de salvar tour não exige autorização nem valida arquivo.
5. panofotos tem cerca de 200 MB de imagens no Git.
6. O Baileys é biblioteca não oficial do WhatsApp: confirmar regras para uso comercial antes de vender.

## Plano de contenção (Passo 0)
Ver status no progresso do aluno. Etapas: ver o sistema de fora em janela anônima, tornar o repositório da secretaria privado, remover o `.env` do Git, revisar a chave do Gemini, fazer o mapa do ecossistema. Corrigir o login das rotas é o exame final da Fase 4, feito pelo próprio aluno.

## Decisões já tomadas
- Linguagem central: JavaScript.
- Formação em 5 fases mais Módulo 0.0 de noções. Projetos do aluno como laboratório.
- Ciclo de estudo: conceito, prever, rodar e quebrar, explicar de volta, aplicar no projeto.
- A plataforma Escola Dev é a apostila; o chat é para dúvidas e correção.

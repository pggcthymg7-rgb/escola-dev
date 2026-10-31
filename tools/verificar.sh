#!/bin/sh
# Roda tudo que precisa passar antes de um commit: validador de conteúdo, testes da lógica e teste da interface.
# Uso: sh tools/verificar.sh          (use "rapido" para pular o teste de navegador: sh tools/verificar.sh rapido)
cd "$(dirname "$0")/.." || exit 1
set -e
echo "== Validador de conteúdo =="; node tools/validar-conteudo.js
echo; echo "== Testes do motor ==";          node tests/motor.test.js | tail -1
echo "== Testes do armazenamento ==";        node tests/armazenamento.test.js | tail -1
echo "== Testes da jornada ==";             node tests/jornada.test.js | tail -1
echo "== Testes do validador ==";            node tests/validador.test.js | tail -1
if [ "$1" != "rapido" ]; then echo "== Teste da interface (celular e desktop) =="; node tests/interface.playwright.js | tail -1; fi
echo; echo "Tudo passou."

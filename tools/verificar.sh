#!/bin/sh
# Roda tudo que precisa passar antes de um commit: validador de conteúdo, testes da lógica e teste da interface.
# Uso: sh tools/verificar.sh          (use "rapido" para pular o teste de navegador: sh tools/verificar.sh rapido)
# Cada etapa que falha mostra a saída completa e interrompe com erro (antes, o "| tail -1" escondia falhas).
cd "$(dirname "$0")/.." || exit 1
grep -q "escola-dev-$(sed -n "s/.*VERSAO: '\(v[0-9]*\)'.*/\1/p" js/registro.js)'" sw.js || { echo "A versão em js/registro.js não bate com a do sw.js"; exit 1; }
etapa() {   # etapa "título" comando...: roda, mostra só a última linha se passou, ou tudo se falhou
  titulo="$1"; shift
  echo "== $titulo =="
  if saida=$("$@" 2>&1); then echo "$saida" | tail -1; else echo "$saida"; echo; echo "FALHOU: $titulo"; exit 1; fi
}
etapa "Validador de conteúdo" node tools/validar-conteudo.js
etapa "Testes do motor" node tests/motor.test.js
etapa "Testes do armazenamento" node tests/armazenamento.test.js
etapa "Testes da jornada" node tests/jornada.test.js
etapa "Testes do validador" node tests/validador.test.js
if [ "$1" != "rapido" ]; then etapa "Teste da interface (celular e desktop)" node tests/interface.playwright.js; fi
echo; echo "Tudo passou."

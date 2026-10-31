#!/usr/bin/env bash
# Hook de início de sessão: instala as skills caveman e registra o servidor MCP do Graphify
# se ainda não existirem. Idempotente e silencioso; nunca derruba a sessão.
# O login (OAuth) do Graphify continua sendo feito pelo dono no claude.ai.

cd "${CLAUDE_PROJECT_DIR:-.}" 2>/dev/null || true

if [ ! -d "$HOME/.claude/skills/caveman" ]; then
  echo "[hook] instalando skills caveman..."
  timeout 120 npx --yes skills add JuliusBrussee/caveman -g -y >/dev/null 2>&1 \
    && echo "[hook] caveman instalado" || echo "[hook] falha ao instalar caveman"
fi

if command -v claude >/dev/null 2>&1; then
  if ! timeout 30 claude mcp get graphify >/dev/null 2>&1; then
    echo "[hook] registrando servidor graphify..."
    timeout 30 claude mcp add --transport http --scope local graphify https://api.graphify.com/mcp >/dev/null 2>&1 \
      && echo "[hook] graphify registrado (login OAuth pelo conector do claude.ai)" || echo "[hook] falha ao registrar graphify"
  fi
fi

exit 0

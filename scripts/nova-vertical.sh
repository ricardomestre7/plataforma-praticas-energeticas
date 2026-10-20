#!/usr/bin/env bash
# ==============================================================================
# SCRIPT DE CRIAÇÃO DE NOVA VERTICAL IRIA KNOWLEDGE CONTAINERS
# Autor: Mestre Ricardo Rogério Pereira | Safe Creative #2610157331452
# Uso: ./scripts/nova-vertical.sh <slug-da-vertical> "<Título Oficial>" "<Código Ex: PIA-33>" [porta]
# ==============================================================================

set -e

SLUG=$1
TITULO=$2
CODIGO=${3:-"IRIA"}
PORTA=${4:-"8080"}

if [ -z "$SLUG" ] || [ -z "$TITULO" ]; then
  echo "❌ Uso: ./scripts/nova-vertical.sh <slug-da-vertical> \"<Título Oficial>\" \"<Código>\" [porta]"
  echo "Exemplo: ./scripts/nova-vertical.sh 01-pia \"33 Protocolos Integrativos Avançados\" \"PIA-33\" 8081"
  exit 1
fi

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
TARGET_DIR="$ROOT_DIR/verticals/$SLUG"

if [ -d "$TARGET_DIR" ]; then
  echo "⚠️ A vertical '$SLUG' já existe em $TARGET_DIR. Abortando para evitar sobrescrita acidental."
  exit 1
fi

echo "🚀 Criando nova vertical soberana: $TITULO ($CODIGO)..."
mkdir -p "$TARGET_DIR"

# Copiar arquivos do template oficial
cp -r "$ROOT_DIR/template/"* "$TARGET_DIR/"

# Injetar metadados no curriculum-data.js
CURRICULUM_FILE="$TARGET_DIR/app/js/curriculum-data.js"
sed -i "s/vertical-base-oficial/$SLUG/g" "$CURRICULUM_FILE"
sed -i "s/LUM-00/$CODIGO/g" "$CURRICULUM_FILE"
sed -i "s/IRIA Knowledge Base/$TITULO/g" "$CURRICULUM_FILE"

echo "✅ Vertical '$SLUG' provisionada com sucesso em: $TARGET_DIR"
echo "👉 Para rodar localmente com Docker:"
echo "   cd verticals/$SLUG && docker build -t iria-$SLUG . && docker run -d -p $PORTA:80 iria-$SLUG"
echo "👉 Acesse: http://localhost:$PORTA"

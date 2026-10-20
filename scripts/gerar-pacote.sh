#!/usr/bin/env bash
# ==============================================================================
# SCRIPT DE EXPORTAÇÃO DE CONTAINER SOBERANO (.TAR DE DISTRIBUIÇÃO)
# Autor: Mestre Ricardo Rogério Pereira | Safe Creative #2610157331452
# Uso: ./scripts/gerar-pacote.sh <slug-da-vertical> [tag-versao]
# ==============================================================================

set -e

SLUG=$1
VERSION=${2:-"v1.0.0"}

if [ -z "$SLUG" ]; then
  echo "❌ Uso: ./scripts/gerar-pacote.sh <slug-da-vertical> [versao]"
  echo "Exemplo: ./scripts/gerar-pacote.sh 01-pia v1.0.0"
  exit 1
fi

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
TARGET_DIR="$ROOT_DIR/verticals/$SLUG"
OUTPUT_DIR="$ROOT_DIR/pacotes"
IMAGE_TAG="iria-$SLUG:$VERSION"
TAR_FILE="$OUTPUT_DIR/iria-$SLUG-$VERSION.tar"

if [ ! -d "$TARGET_DIR" ]; then
  echo "❌ Erro: Vertical '$SLUG' não encontrada em: $TARGET_DIR"
  exit 1
fi

mkdir -p "$OUTPUT_DIR"

echo "📦 [1/3] Construindo imagem Docker soberana: $IMAGE_TAG..."
docker build -t "$IMAGE_TAG" -t "iria-$SLUG:latest" "$TARGET_DIR"

echo "💾 [2/3] Exportando container para pacote de distribuição soberana: $TAR_FILE..."
docker save -o "$TAR_FILE" "$IMAGE_TAG"

echo "📝 [3/3] Gerando manifesto de integridade e instruções de execução..."
cat <<EOF > "$OUTPUT_DIR/iria-$SLUG-$VERSION-README.txt"
===============================================================================
IRIA KNOWLEDGE CONTAINERS — PACOTE DE DISTRIBUIÇÃO SOBERANA (.TAR)
Vertical: $SLUG
Versão: $VERSION
Registro de Autoria: Safe Creative #2610157331452
Autor: Mestre Ricardo Rogério Pereira | Cylinder Global Academy
===============================================================================

INSTRUÇÕES DE EXECUÇÃO EM QUALQUER SERVIDOR, VPS, COOLIFY OU MÁQUINA LOCAL:

1. Importar o pacote Docker:
   docker load -i iria-$SLUG-$VERSION.tar

2. Rodar o container (exemplo na porta 8080):
   docker run -d --name iria-$SLUG -p 8080:80 $IMAGE_TAG

3. Acessar no navegador:
   http://localhost:8080 ou http://seu-dominio:8080

Vantagens Soberanas:
- 100% autônomo, sem dependência de nuvens proprietárias, CDNs externas ou bloqueios
- Reprodutível em qualquer ambiente Docker (Linux, Windows, macOS, Raspberry Pi)
- Integridade garantida e certificada pelo Safe Creative #2610157331452
===============================================================================
EOF

echo "✨ Sucesso! Pacote gerado com maestria:"
echo "📁 Pacote: $TAR_FILE"
echo "📄 Manifesto: $OUTPUT_DIR/iria-$SLUG-$VERSION-README.txt"

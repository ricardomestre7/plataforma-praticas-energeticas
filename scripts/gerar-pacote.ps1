<#
.SYNOPSIS
  Script PowerShell para empacotar e exportar container soberano em .tar no Windows.
.EXAMPLE
  .\scripts\gerar-pacote.ps1 -Slug "01-pia" -Versao "v1.0.0"
#>
param(
  [Parameter(Mandatory=$true)]
  [string]$Slug,

  [string]$Versao = "v1.0.0"
)

$rootDir = Split-Path -Parent $PSScriptRoot
$targetDir = Join-Path $rootDir "verticals\$Slug"
$outputDir = Join-Path $rootDir "pacotes"
$imageTag = "iria-$Slug`:$Versao"
$tarFile = Join-Path $outputDir "iria-$Slug-$Versao.tar"

if (-not (Test-Path $targetDir)) {
  Write-Error "Vertical '$Slug' não encontrada em: $targetDir"
  exit 1
}

New-Item -ItemType Directory -Force -Path $outputDir | Out-Null

Write-Host "📦 [1/3] Construindo imagem Docker soberana: $imageTag..." -ForegroundColor Cyan
docker build -t $imageTag -t "iria-$Slug`:latest" $targetDir

Write-Host "💾 [2/3] Exportando container para pacote .tar de distribuição soberana..." -ForegroundColor Yellow
docker save -o $tarFile $imageTag

Write-Host "📝 [3/3] Gerando manifesto de execução..." -ForegroundColor Cyan
$readme = @"
===============================================================================
IRIA KNOWLEDGE CONTAINERS — PACOTE DE DISTRIBUIÇÃO SOBERANA (.TAR)
Vertical: $Slug
Versão: $Versao
Registro de Autoria: Safe Creative #2610157331452
Autor: Mestre Ricardo Rogério Pereira | Cylinder Global Academy
===============================================================================

INSTRUÇÕES DE EXECUÇÃO:

1. Importar o pacote Docker:
   docker load -i iria-$Slug-$Versao.tar

2. Executar o container:
   docker run -d --name iria-$Slug -p 8080:80 $imageTag

3. Acessar no navegador:
   http://localhost:8080
===============================================================================
"@

Set-Content -Path (Join-Path $outputDir "iria-$Slug-$Versao-README.txt") -Value $readme -Encoding UTF8

Write-Host "✨ Sucesso! Pacote gerado com maestria em: $tarFile" -ForegroundColor Green

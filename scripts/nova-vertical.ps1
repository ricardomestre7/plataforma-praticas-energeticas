<#
.SYNOPSIS
  Script PowerShell para provisionar novas verticais IRIA Knowledge Containers no Windows.
.EXAMPLE
  .\scripts\nova-vertical.ps1 -Slug "01-pia" -Titulo "33 Protocolos Integrativos Avançados" -Codigo "PIA-33" -Porta 8081
#>
param(
  [Parameter(Mandatory=$true)]
  [string]$Slug,

  [Parameter(Mandatory=$true)]
  [string]$Titulo,

  [string]$Codigo = "IRIA",
  [int]$Porta = 8080
)

$rootDir = Split-Path -Parent $PSScriptRoot
$targetDir = Join-Path $rootDir "verticals\$Slug"
$templateDir = Join-Path $rootDir "template"

if (Test-Path $targetDir) {
  Write-Warning "A vertical '$Slug' já existe em '$targetDir'. Operação cancelada para proteger os dados."
  exit 1
}

Write-Host "🚀 Provisionando vertical soberana: $Titulo ($Codigo)..." -ForegroundColor Cyan
New-Item -ItemType Directory -Force -Path $targetDir | Out-Null
Copy-Item -Path "$templateDir\*" -Destination $targetDir -Recurse -Force

# Injetar metadados no curriculum-data.js
$curriculumFile = Join-Path $targetDir "app\js\curriculum-data.js"
if (Test-Path $curriculumFile) {
  $content = Get-Content $curriculumFile -Raw
  $content = $content -replace "vertical-base-oficial", $Slug
  $content = $content -replace "LUM-00", $Codigo
  $content = $content -replace "IRIA Knowledge Base", $Titulo
  Set-Content -Path $curriculumFile -Value $content -Encoding UTF8
}

Write-Host "✅ Vertical '$Slug' criada com sucesso em: $targetDir" -ForegroundColor Green
Write-Host "👉 Execute localmente com Docker:" -ForegroundColor Yellow
Write-Host "   cd verticals\$Slug"
Write-Host "   docker build -t iria-$Slug ."
Write-Host "   docker run -d -p $($Porta):80 iria-$Slug"
Write-Host "👉 Acesse: http://localhost:$Porta" -ForegroundColor Cyan

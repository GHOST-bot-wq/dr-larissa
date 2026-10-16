# Script para configurar as imagens do projeto GS Estética Avançada
# Execute este arquivo com duplo clique ou via PowerShell

$source = "C:\Users\Win11\.gemini\antigravity\brain\d68eae7a-3e61-4ca0-b4fd-c15fc9c70900\.user_uploaded"
$dest = "$PSScriptRoot\public\images"

Write-Host "====================================" -ForegroundColor Cyan
Write-Host " GS Estética Avançada — Setup" -ForegroundColor Cyan
Write-Host "====================================" -ForegroundColor Cyan
Write-Host ""

# Criar pasta de imagens se não existir
if (-not (Test-Path $dest)) {
    New-Item -ItemType Directory -Path $dest -Force | Out-Null
}

# Copiar e renomear imagens
$images = @(
    @{ Source = "media_1791982783600_f3e3327c.png"; Dest = "resultado-corporal-1.png" },
    @{ Source = "media_1791982783604_90426954.png"; Dest = "gabrielly-sampaio.png" },
    @{ Source = "media_1791982783650_663dc558.png"; Dest = "resultado-antes-depois.png" },
    @{ Source = "media_1791982783660_987dcf2e.png"; Dest = "gabrielly-laser.png" }
)

foreach ($img in $images) {
    $src = Join-Path $source $img.Source
    $dst = Join-Path $dest $img.Dest
    if (Test-Path $src) {
        Copy-Item $src -Destination $dst -Force
        Write-Host "✓ Copiado: $($img.Dest)" -ForegroundColor Green
    } else {
        Write-Host "✗ Não encontrado: $($img.Source)" -ForegroundColor Yellow
    }
}

Write-Host ""
Write-Host "Instalando dependências npm..." -ForegroundColor Cyan
Set-Location $PSScriptRoot
npm install

Write-Host ""
Write-Host "=====================================" -ForegroundColor Green
Write-Host " Tudo pronto! Execute: npm run dev" -ForegroundColor Green
Write-Host "=====================================" -ForegroundColor Green
Write-Host ""
pause

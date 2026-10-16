$sourceDir = "C:\Users\Win11\.gemini\antigravity\brain\6c5bdd6b-ab63-44ba-b0ff-9f72111f4914\.user_uploaded"
$destDir = Join-Path $PSScriptRoot "public\images"

if (!(Test-Path $destDir)) {
    New-Item -ItemType Directory -Path $destDir -Force | Out-Null
}

$files = @{
    "media_1791942750497_81f25a70.png" = "gabrielly-sampaio-portrait.png"
    "media_1791942750525_cb9544cf.png" = "gabrielly-procedimento-laser.png"
    "media_1791942750487_c971438f.png" = "resultado-corporal-1.png"
    "media_1791942750511_8ddd7881.png" = "resultado-corporal-2.png"
}

foreach ($src in $files.Keys) {
    $srcPath = Join-Path $sourceDir $src
    $dstPath = Join-Path $destDir $files[$src]
    if (Test-Path $srcPath) {
        Copy-Item -Path $srcPath -Destination $dstPath -Force
        Write-Host "Copiado: $($files[$src])" -ForegroundColor Green
    } else {
        Write-Host "Nao encontrado: $src" -ForegroundColor Red
    }
}

Write-Host "`nFotos instaladas com sucesso em public/images!" -ForegroundColor Cyan

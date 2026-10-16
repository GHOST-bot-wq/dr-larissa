@echo off
chcp 65001 >nul
echo ========================================================
echo   GS Estetica Avancada - Copiando Fotos Oficiais
echo ========================================================
echo.

set "SOURCE_DIR=C:\Users\Win11\.gemini\antigravity\brain\6c5bdd6b-ab63-44ba-b0ff-9f72111f4914\.user_uploaded"
set "DEST_DIR=%~dp0public\images"

if not exist "%DEST_DIR%" (
    mkdir "%DEST_DIR%"
)

echo 1. Copiando retrato profissional (Gabrielly Sampaio)...
copy /y "%SOURCE_DIR%\media_1791942750497_81f25a70.png" "%DEST_DIR%\gabrielly-sampaio-portrait.png" >nul
if %errorlevel% equ 0 (echo    [OK] Retrato copiado com sucesso.) else (echo    [ERRO] Falha ao copiar retrato.)

echo 2. Copiando foto de procedimento a laser...
copy /y "%SOURCE_DIR%\media_1791942750525_cb9544cf.png" "%DEST_DIR%\gabrielly-procedimento-laser.png" >nul
if %errorlevel% equ 0 (echo    [OK] Procedimento copiado com sucesso.) else (echo    [ERRO] Falha ao copiar procedimento.)

echo 3. Copiando resultado corporal 1 (Flancos)...
copy /y "%SOURCE_DIR%\media_1791942750487_c971438f.png" "%DEST_DIR%\resultado-corporal-1.png" >nul
if %errorlevel% equ 0 (echo    [OK] Resultado 1 copiado com sucesso.) else (echo    [ERRO] Falha ao copiar resultado 1.)

echo 4. Copiando resultado corporal 2 (Abdomen)...
copy /y "%SOURCE_DIR%\media_1791942750511_8ddd7881.png" "%DEST_DIR%\resultado-corporal-2.png" >nul
if %errorlevel% equ 0 (echo    [OK] Resultado 2 copiado com sucesso.) else (echo    [ERRO] Falha ao copiar resultado 2.)

echo.
echo ========================================================
echo   Todas as fotos foram instaladas em public/images/!
echo   Agora basta atualizar ou abrir o index.html no navegador.
echo ========================================================
echo.
pause

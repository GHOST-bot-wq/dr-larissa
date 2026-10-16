@echo off
chcp 65001 >nul
echo ====================================================
echo  Copiando imagens de Gleice Farias para o projeto
echo ====================================================

if not exist "public\images" mkdir "public\images"
if not exist "images" mkdir "images"

copy /Y "C:\Users\Win11\.gemini\antigravity\brain\b7166e09-9954-4e32-9235-10ee1b85428e\.user_uploaded\media_1792079188612_f6c46fed.png" "public\images\gleice-farias.png"
copy /Y "C:\Users\Win11\.gemini\antigravity\brain\b7166e09-9954-4e32-9235-10ee1b85428e\.user_uploaded\media_1792079217939_a5ddcf45.png" "public\images\resultado-facial-1.png"
copy /Y "C:\Users\Win11\.gemini\antigravity\brain\b7166e09-9954-4e32-9235-10ee1b85428e\.user_uploaded\media_1792079239393_977ec28e.png" "public\images\resultado-limpeza.png"

copy /Y "public\images\gleice-farias.png" "images\gleice-farias.png"
copy /Y "public\images\resultado-facial-1.png" "images\resultado-facial-1.png"
copy /Y "public\images\resultado-limpeza.png" "images\resultado-limpeza.png"

echo.
echo Sucesso! Todas as imagens foram copiadas para public/images e images.
echo Agora execute 'npm run dev' para visualizar.
pause

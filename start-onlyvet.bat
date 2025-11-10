@echo off
cd /d "%~dp0"
echo ===============================
echo   🚀 Запуск сайта OnlyVet
echo ===============================
npm install
npm run dev
pause

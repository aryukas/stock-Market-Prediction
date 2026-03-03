@echo off
echo Starting Stock Market Prediction App...
echo.

echo [1/2] Starting Backend (Flask API)...
start cmd /k "cd /d %~dp0 && python api.py"
timeout /t 3 /nobreak >nul

echo [2/2] Starting Frontend (Next.js)...
start cmd /k "cd /d %~dp0stock-frontend && npm run dev"

echo.
echo ========================================
echo Backend: http://localhost:5000
echo Frontend: http://localhost:3000
echo ========================================
echo.
echo Press any key to exit...
pause >nul

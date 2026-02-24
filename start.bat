@echo off
echo Installing Python dependencies...
pip install -r requirements.txt

echo.
echo Starting Flask API on port 5000...
start cmd /k python api.py

echo.
echo Installing Node.js dependencies...
cd stock-frontend
call npm install

echo.
echo Starting Next.js frontend on port 3000...
start cmd /k npm run dev

echo.
echo Both servers starting...
echo Backend: http://localhost:5000
echo Frontend: http://localhost:3000
echo.
pause

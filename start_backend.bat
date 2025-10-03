@echo off
REM Strive Hive Backend Startup Script for Windows

echo 🏥 Starting Strive Hive Health Analytics Backend...
echo 📊 Enhanced Python Server with Reports API
echo.

REM Check if Python is installed
python --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Error: Python is not installed or not in PATH
    echo Please install Python 3.8+ and try again
    pause
    exit /b 1
)

REM Display Python version
echo 🐍 Python version:
python --version

REM Start the enhanced backend server
echo.
echo 🚀 Starting Enhanced Backend Server on http://localhost:8081
echo 📈 Health Analytics Dashboard API will be available
echo.
echo Available endpoints:
echo   - GET /api/health (health check)
echo   - GET /api/reports/{userId}/week
echo   - GET /api/reports/{userId}/month
echo   - GET /api/reports/{userId}/year
echo   - GET /api/reports/{userId}/export/pdf
echo   - GET /api/reports/{userId}/share
echo   - GET /api/reports/{userId}/trends
echo.
echo 💡 Press Ctrl+C to stop the server
echo ==========================================
echo.

python enhanced_backend_server.py

pause
@echo off
echo.
echo ╔════════════════════════════════════════════════════════════╗
echo ║                                                            ║
echo ║   🌆 H2S Smart Communities - Quick Start                  ║
echo ║                                                            ║
echo ╚════════════════════════════════════════════════════════════╝
echo.

echo [1/3] Checking for Node.js...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed!
    echo Please install Node.js from https://nodejs.org/
    echo.
    pause
    exit /b 1
)
echo ✅ Node.js found!
echo.

echo [2/3] Installing dependencies...
if not exist "node_modules" (
    call npm install
)
echo ✅ Dependencies ready!
echo.

echo [3/3] Starting server...
echo.
node simple-server.js

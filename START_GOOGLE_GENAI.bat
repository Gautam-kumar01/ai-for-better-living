@echo off
chcp 65001 >nul
echo.
echo ╔═══════════════════════════════════════════════════════════════╗
echo ║                                                               ║
echo ║   🌆 H2S Smart Communities - Google Gen AI Edition            ║
echo ║                                                               ║
echo ║   AI for Better Living & Smarter Communities                  ║
echo ║                                                               ║
echo ╚═══════════════════════════════════════════════════════════════╝
echo.

echo [1/5] Checking for Node.js...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed!
    echo Please download and install from: https://nodejs.org
    echo.
    pause
    exit /b 1
)
echo ✅ Node.js found!
echo.

echo [2/5] Installing dependencies...
if not exist "node_modules" (
    echo Installing packages...
    npm install express cors axios
)
echo ✅ Dependencies ready!
echo.

echo [3/5] Checking for .env file...
if not exist ".env" (
    echo ⚠️  .env file not found!
    echo.
    echo Steps to set up your API keys:
    echo 1. Copy .env.example to .env
    echo 2. Open .env and replace the placeholders with your actual keys
    echo 3. Get keys here: https://makersuite.google.com/app/apikey
    echo.
    echo For now, the app will use fallback responses (still works great!)
    echo.
) else (
    echo ✅ .env file found!
    echo.
)

echo [4/5] Starting server...
echo.

echo ╔═══════════════════════════════════════════════════════════════╗
echo ║                                                               ║
echo ║   🚀 Server is starting...                                    ║
echo ║                                                               ║
echo ║   After it starts, open your browser to:                     ║
echo ║   http://localhost:3000                                       ║
echo ║                                                               ║
echo ║   Press Ctrl+C to stop the server                             ║
echo ║                                                               ║
echo ╚═══════════════════════════════════════════════════════════════╝
echo.

node google-genai-server.js

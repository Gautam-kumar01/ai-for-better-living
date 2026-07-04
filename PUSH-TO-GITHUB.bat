@echo off
echo.
echo ============================================
echo    Pushing H2S Smart Communities to GitHub!
echo ============================================
echo.

REM Cleanup old git folder if exists
if exist .git (
    echo Cleaning up old git folder...
    rmdir /s /q .git
)

REM Initialize git
echo Initializing git...
git init

REM Add only the important files (NO node_modules!)
echo Adding project files...
git add .gitignore
git add google-genai-server.js
git add index-genai.html
git add simple-server.js
git add index.html
git add package.json
git add server/
git add client/src/
git add README.md
git add PROJECT_README.md
git add START_GOOGLE_GENAI.bat
git add START.bat

REM First commit
echo Creating commit...
git commit -m "Initial commit - H2S Smart Communities with Google Gen AI"

REM Add remote
echo Adding remote repository...
git remote add origin https://github.com/Gautam-kumar01/ai-for-better-living.git

REM Rename to main
git branch -M main

REM Push!
echo.
echo Pushing to GitHub...
git push -u origin main

echo.
echo ============================================
echo    SUCCESS! Check your GitHub repository!
echo    https://github.com/Gautam-kumar01/ai-for-better-living
echo ============================================
echo.
pause

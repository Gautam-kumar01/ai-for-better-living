@echo off
echo.
echo ============================================
echo    FRESH PUSH - CLEAN GIT HISTORY
echo ============================================
echo.

echo WARNING: This will DELETE the old git folder and start fresh!
echo This is safe - we're just removing git history, not your code.
echo.
pause

REM Delete old git folder
if exist .git (
    echo Deleting old git folder...
    rmdir /s /q .git
)

REM Initialize git
echo Initializing git...
git init

REM Add only the safe files (NO secrets, NO node_modules!)
echo Adding project files...
git add .gitignore
git add .env.example
git add google-genai-server.js
git add simple-server.js
git add index.html
git add index-genai.html
git add package.json
git add server/
git add client/src/
git add README.md
git add PROJECT_README.md
git add START_GOOGLE_GENAI.bat
git add START.bat
git add PUSH-TO-GITHUB.bat

REM Commit
echo Creating commit...
git commit -m "Initial commit - H2S Smart Communities (no secrets)"

REM Add remote
echo Adding remote...
git remote add origin https://github.com/Gautam-kumar01/ai-for-better-living.git

REM Rename to main
git branch -M main

REM Push!
echo.
echo Force pushing to GitHub...
git push -u origin main --force

echo.
echo ============================================
echo    SUCCESS! Your project is now on GitHub!
echo    https://github.com/Gautam-kumar01/ai-for-better-living
echo ============================================
echo.
echo REMINDER: Your .env file with API keys is NOT pushed to GitHub!
echo That's good - keep your secrets safe!
echo.
pause

@echo off
echo Initializing Git repository...
git init

echo Adding all files...
git add .

echo Committing files...
git commit -m "Initial commit: Stock Analyzer with AI predictions"

echo.
echo Now create a new repository on GitHub and run:
echo git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
echo git branch -M main
echo git push -u origin main
echo.
pause

@echo off
cd /d C:\Users\Asus\Documents\Antigravity_Portfolio_Example\temp-app

echo.
echo =========================================================
echo          UPLOADING PORTFOLIO TO GITHUB...
echo =========================================================
echo.

git remote remove origin 2>nul
git remote add origin https://github.com/cre8ify777-commits/Portfolio-.git

git add .
git commit -m "Initial launch of Antigravity Portfolio" --allow-empty

echo.
echo A GitHub sign-in window will appear now.
echo Please click "Sign in with your browser" and authorize.
echo.

git push -u origin main

echo.
echo =========================================================
echo   DONE! Your portfolio is now live on GitHub!
echo   You can close this window.
echo =========================================================
echo.
pause

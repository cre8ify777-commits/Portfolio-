@echo off
cd /d C:\Users\Asus\Documents\Antigravity_Portfolio_Example\temp-app

echo.
echo =========================================================
echo     PUSHING UPDATE TO TRIGGER VERCEL REBUILD...
echo =========================================================
echo.

git add .
git commit -m "Add vercel.json config for proper deployment"
git push origin main

echo.
echo =========================================================
echo   DONE! Vercel will now auto-rebuild your site.
echo   Wait 1-2 minutes, then refresh your Vercel URL.
echo =========================================================
echo.
pause

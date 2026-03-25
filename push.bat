@echo off
cd /d C:\Users\Asus\Documents\Antigravity_Portfolio_Example\temp-app

echo.
echo =========================================================
echo   PUSHING NEW HERO FRAMES + ALL OPTIMIZATIONS...
echo =========================================================
echo.

git add -A
git commit -m "Replace hero with New Hero Section Vid frames + all performance optimizations"
git push origin main

echo.
echo =========================================================
echo   DONE! Vercel will auto-rebuild in 1-2 minutes.
echo   Your new red cinematic hero will be live!
echo =========================================================
echo.
pause

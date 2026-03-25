@echo off
cd /d C:\Users\Asus\Documents\Antigravity_Portfolio_Example\temp-app

echo.
echo =========================================================
echo   PUSHING ALL PERFORMANCE OPTIMIZATIONS...
echo =========================================================
echo.

git add .
git commit -m "Performance: 94%% image reduction, code splitting, caching, font optimization"
git push origin main

echo.
echo =========================================================
echo   DONE! Vercel will auto-rebuild with optimizations.
echo =========================================================
echo.
pause

@echo off
cd /d C:\Users\Asus\Documents\Antigravity_Portfolio_Example\temp-app

echo.
echo =========================================================
echo   DEPLOYING PORTFOLIO DIRECTLY TO VERCEL...
echo =========================================================
echo.
echo This will open a browser window to log you into Vercel.
echo After logging in, come back here and follow the prompts.
echo.

npx -y vercel --prod

echo.
echo =========================================================
echo   DONE! Your portfolio should now be LIVE!
echo   Check the URL shown above in your browser.
echo =========================================================
echo.
pause

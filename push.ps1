$ErrorActionPreference = "Stop"
cd C:\Users\Asus\Documents\Antigravity_Portfolio_Example\temp-app
$env:Path = [System.Environment]::GetEnvironmentVariable('Path','Machine') + ';' + [System.Environment]::GetEnvironmentVariable('Path','User')

git remote remove origin 2>$null
git remote add origin https://github.com/cre8ify777-commits/Portfolio-.git

Write-Host "---------------------------------------------------------"
Write-Host "     UPLOADING PORTFOLIO TO GITHUB..." -ForegroundColor Cyan
Write-Host "---------------------------------------------------------"
Write-Host ""
Write-Host "A browser window is about to pop up asking you to sign securely into GitHub so your code can be saved to your repository."
Write-Host ""
Write-Host "Please click exactly what GitHub asks (like 'Sign in with your browser') and then you can close this window when it says 'Branch main set up to track remote branch main from origin'." -ForegroundColor Green
Write-Host ""

git push -u origin main

Write-Host ""
Write-Host "DONE! If there are no errors above, your portfolio is perfectly live on GitHub. You can close this window now!" -ForegroundColor Yellow

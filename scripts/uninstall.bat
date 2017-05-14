@echo off
if "%1"=="ptb" goto PTB
if "%1"=="canary" goto CANARY
taskkill /IM discord.exe /F
FOR /F "delims=" %%i IN ('dir "%localappdata%\Discord" /b /ad-h /t:c /od') DO SET p=%%i
rename %localappdata%\Discord\%p%\resources\app.asar donotremovepls
rmdir /S /Q %localappdata%\Discord\%p%\resources\app
rmdir /S /Q %localappdata%\Discord\%p%\resources\node_modules
rename %localappdata%\Discord\%p%\resources\donotremovepls app.asar
start "" %localappdata%\Discord\%p%\Discord.exe
goto END
:PTB
taskkill /IM discordptb.exe /F
FOR /F "delims=" %%i IN ('dir "%localappdata%\Discordptb" /b /ad-h /t:c /od') DO SET p=%%i
rename %localappdata%\Discordptb\%p%\resources\app.asar donotremovepls
rmdir /S /Q %localappdata%\Discordptb\%p%\resources\app
rmdir /S /Q %localappdata%\Discordptb\%p%\resources\node_modules
rename %localappdata%\Discordptb\%p%\resources\donotremovepls app.asar
start "" %localappdata%\Discordptb\%p%\Discordptb.exe
goto END
:CANARY
taskkill /IM discordcanary.exe /F
FOR /F "delims=" %%i IN ('dir "%localappdata%\Discordcanary" /b /ad-h /t:c /od') DO SET p=%%i
rename %localappdata%\Discordcanary\%p%\resources\app.asar donotremovepls
rmdir /S /Q %localappdata%\Discordcanary\%p%\resources\app
rmdir /S /Q %localappdata%\Discordcanary\%p%\resources\node_modules
rename %localappdata%\Discordcanary\%p%\resources\donotremovepls app.asar
start "" %localappdata%\Discordcanary\%p%\Discordcanary.exe
:END

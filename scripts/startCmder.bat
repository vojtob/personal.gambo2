@set PROJECT_DIR=%~dp0
@set PROJECT_DIR=%PROJECT_DIR:~0,-9%
call "C:\prg\cmder\Cmder.exe"
call "C:\Program Files (x86)\AutoIt3\AutoIt3_x64.exe" %PROJECT_DIR%\scripts\xstartCmder.au3 %PROJECT_DIR%
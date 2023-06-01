@set PROJECT_DIR=%~dp0
@set PROJECT_DIR=%PROJECT_DIR:~0,-7%
call "C:\prg\cmder\Cmder.exe"
call "C:\Program Files (x86)\AutoIt3\AutoIt3_x64.exe" "C:\Projects_src\Personal\docool\src\autoit\xstartCmderCommands.au3" %PROJECT_DIR%
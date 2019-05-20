REM web app
REM cp ..\..\gambo.web\dxcHistory.html .\release\dxcHistory.html

cp ..\..\gambo.web\dxcRun.html .\release\dxcRun.html
C:\prg\fart\fart .\release\dxcRun.html "var serviceAddress = ''" "var serviceAddress = 'http://localhost:3000'"

cp ..\..\gambo.web\dxcRunner.html .\release\dxcRunner.html
C:\prg\fart\fart .\release\dxcRunner.html "var serviceAddress = ''" "var serviceAddress = 'http://localhost:3000'"

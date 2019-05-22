REM web app
REM cp ..\..\gambo.web\dxcHistory.html .\release\dxcHistory.html

cp ..\..\gambo.web\dxcRoute.html .\release\dxcRoute.html
C:\prg\fart\fart .\release\dxcRoute.html "var serviceAddress = ''" "var serviceAddress = 'http://localhost:3000'"

cp ..\..\gambo.web\dxcRunner.html .\release\dxcRunner.html
C:\prg\fart\fart .\release\dxcRunner.html "var serviceAddress = ''" "var serviceAddress = 'http://localhost:3000'"

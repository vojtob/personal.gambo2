@ECHO OFF
REM web app
REM cp ..\..\gambo.web\dxcHistory.html .\release\dxcHistory.html

REM cp ..\..\gambo.web\dxcRoute.html .\release\dxcRoute.html
REM C:\prg\fart\fart .\release\dxcRoute.html "var serviceAddress = ''" "var serviceAddress = 'http://localhost:3000'"

REM cp ..\..\gambo.web\dxcRunner.html .\release\dxcRunner.html
REM C:\prg\fart\fart .\release\dxcRunner.html "var serviceAddress = ''" "var serviceAddress = 'http://localhost:3000'"

py ..\..\gambo.web\utilities\generateSetupHtml.py
C:\prg\fart\fart .\release\dxcSetup.html "var serviceAddress = ''" "var serviceAddress = 'http://localhost:3000'"

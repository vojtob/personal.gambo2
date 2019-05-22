rmdir /S /Q .\release
mkdir .\release

cp -r ..\..\gambo .\release
cp ..\..\config\configLocal.js .\release\gambo\gambo.core\config.js
cp ..\..\mockAPI\gamboAPI.js .\release\gamboAPI.js

REM web app
cp ..\..\gambo.web\dxcHistory.html .\release\dxcHistory.html

cp ..\..\gambo.web\dxcRoute.html .\release\dxcRoute.html
C:\prg\fart\fart .\release\dxcRoute.html "var serviceAddress = ''" "var serviceAddress = 'http://localhost:3000'"

cp ..\..\gambo.web\dxcRunner.html .\release\dxcRunner.html
C:\prg\fart\fart .\release\dxcRunner.html "var serviceAddress = ''" "var serviceAddress = 'http://localhost:3000'"

REM cp ..\..\gambo.web\gamboStats.html .\release\gamboStats.html
REM C:\prg\fart\fart .\release\gamboStats.html "var serviceAddress = ''" "var serviceAddress = 'http://localhost:3000'"

cd .\release
node .\gamboAPI.js
cd ..
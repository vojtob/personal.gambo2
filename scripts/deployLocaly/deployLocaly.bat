rmdir /S /Q .\release
mkdir .\release

cp -r ..\..\gambo .\release
cp ..\..\config\configLocal.js .\release\gambo\gambo.core\config.js
cp ..\..\mockAPI\gamboAPI.js .\release\gamboAPI.js

REM web app
cp ..\..\gambo.web\dxcRun.html .\release\dxcRun.html
C:\prg\fart\fart .\release\dxcRun.html "var serviceAddress = ''" "var serviceAddress = 'http://localhost:3000'"
cp ..\..\gambo.web\gamboStats.html .\release\gamboStats.html
C:\prg\fart\fart .\release\gamboStats.html "var serviceAddress = ''" "var serviceAddress = 'http://localhost:3000'"

cd .\release
node .\gamboAPI.js
cd ..
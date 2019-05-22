rmdir /S /Q .\release
mkdir .\release

cp -r ..\..\gambo .\release
cp ..\..\config\configAWS.js .\release\gambo\gambo.core\config.js
cp .\fillTableTeam.js .\release\fillTableTeam.js

cd .\release
node .\fillTableTeam.js
cd ..

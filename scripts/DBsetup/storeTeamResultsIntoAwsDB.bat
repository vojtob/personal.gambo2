rmdir /S /Q .\temp
mkdir .\temp

cp -r ..\..\gambo.core\ .\temp
cp ..\..\config\configAWS.js .\temp\gambo.core\config.js
cp .\fillTableTeam.js .\temp\fillTableTeam.js

cd .\temp
node .\fillTableTeam.js
cd ..

rmdir /S /Q .\temp
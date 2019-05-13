rmdir /S /Q .\release
mkdir .\release

cp -r ..\..\gambo .\release
cp ..\..\config\configLocal.js .\release\gambo\gambo.core\config.js
cp ..\..\mockAPI\gamboAPI.js .\release\gamboAPI.js
REM testovanie
cp ..\..\tests\testRunnerCalculator.js .\release\test.js

cd .\release
node .\test.js
cd ..
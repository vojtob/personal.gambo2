rm -r ../temp/runAPI
mkdir ../temp/runAPI
cd ../gambo.API/
cp -r . ../temp/runAPI
cd ../gambo.core/
cp -r . ../temp/runAPI
cd ../mockAPI/
cp -r . ../temp/runAPI
cd ../utils
node ../temp/runAPI/gamboAPI.js
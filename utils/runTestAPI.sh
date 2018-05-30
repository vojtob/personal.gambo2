rm -r ../temp/runAPI
mkdir ../temp/runAPI
cp ../gambo.API/index.js ../temp/runAPI/index.js
cp -r ../gambo.core/ ../temp/runAPI
cp ../mockAPI/gamboAPI.js ../temp/runAPI/gamboAPI.js
cp ../utils/configLocal.js ../temp/runAPI/gambo.core/config.js
node ../temp/runAPI/gamboAPI.js
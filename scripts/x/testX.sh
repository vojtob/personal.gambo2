rm -r ../temp/test
mkdir ../temp/test
cp ../tests/test.js ../temp/test/test.js
cp -r ../gambo.core/ ../temp/test
cp ../config/configLocal.js ../temp/test/gambo.core/config.js
node ../temp/test/test.js
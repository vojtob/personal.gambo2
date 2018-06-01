rm -r ../temp/runRunbot
mkdir ../temp/runRunbot
cp ../gambo.runbot/index.js ../temp/runRunbot/index.js
cp ../gambo.runbot/msg.js ../temp/runRunbot/msg.js
cp -r ../gambo.core/ ../temp/runRunbot
cp ../tests/testRunbot.js ../temp/runRunbot/testRunbot.js
cp ../config/configLocal.js ../temp/runRunbot/gambo.core/config.js
node ../temp/runRunbot/testRunbot.js
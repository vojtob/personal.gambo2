rm ../temp/gamboRunbot.zip
node ../utils/zipRunbot.js
aws lambda update-function-code --function-name gambo --zip-file  fileb://../temp/gamboRunbot.zip --publish 

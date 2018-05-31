rm ../temp/gamboAPI.zip
node ../utils/zipAPI.js
aws lambda update-function-code --function-name gambo --zip-file  fileb://../temp/gamboAPI.zip --publish 

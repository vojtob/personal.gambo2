rmdir /S /Q .\release
mkdir .\release
node .\zipAPI.js
aws lambda update-function-code --function-name gambo --zip-file  fileb://./release/gambo.zip --publish 

REM web app
cp ..\..\gambo.web\dxcRun.html .\release\dxcRun.html
C:\prg\fart\fart .\release\dxcRun.html "var serviceAddress = ''" "var serviceAddress = 'https://5ron7xepdc.execute-api.eu-central-1.amazonaws.com/prod'"
cp ..\..\gambo.web\gamboStats.html .\release\gamboStats.html
C:\prg\fart\fart .\release\gamboStats.html "var serviceAddress = ''" "var serviceAddress = 'https://5ron7xepdc.execute-api.eu-central-1.amazonaws.com/prod'"
aws s3 cp ./release/dxcRun.html s3://gambo-vojtob
aws s3 cp ./release/gamboStats.html s3://gambo-vojtob
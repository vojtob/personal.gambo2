rmdir /S /Q .\release
mkdir .\release
node .\zipAPI.js
aws lambda update-function-code --function-name gambo --zip-file  fileb://./release/gambo.zip --publish 

REM web app
cp ..\..\gambo.web\dxcHistory.html .\release\dxcHistory.html

cp ..\..\gambo.web\dxcRun.html .\release\dxcRun.html
C:\prg\fart\fart .\release\dxcRun.html "var serviceAddress = ''" "var serviceAddress = 'https://5ron7xepdc.execute-api.eu-central-1.amazonaws.com/prod'"

REM cp ..\..\gambo.web\gamboStats.html .\release\gamboStats.html
REM C:\prg\fart\fart .\release\gamboStats.html "var serviceAddress = ''" "var serviceAddress = 'https://5ron7xepdc.execute-api.eu-central-1.amazonaws.com/prod'"

cp ..\..\gambo.web\dxcRunner.html .\release\dxcRunner.html
C:\prg\fart\fart .\release\dxcRunner.html "var serviceAddress = ''" "var serviceAddress = 'https://5ron7xepdc.execute-api.eu-central-1.amazonaws.com/prod'"

aws s3 cp ./release/dxcHistory.html s3://gambo-vojtob
aws s3 cp ./release/dxcRun.html s3://gambo-vojtob
aws s3 cp ./release/dxcRunner.html s3://gambo-vojtob
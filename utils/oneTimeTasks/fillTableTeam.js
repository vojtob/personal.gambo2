var AWS = require("aws-sdk");
AWS.config.update({
    region: "eu-central-1",
    endpoint: "http://localhost:8000"
});
AWS.config.update({endpoint: "https://dynamodb.eu-central-1.amazonaws.com"});


var fs = require('fs');
var lineReader = require('readline');
var windows1250 = require('windows-1250');
var stream = require('stream');

var docClient = new AWS.DynamoDB.DocumentClient();

var bufferStream = new stream.PassThrough();

fs.readFile('./res/dataTheRunTeam.csv', function (err, buf) {
    bufferStream.end(windows1250.decode(buf.toString('binary')));
});

var lineReader = require('readline').createInterface({
    input: bufferStream
});

lineReader.on('line', function (line) {
    sline = line.split(";");

    var params = {
        TableName: "Team",
        Item: {
            "team": parseInt(sline[0]),
            "name": sline[1],
            "status" : {
                "startTimeKE": sline[2],
                "startTimeTeplicka": sline[3]
            },
            "category": sline[4]
        }
    }

    docClient.put(params, function (err, data) {
        if (err) {
            console.error("Unable to result", line, ". Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("Put Result succeeded:", line);
        }
    });
});

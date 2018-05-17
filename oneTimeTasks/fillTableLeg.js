var AWS = require("aws-sdk");
AWS.config.update({
    region: "eu-central-1",
    endpoint: "http://localhost:8000"
});


var fs = require('fs');
var lineReader = require('readline');
var windows1250 = require('windows-1250');
var stream = require('stream');

var docClient = new AWS.DynamoDB.DocumentClient();

var bufferStream = new stream.PassThrough();

fs.readFile('./res/legs.csv', function (err, buf) {
    if (err) {
        console.log('Problem s citanim file', err);
    } else {
        bufferStream.end(windows1250.decode(buf.toString('binary')));
    }
});

var lineReader = require('readline').createInterface({
    input: bufferStream
});

lineReader.on('line', function (line) {
    sline = line.split("\t");

    var params = {
        TableName: "Leg",
        Item: {
            "leg": parseInt(sline[0]),
            "from": sline[1],
            "to": sline[2],
            "distance": (parseFloat(sline[3].replace(',', '.')) / 1000).toFixed(2).replace('.',','),
            "up": parseFloat(sline[4].replace(',', '.')).toFixed(0),
            "down": parseFloat(sline[5].replace(',', '.')).toFixed(0)
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

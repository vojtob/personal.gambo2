var dataAccess = require('../../gambo/dataAccess');

var fs = require('fs');
var lineReader = require('readline');
var windows1250 = require('windows-1250');
var stream = require('stream');

var bufferStream = new stream.PassThrough();

fs.readFile('./res/dataTheRunTeam.csv', function (err, buf) {
    bufferStream.end(windows1250.decode(buf.toString('binary')));
});

var lineReader = require('readline').createInterface({
    input: bufferStream
});

lineReader.on('line', function (line) {
    console.log("uloz team " + line);
    sline = line.split(";");

    var params = {
        TableName: "TheRunTeam",
        Item: {
            "team": parseInt(sline[0]),
            "name": sline[1],
            "status": {
                "startTimeKE": sline[2],
                "startTimeTeplicka": sline[3]
            },
            "category": sline[4]
        }
    }

    dataAccess.generalPut(params, function (err, data) {
        if (err) {
            callback("Neviem ulozit team", err);
        } else {
            console.log("Team ulozeny uspesne: ", data);
        }
    });
});

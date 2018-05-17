var fs = require('fs');
var lineReader = require('readline');
var windows1250 = require('windows-1250');
var stream = require('stream');

var bufferStream = new stream.PassThrough();

fs.readFile('../res/dataTheRunTeam.csv', function (err, buf) {
    bufferStream.end(windows1250.decode(buf.toString('binary')));
});

var lineReader = require('readline').createInterface({
    // input: fs.createReadStream('../res/dataTheRunTeam.csv')
    input: bufferStream
  });
  
lineReader.on('line', function (line) {
    sline = line.split(";");
    // console.log(line);
    formattedLine = "{id:'" + sline[0] + "', name:'" + sline[1] + "', start: '" + sline[2] + "', category:'" + sline[3] + "'},";
    console.log(formattedLine);
  });


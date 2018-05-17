var msgParser = require('./msg');

var testInputs = [
    "Ahoj Vojto",
    "?",
    "Tim 10",
    "tím 008",
    "tim 120",
    "úsek 31",
    "Úsek 009",
    "usek 010",
    "Usek 021",
    "Usek 050",
    "Usek č. 050",
];

testInputs.forEach(msg => {
    msgParser.processMessage(msg, printReplyMessage);
});

function printReplyMessage(inMessage, outMessage) {
    console.log('IN: ' + inMessage);
    console.log('OUT: ' + outMessage);
}
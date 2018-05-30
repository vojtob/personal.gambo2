var msgParser = require('./msg');

var testInputs = [
    "Ahoj Vojto",
    "?",
    "Tim 10",
    "tím 008",
    "tim 120",
    "úsek 31",
    "Úsek 009",
    "Usek 050",
    "Usek č. 9",
    "Kde sme?",
    "kde sme?",
    "Kde sme",
    "Ako sa dari?",
    "ako",
    "kde"
];

testInputs.forEach(msg => {
    msgParser.processMessage(msg, printReplyMessage);
});

function printReplyMessage(inMessage, outMessage) {
    console.log('IN: ' + inMessage);
    console.log('OUT: ' + outMessage);
}
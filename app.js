var msgParser = require('./msg');

var testInputs = ["Ahoj Vojto",
"?",
"Tim 10",
"tím 008",
"tim 120",
"úsek 5",
"Úsek 009",
"usek 010",
"Usek 021",
"Usek 050",
"Usek č. 050",
];

testInputs.forEach(msg => {
    console.log('IN: ' + msg);
    console.log('OUT: ' + msgParser.processMessage(msg));    
    console.log(' ');
});
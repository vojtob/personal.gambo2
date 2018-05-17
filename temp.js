// const matchTim = /(t|T)im\s+\d+/;
const matchTim = /(tim|Tim|team|Team|tím|Tím)\s+\d+/;
const replaceTim = /(tim|Tim|team|Team|tím|Tím)\s+/;

var testInputs = ["tim 3",
"Tim 10",
"tim 010",
"tím 10",
"tim 12"];

testInputs.forEach(msg => {
    console.log('IN: ' + msg + " -> " + matchTim.test(msg));    
    console.log('IN: ' + msg + " -> " + msg.replace(replaceTim, ''));    
});


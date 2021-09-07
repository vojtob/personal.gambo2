var fs = require('fs');
var resultCalculator = require("./resultCalculator");

console.log(process.cwd());
fs.readFile('teamResult.json', 'utf8', function (err, data) {
    if (err) {
        console.error("ERROR: Unable to read team results ", JSON.stringify(err, null, 2));
    } else {
        teamResults = JSON.parse(data);
        console.log("OK: team result read from file");
        // recalculate legs
        teamResults = resultCalculator.recalculate(teamResults);
        console.log("OK: team result recalculated");
        fs.writeFile('teamResult2.json', JSON.stringify(teamResults, null, 4), 'utf8', function (err, data) {
            if (err) {
                console.error("ERROR: Unable to write team results ", JSON.stringify(err, null, 2));
            } else {
                console.log('data written');
            }
        })
    }
});
var fs = require('fs');
var dataAccess = require('./gambo.core/dataAccess');
var resultCalculator = require("./gambo.core/resultCalculator");

console.log(process.cwd());

fs.readFile('../../../VltavaRun/res/2019-teamResult.js', 'utf8', function (err, data) {
    if (err) {
        console.error("ERROR: Unable to read team results ", JSON.stringify(err, null, 2));
    } else {
        teamResults = JSON.parse(data);
        console.log("OK: team result read from file");
        // recalculate legs
        teamResults = resultCalculator.recalculate(teamResults);
        console.log("OK: team result recalculated");
        console.log(teamResults.legs[0]);
        dataAccess.putTeam(teamResults, function (err, data) { 
            if (err) {
                console.error("ERROR: Unable to store team results into DB ", err);
            } else {
                console.log("OK: team result stored in DB");
            }
        });
    }
});
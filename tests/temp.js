var fs = require('fs');
// var st = require("../gambo.core/simpleTime");
var legCalculator = require("../gambo.core/resultCalculator");

fs.readFile('VltavaRun/res/2019-teamResult.js', 'utf8', function (err, data) {
    if (err) {
        console.error("Unable to read route ", JSON.stringify(err, null, 2));
    } else {
        teamResults = JSON.parse(data);
        // leg = teamResults.legs[0];
        // delete teamResults.legs;
        // teamResults.legs = [];
        // teamResults.legs[0] = leg;
        // console.log(teamResults.legs[0]);
        teamResults = legCalculator.recalculate(teamResults);
        delete teamResults.legs;
        console.log(teamResults);
    }
});

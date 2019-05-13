// var fs = require('fs');
// var st = require("../gambo.core/simpleTime");
var dataAccess = require("./gambo/gambo.core/dataAccess");
var legCalculator = require("./gambo/gambo.core/resultCalculator");

dataAccess.getTeam(100, function (err, data) {
    teamResults = data;
    teamResults = legCalculator.recalculate(teamResults);
    console.log(teamResults.runners);
});
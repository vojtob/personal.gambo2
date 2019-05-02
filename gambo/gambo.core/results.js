var st = require("./simpleTime");
var dataAccess = require('./dataAccess');
var resultCalculator = require('./resultCalculator');

function getResult(teamID, legID, callback) {
    dataAccess.getTeam(teamID, function (err, team) {
        if (err) {
            callback(err, "Nepodarilo sa mi zistiť info o tíme, skús prosím ešte raz.");
        } else {
            callback(null, team.legs[legID - 1]);
        }
    });
}

function getTeamResult(teamID, callback) {
    dataAccess.getTeam(teamID, function (err, team) {
        if (err) {
            callback(err, "Nepodarilo sa mi zistiť info o tíme, skús prosím ešte raz.");
        } else {
            callback(null, team);
        }
    });
}

function setRealDuration(teamID, legID, duration, callback) {
    dataAccess.getTeam(teamID, function (err, team) {
        if (err) {
            callback(err, "Nepodarilo sa mi zistiť info o tíme, skús prosím ešte raz.");
        } else {
            // set real duration
            team.legs[legID - 1].realDuration = duration;
            team = resultCalculator.recalculate(team);
            // store new results
            dataAccess.putTeam(team, callback);
        }
    });
}

function clearRealDuration(teamID, legID, callback) {
    dataAccess.getTeam(teamID, function (err, team) {
        if (err) {
            callback(err, "Nepodarilo sa mi zistiť info o tíme, skús prosím ešte raz.");
        } else {
            // delete real duration
            delete team.legs[legID - 1].realDuration;
            team = resultCalculator.recalculate(team);
            // store new results
            dataAccess.putTeam(team, callback);
        }
    });
}

function setPlannedTempo(teamID, leg, tempo, callback) {
    dataAccess.getTeam(teamID, function (err, team) {
        if (err) {
            callback(err, null);
        } else {
            team.legs[leg - 1].plannedTempo = tempo;
            team = resultCalculator.recalculate(team);
            dataAccess.putTeam(team, callback);
        }
    });
}

function setStart(teamID, startTime, callback) {
    dataAccess.getTeam(teamID, function (err, team) {
        if (err) {
            callback(err, null);
        } else {
            // set real duration
            team.startTimes[0] = startTime;
            team = resultCalculator.recalculate(team);
            // store new results
            dataAccess.putTeam(team, callback);
        }
    });
}

function recalculate(teamID, callback) {
    dataAccess.getTeam(teamID, function (err, team) {
        if (err) {
            callback(err, null);
        } else {
            team = recalculateLegs(team);
            // store new results
            dataAccess.putTeam(team, function (err, data) { callback(err, data); });
        }
    });
}

exports.getResult = getResult;
exports.getTeamResult = getTeamResult;

exports.setRealDuration = setRealDuration;
exports.clearRealDuration = clearRealDuration;
exports.setPlannedTempo = setPlannedTempo;
exports.setStart = setStart;

exports.recalculate = recalculate;

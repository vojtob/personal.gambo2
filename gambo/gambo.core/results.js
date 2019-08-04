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
            // ensure good format
            duration = st.secToDuration(st.timeToSec(duration));
            team.legs[legID - 1].realDuration = duration;
            team = resultCalculator.recalculate(team);
            // store new results
            dataAccess.putTeam(team, callback);
        }
    });
}

function setRealEndTime(teamID, legID, realEndTime, callback) {
    dataAccess.getTeam(teamID, function (err, team) {
        if (err) {
            callback(err, "Nepodarilo sa mi zistiť info o tíme, skús prosím ešte raz.");
        } else {
            leg = team.legs[legID - 1];
            duration = st.timeToSec(realEndTime) - st.timeToSec(leg.startTime);
            if(duration < 0) {
                duration += st.timeToSec("24:00:00");
            }
            duration = st.secToDuration(duration);
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
            // ensure good format
            tempo = st.secToTempo(st.timeToSec(tempo));
            team.legs[leg - 1].plannedTempo = tempo;
            team = resultCalculator.recalculate(team);
            dataAccess.putTeam(team, callback);
        }
    });
}

function setStart(teamID, legID, startTime, callback) {
    dataAccess.getTeam(teamID, function (err, team) {
        if (err) {
            callback(err, null);
        } else {
            // set real duration
            // ensure good format
            startTime = st.secToTime(st.timeToSec(startTime));
            team.startTimes[legID-1] = startTime;
            team = resultCalculator.recalculate(team);
            // store new results
            dataAccess.putTeam(team, callback);
        }
    });
}

function clearStart(teamID, legID, callback) {
    dataAccess.getTeam(teamID, function (err, team) {
        if (err) {
            callback(err, null);
        } else {
            // set real duration
            delete team.startTimes[legID-1];
            team = resultCalculator.recalculate(team);
            // store new results
            dataAccess.putTeam(team, callback);
        }
    });
}

function setDistance(teamID, legID, distance, callback) {
    dataAccess.getTeam(teamID, function (err, team) {
        if (err) {
            callback(err, null);
        } else {
            // set leg distance
            team.legs[legID - 1].distance = Math.round(parseFloat(distance) * 100) / 100;
            team = resultCalculator.recalculate(team);
            // store new results
            dataAccess.putTeam(team, callback);
        }
    });
}

function setRunner(teamID, legID, runner, callback) {
    dataAccess.getTeam(teamID, function (err, team) {
        if (err) {
            callback(err, null);
        } else {
            // set leg distance
            team.legs[legID - 1].runnerName = runner;
            // ak sa prepocitavaju vysledky bezcov ...
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
exports.setRealEndTime = setRealEndTime;
exports.clearRealDuration = clearRealDuration;
exports.setPlannedTempo = setPlannedTempo;
exports.setStart = setStart;
exports.clearStart = clearStart;
exports.setDistance = setDistance;
exports.setRunner = setRunner;

exports.recalculate = recalculate;

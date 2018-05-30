'use strict';

// var st = require("./simpleTime");
var dataAccess = require('./dataAccess');

function getTeam(teamID, callback) {
    dataAccess.getTeam(teamID, function(err, team) {
        if (err) {
            callback(err, null);
        } else {
            callback(null, team);
        }
    })
}

function getLeg(legID, callback) {
    dataAccess.getLeg(legID, function(err, leg) {
        if (err) {
            callback(err, null);
        } else {
            callback(null, leg);
        }
    })
}

exports.getTeam = getTeam;
exports.getLeg = getLeg;
"use strict";

var dataAccess = require('./dataAccess');

const defaultMessage = "Ahoj, tu je runbot od DXC Technology. Skús sa ma niečo opýtať, napríklad: tim 29 alebo úsek 13"

//////////////////////
// Known messages
/////////////////////
const matchTim = /(tim|Tim|team|Team|tím|Tím)\s+\d+/;
const replaceTim = /(tim|Tim|team|Team|tím|Tím)\s+/;

const matchLeg = /(usek|Usek|úsek|Úsek|leg|Leg)\s+\d+/;
const replaceLeg = /(usek|Usek|úsek|Úsek|leg|Leg)\s+/;



function processMessage(message, callback) {
    if (matchTim.test(message)) {
        // chce info o time
        var teamNumber = parseInt(message.replace(replaceTim, ''));

        dataAccess.getTeam(teamNumber, function (err, team) {
            if(err) {
                callback(message, "Nepodarilo sa mi zistiť info o tíme, skús prosím ešte raz.");
            } else {
                callback(message, formatTeam(team));
            }
        })
    } else if (matchLeg.test(message)) {
        // chce info o useku
        var legNumber = parseInt(message.replace(replaceLeg, ''));

        dataAccess.getLeg(legNumber, function (err, leg) {
            if(err) {
                callback(message, "Nepodarilo sa mi zistiť info o tomto úseku, skús prosím ešte raz.");
            } else {
                callback(message, formatLeg(leg));
            }
        })
    } else {
        callback(message, defaultMessage);
    }
}

function formatTeam(team) {
    if(team == undefined) {
        return "O tíme sa takýmto číslom neviem, skús iné číslo";
    }
    return "Tím " + team.team + " sa volá " + team.name + ". Štartoval o " + team.startTimeKE + " v kategórii " + team.category;
}

function formatLeg(leg) {
    if (leg == undefined) {
        return "Takýto úsek neexistuje, skús medzi 1 a 48.";
    }
    return "Úsek " + leg.leg + ": " + leg.from + " - " + leg.to + " meria " + leg.distance + " km. Stúpanie " + leg.up + " m, klesanie " + leg.down + " m.";
}

exports.processMessage = processMessage;
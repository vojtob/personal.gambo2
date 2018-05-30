"use strict";

var dataAccess = require('./gambo.core/dataAccess');

const defaultMessage = "Ahoj, tu je runbot od DXC Technology. Skús sa ma niečo opýtať, napríklad: tim 29 alebo úsek 13"

//////////////////////
// Known messages
/////////////////////
const matchTim = /(tim|Tim|team|Team|tím|Tím)\s+\d+/;
const replaceTim = /(tim|Tim|team|Team|tím|Tím)\s+/;

const matchLeg = /(usek|Usek|úsek|Úsek|leg|Leg)\s+\d+/;
const replaceLeg = /(usek|Usek|úsek|Úsek|leg|Leg)\s+/;

const matchWhere = /(K|k)d?e?\s?s?m?e?\??/;

const matchHow = /(A|a)ko\s?(to|sa)?\s?(ide|dari|darí)?\??/;


function processMessage(message, callback) {
    if (matchTim.test(message)) {
        // chce info o time
        var teamNumber = parseInt(message.replace(replaceTim, ''));

        dataAccess.getTeam(teamNumber, function (err, team) {
            if (err) {
                callback(message, "Nepodarilo sa mi zistiť info o tíme, skús prosím ešte raz.");
            } else {
                callback(message, formatTeam(team));
            }
        })
    } else if (matchLeg.test(message)) {
        // chce info o useku
        var legNumber = parseInt(message.replace(replaceLeg, ''));

        dataAccess.getLeg(legNumber, function (err, leg) {
            if (err) {
                callback(message, "Nepodarilo sa mi zistiť info o tomto úseku, skús prosím ešte raz.");
            } else {
                callback(message, formatLeg(leg));
            }
        })
    } else if (matchWhere.test(message)) {
        // chce vediet kde sme
        dataAccess.getTeam(29, function (err, team) {
            if (err) {
                callback(message, "Nepodarilo sa mi zistiť info o tíme, skús prosím ešte raz.");
            } else {
                var index = team.status.lastLegDone;
                var text = "Práve bežíme úsek č. " + (index+1);
                callback(message, formatWhere(team));
            }
        })
    } else if (matchHow.test(message)) {
        // chce vediet ako sa nam dari
        dataAccess.getTeam(29, function (err, team) {
            if (err) {
                callback(message, "Nepodarilo sa mi zistiť info o tíme, skús prosím ešte raz.");
            } else {
                callback(message, formatHow(team));
            }
        })
    } else {
        callback(message, defaultMessage);
    }
}

function formatTeam(team) {
    if (team == undefined) {
        return "O tíme sa takýmto číslom neviem, skús iné číslo";
    }
    return "Tím " + team.team + " sa volá " + team.name + ". Štartoval o " + team.status.startTimeKE + " v kategórii " + team.category;
}

function formatLeg(leg) {
    if (leg == undefined) {
        return "Takýto úsek neexistuje, skús medzi 1 a 48.";
    }
    // console.log("format leg: " + JSON.stringify(leg));
    return "Úsek " + leg.legID + ". " + leg.name_from + " - " + leg.name_to +
        " meria " + (leg.distance / 1000).toFixed(2) + 
        " km. Stúpanie " + leg.incline.toFixed(0) + 
        " m, klesanie " + leg.decline.toFixed(0) + " m.";
}

function formatWhere(team) {
    var index = team.status.lastLegDone;
    var text = "Práve bežíme úsek č. " + (index+2);
    return text;
}

function formatHow(team) {
    var index = team.status.lastLegDone;
    var text = "Darí sa nám výborne. Práve bežíme úsek č. " + (index+2);
    return text;
}

exports.processMessage = processMessage;
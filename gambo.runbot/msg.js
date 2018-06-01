"use strict";

var dataAccess = require('./gambo.core/dataAccess');

const defaultMessage = "Ahoj, tu je runbot od DXC Technology. Skús sa ma niečo opýtať, napríklad: 'úsek 13' alebo 'kde sme'"

//////////////////////
// Known messages
/////////////////////
const matchTim = /(tim|Tim|team|Team|tím|Tím)\s+\d+/;
const replaceTim = /(tim|Tim|team|Team|tím|Tím)\s+/;

const matchLeg = /(usek|Usek|úsek|Úsek|leg|Leg)\s+\d+/;
const replaceLeg = /(usek|Usek|úsek|Úsek|leg|Leg)\s+/;

const matchWhere = /(Kde|kde)((\s)+sme)\s*\??/;

const matchHow = /(A|a)ko\s+(to|sa)?\s?(ide|dari|darí)?\??/;

const matchWhy = /(.)*(P|p)re(c|č)o(.)*/;

function processMessage(message, callback) {
    console.log('message: ' + message);
    // if (matchTim.test(message)) {
    //     // chce info o time
    //     console.log('chce info o teame');
    //     var teamNumber = parseInt(message.replace(replaceTim, ''));

    //     dataAccess.getTeam(teamNumber, function (err, team) {
    //         if (err) {
    //             callback(message, "Nepodarilo sa mi zistiť info o tíme, skús prosím ešte raz.");
    //         } else {
    //             callback(message, formatTeam(team));
    //         }
    //     })
    // } else if (matchLeg.test(message)) {
    if (matchLeg.test(message)) {
        // chce info o useku
        console.log('chce info o useku');
        var legNumber = parseInt(message.replace(replaceLeg, ''));

        dataAccess.getTeam(29, function (err, team) {
            // dataAccess.getLeg(legNumber, function (err, leg) {
            if (err) {
                callback(message, "Nepodarilo sa mi zistiť info o tomto úseku, skús prosím ešte raz.");
            } else {
                callback(message, formatLeg(team, legNumber));
            }
        })
    } else if (matchWhere.test(message) || matchHow.test(message)) {
        // chce vediet kde sme
        console.log('chce kde sme');
        dataAccess.getTeam(29, function (err, team) {
            if (err) {
                callback(message, "Nepodarilo sa mi zistiť info o tíme, skús prosím ešte raz.");
            } else {
                var index = team.status.lastLegDone;
                var text = "Práve bežíme úsek č. " + (index + 1);
                callback(message, formatWhere(team));
            }
        })
    } else if (matchWhy.test(message)) {
        callback(message, "Prečo? A prečo práve ja? A prečo v takom teple? A prečo musí pršať? A prečo do kopca? A prečo je to ďaleko? A prečo ... Lebo presne takto sme to chceli. Určite.");
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

function formatLeg(team, legNumber) {
    legNumber -= 1;
    var leg = team.legs[legNumber];
    if (leg == undefined) {
        return "Takýto úsek neexistuje, skús medzi 1 a 48.";
    }
    var text = "Úsek " + leg.legID + ". " + leg.from + " - " + leg.to +
        " meria " + leg.distance +
        " km, stúpanie " + leg.up +
        " m, klesanie " + leg.down + " m, náročnosť: " + leg.difficulty + '.';

    if (legNumber <= team.status.lastLegDone) {
        // odbehnuty usek
        var zabehol;
        if ((leg.runnerName.slice(-1) == 'a') || (leg.runnerName.slice(-1) == 'á')) {
            zabehol = ' Zabehla ';
        } else {
            zabehol = ' Zabehol ';
        };
        text += zabehol + 'ho ' + leg.runnerName + ' za ' + leg.realDuration + getDiffText(leg.diff) +
            ' tempom ' + leg.realTempo;
    } else {
        // bude sa bezat, alebo bezi sa
        text += ' Pobeží ho ' + leg.runnerName + ' za ' + leg.plannedDuration +
            ' tempom ' + leg.plannedTempo + ' o ' + leg.startTime;
    }
    text += '.';


    return text;
}

function formatWhere(team) {
    var legNumber = team.status.lastLegDone + 1;
    var text;
    if (legNumber == 48) {
        // sme v cieli
        text = "Sme v cieli!!! Celkový čas " + status.totalRealDuration + getDiffText(team.status.totalDiff)
        ', priemerné tempo ' + team.status.tempo;
} else {
        // bezime
        var leg = team.legs[legNumber];
        text = 'Od ' + leg.startTime + ' ' + leg.runnerName + ' beží úsek č. ' + (legNumber + 1) +
            ': ' + leg.from + " - " + leg.to +
            ", ktorý meria " + leg.distance +
            " km, stúpanie " + leg.up +
            " m, klesanie " + leg.down + " m, náročnosť: " + leg.difficulty + '.';
            text += '\nDržíme palce, chce to zabehnúť za ' + leg.plannedDuration +
            ' tempom ' + leg.plannedTempo + ', na odovzdávke bude o ' + leg.endTime + '.';
            if(legNumber == 47) {
                text += '\nToto je náš posledný úsek, o chvíľu sme v cieli !!!!';
            } else {
                text += '\nV cieli budeme zhruba o ' + team.legs[47].endTime + '. Predpokladaný celkový čas ' + team.status.totalRealDuration + getDiffText(team.status.totalDiff) + '.';
            }
    }
    if (leg == undefined) {
        return "Takýto úsek neexistuje, skús medzi 1 a 48.";
    }

    var index = team.status.lastLegDone;
    return text;
}

function getDiffText(diff) {
    var plusSign;

    if (diff.startsWith('-') || diff.startsWith('0:00:00')) {
        plusSign = "";
    } else {
        plusSign = "+";
    };

    return ' (' + plusSign + diff + ')';
}

exports.processMessage = processMessage;
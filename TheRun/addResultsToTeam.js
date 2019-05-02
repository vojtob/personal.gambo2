var AWS = require("aws-sdk");
var resultAPI = require("../../gambo/results");
var dataAccess = require('../../gambo/dataAccess');

// read team data
var lineReader = require('readline');
var team;

dataAccess.getTeam(29, function (err, dataTeam) {
    if (err) {
        callback(message, "Nepodarilo sa mi zistiť info o tíme, skús prosím ešte raz.");
    } else {
        console.log("Team: ", JSON.stringify(dataTeam));
        // nacitany aj tim, mozme pridat vysledky do timu
        addLegsToTeam(dataTeam);
    }
});

function addLegsToTeam(team) {
    if (!team.legs) {
        team.legs = [];
    }

    var stream = require('stream');
    var bufferStream = new stream.PassThrough();
    var fs = require('fs');
    var windows1250 = require('windows-1250');
    fs.readFile('./res/dataTheRunGula.csv', function (err, buf) {
        if (err) {
            console.log(err);
        } else {
            bufferStream.end(windows1250.decode(buf.toString('binary')));
        }
    });
    lineReader = require('readline').createInterface({
        input: bufferStream
    });

    lineReader.on('line', function (line) {
        // add result for the team
        console.log("spracuj vysledok: " + line);
        sline = line.split(";");
        var legIndex = parseInt(sline[0]);
        var leg = {
            runnerName: sline[1],
            plannedDuration: sline[5],
            legID: legIndex
        }
        console.log("Vytvoreny leg", JSON.stringify(leg));
        team.legs.push(leg);
        if (team.legs.length == 48) {
            pridajPopisLegov(team);
        }
    });

}

function pridajPopisLegov(team) {
    console.log("Vytvorene legy s bezcami, idem doplnit popisy");
    dataAccess.getLegs(function (err, legsDefinition) {
        if (err) {
            console.error("Nenacitane legs:", JSON.stringify(err, null, 2));
        } else {
            legsDefinition.forEach(legDefinition => {
                console.log("leg def: ", JSON.stringify(legDefinition));
                var leg = team.legs[legDefinition.legID-1];
                // leg.distance = parseFloat(legDefinition.distance.replace(',', '.'));
                leg.distance = parseFloat((legDefinition.distance / 1000).toFixed(2));
                leg.from = legDefinition.name_from;
                leg.to = legDefinition.name_to;
                leg.up = legDefinition.incline.toFixed(0);
                leg.down = legDefinition.decline.toFixed(0);
                if(legDefinition.description.startsWith('>')) {
                    legDefinition.description = legDefinition.description.slice(1);
                }
                leg.desc = legDefinition.description.split('>');
                leg.gpxfromLat = legDefinition.fromPoint.data.lat;
                leg.gpxfromLng = legDefinition.fromPoint.data.lng;
                leg.gpxtoLat = legDefinition.toPoint.data.lat;
                leg.gpxtoLng = legDefinition.toPoint.data.lng;
                leg.difficulty = legDefinition.difficulty;
            });
            console.log("Doplnene definicie legov, idem to ulozit");
            team.legs = team.legs.sort(function (a, b) {
                return a.legID - b.legID;
            })
            console.log("Utriedene legy pre prepocitanim", JSON.stringify(team.legs, null, 2));
            team = resultAPI.recalculateLegs(team);
            console.log("Prepocitane legy", JSON.stringify(team.legs, null, 2));
            // store new results
            dataAccess.putTeam(team, function(err, data) {
                if(err) {
                    console.error("Nepodarilo sa ulozit legs:", JSON.stringify(err, null, 2));
                } else {
                    console.log("DONE");
                }
            })
        }
    });
}


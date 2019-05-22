var info = require("./gambo.core/info");
var results = require("./gambo.core/results");

exports.handler = (event, context, callback) => {
    console.log('Received event: ' + JSON.stringify(event));

    if ((event.httpMethod == "GET") && (event.resource == "/legs")) {
        // get legs
        getLegs(event, context, callback);
    } else if ((event.httpMethod == "GET") && (event.resource == "/teams")) {
        // get teams
        getTeams(event, context, callback);
    } else if ((event.httpMethod == "GET") && (event.resource == "/results")) {
        // get results
        getResults(event, context, callback);
    } else if ((event.httpMethod == "POST") && (event.resource == "/results")) {
        // get results
        postResults(event, context, callback);
    } else if ((event.httpMethod == "DELETE") && (event.resource == "/results")) {
        // get results
        deleteResults(event, context, callback);
    } else if ((event.httpMethod == "POST") && (event.resource == "/plan")) {
        // change plan
        processPlan(event, context, callback);
    } else {
        var problem = { message: "nezname volanie" };
        sendError(problem, callback);
    }
};

function getLegs(event, context, callback) {
    if (event.queryStringParameters === null || event.queryStringParameters === undefined) {
        // bez parametrov
        sendLegs(callback);
        return;
    }

    if (checkParam(event.queryStringParameters, "legID")) {
        var legID = parseInt(event.queryStringParameters.legID);
        console.log("GET results for legID: " + legID);
        info.getLeg(legID, function (err, leg) {
            if (err) {
                sendError(err, callback);
            } else {
                sendLeg(leg, callback);
            }
        });
    } else {
        sendLegs(callback);
    }
}

function getTeams(event, context, callback) {
}

function getResults(event, context, callback) {
    console.log("process results");
    if (event.queryStringParameters === null || event.queryStringParameters === undefined) {
        // bez parametrov
        sendError({ message: "neviem ake vysledky chces" }, callback);
        return;
    }
    if (!checkParam(event.queryStringParameters, "teamID")) {
        sendError({ message: "musi byt definovane teamID" }, callback);
        return;
    }
    var teamID = parseInt(event.queryStringParameters.teamID);
    console.log("Request results for team: " + teamID);

    if (checkParam(event.queryStringParameters, "legID")) {
        // vysledky teamu na useku
        var legID = parseInt(event.queryStringParameters.legID);
        console.log("Request result for legID: " + legID);
        results.getResult(teamID, legID, function (err, result) {
            if (err) {
                sendError(err, callback);
                return;
            } else {
                sendOK(result, callback);
                return;
            }
        });
    } else {
        // kompletne vysledky teamu
        console.log("Request team results");
        results.getTeamResult(teamID, function (err, result) {
            if (err) {
                console.log("error get Team ", JSON.stringify(err));
                sendError(err, callback);
                return;
            } else {
                sendOK(result, callback);
                return;
            }
        });
    }
}

function postResults(event, context, callback) {
    console.log("post results processing ...");
    if (event.queryStringParameters === null || event.queryStringParameters === undefined) {
        // bez parametrov
        console.log("neda sa zaslat vysledok bez parametrov");
        sendError({ message: "neda sa zaslat vysledok bez parametrov" }, callback);
        return;
    }
    if (!checkParam(event.queryStringParameters, "teamID")) {
        console.log("pre zadanie vysledku musi byt definovany team");
        sendError({ message: "pre zadanie vysledku musi byt definovany team" }, callback);
        return;
    }
    var teamID = parseInt(event.queryStringParameters.teamID);
    console.log("Post results for team: " + teamID);

    if (!checkParam(event.queryStringParameters, "legID")) {
        console.log("pre zadanie vysledku musi byt definovany leg");
        sendError({ message: "pre zadanie vysledku musi byt definovany leg" }, callback);
        return;
    }
    var legID = parseInt(event.queryStringParameters.legID);
    console.log("Post results for leg: " + legID);

    if (!checkParam(event.queryStringParameters, "legDuration")) {
        // vymazanie useku
        console.log("prevolam zmazanie useku");
        deleteResults(event, context, callback)
        // console.log("pre zadanie vysledku musi byt zadana legDuration");
        // sendError({ message: "pre zadanie vysledku musi byt zadana legDuration" }, callback);
        return;
    }
    var legDuration = event.queryStringParameters.legDuration;
    console.log("set leg " + legID + " to " + legDuration + " for team " + teamID);

    results.setRealDuration(teamID, legID, legDuration, function (err, result) {
        if (err) {
            console.log("could not set leg duration");
            console.log(JSON.stringify(err));
            sendError(err, callback);
            return;
        } else {
            console.log("leg duration set successfully");
            // console.log(JSON.stringify(result));
            sendOK("OK", callback);
            return;
        }
    });
}

function deleteResults(event, context, callback) {
    console.log("delete results processing ...");
    if (event.queryStringParameters === null || event.queryStringParameters === undefined) {
        // bez parametrov
        console.log("neda sa zmazat vysledok bez parametrov");
        sendError({ message: "neda sa zmazat vysledok bez parametrov" }, callback);
        return;
    }
    if (!checkParam(event.queryStringParameters, "teamID")) {
        console.log("pre zmazat vysledku musi byt definovany team");
        sendError({ message: "pre zmazat vysledku musi byt definovany team" }, callback);
        return;
    }
    var teamID = parseInt(event.queryStringParameters.teamID);
    console.log("Delete results for team: " + teamID);

    if (!checkParam(event.queryStringParameters, "legID")) {
        console.log("pre zmazat vysledku musi byt definovany leg");
        sendError({ message: "pre zmazat vysledku musi byt definovany leg" }, callback);
        return;
    }
    var legID = parseInt(event.queryStringParameters.legID);
    console.log("Delete results for leg: " + legID);

    console.log("clear leg " + legID + " for team " + teamID);
    results.clearRealDuration(teamID, legID, function (err, result) {
        if (err) {
            console.log("could not clear leg duration");
            console.log(JSON.stringify(err));
            sendError(err, callback);
            return;
        } else {
            console.log("leg duration cleared successfully");
            // console.log(JSON.stringify(result));
            sendOK("OK", callback);
            return;
        }
    });
}

function processPlan(event, context, callback) {
    console.log("process plan");
    if (event.queryStringParameters === null || event.queryStringParameters === undefined) {
        // bez parametrov
        console.log("neda sa menit plan bez parametrov");
        sendError({ message: "neda sa menit plan bez parametrov" }, callback);
        return;
    }

    if (!checkParam(event.queryStringParameters, "teamID")) {
        console.log("pre upravu planu musi byt definovany team");
        sendError({ message: "pre upravu vysledku musi byt definovany team" }, callback);
        return;
    }
    var teamID = parseInt(event.queryStringParameters.teamID);
    console.log("Post plan for team: " + teamID);

    if (!checkParam(event.queryStringParameters, "legID")) {
        console.log("pre upravu planu musi byt definovany leg");
        sendError({ message: "pre upravu planu musi byt definovany leg" }, callback);
        return;
    }
    var legID = parseInt(event.queryStringParameters.legID);
    console.log("Post plan for leg: " + legID);

    if (checkParam(event.queryStringParameters, "tempo")) {
        // zmena planovaneho tempa
        var tempo = event.queryStringParameters.tempo;
        console.log("zmena planovaneho tempa na useku " + legID + " na " + tempo);
        results.setPlannedTempo(teamID, legID, tempo, function (err, result) {
            if (err) {
                console.log("could not set tempo");
                console.log(JSON.stringify(err));
                sendError(err, callback);
            } else {
                console.log("tempo set successfully");
                // console.log(JSON.stringify(result));
                sendOK("OK", callback);
            }
        });
        return;
    }

    if (checkParam(event.queryStringParameters, "dist")) {
        // zmena dlzky useku
        var dist = parseFloat(event.queryStringParameters.dist).toFixed(2);
        console.log("zmena dlzky useku " + legID + " na " + dist);
        results.setDistance(teamID, legID, dist, function (err, result) {
            if (err) {
                console.log("could not set distance");
                console.log(JSON.stringify(err));
                sendError(err, callback);
            } else {
                console.log("distance set successfully");
                // console.log(JSON.stringify(result));
                sendOK("OK", callback);
            }
        });
        return;
    }

    if (checkParam(event.queryStringParameters, "startTime")) {
        var startTime = event.queryStringParameters.startTime;
        console.log("zmena startu na useku " + legID + " na " + startTime);
        results.setStart(teamID, legID, startTime, function (err, result) {
            if (err) {
                console.log("could not set start");
                console.log(JSON.stringify(err));
                sendError(err, callback);
            } else {
                console.log("start set successfully");
                // console.log(JSON.stringify(result));
                sendOK("OK", callback);
            }
        });
        return;
    }  
    
    if (checkParam(event.queryStringParameters, "runner")) {
        var runner = event.queryStringParameters.runner;
        console.log("zmena bezca na useku " + legID + " na " + runner);
        results.setRunner(teamID, legID, runner, function (err, result) {
            if (err) {
                console.log("could not set runner");
                console.log(JSON.stringify(err));
                sendError(err, callback);
            } else {
                console.log("runner set successfully");
                // console.log(JSON.stringify(result));
                sendOK("OK", callback);
            }
        });
        return;
    }  
    
    // vymazanie start time, ak nie je nic zadane
    // nemazem prvy usek
    if(legID != 1) {
        console.log("vymazanie start useku " + legID);
        results.clearStart(teamID, legID, function (err, result) {
            if (err) {
                console.log("could not clear start time");
                console.log(JSON.stringify(err));
                sendError(err, callback);
            } else {
                console.log("start time cleared successfully");
                // console.log(JSON.stringify(result));
                sendOK("OK", callback);
            }
        });
    }
}

function sendLeg(leg, callback) {
    sendOK(leg, callback);
}

function sendLegs(callback) {
    console.log("no specific legID -> info about all legs");
    var legs = [];
    for (var i = 1; i < 49; i++) {
        legs.push(i);
    }
    sendOK(legs, callback);
}

function sendError(err, callback) {
    var response = {
        statusCode: 400,
        headers: {
            "Access-Control-Allow-Origin": "*"
        },
        body: JSON.stringify(err)
    };
    callback(err, response);
}

function sendOK(data, callback) {
    var response = {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Origin": "*"
        },
        body: JSON.stringify(data)
    };
    // console.log(response);
    callback(null, response);
}

function checkParam(queryStringParameters, paramName) {
    if (!queryStringParameters.hasOwnProperty(paramName)) {
        return false;
    }
    return (queryStringParameters[paramName] !== null &&
        queryStringParameters[paramName] !== "");
}


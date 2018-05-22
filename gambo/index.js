var info = require("./info");
var results = require("./results");

exports.handler = (event, context, callback) => {
    console.log('Received event a: ' + JSON.stringify(event));
    
    if((event.httpMethod == "GET") && (event.resource == "/legs")) {
        // get legs
        processLegs(event, context, callback);
    } else if((event.httpMethod == "GET") && (event.resource == "/teams")) {
        // get teams
        processTeams(event, context, callback);
    } else if((event.httpMethod == "GET") && (event.resource == "/results")) {
        // get results
        processResults(event, context, callback);
    } else {
        var problem = { message : "nezname volanie"};
        sendError(problem, callback);
    }
};

function processLegs(event, context, callback) {
    if (event.queryStringParameters === null || event.queryStringParameters === undefined) {
        // bez parametrov
        sendLegs(callback);
    }

    if(checkParam(event.queryStringParameters, "legID")) {
        var legID = parseInt(event.queryStringParameters.legID);
        console.log("Received legID: " + legID);
        info.getLeg(legID, function(err, leg) {
            if(err) {
                sendError(err, callback);
            } else {
                sendLeg(leg, callback);
            }
        });
    } else {
        sendLegs(callback);
    }
}

function processTeams(event, context, callback) {
}

function processResults(event, context, callback) {
    if (event.queryStringParameters === null || event.queryStringParameters === undefined) {
        // bez parametrov
        sendError({message:"neviem ake vysledky chces"}, callback);
    }
    
    if(checkParam(event.queryStringParameters, "legID")) {
        var legID = parseInt(event.queryStringParameters.legID);
        console.log("Request result for legID: " + legID);
        results.getResult(29, legID, function(err, result) {
            if(err) {
                sendError(err, callback);
            } else {
                sendResult(result, callback);
            }
        });
    } else {
        sendError({message:"neviem ake vysledky chces"}, callback);
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

function sendResult(result, callback) {
    sendOK(result, callback);
}

function sendError(err, callback) {
    var response = {
        statusCode: 400,
        headers: {
            "Access-Control-Allow-Origin" : "*"
        },            
        body: JSON.stringify(err)
    };
    callback(err, response);
}

function sendOK(data, callback) {
   var response = {
        statusCode:200,
        headers: {
            "Access-Control-Allow-Origin" : "*"
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


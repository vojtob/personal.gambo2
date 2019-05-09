express = require('express');
app = express();

lambda = require("./gambo/index");

app.get('/', function(req, res) {
    processGeneral(req, res);
});

app.post('/', function(req, res) {
    processGeneral(req, res);
});

app.post('/results', function(req, res) {
    processRequest(req, res);
});

app.get('/results', function(req, res) {
    processRequest(req, res);
});

app.delete('/results', function(req, res) {
    processRequest(req, res);
});

app.get('/legs', function(req, res) {
    processRequest(req, res);
});

app.post('/plan', function(req, res) {
    processRequest(req, res);
});

function processRequest(req, res) {
    console.log("gamboAPI event !! method: " + req.method + "  path: " + req.path);
    var event = {};
    event.httpMethod = req.method;
    event.resource = req.path;
    event.queryStringParameters = req.query;
    console.log("simulate event: " + JSON.stringify(event));

    lambda.handler(event, null, function(err, response) {
        sendResponse(res, response);
    });
}

function processGeneral(req, res) {
    console.log("gamboAPI event, unknown resource !! method: " + req.method + "  path: " + req.path);
    console.log("req: " + JSON.stringify(req));
    res.send('Hello World!');
}


function sendResponse(res, response) {
    res.set("Access-Control-Allow-Origin", "*");
    res.json(JSON.parse(response.body));
}

app.listen(3000, () => console.log('Example app listening on port 3000!'));
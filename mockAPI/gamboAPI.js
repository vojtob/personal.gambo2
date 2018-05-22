const express = require('express');
const app = express();

const lambda = require("../gambo/index");

app.get('/', function(req, res) {
    res.send('Hello World!');
});

app.get('/results', function(req, res) {
    console.log(req);
    var event = {};
    event.httpMethod = "GET";
    event.resource = "/results";
    event.queryStringParameters = {};
    if(req.query.legID) {
        event.queryStringParameters.legID = req.query.legID;
    } else if (req.query.teamID) {
        event.queryStringParameters.teamID = req.query.teamID;
    }
    console.log(event);

    lambda.handler(event, null, function(err, response) {
        res.send(response.body);
    })
});

app.listen(3000, () => console.log('Example app listening on port 3000!'))


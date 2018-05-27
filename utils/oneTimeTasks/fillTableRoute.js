var fs = require('fs');
var dataAccess = require('../../gambo/dataAccess');

var route;
var params;
fs.readFile('route.js', 'utf8', function (err, data) {
    var i = 1;
    if (err) {
        console.error("Unable to read route ", JSON.stringify(err, null, 2));
    } else {
        route = JSON.parse(data);

        route.data.forEach(leg => {
            var legID = leg.id;
            delete leg['id'];
            leg.legID = parseInt(legID);
            // Object.defineProperty(leg, 'legID',
            //     Object.getOwnPropertyDescriptor(leg, 'id'));
            // delete leg['id'];

            console.log("process leg " + i + " " + leg.legID);
            i += 1;
            // console.log(leg);
            // store into db
            params = {
                TableName: "TheRunRoute",
                Item: leg
            }

            dataAccess.generalPut(params, function (err, data) {
                if (err) {
                    callback("Neviem ulozit leg", err);
                } else {
                    console.log("Leg ulozeny uspesne: ", data);
                }
            })
        });

    }
});
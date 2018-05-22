    var dataAccess = require("../gambo/dataAccess");

    dataAccess.getTeam(29, function(err, data) {
        console.log(JSON.stringify(data, null, 2));
    })

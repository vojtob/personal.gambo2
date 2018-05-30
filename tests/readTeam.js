    var dataAccess = require("../gambo.core/dataAccess");

    dataAccess.getTeam(29, function(err, data) {
        console.log(JSON.stringify(data, null, 2));
        // console.log(typeof parseFloat((data.distance / 1000).toFixed(2)));
    })

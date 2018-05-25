var dataAccess = require("../gambo/dataAccess");

// dataAccess.getLeg(9, function(err, data) {
//     console.log(JSON.stringify(data, null, 2));
// })

dataAccess.getLegs(function(err, data) {
    console.log(JSON.stringify(data, null, 2));
})

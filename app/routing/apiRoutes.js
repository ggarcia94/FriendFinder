// ===============================================================================
// LOAD DATA
// We are linking our routes to our friend array
// ===============================================================================

var friendsData = require("../data/friends");

// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function (app) {
    // API GET Requests
    // Below code handles when users "visit" a page.
    // In each of the below cases when a user visits a link
    // ---------------------------------------------------------------------------

    app.get("/api/friends", function (req, res) {
        res.json(friendsData);
    });


    // API POST Requests
    // Below code handles when a user submits a form and thus submits data to the server.
    // When a user submits form data (a JSON object)
    // ...the JSON is pushed to the appropriate JavaScript array
    // ---------------------------------------------------------------------------

    app.post("/api/friends", function (req, res) {
        // req.body is available since we're using the body-parser middleware
        var newFriend = req.body;
        var bestMatch = friendsData[0];
        var totalDifference = 50;

        for (var i = 0; i < friendsData.length; i++) {
            var totalDiffCurrent = findTotalDifference(newFriend.scores, friendsData[i].scores);
            if (totalDiffCurrent < totalDifference) {
                totalDifference = totalDiffCurrent;
                bestMatch = friendsData[i];
            }
            
        }

        //Add new friend to our friends database
        friendsData.push(newFriend);
        //Send response with the friend with the best match
        res.json(bestMatch);


    });


};

function findTotalDifference (arrOne, arrTwo) {
    var totalDifference = 0;
    for (var i =0; i < arrOne.length; i++) {
        numOne = Number(arrOne[i]);
        numTwo = Number(arrTwo[i]);
        var difference = Math.abs(numOne - numTwo);
        totalDifference = totalDifference + difference;
    }
    return (totalDifference);
}
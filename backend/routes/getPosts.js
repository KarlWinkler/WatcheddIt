module.exports = function(app, dbConnection){
    app.get('/posts', function(req, res){

        const dbConnect = dbConnection;
        const matchDocument = {
            listing_id: 10006542,
            last_modified: new Date(),
            session_id: 1,
            direction: "req.body.direction"
        };

        dbConnect
            .collection("listingsAndReviews")
            .find({}).limit(50)
            .toArray(function (err, result) {
                if (err) {
                    res.status(400).send("Error fetching listings!");
                } else {
                    res.json(result);
                }
            });
    });
}
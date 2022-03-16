const connect = require("../database.js");

exports.postComment = (req, res) => {
    if(req.session.user || req.session.admin){
        const dbConnect = connect.getDb();

        dbConnect
        .collection("commentEvents")
        .insertOne(json({
            "type":  "post",
            "data": req.body,
            'user': req.session.user.username,
            'timestamp': new Date().toISOString()
        }));

        res.sendStatus(200);
    }
    else{
        res.status(400).send("Can't POST comment, not logged in");
    }
}
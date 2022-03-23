const connect = require("../database.js");
const ObjectId = require('mongodb').ObjectId;

exports.getPostVotes = (req, res) => {
    const dbConnect = connect.getDb();
    console.log("getPostVotes " + req.params.postID)
    dbConnect.collection("PostVotes").aggregate([
        {
            '$match': {
                'postID': ObjectId(req.params.postID)
            }
        }, {
            '$group': {
                '_id': '$postID',
                'upVote': {
                    '$sum': {
                        '$cond': [
                            '$vote', 1, 0
                        ]
                    }
                },
                'downVote': {
                    '$sum': {
                        '$cond': [
                            '$vote', 0, 1
                        ]
                    }
                }
            }
        }, {
            '$project': {
                '_id': 0
            }
        }
    ])
        .toArray()
        .then(items => {
            res.json(items);
        })
        .catch(err => console.error(`Failed to find documents: ${err}`))
}

exports.getUserPostVotes = (req, res) => {
    console.log('getUserPostVotes')
    const dbConnect = connect.getDb();
    const postID = req.params.postID;
    const userID = req.session.user._id;
    dbConnect
        .collection("PostVotes")
        .find({"postID": ObjectId(postID), "userID": ObjectId(userID)}, {projection: {_id: 0, vote: 1}})
        .toArray()
        .then(items => {
            res.json(items);
        })
        .catch(err => console.error(`Failed to find documents: ${err}`))
}

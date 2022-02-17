const express = require("express");
const {MongoClient} = require("mongodb");

const app = express();

const connection = "mongodb+srv://user2:seng401@cluster0.pqb5x.mongodb.net/test";
const client = new MongoClient(connection, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

let dbConnection;

connectToServer();
function connectToServer(callback) {
    client.connect(function (err, db) {
      if (err || !db) {
      console.log(err)
        // return callback(err);
      }

      dbConnection = db.db("read");
      console.log("Successfully connected to MongoDB.");

    //   return callback();
    });
};


app.listen(3000, function(){
    console.log("server started");
});

require('./routes/routes.js')(app, dbConnection);



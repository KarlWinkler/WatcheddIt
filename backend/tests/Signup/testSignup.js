const chai = require('chai');
let {expect, assert} = require('chai');
var jp = require('jsonpath');
var mongoose = require('mongoose');
let chaiHttp = require('chai-http');
chai.use(chaiHttp);
const url = 'http://127.0.0.1:3000/api'
const connect = require("../../database.js")
var dbConnect

    before(async() => {
        await connect.connect();
    })

    after(() => connect.closeConnection());

describe('/POST signup', function() {

    // Test Case 04
    it('Signup with valid details', async function() {
      let res = await chai.request(url)
      .post('/signup/')
      .send({
        "username": "testuser",
        "password": "testpassword"
      })
      .set('Content-Type', 'application/json')
      expect(res).to.have.status(200);
      assert.equal(res.body.acknowledged, true, 'The document should have been inserted')
      assert.exists(res.body.insertedId, 'The document should have had an inserted ID')
    })

    // Test Case 05
    it('The new signup detail password should be obfuscated',  function(done) {
        console.log("dbconnect: " + dbConnect)
        dbConnect = connect.getDb()
        dbConnect.collection("users").findOne(
            {
                username: "testuser"
            }, function(err, result) 
            {
                if (err) throw err;
                assert.notEqual(result.password, "testpassword", 'The password should be obfuscated')
            }
        )

        // Remove the newly created user from the database
         dbConnect.collection("users").deleteOne(
            {
                username: "testuser"
            }, function (err, result)
            {
                if (err) throw err;
                done();
            }
        )
    })

  })






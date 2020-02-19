const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = 'mongodb://localhost:27017/'; // connection to the server
const dbname = 'conFusion'; // db previously created on the mdb prompt

MongoClient.connect(url, (err, client) => {
    //catching the error
    assert.equal(err,null);
    //else
    console.log('Connected correctly to server');

    const db = client.db(dbname);
    const collection = db.collection("dishes");
    collection.insertOne({"name": "Uthappizza", "description": "test"},
    (err, result) => {
        assert.equal(err,null);

        console.log("After Insert:\n");
        console.log(result.ops);

        collection.find({}).toArray((err, docs) => {
            assert.equal(err,null);
            
            console.log("Found:\n");
            console.log(docs);

            db.dropCollection("dishes", (err, result) => {
                assert.equal(err,null);

                client.close();
            });
        });
    });

});
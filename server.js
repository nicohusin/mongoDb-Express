const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");

const app = express();
const port = process.env.PORT || 3000;
const url = "mongodb://localhost:27017";
const dbName = "project-1";
let db;
const objectId = require("mongodb").ObjectID;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

MongoClient.connect(
  url,
  { userNewUrlParser: true, useUnifiedTopology: true },
  function(err, client) {
    assert.equal(null, err);
    console.log("Connected successfully to server");

    db = client.db(dbName);
  }
);

// const insertUser = (db, callback) => {
// app.get("/", (req, res) => res.send("BlackPink!!!!!!!!!"));
app.get("/", (req, res) => {
  db.collection("users")
    .find()
    .toArray((err, result) => {
      try {
        res.send(result);
      } catch (error) {
        console.log(err);
        console.log(error);
      }
    });
});

app.post("/", (req, res) => {
  db.collection("users").insertOne(
    {
      name: req.body.name,
      umur: req.body.umur,
      role: req.body.role,
      hobbies: ["dancing", "singing", "eating"]
    },

    (err, result) => {
      try {
        res.send(result);
      } catch (error) {
        // assert.equal(err, null);
        // callback(result);
        console.log(error);
        console.log(err);
      }
    }
  );
});

app.put("/:id", (req, res) => {
  // let id = req.params.id,
  // let = objectId()
  db.collection("users").updateOne(
    {
      _id: objectId(req.params.id)
    },
    {
      $set: {
        name: req.body.name,
        umur: req.body.umur,
        hobbies: ["dancing", "singing", "eating"]
      }
    },
    (err, result) => {
      try {
        res.send(result);
      } catch (error) {
        // assert.equal(err, null);
        // callback(result);
        console.log(error);
        console.log(err);
      }
    }
  );
});

app.delete("/:id", (req, res) => {
  db.collection("users").deleteOne(
    {
      _id: objectId(req.params.id)
    },
    (err, result) => {
      try {
        res.send(result);
      } catch (error) {
        // assert.equal(err, null);
        // callback(result);
        console.log(error);
        console.log(err);
      }
    }
  );
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

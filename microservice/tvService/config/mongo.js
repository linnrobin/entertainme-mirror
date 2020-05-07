const { MongoClient } = require("mongodb");
const url = "mongodb://localhost:27017";
const dbName = "entertainme-tv";
const client = new MongoClient(url, { useUnifiedTopology: true });

var db;
function connect(callback) {
  client.connect((err) => {
    if (err) {
      console.log("connection to mongodb failer", err);
    } else {
      db = client.db(dbName);
    }
    callback(err);
  });
}

function getDatabase() {
  return db;
}

module.exports = { connect, getDatabase };

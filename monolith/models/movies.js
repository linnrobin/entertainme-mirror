const { ObjectId } = require("mongodb");
const { getDatabase } = require("../config/mongo");
const db = getDatabase();
const Movies = db.collection("movies");

class Movie {
  static find() {
    return Movies.find().toArray();
  }

  static findById(id) {
    return Movies.findOne({ _id: ObjectId(id) });
  }

  static create(newCreate) {
    return Movies.insertOne(newCreate);
  }

  static delete(id) {
    return Movies.deleteOne({ _id: ObjectId(id) });
  }

  static put(id, newUpdate) {
    return Movies.updateOne({ _id: ObjectId(id) }, { $set: newUpdate });
  }
}

module.exports = Movie;

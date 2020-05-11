const { ObjectId } = require("mongodb");
const { getDatabase } = require("../config/mongo");
const db = getDatabase();
const Tvs = db.collection("tvs");

class Tv {
  static find() {
    return Tvs.find().toArray();
  }

  static findById(id) {
    return Tvs.findOne({ _id: ObjectId(id) });
  }

  static create(newCreate) {
    return Tvs.insertOne(newCreate);
  }

  static delete(id) {
    return Tvs.deleteOne({ _id: ObjectId(id) });
  }

  static put(id, newUpdate) {
    return Tvs.updateOne({ _id: ObjectId(id) }, { $set: newUpdate });
  }
}

module.exports = Tv;

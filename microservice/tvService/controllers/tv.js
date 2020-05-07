const Tv = require("../models/tv");

class Controller {
  static findAll(req, res, next) {
    Tv.find()
      .then((result) => {
        return res.status(200).json(result);
      })
      .catch((err) => {
        return next(err);
      });
  }

  static findById(req, res, next) {
    Tv.findById(req.params.id)
      .then((result) => {
        return res.status(200).json(result);
      })
      .catch((err) => {
        return next(err);
      });
  }

  static create(req, res, next) {
    const { title, overview, poster_path, popularity, tags } = req.body;
    const newCreate = { title, overview, poster_path, popularity, tags };
    Tv.create(newCreate)
      .then((result) => {
        return res.status(201).json(result);
      })
      .catch((err) => {
        return next(err);
      });
  }

  static delete(req, res, next) {
    Tv.delete(req.params.id)
      .then((result) => {
        return res.status(200).json(result);
      })
      .catch((err) => {
        return next(err);
      });
  }

  static put(req, res, next) {
    const { title, overview, poster_path, popularity, tags } = req.body;
    const newUpdate = { title, overview, poster_path, popularity, tags };
    Tv.put(req.params.id, newUpdate)
      .then((result) => {
        return res.status(200).json(result);
      })
      .catch((err) => {
        return next(err);
      });
  }
}

module.exports = Controller;

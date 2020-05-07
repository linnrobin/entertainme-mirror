const axios = require("axios");
const Redis = require("ioredis");
const redis = new Redis();
const baseUrl = "http://localhost:3001/movies/";

class Controller {
  static async findAll(req, res, next) {
    try {
      const movies = JSON.parse(await redis.get("movies"));
      if (movies) {
        res.status(200).json(movies);
      } else {
        const { data } = await axios({
          url: baseUrl,
          method: "get",
        });
        res.status(200).json(data);
        redis.set("movies", JSON.stringify(data));
      }
    } catch (error) {
      next(error);
    }
  }

  //this method is troublesome... because we need to check the findAll
  static async findById(req, res, next) {
    try {
      const movies = JSON.parse(await redis.get("movies"));
      if (movies) {
        const filtered = movies.filter((el) => el._id === req.params.id);
        if (filtered.length !== 0) {
          res.status(200).json(filtered);
        } else {
          const { data } = await axios({
            url: baseUrl + req.params.id,
            method: "get",
          });
          res.status(200).json([data]);
          if (data !== null) {
            movies.push(data);
            redis.set("movies", JSON.stringify(movies));
          }
        }
      } else {
        const { data } = await axios({
          url: baseUrl + req.params.id,
          method: "get",
        });
        res.status(200).json([data]);
        if (data !== null) {
          redis.set("movies", JSON.stringify([data]));
        }
      }
    } catch (error) {
      next(error);
    }
  }

  static async create(req, res, next) {
    try {
      const { data } = await axios({
        url: baseUrl,
        method: "post",
        data: req.body,
      });
      res.status(201).json(data);
      const movies = JSON.parse(await redis.get("movies"));
      if (movies) {
        movies.push(data);
        redis.set("movies", JSON.stringify(movies));
      }
    } catch (error) {
      next(error);
    }
  }

  static async delete(req, res, next) {}

  static async put(req, res, next) {}
}

module.exports = Controller;

const axios = require("axios");
const Redis = require("ioredis");
const redis = new Redis();
const baseUrl = "http://localhost:3001/movies";

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
}

module.exports = Controller;

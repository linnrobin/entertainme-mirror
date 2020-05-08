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

  static async findById(req, res, next) {
    try {
      const { data } = await axios({
        url: baseUrl,
        method: "get",
      });
      const movies = JSON.parse(await redis.get("movies"));
      if (movies) {
        redis.del("movies");
        redis.set("movies", JSON.stringify(data));
      } else {
        redis.set("movies", JSON.stringify(data));
      }
      const [filtered] = data.filter((el) => el._id === req.params.id);
      if (filtered !== undefined) {
        res.status(200).json(filtered);
      } else {
        res.status(404).json({ message: "not found" });
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
        redis.del("movies");
        redis.set("movies", JSON.stringify(movies));
      } else {
        const { data: dataGet } = await axios({
          url: baseUrl,
          method: "get",
        });
        redis.set("movies", JSON.stringify(dataGet));
      }
    } catch (error) {
      next(error);
    }
  }

  static async delete(req, res, next) {
    try {
      const { data } = await axios({
        url: baseUrl + req.params.id,
        method: "delete",
      });
      res.status(200).json(data);
      const movies = JSON.parse(await redis.get("movies"));
      if (movies) {
        const notFiltered = movies.filter((el) => el._id !== req.params.id);
        redis.del("movies");
        redis.set("movies", JSON.stringify(notFiltered));
      } else {
        const { data: dataGet } = await axios({
          url: baseUrl,
          method: "get",
        });
        redis.set("movies", JSON.stringify(dataGet));
      }
    } catch (error) {
      next(error);
    }
  }

  static async put(req, res, next) {
    try {
      const { data } = await axios({
        url: baseUrl + req.params.id,
        method: "put",
        data: req.body,
      });
      res.status(200).json(data);
      const movies = JSON.parse(await redis.get("movies"));
      if (movies) {
        const notFiltered = movies.filter((el) => el._id !== req.params.id);
        const [filtered] = movies.filter((el) => el._id === req.params.id);

        if (filtered !== undefined) {
          filtered.title = req.body.title || null;
          filtered.overview = req.body.overview || null;
          filtered.poster_path = req.body.poster_path || null;
          filtered.popularity = req.body.popularity || null;
          filtered.tags = req.body.tags || null;
          notFiltered.push(filtered);
          redis.del("movies");
          redis.set("movies", JSON.stringify(notFiltered));
        }
      } else {
        const { data: dataGet } = await axios({
          url: baseUrl,
          method: "get",
        });
        redis.set("movies", JSON.stringify(dataGet));
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;

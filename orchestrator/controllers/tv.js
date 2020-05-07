const axios = require("axios");
const Redis = require("ioredis");
const redis = new Redis();
const baseUrl = "http://localhost:3002/tv";

class Controller {
  static async findAll(req, res, next) {
    try {
      const tv = JSON.parse(await redis.get("tv"));
      if (tv) {
        res.status(200).json(tv);
      } else {
        const { data } = await axios({
          url: baseUrl,
          method: "get",
        });
        res.status(200).json(data);
        redis.set("tv", JSON.stringify(data));
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
      const tv = JSON.parse(await redis.get("tv"));

      if (tv) {
        tv.push(data);
        redis.set("tv", JSON.stringify(tv));
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;

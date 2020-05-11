const axios = require("axios");
const Redis = require("ioredis");
const redis = new Redis();
const baseUrl = "http://localhost:3001/movies/";

class Controller {
  static async findAll() {
    try {
      const movies = JSON.parse(await redis.get("movies"));
      if (movies) {
        return movies;
      } else {
        const { data } = await axios({
          url: baseUrl,
          method: "get",
        });
        redis.set("movies", JSON.stringify(data));
        return data;
      }
    } catch (error) {
      return console.log(error);
    }
  }

  static async findById(parent, args, context, info) {
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
      const [filtered] = data.filter((el) => el._id === args._id);
      if (filtered !== undefined) {
        return filtered;
      } else {
        return { message: "not found" };
      }
    } catch (error) {
      return console.log(error);
    }
  }

  static async create(_, args) {
    try {
      const { data } = await axios({
        url: baseUrl,
        method: "post",
        data: args.movie,
      });
      const movies = JSON.parse(await redis.get("movies"));
      if (movies) {
        movies.push(data.ops[0]);
        redis.del("movies");
        redis.set("movies", JSON.stringify(movies));
      } else {
        const { data: dataGet } = await axios({
          url: baseUrl,
          method: "get",
        });
        redis.set("movies", JSON.stringify(dataGet));
      }
      return data.ops[0];
    } catch (error) {
      return console.log(error);
    }
  }

  static async delete(_, args) {
    try {
      const { data } = await axios({
        url: baseUrl + args._id,
        method: "delete",
      });
      const movies = JSON.parse(await redis.get("movies"));
      if (movies) {
        const notFiltered = movies.filter((el) => el._id !== args._id);
        redis.del("movies");
        redis.set("movies", JSON.stringify(notFiltered));
      } else {
        const { data: dataGet } = await axios({
          url: baseUrl,
          method: "get",
        });
        redis.set("movies", JSON.stringify(dataGet));
      }
      if (data.deletedCount >= 1) {
        return { _id: args._id, status: 200, message: "Successfully deleted" };
      } else {
        return { _id: args._id, status: 404, message: "Deleted Not Found" };
      }
    } catch (error) {
      return console.log(error);
    }
  }

  static async put(_, args) {
    try {
      const { data } = await axios({
        url: baseUrl + args._id,
        method: "put",
        data: args.movie,
      });
      const movies = JSON.parse(await redis.get("movies"));
      if (movies) {
        const notFiltered = movies.filter((el) => el._id !== args._id);
        const [filtered] = movies.filter((el) => el._id === args._id);

        if (filtered !== undefined) {
          filtered.title = args.movie.title || null;
          filtered.overview = args.movie.overview || null;
          filtered.poster_path = args.movie.poster_path || null;
          filtered.popularity = args.movie.popularity || null;
          filtered.tags = args.movie.tags || null;
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
      if (data.nModified >= 1) {
        return { _id: args._id, status: 200, message: "Successfully updated" };
      } else {
        return { _id: args._id, status: 400, message: "No Change Detected" };
      }
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = Controller;

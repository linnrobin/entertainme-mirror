const axios = require("axios");
const Redis = require("ioredis");
const redis = new Redis();
const baseUrl = "http://localhost:3002/tv/";

class Controller {
  static async findAll() {
    try {
      const tv = JSON.parse(await redis.get("tv"));
      if (tv) {
        return tv;
      } else {
        const { data } = await axios({
          url: baseUrl,
          method: "get",
        });
        redis.set("tv", JSON.stringify(data));
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
      const tv = JSON.parse(await redis.get("tv"));
      if (tv) {
        redis.del("tv");
        redis.set("tv", JSON.stringify(data));
      } else {
        redis.set("tv", JSON.stringify(data));
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
        data: args.tv,
      });
      const tv = JSON.parse(await redis.get("tv"));
      if (tv) {
        tv.push(data.ops[0]);
        redis.del("tv");
        redis.set("tv", JSON.stringify(tv));
      } else {
        const { data: dataGet } = await axios({
          url: baseUrl,
          method: "get",
        });
        redis.set("tv", JSON.stringify(dataGet));
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
      const tv = JSON.parse(await redis.get("tv"));
      if (tv) {
        const notFiltered = tv.filter((el) => el._id !== args._id);
        redis.del("tv");
        redis.set("tv", JSON.stringify(notFiltered));
      } else {
        const { data: dataGet } = await axios({
          url: baseUrl,
          method: "get",
        });
        redis.set("tv", JSON.stringify(dataGet));
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
        data: args.tv,
      });
      const tv = JSON.parse(await redis.get("tv"));
      if (tv) {
        const notFiltered = tv.filter((el) => el._id !== args._id);
        const [filtered] = tv.filter((el) => el._id === args._id);

        if (filtered !== undefined) {
          filtered.title = args.tv.title || null;
          filtered.overview = args.tv.overview || null;
          filtered.poster_path = args.tv.poster_path || null;
          filtered.popularity = args.tv.popularity || null;
          filtered.tags = args.tv.tags || null;
          notFiltered.push(filtered);
          redis.del("tv");
          redis.set("tv", JSON.stringify(notFiltered));
        }
      } else {
        const { data: dataGet } = await axios({
          url: baseUrl,
          method: "get",
        });
        redis.set("tv", JSON.stringify(dataGet));
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

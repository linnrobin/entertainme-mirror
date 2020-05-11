const MovieController = require("../../controllers/movies");
const TvController = require("../../controllers/tv");

const Mutation = {
  addMovie: MovieController.create,
  deleteMovie: MovieController.delete,
  updateMovie: MovieController.put,
  addTv: TvController.create,
  deleteTv: TvController.delete,
  updateTv: TvController.put,
};

module.exports = Mutation;

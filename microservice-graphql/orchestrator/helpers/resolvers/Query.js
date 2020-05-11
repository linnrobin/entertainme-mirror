const MovieController = require("../../controllers/movies");
const TvController = require("../../controllers/tv");

const Query = {
  movies: MovieController.findAll,
  movie: MovieController.findById,
  tvSeries: TvController.findAll,
  tv: TvController.findById,
  entertainme: {
    movies: MovieController.findAll,
    tvSeries: TvController.findAll,
  },
};

module.exports = Query;

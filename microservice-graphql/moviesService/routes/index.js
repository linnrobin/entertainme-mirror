const router = require("express").Router();
const moviesRoutes = require("./movies");

router.get("/", (req, res) => res.send("welcome to moviesService"));
router.use("/movies", moviesRoutes);

module.exports = router;

const router = require("express").Router();
const moviesRoutes = require("./movies");
const tvRoutes = require("./tv");
// const axios = require("axios");
// const redis = require("../redis");

router.get("/", (req, res) => res.send("welcome"));
router.use("/movies", moviesRoutes);
router.use("/tv", tvRoutes);

module.exports = router;

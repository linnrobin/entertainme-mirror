const router = require("express").Router();
const tvRoutes = require("./tv");

router.get("/", (req, res) => res.send("welcome to tvService"));
router.use("/tv", tvRoutes);

module.exports = router;

const router = require("express").Router();
const Controller = require("../controllers/movies");

router.get("/", Controller.findAll);
router.get("/:id", Controller.findById);
router.post("/", Controller.create);
router.delete("/:id", Controller.delete);
router.put("/:id", Controller.put);

module.exports = router;

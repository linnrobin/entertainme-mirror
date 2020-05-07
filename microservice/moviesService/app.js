const express = require("express");
const cors = require("cors");
const mongo = require("./config/mongo");

const app = express();
const PORT = process.env.PORT || 3001;

mongo.connect((err) => {
  const router = require("./routes");

  if (!err) {
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(cors());

    app.use(router);

    app.listen(PORT, () => console.log("i love u from moviesService : ", PORT));
  }
});

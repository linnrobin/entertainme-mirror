const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;
const router = require("./routes");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use(router);

app.listen(PORT, () => console.log("i love u : ", PORT));

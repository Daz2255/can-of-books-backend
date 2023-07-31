const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bp = require("body-parser");
require("dotenv").config();
const PORT = process.env.PORT || 8088;
const app = express();
app.use(cors());
app.use(bp.json());

app.get("/", (request, response) => {
  response.status(200).json("Hey there");
});

app.listen(PORT, () => console.log(`app is running on port ${PORT}`));

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bp = require("body-parser");
require("dotenv").config();
const PORT = process.env.PORT || 8088;
const app = express();
app.use(cors());
app.use(bp.json());

const Book = require("./models/book");
mongoose.connect(process.env.DATABASE_URL);

app.get("/", (request, response) => {
  response.status(200).json("Hey there");
});

app.get("/books", async (request, response) => {
  const allbooks = await Book.find(request.query);
  response.status(200).json(allbooks);
});

app.listen(PORT, () => console.log(`app is running on port ${PORT}`));

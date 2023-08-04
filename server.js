const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bp = require("body-parser");
require("dotenv").config();
const PORT = process.env.PORT || 8088;
const app = express();
app.use(cors());
app.use(bp.json());
const auth0 = require("auth0");

const Book = require("./models/book");
mongoose.connect(process.env.DATABASE_URL);

const client = auth0.WebAuth({
  domain: process.env.AUTH0_DOMAIN,
  clientId: process.env.AUTH0_CLIENT_ID,
  clientSecret: process.env.AUTH0_CLIENT_SECRET,
});

app.use(auth0.authenticate(client));

app.get("/", (request, response) => {
  response.status(200).json("Hey there");
});

app.get("/books", async (request, response) => {
  const email = request.query.email;

  try {
    const allBooks = await Book.find({ email });
    response.status(200).json(allBooks);
  } catch (error) {
    console.log(error);
    response.status(500).json({ error: "Something went wrong" });
  }
});

app.put("/books/:id", async (request, response) => {
  const id = request.params.id;
  const email = request.query.email;

  try {
    const updatedBook = await Book.findByIdAndUpdate(id, request.body, {
      new: true,
      email,
    });

    if (!updatedBook) {
      return response.status(404).json({ error: "Book not found" });
    }

    response.status(200).json(updatedBook);
  } catch (error) {
    console.log(error);
    response.status(500).json({ error: "Something went wrong" });
  }
});

app.delete("/books/:id", async (request, response) => {
  const id = request.params.id;
  const email = request.query.email;

  try {
    const deletedBook = await Book.findByIdAndDelete(id);

    if (!deletedBook) {
      return response.status(404).json({ error: "Book not found" });
    }

    response.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    console.log(error);
    response.status(500).json({ error: "Something went wrong" });
  }
});

app.listen(PORT, () => console.log(`app is running on port ${PORT}`));

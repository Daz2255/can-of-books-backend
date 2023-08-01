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

app.post("/books", async (request, response) => {
  try {
    const newBook = await Book.create(request.body);
    response
      .status(201)
      .json({ message: "New book successfully saved", book: newBook });
  } catch (error) {
    response
      .status(500)
      .json({ error: "Error creating book", details: error.message });
  }
});

app.delete("/books/:id", async (request, response) => {
  const bookId = request.params.id;

  try {
    const deletedBook = await Book.findByIdAndDelete(bookId);
    if (!deletedBook) {
      return response.status(404).json({ error: "Book not found" });
    }

    response.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    response
      .status(500)
      .json({ error: "Error deleting book", details: error.message });
  }
});

app.put("/books/:id", async (request, response) => {
  const bookId = request.params.id;

  try {
    const updatedBook = await Book.findByIdAndUpdate(bookId, request.body, {
      new: true,
    });

    if (!updatedBook) {
      return response.status(404).json({ error: "Book not found" });
    }

    response.status(200).json(updatedBook);
  } catch (error) {
    response
      .status(500)
      .json({ error: "Error updating book", details: error.message });
  }
});

app.listen(PORT, () => console.log(`app is running on port ${PORT}`));

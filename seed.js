const mongoose = require("mongoose");
require("dotenv").config();
mongoose.connect(process.env.DATABASE_URL);

const Book = require("./models/book");

async function seed() {
  await Book.create({
    title: "Pride and Prejudice",
    description:
      "Jane Austen's classic tale of love and social manners, revolving around Elizabeth Bennet and Mr. Darcy",
    status: "Available",
    imageUrl:
      "https://almabooks.com/wp-content/uploads/2016/10/9781847493699-391x600.jpg",
  });

  await Book.create({
    title: "Wuthering Heights",
    description:
      "Emily Bronte's novel about a young woman's search for herself, and her subsequent encounter with an old woman",
    status: "Available",
    imageUrl:
      "https://almabooks.com/wp-content/uploads/2016/10/9781847493699-391x600.jpg",
  });
}

seed();

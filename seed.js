const mongoose = require("mongoose");
require("dotenv").config();
mongoose.connect(process.env.DATABASE_URL);

const Book = require("./models/book");

async function seed() {
  await Book.create({
    title: "The Hobbit",
    description:
      "A hobbit is a dwarf-crafted humanoid creature from the Shire of the Ring.",
    status: "Available",
  });

  await Book.create({
    title: "The Bible",
    description: "All About Jesus",
    status: "Available",
  });

  await Book.create({
    title: "CLockwork Orange",
    description: "It's a classic",
    status: "Available",
  });

  console.log("Reading is Great");
  mongoose.disconnect();
}

seed();

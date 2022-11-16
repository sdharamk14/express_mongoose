const express = require("express");
const Book = require("../model/books");
const { Author } = require("../model/authors");
const router = express.Router();

router.get("/", async (req, res) => {
  res.send(await Book.find());
});

router.post("/", async (req, res) => {
  const { name, author } = req.body;
  const book = new Book({
    name,
    author: new Author({
      name: author.name,
      bio: author.bio,
      website: author.website,
    }),
  });

  const result = await book.save();
  res.send(result);
});

router.put("/:id", (req, res) => {
  const { name, author } = req.body;
  Book.findByIdAndUpdate(req.params.id, {
    $set: {
      name,
      "author.name": author.name,
      "author.bio": author.bio,
      "author.website": author.website,
    },
  });
});

module.exports = router;

const express = require("express");
const Author = require("../model/authors");
const router = express.Router();

router.get("/", async (req, res) => {
  res.send(await Author.find());
});

router.post("/", async (req, res) => {
  const { name, bio, website } = req.body;
  const author = new Author({
    name,
    bio,
    website,
  });

  const result = await author.save();
  res.send(result);
});

module.exports = router;
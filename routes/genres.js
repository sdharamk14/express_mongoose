const express = require("express");
const { Genre } = require("../model/genres");
const router = express.Router();

router.get("/", async (req, res) => {
  const genres = await Genre.find();
  res.send(genres);
});

router.get("/:id", async (req, res) => {
  const genres = await Genre.findById(req.params.id);
  res.send(genres);
});

router.post("/", async (req, res) => {
  const genreObj = new Genre({
    name: req.body.name,
  });

  try {
    const result = await genreObj.save();
    res.send(result);
  } catch (err) {
    res.send(err.message);
  }
});

router.put("/:id", async (req, res) => {
  const result = await Genre.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
    },
    { new: true }
  );

  res.send(result);
});

router.delete("/:id", async (req, res) => {
  res.send(Genre.findByIdAndRemove(req.params.id));
});

module.exports = router;

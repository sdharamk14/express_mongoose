const { Router } = require("express");
const { Genre } = require("../model/genres");
const { Movie } = require("../model/movies");

const router = Router();

router.get("/", async (req, res) => {
  res.send(await Movie.find());
});

router.post("/", async (req, res) => {
  const { title, genreId, numberInStock, dailyRentalRate } = req.body;

  const genre = await Genre.findById(genreId);

  if (!genre) res.status(400).send("Invalid Genre id");

  const movie = new Movie({
    title,
    genre: {
      name: genre.name,
      _id: genreId,
    },
    numberInStock,
    dailyRentalRate,
  });

  const result = await movie.save();
  res.send(result);
});

module.exports = router;

const { Router } = require("express");
const { Customer } = require("../model/customers");
const { Movie } = require("../model/movies");
const { Rental } = require("../model/rentals");
const Fawn = require("fawn");
const { default: mongoose } = require("mongoose");
const router = Router();

Fawn.init("mongodb://localhost/playground");

router.get("/", async (req, res) => {
  const rentals = await Rental.find().sort("-dateOut");
  res.send(rentals);
});

router.post("/", async (req, res) => {
  const { customerId, movieId } = req.body;

  if(mongoose.Types.ObjectId.isValid(customerId)) return res.status(400).send("Invalid customer")
  const customer = await Customer.findById(customerId);
  if (!customer) return res.status(400).send("Invalid customer");

  const movie = await Movie.findById(movieId);
  if (!movie) return res.status(400).send("Invalid movie");

  if (movie.numberInStock === 0)
    return res.status(400).send("Movie is not in stock");
  const rental = new Rental({
    customer: {
      _id: customer._id,
      name: customer.name,
      phone: customer.phone,
    },
    movie: {
      _id: movie._id,
      title: movie.title,
      dailyRentalRate: movie.dailyRentalRate,
    },
  });

  try {
    new Fawn.Task()
      .save("rentals", rental)
      .update(
        "movies",
        {
          _id: movie._id,
        },
        {
          $inc: { numberInStock: -1 },
        }
      )
      .run();
  } catch (err) {
    res.status(500).send("Internal server error: " + err.message);
  }

  //   const result = await rental.save();
  //   movie.numberInStock--;
  //   movie.save();

  res.send(rental);
});

module.exports = router;

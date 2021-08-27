const express = require("express");
const { Rental, validate } = require("./../models/rentals");
const { Movie } = require("./../models/movies");
const { Customer } = require("./../models/customers");
const router = express.Router();
const mongoose = require("mongoose");
const Fawn = require("fawn");
const auth = require("./../middleware/auth");

Fawn.init(mongoose);

router.get("/", async (req, res) => {
  const rental = await Rental.find();
  res.send(rental);
});

router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const customer = await Customer.findById(req.body.customerId);
  if (!customer) return res.status(400).send("Invalid Customer Id");

  const movie = await Movie.findById(req.body.movieId);
  if (!movie) return res.status(400).send("Invalid Movie Id");

  if (movie.numberInStock === 0)
    return res.status(400).send("Movie not in Stock");

  let rental = new Rental({
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
        { _id: movie._id },
        {
          $inc: { numberInStock: -1 },
        }
      )
      .run();

    res.send(rental);
  } catch (error) {
    res.status(500).send("Something went worng...");
  }
});

module.exports = router;

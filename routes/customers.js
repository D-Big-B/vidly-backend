const express = require("express");
const { Customer, validate } = require("./../models/customers");
const router = express.Router();
const auth = require("./../middleware/auth");

router.get("/", async (req, res) => {
  try {
    const customers = await Customer.find().sort({ name: 1 });
    res.send(customers);
  } catch (error) {
    console.log(error.message);
  }
});
router.get("/:id", async (req, res) => {
  try {
    const customer = await Genre.findById(req.params.id);
    if (!customer)
      return res.status(404).send("No customer with given id exists");
    res.send(customer);
  } catch (error) {
    console.error(error.message);
  }
});

router.post("/", auth, async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) return res.status(404).send(error.details[0].message);

    const customer = new Customer({
      name: req.body.name,
      phone: req.body.phone,
      isGold: req.body.isGold,
    });

    customer.save();
    res.send(customer);
  } catch (error) {
    console.log(error.message);
  }
});

router.put("/:id", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const customer = await Customer.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name, phone: req.body.phone, isGold: req.body.isGold },
    { new: true }
  );

  if (!customer)
    return res.status(404).send("No customer with given id exists");

  res.send(customer);
});

router.delete("/:id", auth, async (req, res) => {
  const customer = await Customer.findByIdAndRemove(req.params.id);
  if (!customer)
    return res.status(404).send("No customer with given id exists");

  res.send(customer);
});

module.exports = router;

const express = require("express");
const router = express.Router();
const { Customer } = require("../model/customers");

router.get("/", async (req, res) => {
  const customers = await Customer.find();
  res.send(customers);
});

router.get("/:id", async (req, res) => {
  const customers = await Customer.findById(req.params.id);
  res.send(customers);
});

router.post("/", async (req, res) => {
  const customerObj = new Customer({
    name: req.body.name,
    phone: req.body.phone,
  });

  const result = await customerObj.save();
  res.send(result);
});

router.put("/:id", async (req, res) => {
  const result = await Customer.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      isGold: req.body.isGold,
      phone: req.body.phone,
    },
    { new: true }
  );

  res.send(result);
});

router.delete("/:id", async (req, res) => {
  res.send(Customer.findByIdAndRemove(req.params.id));
});

module.exports = router;

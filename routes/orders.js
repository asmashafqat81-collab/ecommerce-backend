const express = require("express");

const Order = require("../models/Order");

const auth = require("../middleware/auth");

const router = express.Router();


router.post("/", auth, async (req, res) => {
  const order = await Order.create({
    user: req.user.id,
    products: req.body.products,
    totalPrice: req.body.totalPrice
  });

  res.status(201).json(order);
});


router.get("/", auth, async (req, res) => {
  const orders = await Order.find({
    user: req.user.id
  });

  res.json(orders);
});


router.get("/:id", auth, async (req, res) => {
  const order = await Order.findById(req.params.id);

  res.json(order);
});


router.put("/:id", auth, async (req, res) => {
  const order = await Order.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.json(order);
});


router.delete("/:id", auth, async (req, res) => {
  await Order.findByIdAndDelete(req.params.id);

  res.json({
    message: "Order deleted"
  });
});

module.exports = router;
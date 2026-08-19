const express = require("express");

const Product = require("../models/Product");

const auth = require("../middleware/auth");

const router = express.Router();


router.get("/", async (req, res) => {
  const products = await Product.find();

  res.json(products);
});


router.get("/:id", async (req, res) => {
  const product = await Product.findById(req.params.id);

  res.json(product);
});


router.post("/", auth, async (req, res) => {
  const product = await Product.create(req.body);

  res.status(201).json(product);
});


router.put("/:id", auth, async (req, res) => {
  const product = await Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.json(product);
});


router.delete("/:id", auth, async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);

  res.json({
    message: "Product deleted"
  });
});

module.exports = router;
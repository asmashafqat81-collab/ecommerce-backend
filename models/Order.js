const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  products: [
    {
      product: String,
      quantity: Number
    }
  ],

  totalPrice: Number,

  status: {
    type: String,
    default: "pending"
  }
});

module.exports = mongoose.model("Order", orderSchema);
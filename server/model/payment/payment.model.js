const mongoose = require("mongoose");

const paymentSchema = mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    businessId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Business",
      default: null,
    },
    sessionId: {
      type: String,
      default: null,

    },
    sessionPaymentId: {
      type: String,
      default: null,

    },
    quantity: {
      type: Number,
      default: 0,
    },
    paymentStatus: {
      type: String,
      enum: ["unpaid", "paid", "pending"],
      default: "pending",
    },
    price: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const payment = mongoose.model("Payment", paymentSchema);

module.exports = payment;

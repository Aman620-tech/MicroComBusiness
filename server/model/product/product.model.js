const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    businessId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Business",
    },
    purchasedBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    subcategoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubCategory",
    },
    productName: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },

    productType: {
      type: String,
      required: true,
      enum: ["men", "women", "both"],
    },
    price: {
      type: String,
      required: true,
    },
    size: {
      type: String,
      required: true,
    },
    color: [
      {
        type: String,
        required: true,
      },
    ],
    productRating: {
      type: String,
      default: "none",
    },
    quantity: {
      type: Number,
      default: 1,
    },
    active: {
      type: Boolean,
      default: true,
    },
    image: [
      {
        imageName: {
          type: String,
        },
        imagePath: {
          type: String,
        },
      },
    ],
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;

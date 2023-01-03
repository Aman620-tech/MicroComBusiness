const mongoose = require("mongoose");

const categorySchema = mongoose.Schema(
  {
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    subcategoryName: {
      type: String,
    },
    
    subcategoryImage: {
      type: String,
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const SubCategory = mongoose.model("SubCategory", categorySchema);

module.exports = SubCategory;

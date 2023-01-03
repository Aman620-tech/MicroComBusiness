const mongoose = require("mongoose");

const developerSchema = mongoose.Schema(
  {
    name: {
      type: String,
      default: null,
    },
    role: {
      type: String,
      default: null,
    },
    experience: {
      type: String,
      default: null,
    },
    description: {
      type: String,
      default: null,
    },
    linkedIn: {
      type: String,
      default: null,
    },
    instagram: {
      type: String,
      default: null,
    },
    image: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

const Developer = mongoose.model("Developer", developerSchema);

module.exports = Developer;

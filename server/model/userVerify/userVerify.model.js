const mongoose = require("mongoose");

const userVerifySchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    mobileNumber: { type: String, unique: true },
    mobileOtp: { type: Number, unique: true },
    email: { type: String, unique: true },
    emailOtp: { type: Number, unique: true },
    
    files: [
      {
        fileName: {
          type: String,
        },
        filePath: {
          type: String,
        },
      },
    ],
    message: {
      type: String,
      default: "None",
    },
  },
  { timestamps: true }
);

const UserVerify = mongoose.model("userVerify", userVerifySchema);

module.exports = UserVerify;

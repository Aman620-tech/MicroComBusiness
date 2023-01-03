const mongoose = require("mongoose");

const VerificationSchema = mongoose.Schema(
  {
    businessId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Business",
    },
    businessName: {
      type: String,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
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
      default: "none",
    },
  },
  { timestamps: true }
);

const Verification = mongoose.model("Verification", VerificationSchema);

module.exports = Verification;

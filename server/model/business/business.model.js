const mongoose = require("mongoose");

const shopSchema = mongoose.Schema(
  {
    businessName: {
      type: String,
      required: true,
    },
    businessType: {
      type: String,
      enum: ["shop", "delivery"],
    },
    country: {
      type: String,
    },
    state: {
      type: String,
    },
    city: {
      type: String,
    },
    pin: {
      type: Number,
    },
    address: {
      type: String,
    },
    active: {
      type: Boolean,
      default: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      unique: true,
    },  
    role:{
      type:String,
      default:"owner"
    },
    employee:[{
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      role:{
       type:String,
       default:"employee" 
      }

    }],
    mobileNumber: {
      type: Number,
    },
    gstNo: {
      type: String,
    },
    panNo: {
      type: String,
    },
    shopLogo: {
      type: String,
    },
    verified:{
      type:Boolean,
      default:false
    }
  },
  { timestamps: true }
);

const Business = mongoose.model("Business", shopSchema);

module.exports = Business;

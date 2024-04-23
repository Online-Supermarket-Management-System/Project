// model.js
const mongoose = require("mongoose");
const orderschema = mongoose.Schema(
  {
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    address: { type: String, required: true },
    postal_code: { type: String, required: true },
    city: { type: String, required: true },
    contact_number: {
      type: String,
      required: true,
      match: [/^\d{9}$/, "Contact number should be 9 digits"],
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/\S+@\S+\.\S+/, "Email should be valid"],
    },
    password: { type: String, required: true },
    isVerified: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
const ordermodel = mongoose.model("customers", orderschema);
module.exports = ordermodel;
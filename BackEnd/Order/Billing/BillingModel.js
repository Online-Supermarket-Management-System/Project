const mongoose = require("mongoose");

const billTypeSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  time: { type: String, required: true },
  address: { type: String, required: true },
  postalCode: { type: String, required: true },
  city: { type: String, required: true },
  email: { type: String, required: true },
  delivery: { type: String, required: true },
  
});

const Bill = mongoose.model("Bill", billTypeSchema);

module.exports = Bill;



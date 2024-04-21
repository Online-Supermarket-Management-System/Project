const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    empId: {
      type: String,
      required: [true, "Please add the Employee Id"],
    },
    firstName: {
      type: String,
      required: [true, "Please add a name"],
    },
    lastName: {
      type: String,
      required: [true, "Please add a name"],
    },
    email: {
      type: String,
      required: [true, "Please add an email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
    },
    contactNumber: {
      type: String,
      required: [true, "Please add a contact number"],
    },
    dob: {
      type: String,
    },
    image: {
      type: String,
    },
    approved: {
      type: Boolean,
      default: false, // Set the default value to false
    },
    role: {
      type: String,
      default: "ADMIN",
    },
  },
  {
    timestamps: true,
  }
);

const admin = mongoose.model("admin", userSchema);

module.exports = admin;

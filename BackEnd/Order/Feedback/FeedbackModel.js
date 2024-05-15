const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  cleanlinessRating: { type: Number },
  staffFriendlinessRating: { type: Number },
  amenitiesRating: { type: Number },
  comments: { type: String },
  suggestions: { type: String },
});

const Feedback = mongoose.model("Feedback", feedbackSchema);

module.exports = Feedback;

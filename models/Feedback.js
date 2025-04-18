const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({
  text: { type: String, required: true },
  score: { type: Number, required: true },
  sentiment: { type: String, required: true },
  constructive: { type: String, required: true },
});

const Feedback = mongoose.model("Feedback", feedbackSchema);

module.exports = Feedback;

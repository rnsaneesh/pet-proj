const mongoose = require("mongoose");

const QuizResponseSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  userType: { type: String, required: true, default: "customer" },
  responses: [
    {
      question: { type: String, required: true }, // Store questions
      answer: { type: String, required: true },  // Store corresponding answers
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("QuizResponse", QuizResponseSchema);

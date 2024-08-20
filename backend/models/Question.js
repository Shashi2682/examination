const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  options: [String],
  answer: { type: String, required: true } // Ensure this field is required
});

module.exports = mongoose.model('Question', QuestionSchema);

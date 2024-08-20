const mongoose = require('mongoose');

const testSchema = new mongoose.Schema({
  question: { type: String, required: true },
  options: [String],
});

module.exports = mongoose.model('Test', testSchema);

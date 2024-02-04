const mongoose = require('mongoose');

const markingSchemeSchema = new mongoose.Schema({
  markingSchemeId: { type: String, required: true },
  markingSchemeName: { type: String, required: true },
  totalQuestions: { type: Number, required: true },
  questions: [
    {
      questionNumber: { type: Number, required: true },
      correctAnswer: { type: String, required: true },
      keywords: { type: [String], required: true },
      allocatedMarks: { type: Number, required: true },
      evaluationType: { type: Boolean, required: true }, // 1 for direct, 0 for essay
    },
  ],
});

module.exports = mongoose.model('MarkingScheme', markingSchemeSchema);

const mongoose = require('mongoose');

const markingSchemeSchema = new mongoose.Schema({
  markingSchemeId: { type: String, required: true },
  markingSchemeName: { type: String, required: true },
  totalQuestions: { type: Number, required: true },
  questions: [
    {
      questionNumber: { type: Number, required: true },
      question: { type: String, required: true },
      correctAnswer: { type: String, required: true },
      keywords: { type: [String], required: true },
      allocatedMarks: { type: Number, required: true },
      evaluationType: { type: Boolean, required: true },
      _id: { type: String},
    },
  ],
});

module.exports = mongoose.model('MarkingScheme', markingSchemeSchema);

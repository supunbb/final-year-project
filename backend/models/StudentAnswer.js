const mongoose = require('mongoose');

const studentAnswerSchema = new mongoose.Schema({
  fileName: { type: String, required: true },
  answers: [
    {
      questionNumber: { type: Number, required: true },
      answerText: { type: String, required: true },
    },
  ],
});

module.exports = mongoose.model('StudentAnswer', studentAnswerSchema);

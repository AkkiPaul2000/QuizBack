const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
  title: { type: String, required: true },
  type: { type: String, enum: ['poll', 'qna'], required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  questions: [
    {
      questionText: { type: String, required: true },
      options: [{ type: String, required: true }],
      correctAnswer: { type: String }, // Only for Q&A type
      timer: { type: Number, default: 0 }, // In seconds
    }
  ],
  impressions: { type: Number, default: 0 },
});

const Quiz = mongoose.model('Quiz', quizSchema);
module.exports = Quiz;
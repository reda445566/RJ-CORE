const questionSchema = new mongoose.Schema({
  text:          { type: String, required: true },
  type:          { type: String, enum: ['mcq', 'true_false', 'short'], default: 'mcq' },
  options:       [{ text: String, isCorrect: Boolean }],
  correctAnswer: { type: String },
  points:        { type: Number, default: 1 },
});

const quizSchema = new mongoose.Schema({
  lesson:       { type: mongoose.Schema.Types.ObjectId, ref: 'Lesson', required: true },
  title:        { type: String, required: true },
  type:         { type: String, enum: ['quiz', 'exercise'], default: 'quiz' },
  passingScore: { type: Number, default: 60 },
  timeLimit:    { type: Number, default: 0 }, // بالدقايق، 0 = مفيش وقت
  questions:    [questionSchema],
  totalPoints:  { type: Number, default: 0 },
}, { timestamps: true });


module.exports = mongoose.model('quiz', questionSchema);


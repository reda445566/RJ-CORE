const mongoose = require('mongoose');

const pointsSchema = new mongoose.Schema({
  user:        { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  total:       { type: Number, default: 0 },
  weeklyTotal: { type: Number, default: 0 },
  history: [{
    amount:      { type: Number, required: true },
    reason:      { type: String, enum: [
      'course_complete',   // خلص كورس
      'quiz_pass',         // عدى كويز
      'study_session',     // اشترك في study with me
      'daily_login',       // دخل النهارده
      'achievement',       // حصل على badge
    ]},
    createdAt:   { type: Date, default: Date.now },
  }],
}, { timestamps: true });

// method لإضافة نقاط
pointsSchema.methods.addPoints = async function(amount, reason) {
  this.total       += amount;
  this.weeklyTotal += amount;
  this.history.push({ amount, reason });
  return this.save();
};

module.exports = mongoose.model('Points', pointsSchema);





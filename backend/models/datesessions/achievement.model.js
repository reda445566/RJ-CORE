const mongoose = require('mongoose');

// الـ achievements الموجودة في النظام
const ACHIEVEMENTS = [
  { key: 'first_course',    label: 'First Step',      description: 'خلصت أول كورس',         points: 50  },
  { key: 'quiz_master',     label: 'Quiz Master',     description: 'عديت 10 كويزات',         points: 100 },
  { key: 'study_streak_7',  label: 'Week Warrior',    description: 'اتذاكرت 7 أيام متتالية', points: 150 },
  { key: 'top_student',     label: 'Top Student',     description: 'وصلت أعلى 10 في الـ leaderboard', points: 200 },
  { key: 'social_learner',  label: 'Social Learner',  description: 'اشتركت في 5 study sessions', points: 75 },
];

const userAchievementSchema = new mongoose.Schema({
  user:        { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  key:         { type: String, required: true },
  label:       { type: String, required: true },
  description: { type: String },
  points:      { type: Number, default: 0 },
  earnedAt:    { type: Date, default: Date.now },
});

userAchievementSchema.index({ user: 1, key: 1 }, { unique: true }); // منفعش تاخد نفس الـ achievement مرتين

const Achievement = mongoose.model('Achievement', userAchievementSchema);

module.exports = { Achievement, ACHIEVEMENTS };


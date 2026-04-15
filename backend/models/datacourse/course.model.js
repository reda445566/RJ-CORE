const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title:       { type: String, required: true, trim: true },
  description: { type: String, required: true },
  instructor:  { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  category:    { type: String, required: true },
  level:       { type: String, enum: ['beginner', 'intermediate', 'advanced'], default: 'beginner' },
  thumbnail:   { type: String },
  isPublished: { type: Boolean, default: false },
  order:       { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Course', courseSchema);






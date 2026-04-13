const lessonSchema = new mongoose.Schema({
  course:      { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  title:       { type: String, required: true },
  contentType: { type: String, enum: ['video', 'article', 'pdf'], required: true },
  contentUrl:  { type: String },
  body:        { type: String },
  order:       { type: Number, default: 0 },
  duration:    { type: Number, default: 0 },
  isFree:      { type: Boolean, default: false },
}, { timestamps: true });


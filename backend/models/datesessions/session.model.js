import mongoose from "mongoose";

const studySessionSchema = new mongoose.Schema({
  roomId:       { type: String, required: true, unique: true },
  host:         { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  pendingRequests: [{type: mongoose.Schema.Types.ObjectId,ref: "User"}],
  topic:        { type: String, required: true },
  status:       { type: String, enum: ['waiting', 'active', 'ended'], default: 'waiting' },
  startedAt:    { type: Date },
  endedAt:      { type: Date },
  duration:     { type: Number, default: 0 }, // بالدقايق
  maxMembers:   { type: Number, default: 5 },
  isPrivate:    { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('StudySession', studySessionSchema);


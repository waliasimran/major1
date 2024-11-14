const mongoose = require('mongoose');

const MeetingSchema = new mongoose.Schema({
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  scheduledAt: { type: Date, required: true },
  purpose: String,
  status: { type: String, enum: ['scheduled', 'completed', 'cancelled'], default: 'scheduled' },
}, { timestamps: true });

module.exports = mongoose.model('Meeting', MeetingSchema);

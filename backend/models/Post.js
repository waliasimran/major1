const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true },
  industry: [String],
  region: String,
  sentiment: String, // For sentiment analysis
}, { timestamps: true });

module.exports = mongoose.model('Post', PostSchema);
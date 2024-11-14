const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['founder', 'investor'], required: true },
  industry: [String],
  region: String,
  company: {
    name: String,
    industry: String,
    description: String,
  },
  connections: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  // Additional fields as needed
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
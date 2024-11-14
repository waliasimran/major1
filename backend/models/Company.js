const mongoose = require('mongoose');

const CompanySchema = new mongoose.Schema({
  name: { type: String, required: true },
  industry: String,
  description: String,
  needs: [String], // e.g., engineering, medical
  founder: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

module.exports = mongoose.model('Company', CompanySchema);

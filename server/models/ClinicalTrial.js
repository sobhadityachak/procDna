const mongoose = require('mongoose');

const ClinicalTrialSchema = new mongoose.Schema({
  trialName: { type: String, required: true },
  description: String,
  startDate: Date,
  endDate: Date,
  status: { type: String, enum: ['Planned', 'Ongoing', 'Completed'], default: 'Planned' },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, {
  timestamps: true
});

module.exports = mongoose.model('ClinicalTrial', ClinicalTrialSchema);

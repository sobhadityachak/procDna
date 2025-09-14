const mongoose = require('mongoose');

const ClinicalTrialSchema = new mongoose.Schema({
  trialName: { type: String, required: true },
  description: String,
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  status: { type: String, enum: ['Planned', 'Ongoing', 'Completed'], default: 'Planned', required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, {
  timestamps: true
});

module.exports = mongoose.model('ClinicalTrial', ClinicalTrialSchema);

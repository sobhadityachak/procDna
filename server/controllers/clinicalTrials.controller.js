const ClinicalTrial = require("../models/ClinicalTrial");

const getAllClinicalTrials = async (req, res) => {
  try {
    const trials = await ClinicalTrial.find({
      createdBy: req.user._id,
    }).populate("createdBy", "username");
    res.json(trials);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getClinicalTrialById = async (req, res) => {
  try {
    const trial = await ClinicalTrial.findOne({
      _id: req.params.id,
      createdBy: req.user._id,
    }).populate("createdBy", "username");

    if (!trial) {
      return res
        .status(404)
        .json({
          message:
            "Clinical trial not found or you do not have permission to view it",
        });
    }
    res.json(trial);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const createClinicalTrial = async (req, res) => {
  const { trialName, description, startDate, endDate, status } = req.body;

  try {
    const newTrial = new ClinicalTrial({
      trialName,
      description,
      startDate: startDate ? new Date(startDate) : undefined,
      endDate: endDate ? new Date(endDate) : undefined,
      status,
      createdBy: req.user._id,
    });

    const savedTrial = await newTrial.save();
    const populatedTrial = await ClinicalTrial.findById(
      savedTrial._id
    ).populate("createdBy", "username");
    res.status(201).json(populatedTrial);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error creating clinical trial", error: error.message });
  }
};

const updateClinicalTrial = async (req, res) => {
  const { trialName, description, startDate, endDate, status } = req.body;

  try {
    const trial = await ClinicalTrial.findOne({
      _id: req.params.id,
      createdBy: req.user._id,
    });

    if (!trial) {
      return res
        .status(404)
        .json({
          message:
            "Clinical trial not found or you do not have permission to edit it",
        });
    }

    trial.trialName = trialName || trial.trialName;
    trial.description =
      description !== undefined ? description : trial.description;
    trial.startDate = startDate ? new Date(startDate) : trial.startDate;
    trial.endDate = endDate ? new Date(endDate) : trial.endDate;
    trial.status = status || trial.status;

    const updatedTrial = await trial.save();
    const populatedTrial = await ClinicalTrial.findById(
      updatedTrial._id
    ).populate("createdBy", "username");
    res.json(populatedTrial);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error updating clinical trial", error: error.message });
  }
};

const deleteClinicalTrial = async (req, res) => {
  try {
    const trial = await ClinicalTrial.findOne({
      _id: req.params.id,
      createdBy: req.user._id,
    });

    if (!trial) {
      return res
        .status(404)
        .json({
          message:
            "Clinical trial not found or you do not have permission to delete it",
        });
    }

    await ClinicalTrial.findByIdAndDelete(req.params.id);
    res.json({ message: "Clinical trial deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const allStats = async (req, res) => {
  try {
    const userId = req.user._id;
    
    const totalTrials = await ClinicalTrial.countDocuments({ createdBy: userId });
    const plannedTrials = await ClinicalTrial.countDocuments({ createdBy: userId, status: 'Planned' });
    const ongoingTrials = await ClinicalTrial.countDocuments({ createdBy: userId, status: 'Ongoing' });
    const completedTrials = await ClinicalTrial.countDocuments({ createdBy: userId, status: 'Completed' });
    
    const recentTrials = await ClinicalTrial.find({ createdBy: userId })
      .sort({ createdAt: -1 })
      .limit(5)
      .select('trialName status createdAt')
      .populate('createdBy', 'username');

    res.json({
      totalTrials,
      plannedTrials,
      ongoingTrials,
      completedTrials,
      recentTrials
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
}

module.exports = {
  getAllClinicalTrials,
  getClinicalTrialById,
  createClinicalTrial,
  updateClinicalTrial,
  deleteClinicalTrial,
  allStats
};

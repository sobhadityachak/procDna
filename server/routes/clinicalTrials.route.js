const express = require('express');
const {
  getAllClinicalTrials,
  getClinicalTrialById,
  createClinicalTrial,
  updateClinicalTrial,
  deleteClinicalTrial,
  allStats
} = require('../controllers/clinicalTrials.controller');

const router = express.Router();

const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ message: 'Please log in to access this resource' });
};

router.get('/stats', ensureAuthenticated, allStats);

router.get('/', ensureAuthenticated, getAllClinicalTrials);

router.get('/:id', ensureAuthenticated, getClinicalTrialById);

router.post('/', ensureAuthenticated, createClinicalTrial);

router.put('/:id', ensureAuthenticated, updateClinicalTrial);

router.delete('/:id', ensureAuthenticated, deleteClinicalTrial);

module.exports = router;

const express = require('express');
const router = express.Router();
const stateController = require('../controllers/stateController');
const auth = require('../middleware/auth');

// Fetch all states with their cities
router.get('/with-cities', auth, stateController.getStatesWithCities);

module.exports = router;

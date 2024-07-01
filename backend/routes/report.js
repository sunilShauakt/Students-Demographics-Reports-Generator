const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const reportController = require('../controllers/reportController');

// Generate and download students demography report - Accessible by any authenticated user
router.get('/download', reportController.downloadReport);

// Generate and download a single student's report - Accessible by any authenticated user
router.get('/download/:studentId', auth, reportController.downloadSingleUserReport);

module.exports = router;

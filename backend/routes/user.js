const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const checkAdmin = require("../middleware/checkAdmin");
const statusController = require("../controllers/userController");

// Update user status - Only accessible by admins
router.put(
  "/update-status/:userId",
  [auth, checkAdmin],
  statusController.updateStatus
);

// Fetch all users with a specific status - Only accessible by admins
router.get("/", [auth, checkAdmin], statusController.getUsersByStatus);

// Route to get user count by status
router.get('/status/count', auth, statusController.getUserCountByStatus);

module.exports = router;

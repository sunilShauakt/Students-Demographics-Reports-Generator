const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/auth');

// POST api/auth/register
router.post('/register', authController.validateRegister, authController.register);

// POST api/auth/login
router.post('/login', authController.validateLogin, authController.login);

// GET api/auth/profile
router.get('/profile', authMiddleware, authController.getUserProfile);

module.exports = router;

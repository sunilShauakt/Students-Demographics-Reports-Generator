const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const checkAdmin = require('../middleware/checkAdmin');
const studentController = require('../controllers/studentController');

// Add a new student - Only accessible by admins
router.post('/add', [auth, checkAdmin], studentController.addStudent);

// Update a student by ID - Only accessible by admins
router.put('/update/:studentId', [auth, checkAdmin], studentController.updateStudent);

// Remove a student by ID - Only accessible by admins
router.delete('/remove/:studentId', [auth, checkAdmin], studentController.removeStudent);

// Fetch all students - Only accessible by admins
router.get('/', [auth], studentController.getStudents);

// Route to get student count by gender and state
router.get('/count/gender-state', auth, studentController.getStudentCountByGenderAndState);


module.exports = router;

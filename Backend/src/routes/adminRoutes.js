const express = require('express');
const { registerStudent, 
    getStudents, 
    getDocumentsByStudent, 
    updateDocumentStatus
 } = require('../controllers/adminController');
const { authenticate } = require('../middleware/authMiddleware');
const router = express.Router();

// Route for admin to register a new student
router.post('/registerStudent', registerStudent);

// Fetch all students
router.get('/getStudents', getStudents);

// Fetch documents by student
router.get('/getDocuments/:studentId', getDocumentsByStudent);

// Approve or reject a document
router.patch('/updateDocumentStatus/:fileName', updateDocumentStatus);

module.exports = router;
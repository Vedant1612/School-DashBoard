const express = require('express');
const { upload, uploadDocument, getDocuments, downloadDocument } = require('../controllers/studentController');
const { authenticate } = require('../middleware/authMiddleware');
const router = express.Router();

// Protected routes that require authentication
router.post('/uploadDocument', authenticate, upload, uploadDocument);  // Upload document route
router.get('/getDocuments', authenticate, getDocuments);  // Get all documents route
router.get('/downloadDocument/:fileName', authenticate, downloadDocument);

module.exports = router;

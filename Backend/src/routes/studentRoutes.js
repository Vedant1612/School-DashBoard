const express = require('express');
const { 
    upload, 
    uploadDocument, 
    getDocuments, 
    downloadDocument, 
    getProfile,
    viewDocument,
    deleteDocument 
} = require('../controllers/studentController');
const { authenticate } = require('../middleware/authMiddleware');
const router = express.Router();

// Protected routes that require authentication
router.post('/uploadDocument', authenticate, upload, uploadDocument);  
router.get('/getDocuments', authenticate, getDocuments);  
router.get('/downloadDocument/:fileName', authenticate, downloadDocument);
router.get('/profile', authenticate, getProfile);
router.get('/viewDocument/:fileName', viewDocument);
router.delete('/deleteDocument/:fileName', authenticate, deleteDocument);

module.exports = router;

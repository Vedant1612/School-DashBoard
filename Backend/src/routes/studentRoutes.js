const express = require('express');
const { 
  upload, 
  uploadDocument, 
  getDocuments, 
  downloadDocument, 
  getProfile,
  viewDocument,
  deleteDocument,
  editProfile 
} = require('../controllers/studentController');
const { authenticate } = require('../middleware/authMiddleware');
const router = express.Router();

// Route for uploading a document
router.post('/uploadDocument', authenticate, upload, uploadDocument);

// Route for fetching all documents
router.get('/getDocuments', authenticate, getDocuments);

// Route for downloading a document
router.get('/downloadDocument/:fileName', authenticate, downloadDocument);

// Route for fetching user profile data
router.get('/profile', authenticate, getProfile);

// Route for viewing a document
router.get('/viewDocument/:fileName', viewDocument);

// Route for deleting a document
router.delete('/deleteDocument/:fileName', authenticate, deleteDocument);

// Route for editing user profile
router.put('/editProfile', authenticate, upload, editProfile);  

module.exports = router;

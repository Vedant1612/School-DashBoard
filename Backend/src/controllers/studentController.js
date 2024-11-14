const Document = require('../models/Document');
const User = require('../models/User');
const multer = require('multer');
const path = require('path');

// Set up multer storage configuration without filename change logic
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');  // Define upload directory
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);  // Retain the original filename for now
  },
});

// Apply multer storage configuration
const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 },  // Limit file size to 10MB
  fileFilter: (req, file, cb) => {
    const allowedFileTypes = /pdf/; // Allowed file types
    const extname = allowedFileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedFileTypes.test(file.mimetype);

    if (extname && mimetype) {
      return cb(null, true);  // File is valid
    } else {
      cb(new Error('Invalid file type. Only PDF is allowed.'));
    }
  }
});

// Controller to handle document upload
exports.uploadDocument = async (req, res) => {
  try {
    // Log the request body and file
    console.log('Request body:', req.body);
    console.log('Uploaded file:', req.file);

    if (!req.file || !req.body.documentType || !req.body.documentName) {
      return res.status(400).json({ error: 'File, document type, and document name are required.' });
    }

    const { documentType } = req.body;
    const uploadedBy = req.user ? req.user.id : 'anonymous'; // Fallback to 'anonymous' if user is not authenticated

    // Create a safe document name
    const fileExtension = path.extname(req.file.originalname).toLowerCase();
    const documentName = req.body.documentName ? req.body.documentName : 'demo'; // Fallback to 'demo' if not provided
    const safeDocumentName = documentName.replace(/\s+/g, '_').replace(/[^a-zA-Z0-9_-]/g, '');  // Clean document name
    const newFileName = `${uploadedBy}_${safeDocumentName}${fileExtension}`;  // Construct new filename

    // Rename the file
    const fs = require('fs');
    const oldPath = `uploads/${req.file.filename}`;
    const newPath = `uploads/${newFileName}`;

    fs.rename(oldPath, newPath, async (err) => {
      if (err) {
        console.error('Error renaming file:', err);
        return res.status(500).json({ error: 'Failed to rename the file.' });
      }

      // Create a new document entry in the database with the new file name
      const newDocument = await Document.create({
        documentType,
        fileName: newFileName,  // Use the new file name
        uploadedBy,
      });

      // Return success response
      res.status(201).json({ message: 'Document uploaded successfully', document: newDocument });
    });
  } catch (error) {
    console.error('Error uploading document:', error);
    res.status(500).json({ error: 'Document upload failed' });
  }
};

// Controller to fetch all documents
exports.getDocuments = async (req, res) => {
  try {
    const documents = await Document.findAll({
      include: [{ model: User, attributes: ['name'] }],  // Include uploader's name from User model
    });
    res.json(documents);
  } catch (error) {
    console.error('Error fetching documents:', error);
    res.status(500).json({ error: 'Failed to retrieve documents' });
  }
};

// Export the upload middleware for single file upload
exports.upload = upload.single('file');

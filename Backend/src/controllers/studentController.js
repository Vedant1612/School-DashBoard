const Document = require('../models/Document');
const User = require('../models/User');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

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

    const { documentType, documentName } = req.body;
    const uploadedBy = req.user ? req.user.id : 'anonymous'; // Fallback to 'anonymous' if user is not authenticated

    // Construct safe document name
    const fileExtension = path.extname(req.file.originalname).toLowerCase();
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

      // Update the document entry with 'Uploaded' status after renaming the file
      const newDocument = await Document.create({
        documentType,
        documentName: safeDocumentName,  // Add the documentName field
        fileName: newFileName,  // Use the new file name
        filePath: newPath,  // Set the file path to the new file path
        uploadedBy,
        uploadedStatus: 'Uploaded',  // Set status to 'Uploaded' after file upload
        status: 'Approval Pending',  // Set initial status if needed
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

exports.downloadDocument = (req, res) => {
  const { fileName } = req.params;
  const filePath = path.join(__dirname, '..', 'uploads', fileName);

  console.log('Attempting to download file at:', filePath);

  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      console.error('File not found:', filePath);
      return res.status(404).json({ error: 'File not found' });
    }
    res.download(filePath, fileName, (downloadErr) => {
      if (downloadErr) {
        console.error('Error downloading file:', downloadErr);
        return res.status(500).json({ error: 'Failed to download the file' });
      }
    });
  });
};



// Export the upload middleware for single file upload
exports.upload = upload.single('file');

const Document = require('../models/Document');
const User = require('../models/User'); // Import the User model
const multer = require('multer');

// Configure multer to store files in memory as buffers
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 },  // Limit file size to 10MB
  fileFilter: (req, file, cb) => {
    const allowedFileTypes = /pdf$/; // Allow only .pdf files
    const extname = allowedFileTypes.test(file.originalname.toLowerCase());
    const mimetype = allowedFileTypes.test(file.mimetype);

    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only PDF is allowed.'));
    }
  }
});

// Controller to handle document upload
exports.uploadDocument = async (req, res) => {
  try {
    if (!req.file || !req.body.documentType || !req.body.documentName) {
      return res.status(400).json({ error: 'File, document type, and document name are required.' });
    }

    const { documentType, documentName } = req.body;
    const uploadedBy = req.user ? req.user.id : 'anonymous';

    // Create document in the database with file data
    const newDocument = await Document.create({
      documentType,
      documentName,
      fileName: req.file.originalname,
      fileData: req.file.buffer,  // Store the file data as a buffer
      uploadedBy,
      uploadedStatus: 'Uploaded',
      status: 'Approval Pending',
    });

    res.status(201).json({ message: 'Document uploaded successfully', document: newDocument });
  } catch (error) {
    console.error('Error uploading document:', error);
    res.status(500).json({ error: 'Document upload failed' });
  }
};

// Controller to fetch all documents
exports.getDocuments = async (req, res) => {
  try {
    // Attempt to fetch documents with associated user data
    const documents = await Document.findAll({
      include: [{ model: User, attributes: ['name'] }],
    });
    res.json(documents);
  } catch (error) {
    console.error('Error fetching documents:', error); // Detailed error logging
    res.status(500).json({
      error: 'Failed to retrieve documents',
      message: error.message, // Include error message for more context
    });
  }
};

// Controller to download document
exports.downloadDocument = async (req, res) => {
  try {
    const { fileName } = req.params;

    // Retrieve document by file name
    const document = await Document.findOne({ where: { fileName } });

    if (!document) {
      return res.status(404).json({ error: 'File not found' });
    }

    // Set headers and send the file data
    res.setHeader('Content-Disposition', `attachment; filename="${document.fileName}"`);
    res.setHeader('Content-Type', 'application/pdf');  // Assuming all files are PDFs

    res.send(document.fileData);  // Send the binary file data directly
  } catch (error) {
    console.error('Error downloading document:', error);
    res.status(500).json({ error: 'Failed to download the document' });
  }
};

// Export the upload middleware for single file upload
exports.upload = upload.single('file');

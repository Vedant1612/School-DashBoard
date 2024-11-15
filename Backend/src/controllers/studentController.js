const Document = require('../models/Document');
const User = require('../models/User'); 
const multer = require('multer');

// Configure multer to store files in memory as buffers
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 },  // Limit file size to 10MB
  fileFilter: (req, file, cb) => {
    const allowedFileTypes = /pdf$/; 
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
    // Check if file and other required fields are present
    if (!req.file || !req.body.documentType || !req.body.documentName) {
      return res.status(400).json({ error: 'File, document type, and document name are required.' });
    }

    const { documentType, documentName } = req.body;
    const uploadedBy = req.user ? req.user.id : 'anonymous';

    // Generate a unique file name by using the selected document name 
    const uniqueFileName = `${documentType}.pdf`; 

    // Create document in the database with file data
    const newDocument = await Document.create({
      documentType,
      documentName,
      fileName: uniqueFileName,  
      fileData: req.file.buffer,  
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
    // Extract user ID from the authenticated token
    const userId = req.user.id;

    // Fetch documents uploaded by the specific user
    const documents = await Document.findAll({
      where: { uploadedBy: userId }, 
      include: [{ 
        model: User, 
        attributes: ['name'], 
      }],
    });

    // Return the documents in the response
    res.json(documents);
  } catch (error) {
    console.error('Error fetching documents:', error);
    res.status(500).json({
      error: 'Failed to retrieve documents',
      message: error.message,
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
    res.setHeader('Content-Type', 'application/pdf');  

    res.send(document.fileData);  
  } catch (error) {
    console.error('Error downloading document:', error);
    res.status(500).json({ error: 'Failed to download the document' });
  }
};

// Controller to fetch profile data
exports.getProfile = async (req, res) => {
  try {
    const user = req.user; 
    res.json({
      name: user.name,
      email: user.email,
      mobile: user.mobile
    });
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ message: 'Failed to retrieve profile' });
  }
};

// Controller to view a document
exports.viewDocument = async (req, res) => {
  try {
    const { fileName } = req.params;

    // Retrieve the document by file name
    const document = await Document.findOne({ where: { fileName } });

    if (!document) {
      return res.status(404).json({ error: 'File not found' });
    }


    res.contentType('application/pdf');
    res.send(document.fileData); 
  } catch (error) {
    console.error('Error viewing document:', error);
    res.status(500).json({ error: 'Failed to view the document' });
  }
};

// Controller to delete a document
exports.deleteDocument = async (req, res) => {
  try {
    const { fileName } = req.params;

    const document = await Document.findOne({ where: { fileName } });

    if (!document) {
      return res.status(404).json({ error: 'Document not found' });
    }

    // Delete the document
    await document.destroy();
    res.json({ message: 'Document deleted successfully' });
  } catch (error) {
    console.error('Error deleting document:', error);
    res.status(500).json({ error: 'Failed to delete the document' });
  }
};

// Export the upload middleware for single file upload
exports.upload = upload.single('file');

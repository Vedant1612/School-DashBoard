const Document = require('../models/Document');
const User = require('../models/User');

// Controller to fetch all documents for the logged-in user
exports.getDocuments = async (req, res) => {
  try {
    const userId = req.user.id; // Get user ID from the authenticated user

    // Fetch documents based on the user ID
    const documents = await Document.findAll({
      where: { uploadedBy: userId },
      include: [
        { model: User, attributes: ['name'] },  // Include uploader's name from User model
      ],
    });

    if (documents.length === 0) {
      return res.status(404).json({ message: 'No documents found.' });
    }

    // Return the documents
    res.json(documents.map(doc => ({
      documentName: doc.documentName,
      uploadedStatus: doc.uploadedStatus,
      status: doc.status,
      fileName: doc.fileName,
      uploadedBy: doc.User.name,  // Getting the uploader's name
    })));
  } catch (error) {
    console.error('Error fetching documents:', error);
    res.status(500).json({ error: 'Failed to retrieve documents' });
  }
};

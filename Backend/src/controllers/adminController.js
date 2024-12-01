const Document = require('../models/Document');
const User = require('../models/User');

// Controller for admin to register a new student
exports.registerStudent = async (req, res) => {
    try {
        const { studentName, contactNumber, address, fatherName, motherName, email, password, lastName } = req.body;

        // Validate required fields
        if (!studentName || !contactNumber || !address || !email || !password || !lastName) {
            return res.status(400).json({ error: 'All fields are required.' });
        }

        // Handle address (check if it's a stringified JSON and parse it)
        let formattedAddress = address;
        if (typeof address === 'string') {
            try {
                formattedAddress = JSON.parse(address);
            } catch (err) {
                console.error('Error parsing address:', err);
                formattedAddress = {}; // Set to empty object if parsing fails
            }
        }

        // Format the address to a readable string if it's an object
        if (formattedAddress && typeof formattedAddress === 'object') {
            formattedAddress = {
                street: formattedAddress.street || 'Not Available',
                city: formattedAddress.city || 'Not Available',
                state: formattedAddress.state || 'Not Available',
                zip: formattedAddress.zip || 'Not Available',
            };
        }

        // Create new student
        const newStudent = await User.create({
            username: studentName.toLowerCase().replace(/\s+/g, '_'), // Simple username from student name
            firstName: studentName,
            lastName,
            mobile: contactNumber,
            address: formattedAddress,  // Store the formatted address
            fathersName: fatherName,
            mothersName: motherName,
            role: 'student',
            email,  // Add email field
            password,  // Add password field
        });

        res.status(201).json({ message: 'Student registered successfully', student: newStudent });
    } catch (error) {
        console.error('Error registering student:', error);
        res.status(500).json({ error: 'Failed to register student' });
    }
};

// Fetch all students for admin
exports.getStudents = async (req, res) => {
    try {
      const students = await User.findAll({
        where: { role: 'student' },
        attributes: ['id', 'firstName', 'lastName', 'email', 'mobile'],
      });
  
      if (students.length === 0) {
        return res.status(404).json({ message: 'No students found.' });
      }
  
      res.json(students);
    } catch (error) {
      console.error('Error fetching students:', error);
      res.status(500).json({ error: 'Failed to fetch students' });
    }
  };

  
  // Fetch all documents for a specific student
exports.getDocumentsByStudent = async (req, res) => {
    try {
      const { studentId } = req.params;
  
      const documents = await Document.findAll({
        where: { uploadedBy: studentId },
        include: [
          {
            model: User,
            attributes: ['username', 'firstName', 'lastName'],
          },
        ],
      });
  
      if (documents.length === 0) {
        return res.status(404).json({ message: 'No documents uploaded by this student.' });
      }
  
      res.json(documents.map(doc => ({
        documentName: doc.documentName,
        documentType: doc.documentType,
        uploadedStatus: doc.uploadedStatus,
        status: doc.status,
        fileName: doc.fileName,
        uploadedBy: {
          id: doc.User.id,
          username: doc.User.username,
          firstName: doc.User.firstName,
          lastName: doc.User.lastName,
        },
      })));
    } catch (error) {
      console.error('Error fetching documents by student:', error);
      res.status(500).json({ error: 'Failed to fetch documents by student' });
    }
  };

  
  // Approve or reject a document
exports.updateDocumentStatus = async (req, res) => {
    try {
      const { fileName } = req.params;
      const { status } = req.body; // Should be 'Approved' or 'Rejected'
  
      if (!['Approved', 'Rejected'].includes(status)) {
        return res.status(400).json({ error: 'Invalid status value.' });
      }
  
      const document = await Document.findOne({ where: { fileName } });
  
      if (!document) {
        return res.status(404).json({ error: 'Document not found.' });
      }
  
      document.status = status;
      await document.save();
  
      res.json({ message: `Document status updated to ${status}` });
    } catch (error) {
      console.error('Error updating document status:', error);
      res.status(500).json({ error: 'Failed to update document status' });
    }
  };
  

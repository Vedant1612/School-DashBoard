import React, { useState, useEffect } from 'react';
import { FaFileUpload, FaFolderOpen, FaDownload } from 'react-icons/fa';
import axios from 'axios';
import API_BASE_URL from '../config';
import { useNavigate } from 'react-router-dom';

function StudentDashboard() {
  const navigate = useNavigate(); // Ensure useNavigate is initialized correctly
  const [documentType, setDocumentType] = useState('');
  const [document, setDocument] = useState(null);
  const [uploadedDocuments, setUploadedDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [documentName, setDocumentName] = useState(''); // To store the document name (comment)

  // Handle file input change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
      setDocument(file);
    } else {
      alert('Please upload a PDF file.');
    }
  };

  // Capture the comment (document name) from the textarea
  const handleCommentChange = (e) => {
    setDocumentName(e.target.value); // Set document name as comment
  };

  // Upload document to the server
  const handleUpload = async () => {
    if (document && documentType && documentName) {
      const formData = new FormData();
      formData.append('file', document);
      formData.append('documentType', documentType);
      formData.append('documentName', documentName); // Attach document name (comment)

      setUploading(true);

      try {
        const token = localStorage.getItem('token');

        const response = await axios.post(`${API_BASE_URL}/student/uploadDocument`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        });

        alert(response.data.message);
        setUploadedDocuments([...uploadedDocuments, response.data.document]);
        setDocument(null);
        setDocumentType('');
        setDocumentName(''); 
      } catch (error) {
        console.error(error);
        alert('Document upload failed!');
      } finally {
        setUploading(false);
      }
    } else {
      alert('Please select a document, document type, and provide a name for the document!');
    }
  };

  // Fetch the uploaded documents from the server
  const fetchUploadedDocuments = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_BASE_URL}/student/getDocuments`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUploadedDocuments(response.data);
    } catch (error) {
      console.error(error);
      alert('Failed to fetch documents!');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUploadedDocuments();
  }, []);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-gradient-to-b from-blue-500 to-blue-500 text-white p-6 flex flex-col justify-between">
        <h2 className="text-2xl font-semibold mb-8 text-center">Student Panel</h2>
        <ul className="space-y-4">
          <li>
            <button className="w-full text-left py-2 px-4 hover:bg-blue-700 flex items-center">
              <FaFolderOpen className="mr-3" /> Dashboard
            </button>
          </li>
          <li>
            <button className="w-full text-left py-2 px-4 hover:bg-blue-700 flex items-center">
              <FaFileUpload className="mr-3" /> Upload Document
            </button>
          </li>
          <li>
            <button
              className="w-full text-left py-2 px-4 hover:bg-blue-700 flex items-center"
              onClick={() => navigate('/student-dashboard/view-documents')} // Correctly using navigate
            >
              <FaDownload className="mr-3" /> View Documents
            </button>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-y-auto">
        {/* Header */}
        <header className="flex justify-between items-center border-b border-gray-200 pb-4 mb-8">
          <h1 className="text-3xl font-semibold text-gray-800">Student Dashboard</h1>
        </header>

        {/* Content Area */}
        <div className="grid grid-cols-1 gap-8">
          {/* Upload Document Section */}
          <div className="bg-white p-6 rounded-lg shadow-xl transition transform hover:scale-102 hover:shadow-2xl duration-300 box w-full">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Upload Document</h2>

            <select
              value={documentType}
              onChange={(e) => setDocumentType(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            >
              <option value="" disabled>Select Document Type</option>
              <option value="LC Certificate">LC Certificate</option>
              <option value="Aadhar Card">Aadhar Card</option>
              <option value="Ration Card">Ration Card</option>
              <option value="Address Proof">Address Proof</option>
            </select>

            <input
              type="file"
              accept="application/pdf"
              onChange={handleFileChange}
              className="w-full p-3 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />

            <textarea
              className="w-full p-3 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              placeholder="Write your file name here..."
              rows="4"
              value={documentName}
              onChange={handleCommentChange}
            ></textarea>

            <button
              onClick={handleUpload}
              className="w-full bg-blue-400 text-white py-3 rounded-md hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            >
              {uploading ? 'Uploading...' : 'Upload Document'}
            </button>
          </div>

          {/* Uploaded Documents Section */}
          <div className="bg-white p-6 rounded-lg shadow-xl transition transform hover:scale-102 hover:shadow-2xl duration-300 box w-full">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Uploaded Documents</h2>
            {loading ? (
              <div>Loading...</div>
            ) : (
              <ul className="space-y-4">
                {uploadedDocuments.length === 0 ? (
                  <li>No documents uploaded yet.</li>
                ) : (
                  uploadedDocuments.map((doc, index) => (
                    <li key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
                      <span className="text-gray-700">{doc.fileName}</span>
                      <button
                        className="bg-blue-400 text-white px-4 py-2 rounded-md hover:bg-blue-500 focus:outline-none transition duration-300"
                      >
                        <a href={`${API_BASE_URL}/uploads/${doc.fileName}`} download>Download</a>
                      </button>
                    </li>
                  ))
                )}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentDashboard;

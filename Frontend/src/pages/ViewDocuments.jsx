import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_BASE_URL from '../config';

function ViewDocuments() {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch documents from the server
  const fetchDocuments = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_BASE_URL}/student/getDocuments`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setDocuments(response.data); // Store the documents in the state
    } catch (error) {
      console.error('Error fetching documents:', error);
      alert('Failed to fetch documents!');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocuments(); // Fetch the documents on page load
  }, []);

  const handleUpdate = (docName) => {
    alert(`Update action triggered for ${docName}`);
    // Implement the update logic here (e.g., open a modal or navigate to update page)
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-semibold text-gray-800 mb-8 text-center">Uploaded Documents</h1>

      {loading ? (
        <div className="text-center text-xl text-gray-600">Loading...</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse border border-gray-200 bg-white shadow-md rounded-lg">
            <thead className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
              <tr>
                <th className="px-6 py-3 border-b text-left">Document Name</th>
                <th className="px-6 py-3 border-b text-left">Uploaded Status</th>
                <th className="px-6 py-3 border-b text-left">Status</th>
                <th className="px-6 py-3 border-b text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {documents.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center py-6 text-gray-500">No documents uploaded yet.</td>
                </tr>
              ) : (
                documents.map((doc, index) => (
                  <tr key={index} className="odd:bg-gray-50 hover:bg-gray-100 transition duration-300">
                    <td className="px-6 py-4 border-b text-gray-800">{doc.documentName}</td>
                    <td className="px-6 py-4 border-b">
                      <span
                        className={`px-4 py-2 rounded-full text-white text-sm ${
                          doc.uploadedStatus === 'Uploaded'
                            ? 'bg-green-400'
                            : 'bg-yellow-400'
                        }`}
                      >
                        {doc.uploadedStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4 border-b">
                      <span
                        className={`px-4 py-2 rounded-full text-white text-sm ${
                          doc.status === 'Approval Pending'
                            ? 'bg-yellow-500'
                            : doc.status === 'Approved'
                            ? 'bg-green-500'
                            : 'bg-red-500'
                        }`}
                      >
                        {doc.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 border-b flex items-center space-x-4">
                      <a
                        href={`${API_BASE_URL}/uploads/${doc.documentName}`}
                        download
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all"
                      >
                        Download
                      </a>
                      <button
                        onClick={() => handleUpdate(doc.documentName)}
                        className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition-all"
                      >
                        Update
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default ViewDocuments;

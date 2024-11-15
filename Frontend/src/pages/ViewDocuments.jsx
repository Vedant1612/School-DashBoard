import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaDownload, FaEye, FaTrash } from 'react-icons/fa';
import Sidebar from '../components/Sidebar';
import { useNavigate } from 'react-router-dom';
import API_BASE_URL from '../config';

function ViewDocuments() {
  const [uploadedDocuments, setUploadedDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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

  const handleDownload = async (fileName) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_BASE_URL}/student/downloadDocument/${fileName}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        responseType: 'blob',
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = window.document.createElement('a');
      link.href = url;
      link.setAttribute('download', fileName);
      window.document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading document:', error);
      alert('Failed to download document. Please try again.');
    }
  };

  const handleView = (fileName) => {
    // Construct the URL for the document's viewing endpoint
    const url = `${API_BASE_URL}/student/viewDocument/${fileName}`;
    // Open the document in a new tab
    window.open(url, '_blank');
  };

  const handleDelete = async (fileName) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${API_BASE_URL}/student/deleteDocument/${fileName}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // After deleting, refetch documents to update the list
      fetchUploadedDocuments();
      alert('Document deleted successfully!');
    } catch (error) {
      console.error('Error deleting document:', error);
      alert('Failed to delete document. Please try again.');
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      <div className="flex-1 p-8 overflow-y-auto">
        <header className="flex justify-between items-center border-b border-gray-200 pb-4 mb-8">
          <h1 className="text-3xl font-semibold text-gray-800">Uploaded Documents</h1>
        </header>

        <div className="bg-white p-6 rounded-lg shadow-xl transition transform hover:scale-102 hover:shadow-2xl duration-300 box w-full">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <table className="min-w-full table-auto">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left">Document Name</th>
                  <th className="px-4 py-2 text-left">Uploaded Status</th>
                  <th className="px-4 py-2 text-left">Status</th>
                  <th className="px-4 py-2 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {uploadedDocuments.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="text-center py-4">No documents uploaded yet.</td>
                  </tr>
                ) : (
                  uploadedDocuments.map((doc, index) => (
                    <tr key={index} className="border-t">
                      <td className="px-4 py-2">{doc.fileName}</td>
                      <td className="px-4 py-2">
                        <span className="text-green-500">Uploaded</span>
                      </td>
                      <td className="px-4 py-2">
                        <span className="text-yellow-500">{doc.status}</span>
                      </td>
                      <td className="px-4 py-2">
                        <button
                          onClick={() => handleDownload(doc.fileName)}
                          className="text-blue-500 hover:text-blue-700 mr-2"
                        >
                          <FaDownload />
                        </button>
                        <button
                          onClick={() => handleView(doc.fileName)}
                          className="text-green-500 hover:text-green-700 mr-2"
                        >
                          <FaEye />
                        </button>
                        {/* Only show the delete button if the status is not 'approved' */}
                        {doc.status !== 'Approved' && (
                          <button
                            onClick={() => handleDelete(doc.fileName)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <FaTrash />
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default ViewDocuments;

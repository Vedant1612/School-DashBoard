import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaDownload, FaEdit } from 'react-icons/fa';
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
      setUploadedDocuments(response.data); // Assuming response contains the necessary data
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

  const handleUpdate = (fileName) => {
    // Handle document update logic here (redirect to update page or modal)
    alert(`Update logic for ${fileName} goes here!`);
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
                        <span className="text-yellow-500">Pending</span>
                      </td>
                      <td className="px-4 py-2">
                        <button
                          onClick={() => handleDownload(doc.fileName)}
                          className="bg-blue-400 text-white px-4 py-2 rounded-md hover:bg-blue-500 focus:outline-none transition duration-300 mr-2"
                        >
                          <FaDownload className="mr-2" /> Download
                        </button>
                        {doc.status === 'pending' && (
                          <button
                            onClick={() => handleUpdate(doc.fileName)}
                            className="bg-yellow-400 text-white px-4 py-2 rounded-md hover:bg-yellow-500 focus:outline-none transition duration-300"
                          >
                            <FaEdit className="mr-2" /> Update
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

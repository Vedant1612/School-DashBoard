import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaDownload, FaEye, FaCheck, FaTimes } from 'react-icons/fa';
import Select from 'react-select'; // Import react-select

import API_BASE_URL from '../config';

function DocumentReview() {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [loadingStudents, setLoadingStudents] = useState(true);
  const [loadingDocuments, setLoadingDocuments] = useState(false);

  // Fetch all students
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${API_BASE_URL}/admin/getStudents`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const studentOptions = response.data.map((student) => ({
          value: student.id,
          label: `${student.firstName} ${student.lastName}`,
        }));
        setStudents(studentOptions);
      } catch (error) {
        console.error('Failed to fetch students:', error);
        alert('Failed to fetch students!');
      } finally {
        setLoadingStudents(false);
      }
    };
    fetchStudents();
  }, []);

  // Fetch documents for the selected student
  const fetchDocuments = async (studentId) => {
    if (!studentId) {
      setDocuments([]);
      return;
    }

    setLoadingDocuments(true);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_BASE_URL}/admin/getDocuments/${studentId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 404 || !response.data || response.data.length === 0) {
        setDocuments([]);
      } else {
        setDocuments(response.data);
      }
    } catch (error) {
      console.error('Failed to fetch documents:', error);
      if (error.response && error.response.status === 404) {
        setDocuments([]);
      } else {
        alert('Failed to fetch documents!');
      }
    } finally {
      setLoadingDocuments(false);
    }
  };

  const handleStudentChange = (selectedOption) => {
    setSelectedStudent(selectedOption);
    fetchDocuments(selectedOption?.value);
  };

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
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading document:', error);
      alert('Failed to download document!');
    }
  };

  const handleView = (fileName) => {
    const url = `${API_BASE_URL}/student/viewDocument/${fileName}`;
    window.open(url, '_blank');
  };

  const handleStatusChange = async (fileName, status) => {
    try {
      const token = localStorage.getItem('token');
      await axios.patch(
        `${API_BASE_URL}/admin/updateDocumentStatus/${fileName}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert(`Document marked as ${status}`);
      fetchDocuments(selectedStudent?.value);
    } catch (error) {
      console.error('Error updating document status:', error);
      alert('Failed to update document status.');
    }
  };

  return (
    <div className="flex bg-gray-100">
      <div className="flex-1 p-8 overflow-y-auto">
        <header className="flex justify-between items-center border-b border-gray-200 pb-4 mb-8">
          <h1 className="text-3xl font-semibold text-gray-800">Review Student Documents</h1>
        </header>

        <div className="mb-6">
          <label htmlFor="student" className="block text-gray-700 font-medium mb-2">
            Select Student
          </label>
          {loadingStudents ? (
            <div>Loading students...</div>
          ) : (
            <Select
              id="student"
              value={selectedStudent}
              onChange={handleStudentChange}
              options={students}
              placeholder="Start typing to search for a student..."
              getOptionLabel={(e) => `${e.label}`} // Customize how options are displayed
            />
          )}
        </div>

        <div className="bg-white p-6 rounded-lg shadow-xl transition-transform hover:scale-102 hover:shadow-2xl duration-300 w-full">
          {loadingDocuments ? (
            <div>Loading documents...</div>
          ) : documents.length === 0 ? (
            <div className="text-gray-500">No documents uploaded for this student.</div>
          ) : (
            <table className="min-w-full table-auto">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left">Document Name</th>
                  <th className="px-4 py-2 text-left">Uploaded Status</th>
                  <th className="px-4 py-2 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {documents.map((doc, index) => (
                  <tr key={index} className="border-t">
                    <td className="px-4 py-2">{doc.fileName}</td>
                    <td className="px-4 py-2">
                      <span className="text-yellow-500">{doc.status}</span>
                    </td>
                    <td className="px-4 py-2 flex space-x-2">
                      <button
                        onClick={() => handleDownload(doc.fileName)}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        <FaDownload />
                      </button>
                      <button
                        onClick={() => handleView(doc.fileName)}
                        className="text-green-500 hover:text-green-700"
                      >
                        <FaEye />
                      </button>
                      <button
                        onClick={() => handleStatusChange(doc.fileName, 'Approved')}
                        className="text-green-500 hover:text-green-700"
                      >
                        <FaCheck />
                      </button>
                      <button
                        onClick={() => handleStatusChange(doc.fileName, 'Rejected')}
                        className="text-red-500 hover:text-red-700"
                      >
                        <FaTimes />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default DocumentReview;

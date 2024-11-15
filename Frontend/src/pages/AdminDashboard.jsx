import React, { useState } from 'react';
import { FaUserAlt, FaFolder, FaCog, FaSignOutAlt } from 'react-icons/fa';

function AdminDashboard() {
  const [studentName, setStudentName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [address, setAddress] = useState('');
  const [fatherName, setFatherName] = useState('');
  const [motherName, setMotherName] = useState('');
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState('');
  const [documents, setDocuments] = useState([]);

  // Dummy student data for testing
  // const sampleStudents = [
  //   { name: "Student 1", documents: ["Document 1", "Document 2"] },
  //   { name: "Student 2", documents: ["Document 3", "Document 4"] }
  // ];

  const handleRegister = () => {
    const newStudent = {
      name: studentName,
      contactNumber,
      address,
      fatherName,
      motherName,
      documents: [] 
    };
    setStudents([...students, newStudent]);
    resetForm();
  };

  const resetForm = () => {
    setStudentName('');
    setContactNumber('');
    setAddress('');
    setFatherName('');
    setMotherName('');
  };

  const handleSelectStudent = (e) => {
    const selected = e.target.value;
    setSelectedStudent(selected);
    const student = students.find((student) => student.name === selected);
    setDocuments(student ? student.documents : []);
  };

  const handleApproveDocument = (document) => {
    console.log(`Approved document: ${document} for student: ${selectedStudent}`);
    setDocuments(documents.filter((doc) => doc !== document));
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-gradient-to-b from-blue-400 to-blue-400 text-white p-6 flex flex-col justify-between">
        <h2 className="text-2xl font-semibold mb-8 text-center">Admin Panel</h2>
        <ul className="space-y-4">
          <li><button className="w-full text-left py-2 px-4 hover:bg-blue-700 flex items-center">
            <FaUserAlt className="mr-3" /> Dashboard
          </button></li>
          <li><button className="w-full text-left py-2 px-4 hover:bg-blue-700 flex items-center">
            <FaFolder className="mr-3" /> Student Management
          </button></li>
          <li><button className="w-full text-left py-2 px-4 hover:bg-blue-700 flex items-center">
            <FaFolder className="mr-3" /> Document Review
          </button></li>
          <li><button className="w-full text-left py-2 px-4 hover:bg-blue-700 flex items-center">
            <FaCog className="mr-3" /> Settings
          </button></li>
        </ul>
        <button className="w-full text-left py-2 px-4 mt-auto hover:bg-blue-700 flex items-center">
          <FaSignOutAlt className="mr-3" /> Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-y-auto">
        {/* Header */}
        <header className="flex justify-between items-center border-b border-gray-200 pb-4 mb-8">
          <h1 className="text-3xl font-semibold text-gray-800">Admin Dashboard</h1>
        </header>

        {/* Content Area */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Register Student Section */}
          <div className="bg-white p-6 rounded-lg shadow-xl transition transform hover:scale-105 hover:shadow-2xl duration-300">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Register Student</h2>
            <input
              type="text"
              placeholder="Student Name"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
            <input
              type="text"
              placeholder="Contact Number"
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
            <input
              type="text"
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
            <input
              type="text"
              placeholder="Father's Name"
              value={fatherName}
              onChange={(e) => setFatherName(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
            <input
              type="text"
              placeholder="Mother's Name"
              value={motherName}
              onChange={(e) => setMotherName(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
            <button
              onClick={handleRegister}
              className="w-full bg-blue-400 text-white py-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            >
              Save Student
            </button>
          </div>

          {/* Student Selection Section */}
          <div className="bg-white p-6 rounded-lg shadow-xl transition transform hover:scale-105 hover:shadow-2xl duration-300">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Select Student</h2>
            <select
              value={selectedStudent}
              onChange={handleSelectStudent}
              className="w-full p-3 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            >
              <option value="" disabled>Select Student</option>
              {students.map((student, index) => (
                <option key={index} value={student.name}>
                  {student.name}
                </option>
              ))}
            </select>
          </div>

          {/* Document Review Section */}
          {selectedStudent && (
            <div className="bg-white p-6 rounded-lg shadow-xl col-span-1 md:col-span-2 transition transform hover:scale-105 hover:shadow-2xl duration-300">
              <h2 className="text-xl font-semibold text-gray-700 mb-4">Review Documents</h2>
              <ul className="space-y-4">
                {documents.length === 0 ? (
                  <li>No documents uploaded yet.</li>
                ) : (
                  documents.map((document, index) => (
                    <li key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
                      <span className="text-gray-700">{document}</span>
                      <button
                        onClick={() => handleApproveDocument(document)}
                        className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 transition-all"
                      >
                        Approve
                      </button>
                    </li>
                  ))
                )}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;

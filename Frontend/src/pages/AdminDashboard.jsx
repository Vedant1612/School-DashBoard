import React, { useState } from 'react';
import { FaUserPlus, FaFileAlt } from 'react-icons/fa'; // Importing icons
import AdminSidebar from '../components/AdminSidebar';
import RegisterStudent from '../components/RegisterStudent';
import DocumentReview from '../components/DocumentReview';

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState(null); // To manage the active component
  const [students, setStudents] = useState([]);

  const handleRegister = (newStudent) => {
    setStudents([...students, newStudent]);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-8 overflow-y-auto">
        {/* Content Area */}
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-3xl border border-gray-200">
          {/* Initial Buttons - Only show when no tab is active */}
          {activeTab === null && (
            <div className="grid grid-cols-2 gap-6 mb-8">
              {/* Register New Student Card */}
              <div
                onClick={() => setActiveTab('register')}
                className="flex flex-col items-center justify-center p-6 cursor-pointer text-center rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 hover:bg-blue-600 bg-blue-500 text-white shadow-xl hover:shadow-2xl"
              >
                <FaUserPlus className="text-6xl mb-4" />
                <h3 className="text-xl font-semibold">Register New Student</h3>
              </div>

              {/* Document Review Card */}
              <div
                onClick={() => setActiveTab('review')}
                className="flex flex-col items-center justify-center p-6 cursor-pointer text-center rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 hover:bg-green-600 bg-green-500 text-white shadow-xl hover:shadow-2xl"
              >
                <FaFileAlt className="text-6xl mb-4" />
                <h3 className="text-xl font-semibold">Document Review</h3>
              </div>
            </div>
          )}

          {/* Show the corresponding component */}
          {activeTab === 'register' && (
            <div className="space-y-6">
              <RegisterStudent onRegister={handleRegister} />
            </div>
          )}

          {activeTab === 'review' && (
            <div>
              <DocumentReview />
            </div>
          )}

          {/* Back Button */}
          {activeTab && (
            <div className="mt-6">
              <button
                onClick={() => setActiveTab(null)} // Go back to the buttons view
                className="w-full bg-gray-500 text-white py-2 rounded hover:bg-gray-600"
              >
                Back to Dashboard
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;

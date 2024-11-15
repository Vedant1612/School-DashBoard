import React, { useEffect, useState } from 'react';
import { FaFolderOpen, FaFileUpload, FaDownload, FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function Sidebar() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if the user is authenticated by checking the token in localStorage
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('token');  // Remove the token from local storage
    setIsAuthenticated(false);  // Update state to reflect the user is logged out
    navigate('/');  // Redirect to the login page
  };

  if (!isAuthenticated) {
    return null; // If not authenticated, don't render the sidebar
  }

  return (
    <div className="w-64 bg-gradient-to-b from-blue-500 to-blue-500 text-white p-6 flex flex-col justify-between">
      <h2 className="text-2xl font-semibold mb-8 text-center">Student Panel</h2>
      <ul className="space-y-4">
        <li>
          <button
            className="w-full text-left py-2 px-4 hover:bg-blue-700 flex items-center"
            onClick={() => navigate('/student-dashboard')} // Navigate to student-dashboard
          >
            <FaFolderOpen className="mr-3" /> Dashboard
          </button>
        </li>
        <li>
          <button
            className="w-full text-left py-2 px-4 hover:bg-blue-700 flex items-center"
            onClick={() => navigate('/student-dashboard/view-documents')} // Navigate to view-documents
          >
            <FaDownload className="mr-3" /> View Documents
          </button>
        </li>
        <li>
          <button
            onClick={handleLogout} // Logout function
            className="w-full text-left py-2 px-4 hover:bg-blue-700 flex items-center"
          >
            <FaSignOutAlt className="mr-3" /> Logout
          </button>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
